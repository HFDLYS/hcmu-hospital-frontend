import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PERMISSION: AppRouteRecordRaw = {
  path: '/permission',
  name: 'Permission',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.permission',
    requiresAuth: true,
    icon: 'icon-safe',
    order: 1,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'management',
      name: 'PermissionManagement',
      component: () => import('@/views/permission/index.vue'),
      meta: {
        locale: 'menu.permission',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
  redirect: '/permission/management',
};

export default PERMISSION;
