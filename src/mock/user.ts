import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';

import { MockParams } from '@/types/mock';
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

          phone: '15014615219',

          userName: '',
          userId: 0,
        });
      }
      return failResponseWrap(null, '未登录', 401);
    });

    // 登录
    Mock.mock(new RegExp('/auth/login'), (params: MockParams) => {
      const { userName, password } = JSON.parse(params.body);
      if (!userName) {
        return failResponseWrap(null, '用户名不能为空', 500);
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 500);
      }
      return successResponseWrap({
        token: '123456789',
        userId: '17',
      });
    });

    Mock.mock(new RegExp('/users/permissions'), () => {
      return successResponseWrap([
        'SELF_INFO_PAGE',
        'ANNOUN_MG_PAGE',
        'PROJ_MG_PAGE',
        'BRAN_MG_PAGE',
        'EXCHANGE_PAGE',
        'LOG_PAGE',
        'PERSON_MG_PAGE',
        'MASTER_ROLE',
      ]);
    });

    // 登出
    // Mock.mock(new RegExp('/api/user/logout'), () => {
    //   return successResponseWrap(null);
    // });
    //
    // // 用户的服务端菜单
    // Mock.mock(new RegExp('/api/user/menu'), () => {
    //   const menuList = [
    //     {
    //       path: '/dashboard',
    //       name: 'dashboard',
    //       meta: {
    //         locale: 'menu.server.dashboard',
    //         requiresAuth: true,
    //         icon: 'icon-dashboard',
    //         order: 1,
    //       },
    //       children: [
    //         {
    //           path: 'workplace',
    //           name: 'Workplace',
    //           meta: {
    //             locale: 'menu.server.workplace',
    //             requiresAuth: true,
    //           },
    //         },
    //         {
    //           path: 'https://arco.design',
    //           name: 'arcoWebsite',
    //           meta: {
    //             locale: 'menu.arcoWebsite',
    //             requiresAuth: true,
    //           },
    //         },
    //       ],
    //     },
    //   ];
    //   return successResponseWrap(menuList);
    // });
  },
});
