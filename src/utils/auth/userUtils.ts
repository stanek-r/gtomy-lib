import { User } from '@/utils/hooks/storage/useAuthStore';
import { config } from '@/config';

export function getUserFirstChar(user?: User): string {
  if (user == null) {
    return '';
  }
  return user.displayName.substring(0, 1);
}

export function getUserProfileImageUrl(user?: User): string {
  if (user?.profileImageUuid == null) {
    return config.authUrl + '/images/5b46b9fd-8d41-4fbc-987f-3e7fd0e99600/miniature';
  }
  return config.authUrl + '/images/' + user.profileImageUuid + '/miniature';
}
