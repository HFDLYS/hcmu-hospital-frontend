import { DEFAULT_LAYOUT } from '@/router/routes/base';
import { AppRouteRecordRaw } from '../types';

const PERSONNEL: AppRouteRecordRaw = {
  path: '/personnel',
  name: 'Personnel',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.personnel',
    requiresPerm: true,
    permission: 'PERSON_MG_PAGE',
    icon: 'icon-user-group',
    order: 1,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'personnel-page',
      name: 'PersonnelPage',
      component: () => import('@/views/personnel/personnel-page/index.vue'),
      meta: {
        locale: 'menu.personnel.personnelPage',
        requiresPerm: true,
        permission: 'PERSON_MG_PAGE',
      },
    },
  ],
  redirect: '/personnel/personnel-page',
};

export default PERSONNEL;
