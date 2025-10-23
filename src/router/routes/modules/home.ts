import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const HOME: AppRouteRecordRaw = {
  path: '/home',
  name: 'home',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.home',
    requiresAuth: true,
    icon: 'icon-home',
    order: 0,
    hideInMenu: true, // 隐藏在菜单中
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/home/index.vue'),
      meta: {
        locale: 'menu.home.workplace',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true, // 隐藏在菜单中
      },
    },
  ],
};

export default HOME;
