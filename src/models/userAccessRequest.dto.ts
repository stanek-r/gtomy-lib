import { PermRoles } from '@/utils/hooks/storage/useAuthStore';

export interface UserAccessRequestDto {
  requestId: string;
  application: string;
  role: PermRoles;
}
