import { DirectiveBinding } from 'vue';
import { PermissionVerify } from '@/types/global';
import { useUserStore } from '@/store';

// 如果用户没有指定的所有权限，则删除元素（除非指定了isSelf且为true，就跳过验证）
function checkPermission(
  el: HTMLElement,
  binding: DirectiveBinding<PermissionVerify>
) {
  const { value } = binding;
  const { permissions, permissionsTarget } = value;

  if (
    permissionsTarget.length > 0 &&
    permissions !== undefined &&
    permissions.length > 0
  ) {
    const hasPermission = permissionsTarget.every((p) => {
      return permissions.includes(p);
    });

    if (!hasPermission && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  } else {
    throw new Error(`check permission error!`);
  }
}

export default {
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
