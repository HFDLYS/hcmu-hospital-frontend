import { DirectiveBinding } from 'vue';
import { findBranchPermissionBySelf } from '@/api/branch';
import { PermissionVerify2 } from '@/types/global';
import { Message } from '@arco-design/web-vue';

function checkPermission(
  el: HTMLElement,
  binding: DirectiveBinding<PermissionVerify2>
) {
  const { value } = binding;
  const { id, permissionsRequired } = value;

  if (Array.isArray(permissionsRequired)) {
    findBranchPermissionBySelf(id)
      .then((res) => {
        const hasPermission = res.data;
        if (permissionsRequired.length > 0 && hasPermission.length >= 0) {
          const permitted = permissionsRequired.every((permission) => {
            return hasPermission.includes(permission);
          });

          if (!permitted && el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
      })
      .catch((err) => {
        if (err instanceof Error) {
          Message.error(err.message);
        } else {
          // 处理非 Error 类型的错误
          Message.error(String(err));
        }
      });
  } else {
    throw new Error(
      `need permissions! Like v-branch-permission="{id: branchId,permissionsRequired: ['ALT_PROJ_DIVISION_B']}"`
    );
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
