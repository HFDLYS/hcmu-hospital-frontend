import axios from 'axios';
import { listData } from '@/types/global';

const base = '/doctor-profiles';

// 医生档案列表项
export interface DoctorProfileListDTO {
  doctorProfileId: number;
  userId: number;
  userName: string;
  departmentId: number;
  departmentName: string;
  title: string;
  specialty: string;
  createTime: string;
}

// 医生档案详情
export interface DoctorProfileDetailDTO {
  doctorProfileId: number;
  userId: number;
  userName: string;
  departmentId: number;
  departmentName: string;
  title: string;
  specialty: string;
  bio: string;
  createTime: string;
  updateTime: string;
}

// 获取医生档案请求参数
export interface DoctorProfileGetRequestDTO {
  [key: string]: string | number | undefined;
  pageNum?: number;
  pageSize?: number;
  departmentId?: number;
  title?: string;
  isDeleted?: number;
}

// 创建医生档案参数
export interface DoctorProfileCreateDTO {
  userId?: number;
  departmentId?: number;
  title?: string;
  specialty?: string;
  bio?: string;
}

// 更新医生档案参数
export interface DoctorProfileUpdateDTO {
  departmentId?: number;
  title?: string;
  specialty?: string;
  bio?: string;
}

/**
 * 查询医生档案列表
 * @param requestDTO DoctorProfileGetRequestDTO
 * @returns
 */
export function getAllDoctorProfiles(requestDTO: DoctorProfileGetRequestDTO) {
  let url = `${base}?`;

  Object.keys(requestDTO).forEach((key) => {
    if (requestDTO[key] !== undefined && requestDTO[key] !== '') {
      url += `${key}=${encodeURIComponent(requestDTO[key] as string)}&`;
    }
  });

  // 移除最后一个&符号
  url = url.slice(0, -1);

  return axios.get<listData<DoctorProfileListDTO>>(url);
}

/**
 * 创建医生档案('DOCTOR_MANAGE')
 * @param params DoctorProfileCreateDTO
 * @returns
 */
export function createDoctorProfile(params: DoctorProfileCreateDTO) {
  return axios.post<DoctorProfileListDTO>(`${base}`, params);
}

/**
 * 根据用户ID获取医生档案详情
 * @param userId
 * @returns
 */
export function getDoctorProfileByUserId(userId: number) {
  return axios.get<DoctorProfileDetailDTO>(`${base}/${userId}`);
}

/**
 * 根据用户ID更新医生档案('ALT_DOCTOR')
 * @param userId
 * @param params DoctorProfileUpdateDTO
 * @returns
 */
export function updateDoctorProfile(
  userId: number,
  params: DoctorProfileUpdateDTO
) {
  return axios.put<string>(`${base}/${userId}`, params);
}

/**
 * 删除医生档案('DOCTOR_MANAGE')
 * @param doctorProfileId
 * @returns
 */
export function deleteDoctorProfile(doctorProfileId: number) {
  return axios.delete<string>(`${base}/${doctorProfileId}`);
}

/**
 * 批量删除医生档案('DOCTOR_MANAGE')
 * @param doctorProfileIds
 * @returns
 */
export function batchDeleteDoctorProfiles(doctorProfileIds: number[]) {
  return axios.delete<string>(`${base}/batch`, { data: doctorProfileIds });
}
