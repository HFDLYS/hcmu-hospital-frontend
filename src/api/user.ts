import axios from 'axios';
import { UserState } from '@/store/modules/user/types';
import { PermissionType } from '@/store/modules/app/types';
import { RouteRecordNormalized } from 'vue-router';
import { listData } from '@/types/global';

const base = '/users';

export interface UserUpdateDTO {
  phone?: string;
  info?: string;
  sex?: string;
  nickname?: string;
  age?: number;
}

export interface UserPasswordDTO {
  oldPassword: string;
  newPassword: string;
  checkPassword: string;
}

export const updateUserInfo = (id: number, params: UserUpdateDTO) => {
  return axios.put(`${base}/${id}`, params);
};

export interface UserGetRequestDTO {
  [key: string]: string | number | undefined;
  userName?: string;
  nickname?: string;
  branchName?: string;
  roleName?: string;
  pageNum: number;
  pageSize: number;
}

export interface ProjectGetDTO {
  [key: string]: string | number | undefined;
  projectName?: string;
  roleName?: string;
  pageNum: number;
  pageSize: number;
}

export interface ProjectRecord {
  projectId: number;
  projectName: string;
  labelId: number;
  info: string;
  roleName: string;
}

export interface SysMemberRecord {
  userId: number;
  nickname: string;
  userName: string;
  roleId: string;
  roleName: string;
  branchId: string;
  branchName: string;
}

// 参数接口
export interface UpdateUserFieldParams {
  value?: string;
}

export interface UserFieldDTO {
  fieldId: number;
  fieldName: string;
  value: string;
}

export interface UpdateUserRoleParams {
  roleId: number | null;
}

export interface ApplyUpdateEmailParams {
  code?: string;
  email: string;
}

export interface VerifyEmailCodeParams {
  code?: string;
  email: string;
}

// 根据id获取用户信息
export function getUserById(userId: number) {
  return axios.get<UserState>(`${base}/${userId}`);
}

// 获取系统权限列表
export function getPermissions() {
  return axios.get<PermissionType[]>(`${base}/permissions`);
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

/**
 * 获取所有用户的信息
 * @param {string} userGetRequestDTO
 * @returns
 */
export function getAllUsers(userGetRequestDTO: UserGetRequestDTO) {
  let url = `${base}?`;

  Object.keys(userGetRequestDTO).forEach((key) => {
    if (userGetRequestDTO[key]) {
      url += `${key}=${encodeURIComponent(userGetRequestDTO[key] as string)}&`;
    }
  });

  // 移除最后一个&符号
  url = url.slice(0, -1);

  return axios.get<listData<SysMemberRecord>>(url);
}

/**
 * 获取项目信息
 * @param {string} userId
 * @param projectGetDTO
 * @returns
 */
export function getProjectByUserId(
  userId: number,
  projectGetDTO: ProjectGetDTO
) {
  let url = `${base}/${userId}/projects?`;

  Object.keys(projectGetDTO).forEach((key) => {
    if (projectGetDTO[key]) {
      url += `${key}=${encodeURIComponent(projectGetDTO[key] as string)}&`;
    }
  });
  url = url.slice(0, -1);

  return axios.get<listData<ProjectRecord>>(url);
}
/**
 * 获取用户信息字段
 * @param {string} userId
 * @param fieldIds
 * @returns
 */
export function getUserFieldByUserId(userId: number, fieldIds: number[]) {
  const queryString = fieldIds.length ? `?fieldIds=${fieldIds.join(',')}` : '';
  return axios.get<UserFieldDTO[]>(`${base}/${userId}/fields${queryString}`);
}

/**
 * 更新用户信息字段
 * @param {string} userId
 * @param {string} fieldId
 * @param {object} params FieldValueDTO
 * @param {string} params.value
 * @returns
 */
export function updateUserField(
  userId: number,
  fieldId: number,
  params: UpdateUserFieldParams
) {
  return axios.put(`${base}/${userId}/fields/${fieldId}`, params);
}

/**
 * 设置用户角色
 * @param {string} userId
 * @param {object} params RoleUserUpdateDTO
 * @param {number} params.roleId
 * @returns
 */
export function updateUserRole(userId: number, params: UpdateUserRoleParams) {
  return axios.put(`${base}/${userId}/role`, params);
}

export function updatePassword(params: UserPasswordDTO) {
  return axios.post(`${base}/password`, params);
}

/**
 * 申请重新绑定邮箱
 * @param {object} params UserEmailVerifyDTO
 * @param {string} params.code
 * @param {string} params.email
 * @returns
 */
export function applyUpdateEmail(params: ApplyUpdateEmailParams) {
  return axios.post(`${base}/email`, params);
}

/**
 * 绑定邮箱验证
 * @param {object} params UserEmailVerifyDTO
 * @param {string} params.code
 * @param {string} params.email
 * @returns
 */
export function verifyEmailCode(params: VerifyEmailCodeParams) {
  return axios.post(`${base}/email/verify`, params);
}
