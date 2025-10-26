import { DEFAULT_LAYOUT } from '@/router/routes/base';
import { AppRouteRecordRaw } from '../types';

const PERSONAL: AppRouteRecordRaw = {
  path: '/personal',
  name: 'Personal',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.personal',
    requiresPerm: false,
    icon: 'icon-user',
    order: 0,
  },
  children: [
    {
      path: 'personal-page',
      name: 'PersonalPage',
      component: () => import('@/views/personal/personal-page/index.vue'),
      meta: {
        locale: 'menu.personal.personalPage',
        requiresPerm: false,
      },
    },
    {
      path: 'setting-page',
      name: 'SettingPage',
      component: () => import('@/views/personal/setting-page/index.vue'),
      meta: {
        locale: 'menu.personal.setting',
        requiresPerm: false,
      },
    },
  ],
};

export default PERSONAL;
