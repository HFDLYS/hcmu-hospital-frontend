import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

setupMock({
  mock: false,
  setup() {
    Mock.mock(new RegExp('/roles/permissions'), 'get', () => {
      const data = Mock.mock({
        'data|25-35': [
          {
            'permissionId|+1': 1,
            'name': '@cname',
            'type': '@pick([1, 2, 3])',
          },
        ],
      });
      return successResponseWrap(data.data);
    });

    Mock.mock(new RegExp('/roles/[1-9]\\d*/permissions'), 'get', () => {
      const data = Mock.mock({
        'data|5': [
          {
            'permissionId|+1': 1,
            'name': '@cname',
            'type': '@pick([1, 2, 3])',
          },
        ],
      });
      return successResponseWrap(data.data);
    });

    Mock.mock(new RegExp('/roles/[1-9]\\d*/permissions'), 'put', () => {
      const data = Mock.mock({
        'data|1': ['修改成功!'],
      });
      return successResponseWrap(data.data);
    });

    Mock.mock(new RegExp('/roles/[1-9]\\d*'), 'delete', () => {
      const data = Mock.mock({
        'data|1': ['删除成功!'],
      });
      return successResponseWrap(data.data);
    });

    Mock.mock(new RegExp('/roles/'), 'post', () => {
      const data = Mock.mock({
        'data|1': [
          {
            'roleId|+1': 1,
            'roleName': '@cname',
            'roleInfo': '@csentence(2,5)',
            'type': '@pick([1, 2, 3])',
          },
        ],
      });
      return successResponseWrap(data.data);
    });

    Mock.mock(new RegExp('/roles/'), 'get', () => {
      const data = Mock.mock({
        'data|15-20': [
          {
            'roleId|+1': 1,
            'roleName': '@cname',
            'roleInfo': '@csentence(2,5)',
            'type': '@pick([1, 2, 3])',
          },
        ],
      });
      return successResponseWrap(data.data);
    });
  },
});
