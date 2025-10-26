<template>
  <div class="container">
    <a-card
      class="role-card"
      :title="title"
      :bordered="true"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{
        paddingTop: '16px',
        display: 'flex',
        flexFlow: 'column',
      }"
    >
      <template #extra>
        <a-space :size="8" align="end" direction="vertical">
          <a-button
            type="primary"
            size="small"
            style="font-size: 12px"
            @click="create"
            >{{ $t('rolePage.create') }}</a-button
          >
        </a-space>
      </template>
      <a-modal
        :visible="visibleCreate"
        ok-text="确认"
        cancel-text="返回"
        unmount-on-close
        @before-ok="handleCreateOk"
        @cancel="handleCreateCancel"
      >
        <template #title> 新建角色 </template>
        <a-form :form="createForm" :model="createForm" layout="vertical">
          <a-form-item
            field="roleName"
            label="角色名称"
            tooltip="Please enter the name"
            name="roleName"
          >
            <a-input v-model="createForm.roleName" />
          </a-form-item>
          <a-form-item
            field="roleInfo"
            label="角色描述"
            tooltip="Please enter the information"
            name="roleInfo"
          >
            <a-input v-model="createForm.roleInfo" />
          </a-form-item>
        </a-form>
      </a-modal>
      <a-modal
        :visible="visibleUpdate"
        ok-text="确认"
        cancel-text="返回"
        unmount-on-close
        @before-ok="handleUpdateOk"
        @cancel="handleUpdateCancel"
      >
        <template #title> 修改角色 </template>
        <a-form :form="updateForm" :model="updateForm" layout="vertical">
          <a-form-item
            field="roleName"
            label="角色名称"
            tooltip="Please enter the name"
            name="roleName"
          >
            <a-input v-model="updateForm.roleName" />
          </a-form-item>
          <a-form-item
            field="roleInfo"
            label="角色描述"
            tooltip="Please enter the information"
            name="roleInfo"
          >
            <a-input v-model="updateForm.roleInfo" />
          </a-form-item>
        </a-form>
        <template #footer>
          <div
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <a-space :size="8" align="start" direction="horizontal">
              <a-button status="danger" @click="comfirmDelete(updateRoleId)"
                >{{ $t('rolePage.delete') }}
              </a-button>
            </a-space>
            <a-space :size="8" align="end" direction="horizontal">
              <a-button @click="handleUpdateCancel">返回</a-button>
              <a-button type="primary" @click="handleUpdateOk">确认</a-button>
            </a-space>
          </div>
        </template>
      </a-modal>
      <a-table
        :loading="loading"
        :columns="columns"
        :data="roleList"
        :scroll="{}"
        :scrollbar="true"
        :pagination="false"
        :bordered="{ bodyCell: true }"
        @row-click="selectRole($event.roleId, $event.roleName, roleType)"
      >
        <template #optional="{ record }">
          <a-space :size="'large'" align="center" direction="horizontal">
            <a-button
              status="normal"
              @click.enter.stop="
                update(record.roleId, record.roleName, record.roleInfo)
              "
              >{{ $t('rolePage.update') }}
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, defineProps, reactive, ref, PropType } from 'vue';
  import {
    createRole,
    CreateRoleParams,
    deleteRole,
    RoleItem,
    UpdateRoleParams,
    updateRole,
  } from '@/api/role';
  import { useI18n } from 'vue-i18n';
  import { Modal } from '@arco-design/web-vue';

  const { t } = useI18n();
  const visibleCreate = ref(false);
  const visibleUpdate = ref(false);

  const props = defineProps({
    title: {
      type: String,
      required: true,
      default: 'xxx角色',
    },
    roleList: {
      type: Array as () => RoleItem[],
      required: true,
      default: () =>
        Array(10)
          .fill(null)
          .map((_, index) => ({
            roleId: index,
            roleName: `角色${index + 1}`,
            roleInfo: `角色${index + 1}的描述`,
          })),
    },
    selectRole: {
      type: Function as PropType<
        (roleId: number, roleName: string, roleType: number) => void
      >,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    reLoad: {
      type: Function as PropType<() => void>,
      required: true,
    },
    roleType: {
      type: Number,
      required: true,
    },
  });

  const title = computed(() => props.title);
  const roleList = computed(() => props.roleList);
  const selectRole = computed(() => props.selectRole);
  const loading = computed(() => props.loading);
  const roleType = computed(() => props.roleType);

  const createForm = reactive<CreateRoleParams>({
    roleName: '',
    roleInfo: '',
    type: roleType.value,
    permissionList: [],
  });

  const updateForm = reactive<UpdateRoleParams>({
    roleName: '',
    roleInfo: '',
  });

  const updateRoleId = ref<number>(0);

  const resetCreateForm = () => {
    createForm.roleName = '';
    createForm.roleInfo = '';
  };

  const setUpdateForm = (roleName: string, roleInfo: string) => {
    updateForm.roleName = roleName;
    updateForm.roleInfo = roleInfo;
  };

  const columns = computed(() => [
    {
      title: t('rolePage.roleName'),
      dataIndex: 'roleName',
    },
    {
      title: t('rolePage.roleInfo'),
      dataIndex: 'roleInfo',
    },
    {
      title: t('rolePage.operation'),
      slotName: 'optional',
    },
  ]);

  const del = async (roleId: number) => {
    try {
      const { data } = await deleteRole(roleId);
      visibleUpdate.value = false;
      props.reLoad();
      Modal.success({
        title: '删除成功',
        content: data,
      });
    } catch (error) {
      props.reLoad();
      Modal.error({
        title: '删除失败',
        content: `${error}`,
      });
    }
  };

  const comfirmDelete = (roleId: number) => {
    Modal.confirm({
      title: '删除角色',
      content: '此操作不可撤销，确认删除该角色吗？',
      onOk: () => del(roleId),
    });
  };

  const create = () => {
    visibleCreate.value = true;
  };

  const handleCreateOk = async () => {
    try {
      const { data } = await createRole(createForm);
      Modal.success({
        title: '创建成功',
        content: `${data.roleName} 创建成功`,
      });
      props.reLoad();
    } catch (error) {
      Modal.error({
        title: '创建失败',
        content: `${error}`,
      });
    } finally {
      visibleCreate.value = false;
      resetCreateForm();
    }
  };

  const handleCreateCancel = () => {
    visibleCreate.value = false;
    resetCreateForm();
  };

  const update = (roleId: number, roleName: string, roleInfo: string) => {
    setUpdateForm(roleName, roleInfo);
    updateRoleId.value = roleId;
    visibleUpdate.value = true;
  };

  const handleUpdateOk = async () => {
    try {
      const { data } = await updateRole(updateRoleId.value, updateForm);
      Modal.success({
        title: '更新成功',
        content: `${data}`,
      });
      props.reLoad();
    } catch (error) {
      Modal.error({
        title: '更新失败',
        content: `${error}`,
      });
    } finally {
      visibleUpdate.value = false;
    }
  };

  const handleUpdateCancel = () => {
    visibleUpdate.value = false;
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-flow: column;
    height: auto;
  }

  .card-footer {
    margin-top: auto;
  }
</style>
