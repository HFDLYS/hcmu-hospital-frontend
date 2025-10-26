// 日志操作接口
import axios from 'axios';
import { listData } from '@/types/global';

const base = '/logs';

export interface LogRecord {
  logId: number;
  userId: number;
  nickname: string;
  userName: string;
  operation: string;
  createTime: string;
  ip: string;
}

export interface LogGetRequestDTO {
  [key: string]: string | number | undefined;
  nickname?: string;
  ip?: string;
  userName?: string;
  operation?: string;
  createTime?: string;
  pageNum: number;
  pageSize: number;
}

/**
 * 查找日志
 * @param {string} logGetRequestDTO
 * @returns
 */
export function findLogs(logGetRequestDTO: LogGetRequestDTO) {
  let url = `${base}?`;
  Object.keys(logGetRequestDTO).forEach((key) => {
    if (logGetRequestDTO[key] !== '') {
      url += `${key}=${encodeURIComponent(logGetRequestDTO[key] as string)}&`;
    }
  });
  // 移除最后一个&符号
  url = url.slice(0, -1);
  return axios.get<listData<LogRecord>>(url);
}
