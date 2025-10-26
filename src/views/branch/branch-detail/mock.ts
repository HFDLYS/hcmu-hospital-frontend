import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

setupMock({
  mock: false,
  setup: () => {
    // Quality Inspection
    Mock.mock(
      new RegExp('/branches/\\d+/users\\?pageNum=\\d+&pageSize=\\d+'),
      'get',
      (options) => {
        const matches = options.url.match(
          /\/branches\/(\d+)\/users\?pageNum=(\d+)&pageSize=(\d+)/
        );
        if (!matches) {
          return {
            code: 404,
            message: 'Not Found',
            data: null,
          };
        }

        const data = Mock.mock({
          'list|20': [
            {
              'userId|+1': 1,
              'nickname': '@cname',
              'userName': '@word(5, 10)',
            },
          ],
          'total|40-60': 1,
        });

        return successResponseWrap({ list: data.list, total: data.total });
      }
    );

    // `/branches/${branchId}/users/permissions`
    Mock.mock(
      new RegExp('/branches/\\d+/users/permissions'),
      'get',
      (options) => {
        return successResponseWrap([
          'SELF_INFO_PAGE',
          'ANNOUN_MG_PAGE',
          'PROJ_MG_PAGE',
          'BRAN_MG_PAGE',
          'EXCHANGE_PAGE',
          'LOG_PAGE',
          'PERSON_MG_PAGE',
          'MASTER_ROLE',
          'ADD_MB',
        ]);
      }
    );
  },
});
