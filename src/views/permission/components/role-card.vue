<template>
  <div class="container">
    <a-card
      class="role-card"
      title="系统角色"
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
          >
            新建角色
          </a-button>
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
        <a-form :model="createForm" layout="vertical">
          <a-form-item field="roleName" label="角色名称" name="roleName">
            <a-input v-model="createForm.roleName" />
          </a-form-item>
          <a-form-item field="roleInfo" label="角色描述" name="roleInfo">
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
        <a-form :model="updateForm" layout="vertical">
          <a-form-item field="roleName" label="角色名称" name="roleName">
            <a-input v-model="updateForm.roleName" />
          </a-form-item>
          <a-form-item field="roleInfo" label="角色描述" name="roleInfo">
            <a-input v-model="updateForm.roleInfo" />
          </a-form-item>
        </a-form>
        <template #footer>
          <div
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <a-space :size="8" align="start" direction="horizontal">
              <a-button status="danger" @click="confirmDelete(updateRoleId)">
                删除
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
        :scroll="{ y: 400 }"
        :scrollbar="true"
        :pagination="false"
        :bordered="{ bodyCell: true }"
        @row-click="selectRole($event.roleId, $event.roleName)"
      >
        <template #optional="{ record }">
          <a-space :size="'large'" align="center" direction="horizontal">
            <a-button
              status="normal"
              @click.stop="
                update(record.roleId, record.roleName, record.roleInfo)
              "
            >
              修改
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, PropType } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';

  interface RoleItem {
    roleId: number;
    roleName: string;
    roleInfo: string;
  }

  interface CreateRoleParams {
    roleName: string;
    roleInfo: string;
  }

  interface UpdateRoleParams {
    roleName: string;
    roleInfo: string;
  }

  const visibleCreate = ref(false);
  const visibleUpdate = ref(false);

  const props = defineProps({
    roleList: {
      type: Array as () => RoleItem[],
      required: true,
      default: () => [],
    },
    selectRole: {
      type: Function as PropType<(roleId: number, roleName: string) => void>,
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
  });

  const roleList = computed(() => props.roleList);
  const selectRole = computed(() => props.selectRole);
  const loading = computed(() => props.loading);

  const createForm = reactive<CreateRoleParams>({
    roleName: '',
    roleInfo: '',
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

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '角色描述',
      dataIndex: 'roleInfo',
    },
    {
      title: '操作',
      slotName: 'optional',
    },
  ];

  const del = async (_roleId: number) => {
    try {
      // 这里暂时用模拟的删除，实际应该调用API
      Message.success('删除成功');
      visibleUpdate.value = false;
      props.reLoad();
    } catch (error) {
      Modal.error({
        title: '删除失败',
        content: `${error}`,
      });
    }
  };

  const confirmDelete = (roleId: number) => {
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
      // 这里暂时用模拟的创建，实际应该调用API
      Message.success(`${createForm.roleName} 创建成功`);
      props.reLoad();
      visibleCreate.value = false;
      resetCreateForm();
    } catch (error) {
      Modal.error({
        title: '创建失败',
        content: `${error}`,
      });
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
      // 这里暂时用模拟的更新，实际应该调用API
      Message.success('更新成功');
      props.reLoad();
      visibleUpdate.value = false;
    } catch (error) {
      Modal.error({
        title: '更新失败',
        content: `${error}`,
      });
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

  .role-card {
    :deep(.arco-table-tr) {
      cursor: pointer;
    }
  }
</style>
