import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { useUserStore } from '@/store';
import { isLogin } from '@/utils/auth';

/**
 * 根据用户是否登录 设置身份认证守卫
 * @param router
 */
export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    if (isLogin() && to.name !== 'login') {
      // 如果有角色且权限列表不为空
      if (/* userStore.role && */ userStore.permissions?.length) {
        next();
      } else {
        // 登录但是没有角色信息和权限列表
        try {
          // 加载用户信息
          await userStore.info();
          next();
        } catch (error) {
          await userStore.logout();
          // 将用户重定向到登录页面，并保存用户尝试访问的 URL
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          });
        }
      }
    } else {
      // 没有登录
      if (to.name === 'login') {
        next();
        return;
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      });
    }
  });
}
