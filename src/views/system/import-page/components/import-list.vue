<template>
  <div class="import-list">
    <a-card class="general-card" :title="$t('importPage.title')">
      <!-- 搜索表单 -->
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="10">
              <a-col :span="8">
                <a-form-item
                  field="userName"
                  :label="$t('importPage.form.userName')"
                >
                  <a-input
                    v-model="formModel.userName"
                    :placeholder="$t('importPage.form.userName.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="$t('importPage.form.name')">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('importPage.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="email" :label="$t('importPage.form.email')">
                  <a-input
                    v-model="formModel.email"
                    :placeholder="$t('importPage.form.email.placeholder')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 86px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('listBoard.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('listBoard.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>

      <a-divider style="margin-top: 0" />

      <!-- 操作按钮区域 -->
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button
              v-permission="{ permissionsTarget: ['ADD_MB'] }"
              type="primary"
              @click="handleImport"
            >
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('importPage.operation.import') }}
            </a-button>
            <a-button
              v-permission="{ permissionsTarget: ['DEL_MB'] }"
              status="danger"
              :disabled="selectedKeys.length === 0"
              @click="handleBatchDelete"
            >
              <template #icon>
                <icon-delete />
              </template>
              {{ $t('importPage.operation.batchDelete') }}
            </a-button>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <a-tooltip :content="$t('listBoard.refresh')">
            <div class="action-icon" @click="search">
              <icon-refresh size="18" />
            </div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('listBoard.density')">
              <div class="action-icon">
                <icon-line-height size="18" />
              </div>
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

      <!-- 表格 -->
      <a-table
        v-model:selected-keys="selectedKeys"
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="columns"
        :data="renderData"
        :bordered="false"
        :size="size"
        :row-selection="rowSelection"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-space>
            <a-button
              v-permission="{ permissionsTarget: ['DEL_MB'] }"
              type="text"
              size="small"
              status="danger"
              @click="handleDelete(record)"
            >
              {{ $t('importPage.columns.operations.delete') }}
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>

    <!-- 导入弹窗 -->
    <ImportModal
      :visible="importModalVisible"
      @cancel="handleImportModalCancel"
      @success="handleImportModalSuccess"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Message, Modal, type TableColumnData } from '@arco-design/web-vue';
  import useLoading from '@/hooks/loading';
  import {
    getAllPendingUsers,
    deletePendingUser,
    batchDeletePendingUsers,
    PendingUserItem,
    PendingUserGetRequest,
  } from '@/api/pending-user';
  import { Pagination } from '@/types/global';
  import ImportModal from './import-modal.vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';

  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);

  // 表单数据
  const formModel = reactive<PendingUserGetRequest>({
    userName: '',
    name: '',
    email: '',
    pageNum: 1,
    pageSize: 10,
  });

  // 表格数据
  const renderData = ref<PendingUserItem[]>([]);
  const size = ref<SizeProps>('medium');
  const selectedKeys = ref<(string | number)[]>([]); // 建议使用 (string | number)[] 类型

  // 分页
  const pagination = reactive<Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 弹窗相关
  const importModalVisible = ref(false);

  // 表格密度
  const densityList = computed(() => [
    { name: t('listBoard.mini'), value: 'mini' },
    { name: t('listBoard.small'), value: 'small' },
    { name: t('listBoard.medium'), value: 'medium' },
    { name: t('listBoard.large'), value: 'large' },
  ]);

  // 表格列定义
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('importPage.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
      width: 80,
    },
    {
      title: t('importPage.columns.userName'),
      dataIndex: 'userName',
    },
    {
      title: t('importPage.columns.name'),
      dataIndex: 'name',
    },
    {
      title: t('importPage.columns.email'),
      dataIndex: 'email',
    },
    {
      title: t('importPage.columns.roleName'),
      dataIndex: 'roleName',
    },
    {
      title: t('importPage.columns.operations.title'),
      dataIndex: 'operations',
      slotName: 'operations',
      width: 120,
      fixed: 'right',
    },
  ]);

  // 行选择配置
  const rowSelection = computed(() => ({
    type: 'checkbox' as const,
    showCheckedAll: true,
    onlyCurrent: false,
    selectedRowKeys: selectedKeys.value,
    // 使用 onChange 统一处理所有选择变化
    onSelect: (rowKeys: number[], record: PendingUserItem) => {
      selectedKeys.value = rowKeys;
    },
    onSelectAll: (checked: boolean) => {
      if (checked) {
        selectedKeys.value = renderData.value.map(
          (item: PendingUserItem) => item.id
        );
      } else {
        selectedKeys.value = [];
      }
    },
  }));

  // 获取数据
  const fetchData = async () => {
    setLoading(true);
    try {
      const params: PendingUserGetRequest = {
        ...formModel,
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      };
      const { data } = await getAllPendingUsers(params);
      renderData.value = data.list;
      pagination.total = data.total;
    } catch (err) {
      Message.error(t('importPage.message.fetchError'));
    } finally {
      setLoading(false);
    }
  };

  // 搜索
  const search = () => {
    pagination.current = 1;
    fetchData();
  };

  // 重置
  const reset = () => {
    formModel.userName = '';
    formModel.name = '';
    formModel.email = '';
    search();
  };

  // 分页改变
  const onPageChange = (current: number) => {
    pagination.current = current;
    fetchData();
  };

  // 表格密度改变
  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined
  ) => {
    size.value = val as SizeProps;
  };

  // 导入
  const handleImport = () => {
    importModalVisible.value = true;
  };

  // 删除
  const handleDelete = (record: PendingUserItem) => {
    Modal.confirm({
      title: t('importPage.operation.deleteConfirm'),
      content: t('importPage.operation.deleteContent', {
        name: record.name,
      }),
      okText: t('importPage.operation.confirm'),
      cancelText: t('importPage.operation.cancel'),
      onOk: async () => {
        try {
          await deletePendingUser(record.id);
          Message.success(t('importPage.message.deleteSuccess'));
          fetchData();
        } catch (err) {
          Message.error(t('importPage.message.deleteError'));
        }
      },
    });
  };

  // 批量删除
  const handleBatchDelete = () => {
    if (selectedKeys.value.length === 0) {
      Message.warning(t('importPage.message.selectNone'));
      return;
    }
    Modal.confirm({
      title: t('importPage.operation.batchDeleteConfirm'),
      content: t('importPage.operation.batchDeleteContent', {
        count: selectedKeys.value.length,
      }),
      okText: t('importPage.operation.confirm'),
      cancelText: t('importPage.operation.cancel'),
      onOk: async () => {
        try {
          // 确保 selectedKeys 的类型与 API 匹配
          await batchDeletePendingUsers(selectedKeys.value as number[]);
          Message.success(t('importPage.message.batchDeleteSuccess'));
          selectedKeys.value = [];
          fetchData();
        } catch (err) {
          Message.error(t('importPage.message.batchDeleteError'));
        }
      },
    });
  };

  // 导入弹窗取消
  const handleImportModalCancel = () => {
    importModalVisible.value = false;
  };

  // 导入弹窗成功
  const handleImportModalSuccess = () => {
    importModalVisible.value = false;
    fetchData();
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style lang="less" scoped>
  .import-list {
    .action-icon {
      margin-left: 12px;
      cursor: pointer;
    }

    .active {
      color: #0960bd;
      background-color: #e3f4fc;
    }
  }
</style>
