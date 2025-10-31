import type { RouteRecordNormalized } from 'vue-router';

export interface AppState {
  theme: string;
  colorWeak: boolean;
  navbar: boolean;
  menu: boolean;
  topMenu: boolean;
  hideMenu: boolean;
  menuCollapse: boolean;
  footer: boolean;
  themeColor: string;
  menuWidth: number;
  globalSettings: boolean;
  device: string;
  tabBar: boolean;
  menuFromServer: boolean;
  serverMenu: RouteRecordNormalized[];
  [key: string]: unknown;
}

// 完善权限列表
export type PermissionType =
  | 'PERSON_MG_PAGE'
  | 'ADD_MB'
  | 'DEL_MB'
  | 'ALT_MB'
  | 'CHECK_MB'
  | 'GENERATE_CODE'
  | 'LOG_PAGE'
  | 'ANNOUN_MG_PAGE'
  | 'ADD_ANNOUN'
  | 'ALT_ANNOUN'
  | 'DEL_ANNOUN'
  | 'EXCHANGE_PAGE'
  | 'ADD_RWD'
  | 'ALT_RWD'
  | 'DEL_RWD'
  | 'VERIFY_EXCHANGE'
  | 'EXCHANGE'
  | 'SELF_INFO_PAGE'
  | 'PROJ_CENTER_PAGE'
  | 'ADD_PROJ'
  | 'CHECK_PROJ_LIST'
  | 'CHECK_PROJ_INFO'
  | 'DEL_PROJ'
  | 'ALT_PROJ'
  | 'ALT_PROJ_DIVISION'
  | 'ADD_TASK'
  | 'DEL_TASK'
  | 'ALT_TASK'
  | 'CHECK_TASK_LIST'
  | 'CHECK_TASK_INFO'
  | 'URGE_TASK'
  | 'UPDATE_FILE'
  | 'VERIFY_FILE'
  | 'BRAN_PAGE'
  | 'ADD_BRAN'
  | 'CHECK_BRAN_PROJ'
  | 'CHECK_BRAN_MB_INFO'
  | 'CHECK_JOIN_PROJ'
  | 'GIVE_SCORE'
  | 'BRAN_MB_MG'
  | 'DEL_BRAN'
  | 'MASTER_ROLE'
  | 'ALT_SCORE'
  | 'SCORE_JUDGE_PAGE'
  | 'ADD_FIELD'
  | 'DISPLAY_PAGE'
  | 'DEL_TASK_FILE'
  | 'RWD_FILE'
  | 'MANUAL_MG'
  | 'DEPART_MG_PAGE'
  | 'ADD_DEPART'
  | 'DEL_DEPART'
  | 'ALT_DEPART'
  | 'CHECK_DEPART'
  | 'ADD_DOCTOR'
  | 'ALT_DOCTOR'
  | 'DEL_DOCTOR';

// eslint-disable-next-line no-shadow
export enum RoleType {
  SYSTEM_TYPE = 1,
  PROJECT_TYPE = 2,
  BRANCH_TYPE = 3,
}
