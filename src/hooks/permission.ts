import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';
import { PermissionType } from '@/store/modules/app/types';

export default function usePermission() {
  const userStore = useUserStore();
  return {
    /**
     * 根据用户的角色判断用户是否能访问某个路由
     * @param route
     */
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.requiresPerm ||
        !route.meta?.permission ||
        route.meta?.permission.length === 0 ||
        userStore.permissions.includes(route.meta?.permission as PermissionType)
      );
    },
    /**
     * 根据用户角色信息返回用户能够访问的第一个路由
     * @param _routers
     * @param role
     */
    findFirstPermissionRouteByRole(_routers: any, role = 'admin') {
      const cloneRouters = [..._routers];
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift();
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role);
          })
        )
          return { name: firstElement.name };
        // 如果该路由有子路由，将该子路由展开 并 放入待遍历数组内部
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children);
        }
      }
      return null;
    },
    // You can add any rules you want
    findFirstPermissionRouteByPerm(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _routers: any,
      permission: PermissionType[]
    ) {
      const cloneRouters = [..._routers];
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift();
        // if (
        //   firstElement?.meta?.permission?.find((el: PermissionType) => {
        //     return permission.includes(el);
        //   })
        // )
        //   return { name: firstElement.name };
        if (
          firstElement?.meta?.permission ||
          permission.includes(firstElement?.meta?.permission)
        )
          return { name: firstElement.name };
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children);
        }
      }
      return null;
    },
  };
}
