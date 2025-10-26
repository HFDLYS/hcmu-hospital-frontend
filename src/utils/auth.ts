const TOKEN_KEY = 'Authorization';
const USER_KEY = 'UserId';

/**
 * 强制将token值转换为布尔类型，以判断是否存在token
 */
const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const getUserId = () => {
  return Number(localStorage.getItem(USER_KEY));
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const setUserId = (userId: number) => {
  localStorage.setItem(USER_KEY, userId.toString());
};

const clearToken = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken, getUserId, setUserId };
