import { PERM_ROLES, User } from '@/utils/hooks/storage/useAuthStore';
import { config } from '@/config';
import { RefreshToken } from '@/models';
import { logError } from '@/utils/sentry';
import { jwtDecode } from 'jwt-decode';

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

export function getUsersRoleId(user: User, application = config.appName): number {
  const role = user.roles.find((role) => role.application === application);
  return PERM_ROLES[role?.role ?? 'user'];
}

export function isTokenValid(token?: string): boolean {
  if (!token) {
    return false;
  }
  try {
    const decodedToken: RefreshToken | User = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const currentDate = new Date();
    return expirationDate >= currentDate;
  } catch (e: any) {
    logError(e);
    return false;
  }
}

export function mapAccessTokenToUser(token?: string): User | undefined {
  if (!token) {
    return;
  }
  try {
    return jwtDecode(token);
  } catch (e: any) {
    logError(e);
  }
}
