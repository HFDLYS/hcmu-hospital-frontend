<template>
  <div class="department-list">
    <a-card class="general-card" :title="$t('departmentPage.title')">
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
              <a-col :span="12">
                <a-form-item
                  field="name"
                  :label="$t('departmentPage.form.name')"
                >
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('departmentPage.form.name.placeholder')"
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
              v-permission="{ permissionsTarget: ['ADD_DEPART'] }"
              type="primary"
              @click="handleCreate"
            >
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('departmentPage.operation.create') }}
            </a-button>
            <a-button
              v-permission="{ permissionsTarget: ['DEL_DEPART'] }"
              status="danger"
              :disabled="selectedKeys.length === 0"
              @click="handleBatchDelete"
            >
              <template #icon>
                <icon-delete />
              </template>
              {{ $t('departmentPage.operation.batchDelete') }}
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
        row-key="departmentId"
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
        <template #createTime="{ record }">
          {{ formatDateTime(record.createTime) }}
        </template>
        <template #operations="{ record }">
          <a-space>
            <a-button
              v-permission="{ permissionsTarget: ['ALT_DEPART'] }"
              type="text"
              size="small"
              @click="handleEdit(record)"
            >
              {{ $t('departmentPage.columns.operations.edit') }}
            </a-button>
            <a-button
              v-permission="{ permissionsTarget: ['DEL_DEPART'] }"
              type="text"
              size="small"
              status="danger"
              @click="handleDelete(record)"
            >
              {{ $t('departmentPage.columns.operations.delete') }}
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>

    <!-- 创建/编辑弹窗 -->
    <DepartmentModal
      :visible="modalVisible"
      :is-edit="isEdit"
      :department-id="currentDepartmentId"
      @cancel="handleModalCancel"
      @success="handleModalSuccess"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Message, Modal, type TableColumnData } from '@arco-design/web-vue';
  import useLoading from '@/hooks/loading';
  import {
    getAllDepartments,
    deleteDepartment,
    batchDeleteDepartments,
    DepartmentListDTO,
    DepartmentGetRequestDTO,
  } from '@/api/department';
  import { Pagination } from '@/types/global';
  import DepartmentModal from './department-modal.vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';

  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);

  // 表单数据
  const formModel = reactive<DepartmentGetRequestDTO>({
    name: '',
    pageNum: 1,
    pageSize: 10,
  });

  // 表格数据
  const renderData = ref<DepartmentListDTO[]>([]);
  const size = ref<SizeProps>('medium');
  const selectedKeys = ref<number[]>([]);

  // 分页
  const pagination = reactive<Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: true,
    showPageSize: true,
  });

  // 弹窗相关
  const modalVisible = ref(false);
  const isEdit = ref(false);
  const currentDepartmentId = ref<number>();

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
      title: t('departmentPage.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
      width: 80,
    },
    {
      title: t('departmentPage.columns.name'),
      dataIndex: 'name',
    },
    {
      title: t('departmentPage.columns.description'),
      dataIndex: 'description',
    },
    {
      title: t('departmentPage.columns.location'),
      dataIndex: 'location',
    },
    {
      title: t('departmentPage.columns.createTime'),
      dataIndex: 'createTime',
      slotName: 'createTime',
    },
    {
      title: t('departmentPage.columns.operations.title'),
      dataIndex: 'operations',
      slotName: 'operations',
      width: 180,
      fixed: 'right',
    },
  ]);

  // 行选择配置
  const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
    selectedRowKeys: selectedKeys,
    onSelect: (rowKeys: number[]) => {
      selectedKeys.value = rowKeys;
    },
    onSelectAll: (checked: boolean) => {
      if (checked) {
        selectedKeys.value = renderData.value.map(
          (item: DepartmentListDTO) => item.departmentId
        );
      } else {
        selectedKeys.value = [];
      }
    },
  });

  // 格式化日期时间
  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('zh-CN');
  };

  // 获取数据
  const fetchData = async () => {
    setLoading(true);
    try {
      const params: DepartmentGetRequestDTO = {
        ...formModel,
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      };
      const { data } = await getAllDepartments(params);
      renderData.value = data.list;
      pagination.total = data.total;
    } catch (err) {
      Message.error(t('departmentPage.message.fetchError'));
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
    formModel.name = '';
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

  // 创建
  const handleCreate = () => {
    isEdit.value = false;
    currentDepartmentId.value = undefined;
    modalVisible.value = true;
  };

  // 编辑
  const handleEdit = (record: DepartmentListDTO) => {
    isEdit.value = true;
    currentDepartmentId.value = record.departmentId;
    modalVisible.value = true;
  };

  // 删除
  const handleDelete = (record: DepartmentListDTO) => {
    Modal.confirm({
      title: t('departmentPage.operation.deleteConfirm'),
      content: t('departmentPage.operation.deleteContent', {
        name: record.name,
      }),
      okText: t('departmentPage.operation.confirm'),
      cancelText: t('departmentPage.operation.cancel'),
      onOk: async () => {
        try {
          await deleteDepartment(record.departmentId);
          Message.success(t('departmentPage.message.deleteSuccess'));
          fetchData();
        } catch (err) {
          Message.error(t('departmentPage.message.deleteError'));
        }
      },
    });
  };

  // 批量删除
  const handleBatchDelete = () => {
    if (selectedKeys.value.length === 0) {
      Message.warning(t('departmentPage.message.selectNone'));
      return;
    }
    Modal.confirm({
      title: t('departmentPage.operation.batchDeleteConfirm'),
      content: t('departmentPage.operation.batchDeleteContent', {
        count: selectedKeys.value.length,
      }),
      okText: t('departmentPage.operation.confirm'),
      cancelText: t('departmentPage.operation.cancel'),
      onOk: async () => {
        try {
          await batchDeleteDepartments(selectedKeys.value);
          Message.success(t('departmentPage.message.batchDeleteSuccess'));
          selectedKeys.value = [];
          fetchData();
        } catch (err) {
          Message.error(t('departmentPage.message.batchDeleteError'));
        }
      },
    });
  };

  // 弹窗取消
  const handleModalCancel = () => {
    modalVisible.value = false;
  };

  // 弹窗成功
  const handleModalSuccess = () => {
    modalVisible.value = false;
    fetchData();
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style lang="less" scoped>
  .department-list {
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
