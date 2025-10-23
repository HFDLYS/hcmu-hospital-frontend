import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';

import { MockParams } from '@/types/mock';

// 模拟角色数据库
const mockRoles = [
  {
    roleId: 1,
    roleName: '超级管理员',
    roleInfo: '拥有系统所有权限',
  },
  {
    roleId: 2,
    roleName: '医生',
    roleInfo: '可以查看和管理患者信息、开具处方',
  },
  {
    roleId: 3,
    roleName: '护士',
    roleInfo: '可以查看患者信息、执行医嘱',
  },
  {
    roleId: 4,
    roleName: '患者',
    roleInfo: '可以查看自己的就诊记录',
  },
  {
    roleId: 5,
    roleName: '药剂师',
    roleInfo: '可以管理药品库存、发放药品',
  },
];

// 模拟权限数据库
const mockPermissions = [
  { permissionId: 1, name: '用户管理' },
  { permissionId: 2, name: '角色管理' },
  { permissionId: 3, name: '患者信息查看' },
  { permissionId: 4, name: '患者信息编辑' },
  { permissionId: 5, name: '处方开具' },
  { permissionId: 6, name: '医嘱执行' },
  { permissionId: 7, name: '药品管理' },
  { permissionId: 8, name: '报表查看' },
  { permissionId: 9, name: '系统设置' },
  { permissionId: 10, name: '日志查看' },
];

// 模拟角色权限关联
const mockRolePermissions: Record<number, number[]> = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // 超级管理员拥有所有权限
  2: [3, 4, 5, 8], // 医生
  3: [3, 6, 8], // 护士
  4: [3], // 患者只能查看
  5: [7, 8], // 药剂师
};

setupMock({
  setup() {
    // 获取所有角色
    Mock.mock(new RegExp('/roles\\?'), (params: MockParams) => {
      const urlParams = new URLSearchParams(params.url.split('?')[1]);
      const roleId = urlParams.get('roleId');
      const roleName = urlParams.get('roleName');

      const filteredRoles = mockRoles.filter((role) => {
        if (roleId && role.roleId !== Number(roleId)) return false;
        if (roleName && !role.roleName.includes(roleName)) return false;
        return true;
      });

      return successResponseWrap(filteredRoles);
    });

    // 获取所有权限
    Mock.mock(new RegExp('/roles/permissions$'), () => {
      return successResponseWrap(mockPermissions);
    });

    // 获取角色权限
    Mock.mock(new RegExp('/roles/\\d+/permissions$'), (params: MockParams) => {
      const roleId = Number(params.url.match(/\/roles\/(\d+)/)?.[1]);
      const permissionIds = mockRolePermissions[roleId] || [];
      const permissions = mockPermissions.filter((p) =>
        permissionIds.includes(p.permissionId)
      );

      return successResponseWrap(permissions);
    });

    // 更新角色权限
    Mock.mock(
      new RegExp('/roles/\\d+/permissions$'),
      'put',
      (params: MockParams) => {
        const roleId = Number(params.url.match(/\/roles\/(\d+)/)?.[1]);
        const permissionUpdates = JSON.parse(params.body);

        // 更新权限关联（简化处理）
        const currentPermissions = mockRolePermissions[roleId] || [];
        permissionUpdates.forEach(
          (update: { permissionId: number; isOwn: number }) => {
            const index = currentPermissions.indexOf(update.permissionId);
            if (update.isOwn === 1 && index === -1) {
              currentPermissions.push(update.permissionId);
            } else if (update.isOwn === 0 && index !== -1) {
              currentPermissions.splice(index, 1);
            }
          }
        );

        mockRolePermissions[roleId] = currentPermissions;
        return successResponseWrap('权限更新成功');
      }
    );

    // 创建角色
    Mock.mock(new RegExp('/roles$'), 'post', (params: MockParams) => {
      const { roleName, roleInfo, permissionList } = JSON.parse(params.body);

      if (!roleName || !roleInfo) {
        return failResponseWrap(null, '请填写完整信息', 50000);
      }

      const newRoleId = mockRoles.length + 1;
      const newRole = {
        roleId: newRoleId,
        roleName,
        roleInfo,
      };

      mockRoles.push(newRole);

      // 设置角色权限
      if (permissionList && permissionList.length > 0) {
        mockRolePermissions[newRoleId] = permissionList.map(
          (p: any) => p.permissionId
        );
      }

      return successResponseWrap(newRole);
    });

    // 更新角色信息
    Mock.mock(new RegExp('/roles/\\d+$'), 'put', (params: MockParams) => {
      const roleId = Number(params.url.match(/\/roles\/(\d+)$/)?.[1]);
      const { roleName, roleInfo } = JSON.parse(params.body);
      const roleIndex = mockRoles.findIndex((r) => r.roleId === roleId);

      if (roleIndex !== -1) {
        mockRoles[roleIndex] = {
          ...mockRoles[roleIndex],
          roleName,
          roleInfo,
        };
        return successResponseWrap(mockRoles[roleIndex]);
      }

      return failResponseWrap(null, '角色不存在', 50000);
    });

    // 删除角色
    Mock.mock(new RegExp('/roles/\\d+$'), 'delete', (params: MockParams) => {
      const roleId = Number(params.url.match(/\/roles\/(\d+)$/)?.[1]);
      const roleIndex = mockRoles.findIndex((r) => r.roleId === roleId);

      if (roleIndex !== -1) {
        // 删除角色
        mockRoles.splice(roleIndex, 1);
        // 删除角色权限关联
        delete mockRolePermissions[roleId];
        return successResponseWrap('删除成功');
      }

      return failResponseWrap(null, '角色不存在', 50000);
    });

    // 上传角色操作手册
    Mock.mock(new RegExp('/roles/\\d+/manuals'), 'post', () => {
      return successResponseWrap({
        message: '操作手册上传成功',
        url: '/mock/manual.pdf',
      });
    });
  },
});
