import { computed } from 'vue';
import { RouteRecordRaw, RouteRecordNormalized } from 'vue-router';
import usePermission from '@/hooks/permission';
import { useAppStore } from '@/store';
import appClientMenus from '@/router/app-menus';
import { cloneDeep } from 'lodash';

export default function useMenuTree() {
  const permission = usePermission();
  const appStore = useAppStore();

  const appRoute = computed(() => {
    // 首先判断服务器有没有传来菜单项数组信息
    if (appStore.menuFromServer) {
      // 服务器有传来菜单信息就使用服务器传来的菜单项数组
      return appStore.appAsyncMenus;
    }
    // 服务器没有传appClientMenus来 就使用 根据路由信息配置 生成的 菜单项信息数组
    return appClientMenus;
  });

  const menuTree = computed(() => {
    const copyRouter = cloneDeep(appRoute.value) as RouteRecordNormalized[];
    // 对菜单项进行排序
    copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
      // 如果没有order属性则默认为0 (0是排序最前的) 如果运算结果为正，则a在b前面，反之反转
      return (a.meta.order || 0) - (b.meta.order || 0);
    });

    /**
     * 遍历排序好的菜单项数组，遍历生成菜单树
     * @param _routes
     * @param layer
     */
    function travel(_routes: RouteRecordRaw[], layer: number) {
      // 如果菜单项数组为空 则返回空
      if (!_routes) return null;

      const collector: any = _routes.map((element) => {
        // no access
        // 根据用户角色判断用户是否权力访问该菜单项
        if (!permission.accessRouter(element)) {
          // 如果用户无权访问，则该项返回null
          return null;
        }

        // leaf node
        // 如果该项隐藏其子菜单项 或者 该项没有子菜单 则让其子菜单为空数组 并返回该项
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = [];
          return element;
        }
        // 则递归遍历子菜单项
        // route filter hideInMenu true
        element.children = element.children.filter(
          (x) => x.meta?.hideInMenu !== true
        );

        // Associated child node
        const subItem = travel(element.children, layer + 1);

        if (subItem.length) {
          element.children = subItem;
          return element;
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem;
          return element;
        }

        if (element.meta?.hideInMenu === false) {
          return element;
        }

        return null;
      });
      return collector.filter(Boolean);
    }

    return travel(copyRouter, 0);
  });

  return {
    menuTree,
  };
}
