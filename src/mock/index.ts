import Mock from 'mockjs';

import './user';
import './message-box';

import '@/views/system/role-page/mock';
import '@/views/personal/personal-page/mock';
import '@/views/login/mock';
import '@/views/branch/branch-detail/mock';

Mock.setup({
  timeout: '600-1000',
});
