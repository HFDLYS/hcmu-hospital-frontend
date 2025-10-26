import { DirectiveBinding } from 'vue';
import { PermissionVerify } from '@/types/global';
import { useUserStore } from '@/store';

// 如果用户没有指定的任何一个权限，则删除元素（除非指定了isSelf且为true，就跳过验证）
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
    const lacksPermission = permissionsTarget.every((p) => {
      return !permissions.includes(p);
    });

    if (lacksPermission && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  } else {
    throw new Error(`need permissions!`);
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
