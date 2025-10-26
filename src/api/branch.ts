import axios from 'axios';
import { PermissionType } from '@/store/modules/app/types';
import { listData } from '@/types/global';

const base = '/branches';

export interface BranchRecord {
  branchId: number;
  branchName: string;
  branchInfo: string;
}

export interface UserGetRequestDTO {
  [key: string]: string | number | undefined;
  userName?: string;
  nickname?: string;
  branchName?: string;
  roleName?: string;
  pageNum: number;
  pageSize: number;
}

export interface BranMemberRecord {
  userId: number;
  nickname: string;
  userName: string;
  roleId: number;
  roleName: string;
  branchId: number;
  branchName: string;
  score: number;
  contribution: number;
  stateId: number;
}

export interface UpdateBranchRoleParams {
  roleId: number | null;
}

export interface JoinBranchParams {
  roleId: number | null;
}

export interface CreateBranchParams {
  branchName: string;
  branchInfo: string;
}

export interface UpdateBranchParams {
  branchName?: string;
  branchInfo?: string;
}

/**
 * 获取所有部门的信息
 * @returns
 */
export function findAllBranches() {
  return axios.get<BranchRecord[]>(`${base}`);
}

/**
 * 获取部门的信息
 * @param {string} branchId
 * @returns
 */
export function getBranchById(branchId: number) {
  return axios.get<BranchRecord>(`${base}/${branchId}`);
}

// export function findUserByBranchId(branchUserParams: {
//   branchId: number;
//   pageSize: number;
//   pageNum: number;
// }) {
//   return axios.get<BranchUserRecord>(
//     `${base}/${branchUserParams.branchId}/users?pageNum=${branchUserParams.pageNum}&pageSize=${branchUserParams.pageSize}`
//   );
// }

/**
 * 部门用户信息
 * @param {string} branchId
 * @param {string} userGetRequestDTO
 * @returns
 */
export function findUserByBranchId(
  branchId: number,
  userGetRequestDTO: UserGetRequestDTO
) {
  let url = `${base}/${branchId}/users?`;
  Object.keys(userGetRequestDTO).forEach((key) => {
    if (userGetRequestDTO[key] !== '') {
      url += `${key}=${encodeURIComponent(userGetRequestDTO[key] as string)}&`;
    }
  });
  // 移除最后一个&符号
  url = url.slice(0, -1);

  return axios.get<listData<BranMemberRecord>>(url);
}

/**
 * 部门权限查询
 * @param {string} branchId
 * @returns
 */
export function findBranchPermissionBySelf(branchId: number) {
  return axios.get<PermissionType[]>(`${base}/${branchId}/permissions`);
}

/**
 * 设置部门角色
 * @param {string} branchId
 * @param {string} userId
 * @param {object} params RoleUserUpdateDTO
 * @param {number} params.roleId
 * @returns
 */
export function setBranchRole(
  branchId: number,
  userId: number,
  params: UpdateBranchRoleParams
) {
  return axios.put(`${base}/${branchId}/users/${userId}`, params);
}

/**
 * 加入部门('BRAN_MB_MG', #branchId))
 * @param {string} branchId
 * @param {string} userId
 * @param {object} params RoleUserUpdateDTO
 * @param {number} params.roleId
 * @returns
 */
export function joinBranch(
  branchId: number,
  userId: number,
  params: JoinBranchParams
) {
  return axios.post(`${base}/${branchId}/users/${userId}`, params);
}

/**
 * 开除部门用户('BRAN_MB_MG', #branchId))
 * @param {string} branchId
 * @param {string} userId
 * @returns
 */
export function deleteBranchUser(branchId: number, userId: number) {
  return axios.delete(`${base}/${branchId}/users/${userId}`);
}

/**
 * 创建新部门('ADD_BRAN')
 * @param {object} params BranchCreateDTO
 * @param {string} params.branchName
 * @param {string} params.branchInfo
 * @returns
 */
export function createBranch(params: CreateBranchParams) {
  return axios.post(`${base}`, params);
}

/**
 * 修改部门信息('ADD_BRAN')
 * @param {string} branchId
 * @param {object} params BranchUpdateDTO
 * @param {string} params.branchName
 * @param {string} params.branchInfo
 * @returns
 */
export function updateBranch(branchId: number, params: UpdateBranchParams) {
  return axios.put(`${base}/${branchId}`, params);
}

/**
 * 删除部门('DEL_BRAN', #branchId))
 * @param {string} branchId
 * @returns
 */
export function deleteBranchById(branchId: number) {
  return axios.delete(`${base}/${branchId}`);
}
