import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';
import { PermissionVerify } from '@/types/global';

// 如果用户有指定的权限，则删除元素（除非指定了isSelf且为true，就跳过验证）
function checkPermission(
  el: HTMLElement,
  binding: DirectiveBinding<PermissionVerify>
) {
  const { value } = binding;
  const { permissionsTarget } = value;
  const userStore = useUserStore();
  const { permissions } = userStore;

  if (permissionsTarget.length > 0) {
    const hasExcludedPermission = permissionsTarget.some((permission) => {
      return permissions.includes(permission);
    });

    if (hasExcludedPermission && el.parentNode) {
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
