<template>
  <a-modal
    :visible="visible"
    :title="$t('personnelPage.columns.operations.editModal.title')"
    unmount-on-close
    draggable
    ok-text="确认"
    cancel-text="取消"
    @ok="handleEditOk"
    @cancel="handleEditCancel"
  >
    <a-form :model="editForm">
      <a-form-item
        :label="t('personnelPage.columns.operations.editModal.roleName')"
      >
        <a-select v-model="editForm.roleId as number">
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
  import { computed, defineProps, onMounted, ref, watch } from 'vue';
  import { getAllRoles, RoleItem } from '@/api/role';
  import { RoleType } from '@/store/modules/app/types';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { updateUserRole, UpdateUserRoleParams } from '@/api/user';

  const { t } = useI18n();

  const props = defineProps({
    userId: {
      type: Number,
      default: 0,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
      required: true,
    },
    setVisible: {
      type: Function,
      default: () => {},
      required: true,
    },
    reload: {
      type: Function,
      default: () => {},
      required: true,
    },
  });

  const userId = computed(() => props.userId);
  const visible = computed(() => props.visible);
  const roleList = ref<RoleItem[]>([]);

  const editForm = ref<UpdateUserRoleParams>({
    roleId: null,
  });

  const fetchRole = async () => {
    if (roleList.value.length === 0) {
      try {
        const res = await getAllRoles({
          type: RoleType.SYSTEM_TYPE,
        });
        roleList.value = res.data as RoleItem[];
      } catch (err) {
        if (err instanceof Error) {
          Message.error(err.message);
        } else {
          Message.error(String(err));
        }
      }
    }
  };

  const handleEditOk = async () => {
    try {
      // TODO: 等待接口
      await updateUserRole(userId.value, editForm.value);
      Message.success(t('personnelPage.columns.operations.editModal.success'));
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

  onMounted(() => {
    fetchRole();
  });

  watch(visible, (val) => {
    if (val) {
      editForm.value.roleId = null;
    }
  });
</script>
