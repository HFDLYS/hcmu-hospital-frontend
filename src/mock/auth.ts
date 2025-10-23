import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';

import { MockParams } from '@/types/mock';

setupMock({
  setup() {
    // 登录 - 支持 username 和 userAccount 两种参数
    Mock.mock(new RegExp('/auth/login'), (params: MockParams) => {
      const { userAccount, username, password } = JSON.parse(params.body);
      const account = userAccount || username;

      if (!account) {
        return failResponseWrap(null, '用户名不能为空', 50000);
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000);
      }

      // 模拟医院系统的多个角色用户
      if (account === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', 'admin');
        window.localStorage.setItem('userId', '1');
        return successResponseWrap({
          token: 'mock-token-admin-12345',
          userId: 1,
        });
      }

      if (account === 'doctor' && password === 'doctor') {
        window.localStorage.setItem('userRole', 'doctor');
        window.localStorage.setItem('userId', '2');
        return successResponseWrap({
          token: 'mock-token-doctor-54321',
          userId: 2,
        });
      }

      if (account === 'nurse' && password === 'nurse') {
        window.localStorage.setItem('userRole', 'nurse');
        window.localStorage.setItem('userId', '3');
        return successResponseWrap({
          token: 'mock-token-nurse-98765',
          userId: 3,
        });
      }

      if (account === 'patient' && password === 'patient') {
        window.localStorage.setItem('userRole', 'patient');
        window.localStorage.setItem('userId', '4');
        return successResponseWrap({
          token: 'mock-token-patient-11111',
          userId: 4,
        });
      }

      return failResponseWrap(null, '账号或者密码错误', 50000);
    });

    // 登出
    Mock.mock(new RegExp('/auth/logout/\\d+'), () => {
      window.localStorage.removeItem('userRole');
      window.localStorage.removeItem('userId');
      return successResponseWrap(null);
    });

    // 发送注册验证码
    Mock.mock(new RegExp('/auth/register$'), (params: MockParams) => {
      const { userAccount, email, password, checkPassword, userName } =
        JSON.parse(params.body);

      if (!userAccount || !email || !password || !checkPassword || !userName) {
        return failResponseWrap(null, '请填写完整信息', 50000);
      }

      if (password !== checkPassword) {
        return failResponseWrap(null, '两次密码不一致', 50000);
      }

      // 模拟发送验证码成功
      return successResponseWrap({
        message: '验证码已发送至邮箱',
      });
    });

    // 验证注册
    Mock.mock(new RegExp('/auth/register/verify'), (params: MockParams) => {
      const { email, code } = JSON.parse(params.body);

      if (!email || !code) {
        return failResponseWrap(null, '请输入邮箱和验证码', 50000);
      }

      // 模拟验证码为 123456
      if (code === '123456') {
        return successResponseWrap({
          message: '注册成功',
        });
      }

      return failResponseWrap(null, '验证码错误', 50000);
    });

    // 忘记密码 - 获取重置密码验证码
    Mock.mock(new RegExp('/auth/password$'), (params: MockParams) => {
      const { email } = JSON.parse(params.body);

      if (!email) {
        return failResponseWrap(null, '请输入邮箱', 50000);
      }

      return successResponseWrap({
        message: '验证码已发送至邮箱',
      });
    });

    // 重置密码验证
    Mock.mock(new RegExp('/auth/password/verify'), (params: MockParams) => {
      const { email, code, password, checkPassword } = JSON.parse(params.body);

      if (!email || !code || !password || !checkPassword) {
        return failResponseWrap(null, '请填写完整信息', 50000);
      }

      if (password !== checkPassword) {
        return failResponseWrap(null, '两次密码不一致', 50000);
      }

      // 模拟验证码为 123456
      if (code === '123456') {
        return successResponseWrap({
          message: '密码重置成功',
        });
      }

      return failResponseWrap(null, '验证码错误', 50000);
    });
  },
});
