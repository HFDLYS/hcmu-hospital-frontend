<template>
  <div class="member-list">
    <a-card class="general-card" :title="$t('personnelPage.title')">
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
                <a-form-item
                  field="account"
                  :label="$t('personnelPage.userName')"
                >
                  <a-input
                    v-model="formModel.userName"
                    :placeholder="$t('personnelPage.userName.placeholder')"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item field="name" :label="$t('personnelPage.nickname')">
                  <a-input
                    v-model="formModel.nickname"
                    :placeholder="$t('personnelPage.nickname.placeholder')"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item field="name" :label="$t('personnelPage.roleName')">
                  <a-input
                    v-model="formModel.roleName"
                    :placeholder="$t('personnelPage.roleName.placeholder')"
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 86px" direction="vertical"></a-divider>
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
          <a-space :size="size" direction="horizontal">
            <a-button
              :size="size"
              status="success"
              @click="redirectToPersonal(router, record.userId)"
            >
              {{ $t('personnelPage.columns.operations.view') }}
            </a-button>
            <a-button
              v-permission="{ permissionsTarget: ['ALT_MB'] }"
              :size="size"
              style="background-color: rgba(39, 159, 184, 0.65)"
              @click="handleEdit(record.userId)"
            >
              {{ $t('personnelPage.columns.operations.editRole') }}
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <RoleChangeModal
      :visible="isEditVisible"
      :user-id="editedUserId"
      :reload="fetchData"
      :set-visible="setEditVisible"
    ></RoleChangeModal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, watch, onMounted } from 'vue';
  import { Pagination } from '@/types/global';
  import { useI18n } from 'vue-i18n';
  import { UserGetRequestDTO } from '@/api/branch';
  import useLoading from '@/hooks/loading';
  import { Message, TableColumnData } from '@arco-design/web-vue';
  import cloneDeep from 'lodash/cloneDeep';
  import { SysMemberRecord, getAllUsers } from '@/api/user';
  import { useRouter } from 'vue-router';
  import { redirectToPersonal } from '@/utils/switch-page';
  import RoleChangeModal from './role-change-modal.vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };
  const size = ref<SizeProps>('medium');
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const { t } = useI18n();
  const router = useRouter();
  const isScoreFormVisible = ref(false);
  const scoredUserId = ref<number>(0);
  const modalTitle = ref('');

  const isEditVisible = ref(false);
  const editedUserId = ref<number>();

  const setEditVisible = (visible: boolean) => {
    isEditVisible.value = visible;
  };
  const handleEdit = (userId: number) => {
    editedUserId.value = userId;
    isEditVisible.value = true;
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
      title: t('personnelPage.columns.order'),
      dataIndex: 'index',
      slotName: 'index',
    },
    {
      title: t('personnelPage.columns.userName'),
      dataIndex: 'userName',
    },
    {
      title: t('personnelPage.columns.nickname'),
      dataIndex: 'nickname',
    },
    {
      title: t('personnelPage.columns.roleName'),
      dataIndex: 'roleName',
    },
    {
      title: t('personnelPage.columns.operation'),
      dataIndex: 'operation',
      slotName: 'operations',
    },
  ]);

  const renderData = ref<SysMemberRecord[]>([]);
  const { loading, setLoading } = useLoading(true);

  const basePagination: Pagination = {
    current: 1,
    pageSize: 10,
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
      branchName: '',
    };
  };

  const formModel = ref(generateFormModel());

  const fetchData = async (
    params: UserGetRequestDTO = {
      ...formModel.value,
      pageNum: 1,
      pageSize: 10,
    }
  ) => {
    setLoading(true);
    try {
      const res = await getAllUsers(params);
      renderData.value = res.data.list;
      pagination.current = params.pageNum;
      pagination.total = res.data.total;
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    } finally {
      setLoading(false);
    }
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

  const handleScore = (id: number, name: string) => {
    scoredUserId.value = id;
    modalTitle.value = `${t(
      'personnelPage.columns.operations.score'
    )} - ${name}`;
    isScoreFormVisible.value = true;
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
    caret-color: transparent;
  }
</style>
