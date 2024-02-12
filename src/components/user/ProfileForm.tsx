import React, { ReactNode, useState } from 'react';
import { FormTextInput } from '@/components/form/FormTextInput';
import { twMerge } from 'tailwind-merge';
import { useForm } from 'react-hook-form';
import { getUserProfileImageId, useAuth, useRequest, useTranslation } from '@/utils';
import { Button } from '@/components/atoms/Button';
import { config } from '@/config';
import { FormFile, FormFileInput } from '@/components/form/FormFileInput';
import { ErrorState } from '@/components/atoms/ErrorState';
import { CloudflareImage } from '@/components/atoms/CloudflareImage/CloudflareImage';

interface Props {
  className?: string;
  children?: ReactNode;
}

interface ProfileForm {
  displayName: string | null;
  email: string | null;
  profileImage: FormFile | null;
}

export function ProfileForm({ children, className }: Props) {
  const { t } = useTranslation('auth');
  const { user } = useAuth();
  const { control, handleSubmit, reset } = useForm<ProfileForm>({
    defaultValues: {
      displayName: user?.displayName ?? null,
      email: user?.email ?? null,
      profileImage: null,
    },
  });
  const { post, delete: deleteRequest } = useRequest(config.authUrl);
  const [error, setError] = useState<any | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const onSubmit = async (form: ProfileForm) => {
    setSaving(true);
    if (form.profileImage) {
      await uploadFile(form.profileImage);
    }
    await post('/user-profile', {
      displayName: form.displayName,
      email: form.email,
    })
      .then(() => setError(null))
      .catch((e) => setError(e));
    reset({
      email: form.email,
      displayName: form.displayName,
      profileImage: null,
    });
    setSaving(false);
  };

  const uploadFile = async (file: FormFile) => {
    const formData = new FormData();
    formData.append('image', file.file as File);
    await post('/user-profile/profile-image', formData)
      .then(() => setError(null))
      .catch((e) => setError(e));
  };

  const deleteFile = () => {
    deleteRequest('/user-profile/profile-image')
      .then(() => setError(null))
      .catch((e) => setError(e));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={twMerge('grid grid-cols-1 lg:grid-cols-2 gap-2', className)}>
      <FormTextInput
        label={t('displayName')}
        placeholder={t('displayName')}
        name="displayName"
        control={control}
        rules={{ required: true }}
      />
      <FormTextInput
        label={t('email')}
        placeholder={t('email')}
        name="email"
        type="email"
        control={control}
        rules={{ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g }}
      />
      <FormFileInput label={t('profileImage')} name="profileImage" control={control} multiple={false} />
      {user?.profileImageId && (
        <div className="ml-1 flex items-center gap-2">
          <CloudflareImage
            imageId={getUserProfileImageId(user)}
            srcType="profile"
            alt="Profile image"
            className="my-2 size-20 rounded-full object-contain"
          />
          <Button onClick={deleteFile} size="sm" color="error">
            {t('deleteProfileImage')}
          </Button>
        </div>
      )}
      {error && <ErrorState className="lg:col-span-2" error={error} />}
      <div className="flex justify-center lg:col-span-2">
        <Button type="submit" disabled={saving}>
          {t('save')}
        </Button>
      </div>
      <div className="divider lg:col-span-2"></div>
      {children}
    </form>
  );
}
