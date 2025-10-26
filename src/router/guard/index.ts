import type { Router } from 'vue-router';
import { setRouteEmitter } from '@/utils/route-listener';
import setupUserLoginInfoGuard from './userLoginInfo';
import setupPermissionGuard from './permission';

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    // 在页面发生跳转之前 发出路由更改事件
    setRouteEmitter(to);
  });
}

export default function createRouteGuard(router: Router) {
  // 改变页面发出路由变化事件
  setupPageGuard(router);
  // 身份认证 守卫
  setupUserLoginInfoGuard(router);
  // 权限 守卫
  setupPermissionGuard(router);
}
