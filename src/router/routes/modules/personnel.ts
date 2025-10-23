import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PERSONNEL: AppRouteRecordRaw = {
  path: '/personnel',
  name: 'Personnel',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.personnel',
    requiresAuth: true,
    icon: 'icon-user-group',
    order: 2,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'management',
      name: 'PersonnelManagement',
      component: () => import('@/views/personnel/index.vue'),
      meta: {
        locale: 'menu.personnel',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
  redirect: '/personnel/management',
};

export default PERSONNEL;
