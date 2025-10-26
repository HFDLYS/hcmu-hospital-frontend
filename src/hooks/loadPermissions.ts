import { findBranchPermissionBySelf } from '@/api/branch';
import { useUserStore } from '@/store';
import { PermissionType } from '@/store/modules/app/types';

function mergePermissions(
  permissionsFromApi: PermissionType[],
  sysPermissions: PermissionType[]
): PermissionType[] {
  const combinedPermissions = [...permissionsFromApi, ...sysPermissions];
  const uniquePermissions = Array.from(new Set(combinedPermissions));
  return uniquePermissions;
}

export default async function loadBranchPermissions(
  branchId: number
): Promise<PermissionType[]> {
  const sysPermission = useUserStore().permissions as PermissionType[];

  return findBranchPermissionBySelf(branchId)
    .then((res) => {
      const branchPermissions = res.data as PermissionType[];
      const finalPermissions = mergePermissions(
        branchPermissions,
        sysPermission
      );
      return finalPermissions;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
}
