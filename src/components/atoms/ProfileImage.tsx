import React from 'react';
import { getUserFirstChar, getUserProfileImageId, isUserAccountFromGoogle, useAuth, User } from '@/utils';
import { CloudflareImage } from '@/components/atoms/CloudflareImage';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';

export interface ProfileImageProps extends Omit<LazyLoadImageProps, 'src'> {
  user?: User;
}

export function ProfileImage({ user: forcedUser, ...props }: ProfileImageProps) {
  const { user } = useAuth();
  const innerUser = forcedUser ?? user;

  if (isUserAccountFromGoogle(innerUser) && innerUser?.profileImageUrl) {
    return <LazyLoadImage src={innerUser.profileImageUrl} {...props} />;
  }
  return (
    <CloudflareImage
      imageId={getUserProfileImageId(innerUser)}
      alt={getUserFirstChar(innerUser)}
      srcType="profile"
      visibleByDefault
      {...props}
    />
  );
}
