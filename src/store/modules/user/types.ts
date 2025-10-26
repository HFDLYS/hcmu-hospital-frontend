import { PermissionType } from '@/store/modules/app/types';

export interface UserState {
  userName: string;
  userId: number;
  nickname: string;
  sex?: string;
  age?: number;
  avatar?: string;
  score: number;
  contribution: number;
  job?: string;
  branchName?: string;
  branchId?: number;
  email?: string;
  phone?: string;
  roleId: number;
  roleName: string;
  permissions: PermissionType[];
}
