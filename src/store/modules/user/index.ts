import { defineStore } from 'pinia';
import { getUserById as getUserInfo, getPermissions } from '@/api/user';
import {
  login as userLogin,
  logout as userLogout,
  LoginParams,
} from '@/api/auth';
import { setToken, clearToken, getUserId, setUserId } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import adminAvatar from '@/assets/admin.png';
import { UserState } from './types';
import useAppStore from '../app';
import useTabBarStore from '../tab-bar';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userName: '',
    userId: 0,
    roleId: 0,
    roleName: '',
    nickname: '',
    name: '',
    // TODO: 处理用户头像
    avatar: adminAvatar,
    job: undefined,
    email: undefined,
    phone: undefined,
    sex: undefined,
    age: undefined,
    branchName: undefined,
    branchId: undefined,

    permissions: [],
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    isSelf(userId: number): boolean {
      return this.userId === userId;
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const userId = getUserId();
      // 获得基本信息
      const basicInfo = await getUserInfo(userId);
      const sysPerm = await getPermissions();
      this.setInfo({ ...basicInfo.data, permissions: sysPerm.data });
    },

    // Login
    async login(loginForm: LoginParams) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
        setUserId(res.data.userId);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      const tabBarStore = useTabBarStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
      tabBarStore.resetTabList();
    },
    // Logout
    async logout() {
      try {
        await userLogout(getUserId());
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
