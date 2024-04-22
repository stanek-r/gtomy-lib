import { ReactNode, useState } from 'react';
import { FormTextInput } from '@/components/form/FormTextInput';
import { twMerge } from 'tailwind-merge';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { config } from '@/config';
import { FormFile, FormFileInput } from '@/components/form/FormFileInput';
import { ErrorState } from '@/components/atoms/ErrorState';
import { TextInput } from '@/components/atoms/TextInput';
import { ProfileImage } from '@/components/auth/ProfileImage';
import { useAuth, useBlobstorage, useRequest, useTranslation } from '@/utils/hooks';
import { isUserAccountFromGoogle } from '@/utils/auth';

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
  const { user, updateAccessToken } = useAuth();
  const { control, handleSubmit, reset } = useForm<ProfileForm>({
    defaultValues: {
      displayName: user?.displayName ?? null,
      email: user?.email ?? null,
      profileImage: null,
    },
  });
  const { post } = useRequest(config.authUrl);
  const [error, setError] = useState<any | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const {
    uploadImage,
    deleteImage,
    error: blobstorageError,
  } = useBlobstorage('/user-profile/profile-image', config.authUrl);

  const onSubmit = async (form: ProfileForm) => {
    setSaving(true);
    if (form.profileImage) {
      await uploadImage(form.profileImage);
    }
    await post('/user-profile', {
      displayName: form.displayName,
      email: form.email,
    })
      .then(() => {
        setError(null);
        return updateAccessToken();
      })
      .catch((e) => {
        setError(e);
      });
    reset({
      email: form.email,
      displayName: form.displayName,
      profileImage: null,
    });
    setSaving(false);
  };

  const onUpdate = async () => {
    setSaving(true);
    const refreshedUser = await updateAccessToken();
    if (refreshedUser != null) {
      reset({
        displayName: refreshedUser.displayName,
        email: refreshedUser.email,
        profileImage: null,
      });
    }
    setSaving(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={twMerge('grid grid-cols-1 lg:grid-cols-2 gap-2', className)}>
        <FormTextInput
          label={t('displayName')}
          placeholder={t('displayName')}
          name="displayName"
          control={control}
          rules={{ required: true }}
        />
        {user?.googleId != null ? (
          <TextInput
            label={t('email')}
            placeholder={t('email')}
            name="email"
            type="email"
            value={user?.email}
            disabled
          />
        ) : (
          <FormTextInput
            label={t('email')}
            placeholder={t('email')}
            name="email"
            type="email"
            control={control}
            rules={{ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g }}
          />
        )}
        {!isUserAccountFromGoogle(user) && (
          <>
            <FormFileInput
              label={t('profileImage')}
              name="profileImage"
              accept="image/*"
              control={control}
              multiple={false}
            />
            {user?.profileImageId && (
              <div className="ml-1 flex items-center gap-2">
                <ProfileImage className="my-2 size-20" />
                <Button onClick={() => deleteImage()} size="sm" color="error">
                  {t('deleteProfileImage')}
                </Button>
              </div>
            )}
          </>
        )}
        {error && <ErrorState className="lg:col-span-2" error={error} />}
        {blobstorageError && <ErrorState className="lg:col-span-2" error={blobstorageError} />}
        <div className="flex justify-center gap-4 lg:col-span-2">
          <Button type="submit" disabled={saving} color="primary">
            {t('save')}
          </Button>
          <Button onClick={onUpdate} disabled={saving}>
            {t('reloadAccessToken')}
          </Button>
        </div>
        <div className="divider lg:col-span-2"></div>
      </form>
      {children}
    </>
  );
}
