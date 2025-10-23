<template>
  <a-modal
    :visible="visible"
    title="修改用户角色"
    unmount-on-close
    draggable
    ok-text="确认"
    cancel-text="取消"
    @ok="handleEditOk"
    @cancel="handleEditCancel"
  >
    <a-form :model="editForm">
      <a-form-item label="角色名称">
        <a-select v-model="editForm.roleId">
          <a-option
            v-for="(item, index) in roleList"
            :key="index"
            :value="item.roleId"
            :label="item.roleName"
          ></a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { Message } from '@arco-design/web-vue';

  interface RoleItem {
    roleId: number;
    roleName: string;
  }

  interface UpdateUserRoleParams {
    roleId: number | null;
  }

  const props = defineProps({
    userId: {
      type: Number,
      default: 0,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
      required: true,
    },
    setVisible: {
      type: Function,
      default: () => {
        // default function
      },
      required: true,
    },
    reload: {
      type: Function,
      default: () => {
        // default function
      },
      required: true,
    },
  });

  const visible = computed(() => props.visible);

  // 使用固定的角色列表
  const roleList = ref<RoleItem[]>([
    {
      roleId: 1,
      roleName: '超级管理员',
    },
    {
      roleId: 2,
      roleName: '管理员',
    },
    {
      roleId: 3,
      roleName: '患者',
    },
    {
      roleId: 4,
      roleName: '医生',
    },
  ]);

  const editForm = ref<UpdateUserRoleParams>({
    roleId: null,
  });

  const handleEditOk = async () => {
    try {
      // 这里应该调用API更新用户角色
      // await updateUserRole(userId.value, editForm.value);
      Message.success('角色修改成功');
      props.reload();
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    }
    props.setVisible(false);
  };

  const handleEditCancel = () => {
    props.setVisible(false);
  };

  watch(visible, (val) => {
    if (val) {
      editForm.value.roleId = null;
    }
  });
</script>
