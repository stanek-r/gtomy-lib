import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import { twMerge } from 'tailwind-merge';
import { User } from '@/utils/hooks/storage/useAuthStore';
import { useAuth } from '@/utils/hooks/useAuth';
import { getUserFirstChar, getUserProfileImageId, isUserAccountFromGoogle } from '@/utils/auth/userUtils';
import { CloudflareImage } from '@/components/atoms/CloudflareImage/CloudflareImage';

export interface ProfileImageProps extends Omit<LazyLoadImageProps, 'src'> {
  user?: User;
}

export function ProfileImage({ user: forcedUser, className, ...props }: ProfileImageProps) {
  const { user } = useAuth();
  const innerUser = forcedUser ?? user;

  if (isUserAccountFromGoogle(innerUser) && innerUser?.profileImageUrl) {
    return (
      <LazyLoadImage
        src={innerUser.profileImageUrl}
        alt={getUserFirstChar(innerUser)}
        className={twMerge('mask mask-squircle object-cover', className)}
        {...props}
      />
    );
  }
  return (
    <CloudflareImage
      imageId={getUserProfileImageId(innerUser)}
      alt={getUserFirstChar(innerUser)}
      srcType="profile"
      visibleByDefault
      className={twMerge('mask mask-squircle object-cover', className)}
      {...props}
    />
  );
}
