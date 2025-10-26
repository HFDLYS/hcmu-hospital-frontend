import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';
import { PermissionVerify } from '@/types/global';

// 如果用户没有指定的所有权限，则删除元素
function checkPermission(
  el: HTMLElement,
  binding: DirectiveBinding<PermissionVerify>
) {
  const { value } = binding;
  const { permissionsTarget } = value;
  const userStore = useUserStore();
  const { permissions } = userStore;

  if (permissionsTarget.length > 0) {
    const hasPermission = permissionsTarget.every((permission) => {
      return permissions.includes(permission);
    });
    if (!hasPermission && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  } else {
    throw new Error(`check permission error!`);
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
