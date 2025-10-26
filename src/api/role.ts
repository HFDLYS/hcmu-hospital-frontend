import axios from 'axios';

const base = '/roles';

export interface RoleItem {
  roleId: number;
  roleName: string;
  roleInfo: string;
  isDefault: number;
}

export interface PermItem {
  permissionId: number;
  name: string;
  // 角色类型 1: 系统权限 2: 项目权限 3: 部门权限
  type: number;
}

// 参数接口
export interface UpdateRolePermissionsParams {
  permissionId?: number;
  isOwn?: number;
}

export interface CreateRoleParams {
  roleName: string;
  roleInfo: string;
  type: number;
  permissionList?: any[];
}

export interface CreateRoleRes {
  roleId: number;
  roleName: string;
  roleInfo: string;
  type: number;
}

export interface UpdateRoleParams {
  roleName: string;
  roleInfo: string;
}

export interface RoleGetRequestDTO {
  [key: string]: string | number | undefined;
  roleId?: number;
  roleName?: string;
  type?: number;
}

/**
 * 获取所有角色
 */
export function getAllRoles(roleGetRequestDTO: RoleGetRequestDTO) {
  let url = `${base}?`;
  Object.keys(roleGetRequestDTO).forEach((key) => {
    if (roleGetRequestDTO[key] !== '') {
      url += `${key}=${encodeURIComponent(roleGetRequestDTO[key] as string)}&`;
    }
  });

  url = url.slice(0, -1);
  return axios.get<RoleItem[]>(url);
}

/**
 *  获取所有权限
 */
export function getAllPermissions() {
  return axios.get<PermItem[]>(`${base}/permissions`);
}

/**
 * 获取角色权限
 * @param roleId
 */
export function getRolePermissions(roleId: number) {
  return axios.get<PermItem[]>(`${base}/${roleId}/permissions`);
}

/**
 * 更新角色权限
 * @param roleId
 * @param params
 */
export function updateRolePermissions(
  roleId: number,
  params: UpdateRolePermissionsParams[]
) {
  return axios.put<string>(`${base}/${roleId}/permissions`, params);
}

/**
 * 删除角色
 * @param roleId
 */
export function deleteRole(roleId: number) {
  return axios.delete<string>(`${base}/${roleId}`);
}

/**
 * 创建角色
 * @param data
 */
export function createRole(data: CreateRoleParams) {
  return axios.post<CreateRoleRes>(`${base}`, data);
}

/**
 * 更新角色信息
 * @param {string} roleId
 * @param {object} params RoleUpdateDTO
 * @returns
 */
export function updateRole(roleId: number, params: UpdateRoleParams) {
  return axios.put(`${base}/${roleId}`, params);
}

/**
 * 上传角色操作手册('manualMG')
 * @param {string} roleId
 * @param {string} file
 * @returns
 */
export function uploadRoleManual(roleId: number, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${base}/${roleId}/manuals`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
