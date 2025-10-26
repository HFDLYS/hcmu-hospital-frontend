import { PermissionType } from '@/store/modules/app/types';

export interface UserState {
  userName: string;
  userId: number;
  nickname?: string;
  name: string;
  sex?: string;
  age?: number;
  avatar?: string;
  job?: string;
  branchName?: string;
  branchId?: number;
  email?: string;
  phone?: string;
  roleId: number;
  roleName: string;
  permissions: PermissionType[];
}
