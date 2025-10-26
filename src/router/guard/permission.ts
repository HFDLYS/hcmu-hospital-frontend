import type { Router, RouteRecordNormalized } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import usePermission from '@/hooks/permission';
import { useUserStore, useAppStore } from '@/store';
import { appRoutes } from '../routes';
import { WHITE_LIST, NOT_FOUND } from '../constants';

/**
 * 根据用户角色和路由配置设置权限守卫
 * @param router
 */
export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const appStore = useAppStore();
    const userStore = useUserStore();
    const Permission = usePermission();
    // 返回用户是否有权限访问当前路由
    const permissionsAllow = Permission.accessRouter(to);
    if (appStore.menuFromServer) {
      // 针对来自服务端的菜单配置进行处理
      // Handle routing configuration from the server

      // 根据需要自行完善来源于服务端的菜单配置的permission逻辑
      // Refine the permission logic from the server's menu configuration as needed
      if (
        !appStore.appAsyncMenus.length &&
        !WHITE_LIST.find((el) => el.name === to.name)
      ) {
        // 如果指定菜单来自服务器，但是服务器端还未传递菜单信息，并且当前路由不在白名单中，则从服务器获取菜单信息
        await appStore.fetchServerMenuConfig();
      }
      const serverMenuConfig = [...appStore.appAsyncMenus, ...WHITE_LIST];

      let exist = false;
      while (serverMenuConfig.length && !exist) {
        const element = serverMenuConfig.shift();
        if (element?.name === to.name) exist = true;

        if (element?.children) {
          serverMenuConfig.push(
            ...(element.children as unknown as RouteRecordNormalized[])
          );
        }
      }
      if (exist && permissionsAllow) {
        // 如果存在当前路由，并且有权限访问，则跳转到当前路由
        next();
      } else next(NOT_FOUND);
    } else {
      // 如果菜单不是由服务端传递
      // eslint-disable-next-line no-lonely-if
      if (permissionsAllow) next();
      else {
        // 如果没有权限访问当前路由，则跳转到第一个有权限的路由 或者 404
        const destination =
          Permission.findFirstPermissionRouteByPerm(
            appRoutes,
            userStore.permissions
          ) || NOT_FOUND;
        next(destination);
      }
    }
    NProgress.done();
  });
}
