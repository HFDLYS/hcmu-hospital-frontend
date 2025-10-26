import { PermissionVerify } from '@/types/global';
import { useUserStore } from '@/store';

export function checkSimplePerm(value: PermissionVerify): boolean {
  const { permissionsTarget } = value;
  const userStore = useUserStore();
  const { permissions } = userStore;

  if (permissionsTarget.length > 0) {
    const hasPermission = permissionsTarget.every((permission) => {
      return permissions.includes(permission);
    });
    return hasPermission;
  }
  return false;
}

export function checkInnerPerm(value: PermissionVerify): boolean {
  const { permissions, permissionsTarget } = value;

  if (
    permissionsTarget.length > 0 &&
    permissions !== undefined &&
    permissions.length > 0
  ) {
    const hasPermission = permissionsTarget.every((p) => {
      return permissions.includes(p);
    });
    return hasPermission;
  }
  return false;
}

export function checkOrPerm(value: PermissionVerify): boolean {
  const { permissions, permissionsTarget } = value;

  if (
    permissionsTarget.length > 0 &&
    permissions !== undefined &&
    permissions.length > 0
  ) {
    const lacksPermission = permissionsTarget.every((p) => {
      return !permissions.includes(p);
    });
    return !lacksPermission;
  }
  return false;
}
