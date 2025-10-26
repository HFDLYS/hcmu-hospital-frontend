import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';

import { isLogin } from '@/utils/auth';

setupMock({
  mock: false,
  setup() {
    // Mock.XHR.prototype.withCredentials = true;

    Mock.mock(new RegExp(`/users/[1-9]\\d*`), () => {
      if (isLogin()) {
        // const role = window.localStorage.getItem('userRole') || 'admin';
        return successResponseWrap({
          name: '李志超',
          avatar:
            '//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
          email: '21301044@bjtu.edu.com',
          job: 'frontend',
          jobName: '前端工程师',
          organization: 'Frontend',
          organizationName: '前端',
          location: 'beijing',
          locationName: '北京',
          introduction: '我爱编程',
          personalWebsite: 'https://www.arco.design',
          phone: '15014615219',
          registrationDate: '2013-05-10 12:10:00',
          accountId: '15014615219',
          certification: 1,
        });
      }
      return failResponseWrap(null, '未登录', 401);
    });
  },
});
