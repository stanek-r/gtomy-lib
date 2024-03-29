import { PermRoles } from '@/utils/hooks/storage';

export interface UserAccessRequestDto {
  requestId: string;
  application: string;
  role: PermRoles;
}
