import type { RouteRecordNormalized } from 'vue-router';

const modules = import.meta.glob('./modules/*.ts', { eager: true });
const externalModules = import.meta.glob('./externalModules/*.ts', {
  eager: true,
});

// 添加需要排除的文件名
const excludedFiles = [
  './modules/dashboard.ts',
  './externalModules/arco.ts',
  './externalModules/faq.ts',
  './modules/competition.ts',
];

/**
 * 负责整理与格式化输出所有的路由配置，最终输出一个路由数组
 * @param _modules
 * @param result
 */
function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules)
    .filter((key) => !excludedFiles.includes(key))
    .forEach((key) => {
      // 取出一个路由文件的默认导出的路由配置对象
      const defaultModule = _modules[key].default;
      // 判断是否存在默认的路由对象，如果不存在则跳过
      if (!defaultModule) return;
      // 判断导出的路由对象是否包含多个路由（是的话即为一个数组），是的话即展开合并到result返回结果体内部
      const moduleList = Array.isArray(defaultModule)
        ? [...defaultModule]
        : [defaultModule];
      result.push(...moduleList);
    });
  return result;
}

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, []);

export const appExternalRoutes: RouteRecordNormalized[] = formatModules(
  externalModules,
  []
);
