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
    {
      path: 'department-page',
      name: 'DepartmentPage',
      component: () => import('@/views/system/department-page/index.vue'),
      meta: {
        locale: 'menu.system.departmentPage',
        requiresPerm: true,
        permission: 'DEPART_MG_PAGE',
      },
    },
    {
      path: 'personnel-page',
      name: 'PersonnelPage',
      component: () => import('@/views/personnel/personnel-page/index.vue'),
      meta: {
        locale: 'menu.system.personnelPage',
        requiresPerm: true,
        permission: 'PERSON_MG_PAGE',
      },
    },
    {
      path: 'log-page',
      name: 'LogPage',
      component: () => import('@/views/logPage/log-page/index.vue'),
      meta: {
        locale: 'menu.system.logPage',
        requiresPerm: true,
        permission: 'LOG_PAGE',
      },
    },
    // 医生档案管理页面 - 暂时注释，等待创建
    // {
    //   path: 'doctor-profile-page',
    //   name: 'DoctorProfilePage',
    //   component: () => import('@/views/system/doctor-profile-page/index.vue'),
    //   meta: {
    //     locale: 'menu.system.doctorProfilePage',
    //     requiresPerm: true,
    //     permission: 'ADD_DOCTOR',
    //   },
    // },
  ],
};

export default SYSTEM;
