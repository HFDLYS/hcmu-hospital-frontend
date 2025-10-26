import axios from 'axios';
import { listData } from '@/types/global';

const base = '/projects';

export interface TaskRecord {
  taskId: number;
  taskName: string;
  content: string;
  startTime: string;
  endTime: string;
  score: number;
  projectId: number;
  publisherId: number;
  publisherName: string;
  stateId: number;
  state: string;
  branchName: string;
  branchId: number;
}

export interface TaskGetRequestDTO {
  [key: string]: string | number | undefined;
  taskName?: string;
  publisherName?: string;
  branchName?: string;
  publisherId?: string;
  branchId?: string;
  pageNum: number;
  pageSize: number;
}

export interface CreateTaskParams {
  taskName: string;
  content: string;
  startTime: string;
  endTime: string;
  score: number;
  publisherId?: number;
  branchId?: number | null;
}

export interface UpdateTaskParams {
  taskName?: string;
  content?: string;
  startTime?: string;
  endTime?: string;
  score?: number;
  branchId?: number | null;
}

export interface TaskFileRecord {
  id: number;
  name: string;
  userId: number;
  nickname: string;
  uploadTime: string;
  createTime: string;
  size: number;
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

export interface TaskMemberRecord {
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

export interface CommentTaskUserParams {
  comment: string;
  mark: number;
  stateId: number;
}

export interface ChatHistoryGetRequestDTO {
  [key: string]: string | number | undefined;
  userId?: number;
  isRead?: number;
  content?: string;
  nickname?: string;
  pageNum: number;
  pageSize: number;
}

export interface ChatGetRequestDTO {
  [key: string]: string | number | undefined;
  startWith?: number;
  endWith?: number;
}

export interface CreateTaskChatParams {
  content: string;
}

export interface UpdateTaskChatParams {
  content: string;
}

export interface ChatListDTO {
  chatId: number;
  userId: number;
  nickname: string;
  isRead: number;
  isEdited: number;
  isWithdraw: number;
  count: number;
  content: string;
  avatar?: string;
  createTime: string;
  updateTime: string;
}

/**
 * 获取项目的任务
 * @param {string} projectId
 * @param {string} taskGetRequestDTO
 * @returns
 */
export function findTaskByProjectId(
  projectId: number,
  taskGetRequestDTO: TaskGetRequestDTO
) {
  let url = `${base}/${projectId}/tasks?`;

  Object.keys(taskGetRequestDTO).forEach((key) => {
    if (taskGetRequestDTO[key] !== '') {
      url += `${key}=${encodeURIComponent(taskGetRequestDTO[key] as string)}&`;
    }
  });
  url = url.slice(0, -1);
  return axios.get<listData<TaskRecord>>(url);
}

/**
 * 创建任务
 * @param projectId
 * @param params
 */
export function createTask(projectId: number, params: CreateTaskParams) {
  return axios.post(`${base}/${projectId}/tasks`, params);
}

/**
 * 获取任务的信息
 * @param {string} projectId
 * @param {string} taskId
 * @returns
 */
export function findTaskById(projectId: number, taskId: number) {
  return axios.get<TaskRecord>(`${base}/${projectId}/tasks/${taskId}`);
}

/*
 * 更新任务
 */
export function updateTask(
  projectId: number,
  taskId: number,
  params: UpdateTaskParams
) {
  return axios.put(`${base}/${projectId}/tasks/${taskId}`, params);
}

/**
 * 查看所有任务文件
 * @param {string} projectId
 * @param {string} taskId
 * @returns
 */
export function findTaskResult(projectId: number, taskId: number) {
  return axios.get<TaskFileRecord[]>(
    `${base}/${projectId}/tasks/${taskId}/files`
  );
}

/**
 * 下载任务文件
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} fileId
 * @returns
 */
export function downloadTaskFile(
  projectId: number,
  taskId: number,
  fileId: number
) {
  return axios.get(`${base}/${projectId}/tasks/${taskId}/files/${fileId}`);
}

/**
 * 加入任务
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} userId
 * @returns
 */
export function joinTask(projectId: number, taskId: number, userId: number) {
  return axios.post(`${base}/${projectId}/tasks/${taskId}/users/${userId}`);
}

/**
 * 移除任务成员
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} userId
 * @returns
 */
export function deleteTaskUser(
  projectId: number,
  taskId: number,
  userId: number
) {
  return axios.delete(`${base}/${projectId}/tasks/${taskId}/users/${userId}`);
}

/**
 * 查看任务成员
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} userGetRequestDTO
 * @returns
 */
export function findTaskUser(
  projectId: number,
  taskId: number,
  userGetRequestDTO: UserGetRequestDTO
) {
  let url = `${base}/${projectId}/tasks/${taskId}/users?`;
  Object.keys(userGetRequestDTO).forEach((key) => {
    if (userGetRequestDTO[key] !== '') {
      url += `${key}=${encodeURIComponent(userGetRequestDTO[key] as string)}&`;
    }
  });
  url = url.slice(0, -1);
  return axios.get<listData<TaskMemberRecord>>(url);
}

/**
 * 评分任务成员
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} userId
 * @param {object} params TaskCommentCreateDTO
 * @param {string} params.comment
 * @param {number} params.mark
 * @returns
 */
export function commentTaskUser(
  projectId: number,
  taskId: number,
  userId: number,
  params: CommentTaskUserParams
) {
  return axios.post(
    `${base}/${projectId}/tasks/${taskId}/users/${userId}/comment`,
    params
  );
}

/**
 * 更新任务状态
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} stateId
 * @returns
 */
export function updateTaskState(
  projectId: number,
  taskId: number,
  stateId: number
) {
  return axios.put(
    `${base}/${projectId}/tasks/${taskId}/state?stateId=${stateId}`
  );
}

/**
 * 提交任务成果
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} file
 * @returns
 */
export function uploadTaskResult(
  projectId: number,
  taskId: number,
  file: File
) {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${base}/${projectId}/tasks/${taskId}/files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 删除任务文件
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} fileId
 * @returns
 */
export function deleteTaskFile(
  projectId: number,
  taskId: number,
  fileId: number
) {
  return axios.delete(`${base}/${projectId}/tasks/${taskId}/files/${fileId}`);
}

/**
 * 获取聊天记录
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} chatGetRequestDTO
 * @returns
 */
export function findAllTaskChats(
  projectId: number,
  taskId: number,
  chatHistoryGetRequestDTO: ChatHistoryGetRequestDTO
) {
  let url = `${base}/${projectId}/tasks/${taskId}/chats?`;
  Object.keys(chatHistoryGetRequestDTO).forEach((key) => {
    if (chatHistoryGetRequestDTO[key] !== '') {
      url += `${key}=${encodeURIComponent(
        chatHistoryGetRequestDTO[key] as string
      )}&`;
    }
  });

  url = url.slice(0, -1);
  return axios.get<listData<ChatListDTO>>(url);
}

/**
 * 创建聊天记录
 * @param {string} projectId
 * @param {string} taskId
 * @param {object} params ChatCreateDTO
 * @param {string} params.content
 * @returns
 */
export function createTaskChat(
  projectId: number,
  taskId: number,
  params: CreateTaskChatParams
) {
  return axios.post(`${base}/${projectId}/tasks/${taskId}/chats`, params);
}

/**
 * 修改聊天记录
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} chatId
 * @param {object} params ChatUpdateDTO
 * @param {string} params.content
 * @returns
 */
export function updateTaskChat(
  projectId: number,
  taskId: number,
  chatId: number,
  params: UpdateTaskChatParams
) {
  return axios.put(
    `${base}/${projectId}/tasks/${taskId}/chats/${chatId}`,
    params
  );
}

/**
 * 撤回聊天记录
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} chatId
 * @returns
 */
export function withdrawTaskChat(
  projectId: number,
  taskId: number,
  chatId: number
) {
  return axios.delete(`${base}/${projectId}/tasks/${taskId}/chats/${chatId}`);
}

/**
 * 查看聊天记录阅读情况
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} chatId
 * @returns
 */
export function findUsersByChatId(
  projectId: number,
  taskId: number,
  chatId: number
) {
  return axios.get(
    `${base}/${projectId}/tasks/${taskId}/chats/${chatId}/users`
  );
}

/**
 * 顺序获取聊天记录
 * @param {string} projectId
 * @param {string} taskId
 * @param {string} chatGetRequestDTO
 * @returns
 */
export function findAllTaskChatsBySequence(
  projectId: number,
  taskId: number,
  chatGetRequestDTO: ChatGetRequestDTO
) {
  let url = `${base}/${projectId}/tasks/${taskId}/chats/sequence?`;
  Object.keys(chatGetRequestDTO).forEach((key) => {
    if (chatGetRequestDTO[key] !== '') {
      url += `${key}=${encodeURIComponent(chatGetRequestDTO[key] as string)}&`;
    }
  });
  url = url.slice(0, -1);
  return axios.get<ChatListDTO[]>(url);
}
