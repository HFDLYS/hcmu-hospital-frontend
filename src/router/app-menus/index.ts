import { appRoutes, appExternalRoutes } from '../routes';

/**
 * 将 app路由数组 与 外部路由数组 展开 并 合并 返回一个包含全部路由信息的数组
 */
const mixinRoutes = [...appRoutes, ...appExternalRoutes];

/**
 * 对于路由数组内的每一个元素，取出其中 5个用于构建menu菜单项所需的重要属性 并组成与路由数组长度相同的新菜单项数组
 */
const appClientMenus = mixinRoutes.map((el) => {
  const { name, path, meta, redirect, children } = el;
  return {
    name,
    path,
    meta,
    redirect,
    children,
  };
});

export default appClientMenus;
