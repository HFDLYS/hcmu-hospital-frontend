// pending-user.ts

import { listData } from '@/types/global';
import axios from 'axios';

// 待注册用户 API 的基础路径
const base = '/pending-users';

/**

 * 获取待注册用户列表的请求参数，对应 PendingUserGetRequestDTO
 */
export interface PendingUserGetRequest {
  [key: string]: string | number | undefined;
  userName?: string;
  name?: string;
  email?: string;
  pageNum?: number;
  pageSize?: number;
}

/**
 * 待注册用户列表项，对应 PendingUserListDTO
 */
export interface PendingUserItem {
  id: number;
  userName: string;
  name: string;
  email: string;
  roleId: number;
  roleName: string;
}

/**
 * 待注册用户详情，对应 PendingUserInfoDTO
 */
export interface PendingUserInfo {
  id: number;
  userName: string;
  name: string;
  email: string;
  roleId: number;
  roleName: string;
}

// --- API 请求函数 ---

/**
 * 获取所有待注册用户
 * @param {PendingUserGetRequest} params - 查询和分页参数
 */
export function getAllPendingUsers(params: PendingUserGetRequest) {
  let url = `${base}?`;
  Object.keys(params).forEach((key) => {
    const value = params[key];
    // 确保参数值存在且不为空字符串
    if (value !== undefined && value !== null && value !== '') {
      url += `${key}=${encodeURIComponent(value as string | number)}&`;
    }
  });

  url = url.slice(0, -1); // 移除末尾多余的 '&'
  return axios.get<listData<PendingUserItem>>(url);
}

/**
 * 根据ID获取待注册用户信息
 * @param {number} id - 待注册用户的ID
 */
export function getPendingUserById(id: number) {
  return axios.get<PendingUserInfo>(`${base}/${id}`);
}

/**
 * 删除待注册用户
 * @param {number} id - 要删除的待注册用户的ID
 */
export function deletePendingUser(id: number) {
  return axios.delete<string>(`${base}/${id}`);
}

/**
 * 批量删除待注册用户
 * @param {number[]} ids - 待注册用户ID的数组
 */
export function batchDeletePendingUsers(ids: number[]) {
  // 注意：axios 的 delete 方法发送请求体时，需要将数据包裹在 config 对象的 data 属性中。
  return axios.delete<string>(`${base}/batch`, { data: ids });
}

/**
 * 上传（导入）待注册用户
 * @param {File} file - 包含用户数据的 Excel 或 CSV 文件
 * @param {number} roleId - 要分配给导入用户的角色ID
 */
export function importPendingUsers(file: File, roleId: number) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('roleId', roleId.toString());

  return axios.post<string>(`${base}/import`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
