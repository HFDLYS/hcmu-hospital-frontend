import { DEFAULT_LAYOUT } from '@/router/routes/base';
import { AppRouteRecordRaw } from '../types';

const LOGPAGE: AppRouteRecordRaw = {
  path: '/log',
  name: 'Log',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.logPage',
    requiresPerm: true,
    permission: 'LOG_PAGE',
    icon: 'icon-storage',
    order: 7,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'log-page',
      name: 'LogPage',
      component: () => import('@/views/logPage/log-page/index.vue'),
      meta: {
        locale: 'menu.logPage',
        requiresPerm: true,
        permission: 'LOG_PAGE',
      },
    },
  ],
  redirect: '/log/log-page',
};

export default LOGPAGE;
