import { User } from '@/utils/hooks/storage/useAuthStore';
import { config } from '@/config';

export function getUserFirstChar(user?: User): string {
  if (user == null) {
    return '';
  }
  return user.displayName.substring(0, 1);
}

export function getUserProfileImageUrl(user?: User): string {
  if (user == null) {
    return '';
  }
  return config.authUrl + '/user-profile/' + user.userId;
}
