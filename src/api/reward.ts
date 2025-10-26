import axios from 'axios';
import { listData } from '@/types/global';

const base = '/rewards';

export interface RewardRecord {
  rewardId: number;
  rewardName: string;
  score: number;
  capacity: number;
  stateId: number;
  startTime: string;
  endTime: string;
}

export interface RewardDetailRecord {
  rewardId: number;
  rewardName: string;
  score: number;
  info: string;
  amount: number;
  capacity: number;
  stateId: number;
  startTime: string;
  endTime: string;
}

export interface RewardGetRequestDTO {
  [key: string]: string | number | undefined;
  rewardName?: string;
  pageNum: number;
  pageSize: number;
}

export interface CreateRewardParams {
  rewardName: string;
  score: number | null;
  info: string;
  capacity: number | null;
  startTime: string;
  endTime: string;
}

export interface UpdateRewardByIdParams {
  rewardName?: string;
  score?: number;
  info?: string;
  capacity?: number;
  startTime?: string;
  endTime?: string;
}

export interface FieldInfoDTO {
  fieldId: number;
  fieldName: string;
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

export interface RecordMemberRecord {
  userId: number;
  nickname: string;
  userName: string;
  roleId: string;
  roleName: string;
  branchId: string;
  branchName: string;
  score: number;
  contribution: number;
  stateId: number;
}

export interface UserFieldDTO {
  fieldId: number;
  fieldName: string;
  value: string;
}

export interface RewardFileRecord {
  id: number;
  name: string;
  userId: number;
  nickname: string;
  uploadTime: string;
  createTime: string;
  size: number;
}

/**
 * 获取所有奖励
 * @param {string} rewardGetRequestDTO
 * @returns
 */
export function getAllRewards(rewardGetRequestDTO: RewardGetRequestDTO) {
  let url = `${base}?`;
  Object.keys(rewardGetRequestDTO).forEach((key) => {
    if (rewardGetRequestDTO[key] !== '') {
      url += `${key}=${encodeURIComponent(
        rewardGetRequestDTO[key] as string
      )}&`;
    }
  });
  // 移除最后一个&符号
  url = url.slice(0, -1);
  return axios.get<listData<RewardRecord>>(url);
}

/**
 * 创建奖励
 * @returns
 */
export function createReward(params: CreateRewardParams) {
  return axios.post(`${base}`, params);
}

/**
 * 获取奖励的信息
 * @param {string} rewardId
 * @returns
 */
export function findRewardById(rewardId: number) {
  return axios.get<RewardDetailRecord>(`${base}/${rewardId}`);
}

/**
 * 修改奖励信息
 * @returns
 */
export function updateRewardById(
  rewardId: number,
  params: UpdateRewardByIdParams
) {
  return axios.put(`${base}/${rewardId}`, params);
}

/**
 * 删除奖励
 * @param {string} rewardId
 * @returns
 */
export function deleteRewardById(rewardId: number) {
  return axios.delete(`${base}/${rewardId}`);
}

/**
 * 获取奖励需要的字段
 * @param {string} rewardId
 * @returns
 */
export function findRewardField(rewardId: number) {
  return axios.get<FieldInfoDTO[]>(`${base}/${rewardId}/fields`);
}

/**
 * 增加奖励需要的字段
 * @param {string} rewardId
 * @param {string} fieldId
 * @returns
 */
export function joinRewardField(rewardId: number, fieldId: number) {
  return axios.post(`${base}/${rewardId}/fields/${fieldId}`);
}

/**
 * 删除奖励需要的字段
 * @param {string} rewardId
 * @param {string} fieldId
 * @returns
 */
export function deleteRewardField(rewardId: number, fieldId: number) {
  return axios.delete(`${base}/${rewardId}/fields/${fieldId}`);
}

/**
 * 获取购入奖励的用户
 * @param {string} rewardId
 * @param {string} userGetRequestDTO
 * @returns
 */
export function findUserByRewardId(
  rewardId: number,
  userGetRequestDTO: UserGetRequestDTO
) {
  let url = `${base}/${rewardId}/users?`;
  Object.keys(userGetRequestDTO).forEach((key) => {
    if (userGetRequestDTO[key] !== '') {
      url += `${key}=${encodeURIComponent(userGetRequestDTO[key] as string)}&`;
    }
  });
  // 移除最后一个&符号
  url = url.slice(0, -1);
  return axios.get<listData<RecordMemberRecord>>(url);
}

/**
 * 使用户获得奖励
 * @param {string} rewardId
 * @param {string} userId
 * @returns
 */
export function exchangeReward(rewardId: number, userId: number) {
  return axios.post(`${base}/${rewardId}/users/${userId}`);
}

/**
 * 更新用户奖励
 * @param {string} rewardId
 * @param {string} userId
 * @param {string} stateId
 * @returns
 */
export function updateRewardUser(
  rewardId: number,
  userId: number,
  stateId: number
) {
  return axios.put(
    `${base}/${rewardId}/users/${userId}/state?stateId=${stateId}`
  );
}

/**
 * 取消用户奖励
 * @param {string} rewardId
 * @param {string} userId
 * @returns
 */
export function deleteRewardUser(rewardId: number, userId: number) {
  return axios.delete(`${base}/${rewardId}/users/${userId}`);
}

/**
 * 查询奖励用户中字段词条
 * @param {string} rewardId
 * @param {string} userId
 * @returns
 */
export function findRewardUserField(rewardId: number, userId: number) {
  return axios.get<UserFieldDTO[]>(`${base}/${rewardId}/users/${userId}`);
}

/**
 * 获取奖励文件
 * @param {string} rewardId
 * @returns
 */
export function findRewardFile(rewardId: number) {
  return axios.get<RewardFileRecord[]>(`${base}/${rewardId}/files`);
}

/**
 * 上传奖励文件
 * @param {string} rewardId
 * @param {string} file
 * @returns
 */
export function uploadRewardFile(rewardId: number, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${base}/${rewardId}/files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 下载奖励文件
 * @param {string} rewardId
 * @param {string} fileId
 * @returns
 */
export function downloadRewardFile(rewardId: number, fileId: number) {
  return axios.get(`${base}/${rewardId}/files/${fileId}`);
}

/**
 * 删除奖励文件
 * @param {string} rewardId
 * @param {string} fileId
 * @returns
 */
export function deleteRewardFile(rewardId: number, fileId: number) {
  return axios.delete(`${base}/${rewardId}/files/${fileId}`);
}
