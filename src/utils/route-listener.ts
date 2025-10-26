/**
 * Listening to routes alone would waste rendering performance. Use the publish-subscribe model for distribution management
 * 单独监听路由会浪费渲染性能。使用发布订阅模式去进行分发管理。
 */
import mitt, { Handler } from 'mitt';
import type { RouteLocationNormalized } from 'vue-router';

const emitter = mitt();

const key = Symbol('ROUTE_CHANGE');

let latestRoute: RouteLocationNormalized;

/**
 * 发出一个新的路由变化事件
 * @param to
 */
export function setRouteEmitter(to: RouteLocationNormalized) {
  emitter.emit(key, to);
  latestRoute = to;
}

/**
 * 监听路由变化 并设置一个回调函数 以便事件发生时执行
 * @param handler
 * @param immediate
 */
export function listenerRouteChange(
  handler: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  emitter.on(key, handler as Handler);
  if (immediate && latestRoute) {
    handler(latestRoute);
  }
}

/**
 * 移除该路由变化事件的监听
 */
export function removeRouteListener() {
  emitter.off(key);
}
