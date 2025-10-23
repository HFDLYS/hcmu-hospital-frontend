// 登录参数接口
import axios from 'axios';

const base = '/auth';

export interface LoginParams {
  userAccount?: string;
  password?: string;
}

// 兼容旧的 LoginData 类型名称
export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
  userId: number;
}

export interface RegisterParams {
  userAccount: string;
  password: string;
  userName: string;
  checkPassword: string;
  phone?: string;
  email: string;
}

export interface VerifyRegisterParams {
  code?: string;
  email: string;
}

export interface ResetPasswordParams {
  email: string;
  password: string;
  checkPassword: string;
  code: string;
}

export interface GetResetPasswordCodeParams {
  code?: string;
  email: string;
}

// 登录
export function login(data: LoginParams) {
  return axios.post<LoginRes>(`${base}/login`, data);
}

// 退出
export function logout(userId: number) {
  return axios.post<LoginRes>(`${base}/logout/${userId}`);
}

/**
 * 用户发起注册
 * @param {object} params UserRegisterDTO
 * @param {string} params.userAccount
 * @param {string} params.password
 * @param {string} params.checkPassword
 * @param {string} params.userName
 * @param {string} params.phone
 * @param {string} params.email
 * @param {string} params.code
 * @returns
 */
export function sendRegisterCode(params: RegisterParams) {
  return axios.post(`${base}/register`, params);
}

/**
 * 用户注册验证
 * @param {object} params UserEmailVerifyDTO
 * @param {number} params.code
 * @param {string} params.email
 * @returns
 */
export function verifyRegister(params: VerifyRegisterParams) {
  return axios.post(`${base}/register/verify`, params);
}

/**
 * 用户忘记密码申请重置
 * @param {object} params UserEmailVerifyDTO
 * @param {string} params.code
 * @param {string} params.email
 * @returns
 */
export function getResetPasswordCode(params: GetResetPasswordCodeParams) {
  return axios.post(`${base}/password`, params);
}

/**
 * 用户申请重置密码验证
 * @param {object} params UserResetPasswordDTO
 * @param {string} params.email
 * @param {string} params.password
 * @param {string} params.checkPassword
 * @param {string} params.code
 * @returns
 */
export function resetPassword(params: ResetPasswordParams) {
  return axios.post(`${base}/password/verify`, params);
}
