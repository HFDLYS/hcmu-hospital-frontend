import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeListBoard from '@/components/list-board/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeBranch from '@/views/branch/locale/zh-CN';
import localePersonal from '@/views/personal/locale/zh-CN';
import localePersonnel from '@/views/personnel/locale/zh-CN';
import localeLogPage from '@/views/logPage/log-page/locale/zh-CN';

import localeSystem from '@/views/system/locale/zh-CN';
import localeState from '@/utils/state/locale/zh-CN';
import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',

  'menu.announcement': '公告中心',
  'menu.personal': '个人中心',
  'menu.personnel': '人事管理',
  'menu.score': '积分管理中心',
  'menu.logPage': '系统日志',
  'menu.project': '项目中心',
  'menu.branch': '部门中心',
  'menu.competition': '比赛报名中心',
  'menu.system': '系统管理',
  'menu.system.rolePage': '角色管理',
  'menu.system.departmentPage': '科室管理',
  'menu.system.personnelPage': '人事管理',
  'menu.system.logPage': '系统日志',
  'menu.system.doctorProfilePage': '医生档案管理',
  'menu.display': '项目展示',
  'menu.about': '关于',

  ...localeSystem,
  ...localeState,
  ...localeSettings,
  ...localeMessageBox,
  ...localeListBoard,
  ...localeLogin,
  ...localeBranch,
  ...localePersonal,
  ...localePersonnel,
  ...localeLogPage,
};
