import { User } from '@/utils/hooks/storage/useAuthStore';

export function getUserFirstChar(user?: User): string {
  if (user == null) {
    return '';
  }
  return user.displayName.substring(0, 1);
}

export function isUserAccountFromGoogle(user?: User): boolean {
  return user?.googleId != null;
}

export function getUserProfileImageId(user?: User): string {
  if (user?.profileImageId == null) {
    return '5b46b9fd-8d41-4fbc-987f-3e7fd0e99600';
  }
  return user.profileImageId;
}
