import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';

import { MockParams } from '@/types/mock';
import { isLogin } from '@/utils/auth';

// 模拟用户数据库
const mockUsers = [
  {
    userId: 1,
    userAccount: 'admin',
    userName: '系统管理员',
    roleId: '1',
    roleName: '超级管理员',
    phone: '138****8888',
    email: 'admin@hcmu.edu.cn',
    sex: '男',
    age: 35,
    info: '哈基米大学校医院系统管理员',
  },
  {
    userId: 2,
    userAccount: 'doctor01',
    userName: '张医生',
    roleId: '2',
    roleName: '医生',
    phone: '139****6666',
    email: 'zhangdoc@hcmu.edu.cn',
    sex: '男',
    age: 42,
    info: '内科主任医师',
  },
  {
    userId: 3,
    userAccount: 'nurse01',
    userName: '李护士',
    roleId: '3',
    roleName: '护士',
    phone: '136****5555',
    email: 'linurse@hcmu.edu.cn',
    sex: '女',
    age: 28,
    info: '护理部护士',
  },
  {
    userId: 4,
    userAccount: 'patient01',
    userName: '王同学',
    roleId: '4',
    roleName: '患者',
    phone: '137****4444',
    email: 'wangstu@hcmu.edu.cn',
    sex: '男',
    age: 20,
    info: '计算机系学生',
  },
  {
    userId: 5,
    userAccount: 'doctor02',
    userName: '赵医生',
    roleId: '2',
    roleName: '医生',
    phone: '135****3333',
    email: 'zhaodoc@hcmu.edu.cn',
    sex: '女',
    age: 38,
    info: '外科副主任医师',
  },
];

setupMock({
  setup() {
    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), () => {
      if (isLogin()) {
        const userId = window.localStorage.getItem('userId') || '1';
        const role = window.localStorage.getItem('userRole') || 'admin';
        const user =
          mockUsers.find((u) => u.userId === Number(userId)) || mockUsers[0];

        return successResponseWrap({
          userId: user.userId,
          name: user.userName,
          avatar: '/src/assets/admin.png',
          email: user.email,
          phone: user.phone,
          accountId: user.userAccount,
          role,
        });
      }
      return failResponseWrap(null, '未登录', 50008);
    });

    // 用户的服务端菜单
    Mock.mock(new RegExp('/api/user/menu'), () => {
      const menuList = [
        {
          path: '/home',
          name: 'home',
          meta: {
            locale: 'menu.server.home',
            requiresAuth: true,
            icon: 'icon-home',
            order: 1,
          },
        },
        {
          path: '/personnel',
          name: 'personnel',
          meta: {
            locale: 'menu.server.personnel',
            requiresAuth: true,
            icon: 'icon-user-group',
            order: 2,
          },
        },
        {
          path: '/permission',
          name: 'permission',
          meta: {
            locale: 'menu.server.permission',
            requiresAuth: true,
            icon: 'icon-safe',
            order: 3,
          },
        },
      ];
      return successResponseWrap(menuList);
    });

    // 获取所有用户（人事管理）
    Mock.mock(new RegExp('/users\\?'), (params: MockParams) => {
      const urlParams = new URLSearchParams(params.url.split('?')[1]);
      const userAccount = urlParams.get('userAccount') || '';
      const userName = urlParams.get('userName') || '';
      const roleName = urlParams.get('roleName') || '';
      const pageNum = Number(urlParams.get('pageNum')) || 1;
      const pageSize = Number(urlParams.get('pageSize')) || 10;

      // 过滤用户
      const filteredUsers = mockUsers.filter((user) => {
        if (userAccount && !user.userAccount.includes(userAccount))
          return false;
        if (userName && !user.userName.includes(userName)) return false;
        if (roleName && !user.roleName.includes(roleName)) return false;
        return true;
      });

      // 分页
      const start = (pageNum - 1) * pageSize;
      const end = start + pageSize;
      const list = filteredUsers.slice(start, end);

      return successResponseWrap({
        list,
        total: filteredUsers.length,
      });
    });

    // 根据ID获取用户信息
    Mock.mock(new RegExp('/users/\\d+$'), (params: MockParams) => {
      const userId = Number(params.url.match(/\/users\/(\d+)$/)?.[1]);
      const user = mockUsers.find((u) => u.userId === userId);

      if (user) {
        return successResponseWrap(user);
      }
      return failResponseWrap(null, '用户不存在', 50000);
    });

    // 更新用户信息
    Mock.mock(new RegExp('/users/\\d+$'), 'put', (params: MockParams) => {
      const userId = Number(params.url.match(/\/users\/(\d+)$/)?.[1]);
      const updateData = JSON.parse(params.body);
      const userIndex = mockUsers.findIndex((u) => u.userId === userId);

      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...updateData };
        return successResponseWrap(mockUsers[userIndex]);
      }
      return failResponseWrap(null, '用户不存在', 50000);
    });

    // 获取用户字段信息
    Mock.mock(new RegExp('/users/\\d+/fields'), (params: MockParams) => {
      const userId = Number(params.url.match(/\/users\/(\d+)/)?.[1]);
      const user = mockUsers.find((u) => u.userId === userId);

      if (user) {
        return successResponseWrap([
          { fieldId: 1, fieldName: '部门', value: '校医院' },
          { fieldId: 2, fieldName: '职称', value: user.info },
          {
            fieldId: 3,
            fieldName: '工号',
            value: `HCM${String(userId).padStart(4, '0')}`,
          },
        ]);
      }
      return failResponseWrap(null, '用户不存在', 50000);
    });

    // 更新用户字段
    Mock.mock(new RegExp('/users/\\d+/fields/\\d+'), 'put', () => {
      return successResponseWrap({ message: '更新成功' });
    });

    // 更新用户角色
    Mock.mock(new RegExp('/users/\\d+/role'), 'put', (params: MockParams) => {
      const userId = Number(params.url.match(/\/users\/(\d+)/)?.[1]);
      const { roleId } = JSON.parse(params.body);
      const userIndex = mockUsers.findIndex((u) => u.userId === userId);

      if (userIndex !== -1) {
        // 这里简化处理，实际应该从角色表获取角色名
        const roleNames: Record<string, string> = {
          '1': '超级管理员',
          '2': '医生',
          '3': '护士',
          '4': '患者',
        };
        mockUsers[userIndex].roleId = String(roleId);
        mockUsers[userIndex].roleName = roleNames[String(roleId)] || '未知角色';
        return successResponseWrap({ message: '角色更新成功' });
      }
      return failResponseWrap(null, '用户不存在', 50000);
    });

    // 修改密码
    Mock.mock(new RegExp('/users/password'), 'post', (params: MockParams) => {
      const { oldPassword, newPassword, checkPassword } = JSON.parse(
        params.body
      );

      if (!oldPassword || !newPassword || !checkPassword) {
        return failResponseWrap(null, '请填写完整信息', 50000);
      }

      if (newPassword !== checkPassword) {
        return failResponseWrap(null, '两次密码不一致', 50000);
      }

      return successResponseWrap({ message: '密码修改成功' });
    });

    // 申请绑定邮箱
    Mock.mock(new RegExp('/users/email$'), 'post', (params: MockParams) => {
      const { email } = JSON.parse(params.body);

      if (!email) {
        return failResponseWrap(null, '请输入邮箱', 50000);
      }

      return successResponseWrap({ message: '验证码已发送至邮箱' });
    });

    // 验证邮箱
    Mock.mock(
      new RegExp('/users/email/verify'),
      'post',
      (params: MockParams) => {
        const { email, code } = JSON.parse(params.body);

        if (!email || !code) {
          return failResponseWrap(null, '请输入邮箱和验证码', 50000);
        }

        if (code === '123456') {
          return successResponseWrap({ message: '邮箱绑定成功' });
        }

        return failResponseWrap(null, '验证码错误', 50000);
      }
    );
  },
});
