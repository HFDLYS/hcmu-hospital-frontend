import axios from 'axios';
import { getToken } from '@/utils/auth';

const base = `${import.meta.env.VITE_API_BASE_URL}`;

export async function getPreviewFile(path: string) {
  const token = getToken();
  const headers = new Headers();

  if (token) {
    headers.append('Authorization', token);
  }

  return fetch(path, {
    method: 'GET',
    headers,
  }).then((res) => {
    return res.arrayBuffer();
  });
}

/**
 * 获取角色的操作手册
 * @param projectId
 */
export function getRoleManual(roleId: number) {
  return `${base}/roles/${roleId}/manuals`;
}

/**
 * 获取项目预览
 * @param projectId
 */
export async function getProjectPreview(projectId: number) {
  return axios.get(`${base}/projects/${projectId}/previews`);
}

//
// /**
//  * 获取角色的操作手册
//  * @param projectId
//  */
// export async function getRoleManual(roleId: number) {
//   return getPreviewFile(`${base}/roles/${roleId}/manuals`);
// }
//
