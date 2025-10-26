import { DEFAULT_LAYOUT } from '@/router/routes/base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.system',
    requiresPerm: false,
    icon: 'icon-settings',
    order: 8,
  },
  children: [
    {
      path: 'role-page',
      name: 'RolePage',
      component: () => import('@/views/system/role-page/index.vue'),
      meta: {
        locale: 'menu.system.rolePage',
        requiresPerm: true,
        permission: 'MASTER_ROLE',
      },
    },
  ],
};

export default SYSTEM;
