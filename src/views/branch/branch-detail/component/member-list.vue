<template>
  <div class="member-list">
    <a-card class="general-card">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="10">
              <a-col :span="12">
                <a-form-item field="account" :label="$t('memberList.userName')">
                  <a-input
                    v-model="formModel.userName"
                    :placeholder="$t('memberList.userName.placeholder')"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item field="name" :label="$t('memberList.nickname')">
                  <a-input
                    v-model="formModel.nickname"
                    :placeholder="$t('memberList.nickname.placeholder')"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item field="name" :label="$t('memberList.roleName')">
                  <a-input
                    v-model="formModel.roleName"
                    :placeholder="$t('memberList.roleName.placeholder')"
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical"></a-divider>
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search></icon-search>
              </template>
              {{ $t('listBoard.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh></icon-refresh>
              </template>
              {{ $t('listBoard.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>

      <a-divider style="margin-top: 0"></a-divider>

      <a-row style="justify-content: flex-end; margin-bottom: 16px">
        <a-col :span="12" style="display: flex; align-items: flex-start">
          <a-button
            v-inner-permission="{
              permissions: permissions,
              permissionsTarget: ['BRAN_MB_MG'],
            }"
            type="primary"
            @click="handleAdd"
          >
            {{ $t('memberList.addMember') }}
          </a-button>
        </a-col>
        <a-col
          :span="12"
          style="
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
          "
        >
          <a-tooltip :content="$t('listBoard.refresh')">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"></icon-refresh
            ></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('listBoard.density')">
              <div class="action-icon"
                ><icon-line-height size="18"></icon-line-height
              ></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
        </a-col>
      </a-row>

      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="cloneColumns"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-space size="medium">
            <a-button
              type="dashed"
              status="success"
              size="small"
              @click="redirectToPersonal(router, record.userId)"
            >
              {{ $t('memberList.columns.operations.view') }}
            </a-button>
            <a-button
              v-inner-permission="{
                permissions: permissions,
                permissionsTarget: ['BRAN_MB_MG'],
              }"
              type="dashed"
              status="warning"
              size="small"
              @click="handleEdit(record.userId)"
            >
              {{ $t('memberList.columns.operations.edit') }}
            </a-button>
            <a-button
              v-inner-permission="{
                permissions: permissions,
                permissionsTarget: ['BRAN_MB_MG'],
              }"
              type="dashed"
              status="danger"
              size="small"
              @click="handleDismiss(record.userId, record.nickname)"
            >
              {{ $t('memberList.columns.operations.dismiss') }}
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <RoleChangeModal
      :visible="isEditVisible"
      :branch-id="branchId"
      :user-id="editedUserId"
      :reload="fetchData"
      :set-visible="setVisible"
    ></RoleChangeModal>
    <a-modal
      :visible="isAddFormVisible"
      :title="$t('memberList.addMember')"
      unmount-on-close
      draggable
      ok-text="确认"
      cancel-text="取消"
      @ok="handleAddOk"
      @cancel="handleAddCancel"
    >
      <a-form :model="addForm">
        <a-form-item :label="t('projectDetail.member.add.nickname')">
          <a-select v-model="addedId as number" allow-search>
            <a-option
              v-for="(item, index) in memberList"
              :key="index"
              :value="item.userId"
              :label="item.nickname"
            ></a-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="t('projectDetail.member.add.roleName')">
          <a-select v-model="addForm.roleId as number">
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
  </div>
</template>

<script lang="ts" setup>
  import {
    defineProps,
    ref,
    reactive,
    computed,
    watch,
    onMounted,
    PropType,
  } from 'vue';
  import { Pagination } from '@/types/global';
  import { useI18n } from 'vue-i18n';
  import {
    findUserByBranchId,
    BranMemberRecord,
    UserGetRequestDTO,
    joinBranch,
    JoinBranchParams,
    deleteBranchUser,
  } from '@/api/branch';
  import useLoading from '@/hooks/loading';
  import { Message, Modal, TableColumnData } from '@arco-design/web-vue';
  import cloneDeep from 'lodash/cloneDeep';
  import { useRouter } from 'vue-router';
  import { PermissionType, RoleType } from '@/store/modules/app/types';
  import { getAllRoles, RoleItem } from '@/api/role';
  import { getAllUsers, SysMemberRecord } from '@/api/user';
  import { redirectToPersonal } from '@/utils/switch-page';
  import RoleChangeModal from './role-change-modal.vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };
  const size = ref<SizeProps>('medium');
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const { t } = useI18n();
  const router = useRouter();

  const isEditVisible = ref(false);
  const editedUserId = ref<number>();
  const isAddFormVisible = ref(false);
  const addedId = ref<number | null>();

  const roleList = ref<RoleItem[]>([]);
  const memberList = ref<SysMemberRecord[]>([]);

  const setVisible = (visible: boolean) => {
    isEditVisible.value = visible;
  };

  const handleEdit = (userId: number) => {
    editedUserId.value = userId;
    setVisible(true);
  };

  const densityList = computed(() => [
    {
      name: t('listBoard.mini'),
      value: 'mini',
    },
    {
      name: t('listBoard.small'),
      value: 'small',
    },
    {
      name: t('listBoard.medium'),
      value: 'medium',
    },
    {
      name: t('listBoard.large'),
      value: 'large',
    },
  ]);
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('memberList.columns.order'),
      dataIndex: 'index',
      slotName: 'index',
    },
    {
      title: t('memberList.columns.userName'),
      dataIndex: 'userName',
    },
    {
      title: t('memberList.columns.nickname'),
      dataIndex: 'nickname',
    },
    {
      title: t('memberList.columns.contribution'),
      dataIndex: 'contribution',
    },
    {
      title: t('memberList.columns.roleName'),
      dataIndex: 'roleName',
    },
    {
      title: t('memberList.columns.score'),
      dataIndex: 'score',
    },
    {
      title: t('memberList.columns.operation'),
      dataIndex: 'operation',
      slotName: 'operations',
    },
  ]);

  const renderData = ref<BranMemberRecord[]>([]);
  const { loading, setLoading } = useLoading(true);
  const props = defineProps({
    branchId: {
      type: Number,
      required: true,
    },
    permissions: {
      type: Array as PropType<PermissionType[]>,
      required: true,
    },
  });

  const branchId = computed(() => props.branchId);
  const permissions = computed(() => props.permissions);

  const addForm = ref<JoinBranchParams>({
    roleId: null,
  });

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
    total: 0,
  };
  const pagination = reactive({
    ...basePagination,
  });

  // 筛选表单数据模型
  const generateFormModel = () => {
    return {
      userName: '',
      nickname: '',
      roleName: '',
    };
  };

  const formModel = ref(generateFormModel());

  const fetchData = async (
    params: UserGetRequestDTO = {
      ...formModel.value,
      pageNum: 1,
      pageSize: 20,
    }
  ) => {
    setLoading(true);
    try {
      const res = await findUserByBranchId(branchId.value, params);
      renderData.value = res.data.list;
      pagination.current = params.pageNum;
      pagination.total = res.data.total;
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        // 处理非 Error 类型的错误
        Message.error(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRole = async () => {
    if (roleList.value.length === 0) {
      try {
        const res = await getAllRoles({
          type: RoleType.BRANCH_TYPE,
        });
        roleList.value = res.data as RoleItem[];
      } catch (err) {
        if (err instanceof Error) {
          Message.error(err.message);
        } else {
          // 处理非 Error 类型的错误
          Message.error(String(err));
        }
      }
    }
  };

  const fetchUser = async (force: boolean) => {
    if (memberList.value.length === 0 || force) {
      try {
        const res = await getAllUsers({
          pageNum: 1,
          pageSize: 1000,
        });
        memberList.value = res.data.list as SysMemberRecord[];
        memberList.value = memberList.value.filter((item) => !item.branchId);
      } catch (err) {
        if (err instanceof Error) {
          Message.error(err.message);
        } else {
          // 处理非 Error 类型的错误
          Message.error(String(err));
        }
      }
    }
  };

  const handleDismissOk = async (id: number) => {
    try {
      await deleteBranchUser(branchId.value, id);
      Message.success(t('memberList.columns.operations.dismissSuccess'));
      await fetchData();
      await fetchUser(true);
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        // 处理非 Error 类型的错误
        Message.error(String(err));
      }
    }
  };

  const handleDismiss = (id: number, name: string) => {
    Modal.warning({
      title: t('memberList.columns.operations.dismiss.title'),
      content: `${t('memberList.columns.operations.dismissConfirm')} - ${name}`,
      onOk: () => handleDismissOk(id),
      hideCancel: false,
      draggable: true,
    });
  };

  const handleAdd = async () => {
    await fetchRole();
    await fetchUser(true);
    addForm.value = {
      roleId: null,
    };
    addedId.value = null;
    isAddFormVisible.value = true;
  };

  const handleAddOk = async () => {
    if (!addForm.value.roleId || !addedId.value) {
      Message.error(t('memberList.addMember.formError'));
      return;
    }
    try {
      await joinBranch(branchId.value, addedId.value, addForm.value);
      Message.success(t('memberList.addMember.success'));
      await fetchData();
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        // 处理非 Error 类型的错误
        Message.error(String(err));
      }
    }
    isAddFormVisible.value = false;
  };

  const handleAddCancel = () => {
    addForm.value = {
      roleId: null,
    };
    isAddFormVisible.value = false;
  };

  onMounted(() => {
    fetchData();
  });

  const onPageChange = (pageNum: number) => {
    fetchData({
      ...formModel.value,
      pageNum,
      pageSize: pagination.pageSize,
    });
  };

  const search = () => {
    fetchData();
  };

  const reset = () => {
    formModel.value = generateFormModel();
    fetchData();
  };

  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    size.value = val as SizeProps;
  };

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<style lang="less" scoped>
  .member-list {
    margin-top: 20px;
    caret-color: transparent;
  }
</style>
