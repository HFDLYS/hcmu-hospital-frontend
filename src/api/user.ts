import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import { listData } from '@/types/global';

const base = '/users';

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

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

export interface UserGetRequestDTO {
  [key: string]: string | number | undefined;
  userAccount?: string;
  userName?: string;
  roleName?: string;
  pageNum: number;
  pageSize: number;
}

export interface SysMemberRecord {
  userId: number;
  userName: string;
  userAccount: string;
  roleId: string;
  roleName: string;
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

/**
 * 根据id获取用户信息
 */
export function getUserById(userId: number) {
  return axios.get<UserState>(`${base}/${userId}`);
}

/**
 * 更新用户信息
 */
export const updateUserInfo = (id: number, params: UserUpdateDTO) => {
  return axios.put(`${base}/${id}`, params);
};

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

/**
 * 修改密码
 */
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
