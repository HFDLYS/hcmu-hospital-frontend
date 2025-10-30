import axios from 'axios';
import { listData } from '@/types/global';

const base = '/departments';

// 科室列表项
export interface DepartmentListDTO {
  departmentId: number;
  name: string;
  parentId: number;
  description: string;
  location: string;
  createTime: string;
}

// 科室详情
export interface DepartmentDetailDTO {
  departmentId: number;
  name: string;
  parentId: number;
  description: string;
  location: string;
  createTime: string;
}

// 获取科室请求参数
export interface DepartmentGetRequestDTO {
  [key: string]: string | number | undefined;
  pageNum?: number;
  pageSize?: number;
  name?: string;
  parentId?: number;
  isDeleted?: number;
}

// 创建科室参数
export interface DepartmentCreateDTO {
  name?: string;
  parentId?: number;
  description?: string;
  location?: string;
}

// 更新科室参数
export interface DepartmentUpdateDTO {
  name?: string;
  parentId?: number;
  description?: string;
  location?: string;
}

/**
 * 获取所有科室
 * @param requestDTO DepartmentGetRequestDTO
 * @returns
 */
export function getAllDepartments(requestDTO: DepartmentGetRequestDTO) {
  let url = `${base}?`;

  Object.keys(requestDTO).forEach((key) => {
    if (requestDTO[key] !== undefined && requestDTO[key] !== '') {
      url += `${key}=${encodeURIComponent(requestDTO[key] as string)}&`;
    }
  });

  // 移除最后一个&符号
  url = url.slice(0, -1);

  return axios.get<listData<DepartmentListDTO>>(url);
}

/**
 * 创建科室('DEPT_MANAGE')
 * @param params DepartmentCreateDTO
 * @returns
 */
export function createDepartment(params: DepartmentCreateDTO) {
  return axios.post<DepartmentListDTO>(`${base}`, params);
}

/**
 * 获取科室详情
 * @param departmentId
 * @returns
 */
export function getDepartmentById(departmentId: number) {
  return axios.get<DepartmentDetailDTO>(`${base}/${departmentId}`);
}

/**
 * 更新科室信息('DEPT_MANAGE')
 * @param departmentId
 * @param params DepartmentUpdateDTO
 * @returns
 */
export function updateDepartment(
  departmentId: number,
  params: DepartmentUpdateDTO
) {
  return axios.put<string>(`${base}/${departmentId}`, params);
}

/**
 * 删除科室('DEPT_MANAGE')
 * @param departmentId
 * @returns
 */
export function deleteDepartment(departmentId: number) {
  return axios.delete<string>(`${base}/${departmentId}`);
}

/**
 * 批量删除科室('DEPT_MANAGE')
 * @param departmentIds
 * @returns
 */
export function batchDeleteDepartments(departmentIds: number[]) {
  return axios.delete<string>(`${base}/batch`, { data: departmentIds });
}
