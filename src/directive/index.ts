import { App } from 'vue';
import permission from './permission';
import innerPermission from './innerPermission';
import PermissionReject from './permissionReject';
import orPermission from './orPermission';

export default {
  install(Vue: App) {
    Vue.directive('permission', permission);
    Vue.directive('inner-permission', innerPermission);
    Vue.directive('permission-reject', PermissionReject);
    Vue.directive('or-permission', orPermission);
  },
};
