import localeMessageBox from '@/components/message-box/locale/en-US';
import localeListBoard from '@/components/list-board/locale/en-US';

import localeLogin from '@/views/login/locale/en-US';
import localeBranch from '@/views/branch/locale/en-US';
import localePersonal from '@/views/personal/locale/en-US';
import localeLogPage from '@/views/logPage/log-page/locale/en-US';

import localePersonnel from '@/views/personnel/locale/en-US';
import localeSystem from '@/views/system/locale/en-US';
import localeState from '@/utils/state/locale/en-US';
import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',

  'menu.announcement': 'Announcement center',
  'menu.personal': 'Personal center',
  'menu.personnel': 'Personnel center',
  'menu.score': 'Score center',
  'menu.logPage': 'System logs',
  'menu.project': 'Project center',
  'menu.branch': 'Branch center',
  'menu.competition': 'Contest center',
  'menu.system': 'System Management',
  'menu.system.departmentPage': 'Department Management',
  'menu.system.importPage': 'User Import',
  'menu.system.personnelPage': 'Personnel Management',
  'menu.system.logPage': 'System Logs',
  'menu.system.doctorProfilePage': 'Doctor Profile Management',
  'menu.display': 'Project display',
  'menu.about': 'About',

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
