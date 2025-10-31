<template>
  <div class="doctor-profile-list">
    <a-card class="general-card" :title="$t('doctorProfilePage.title')">
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
                  field="departmentId"
                  :label="$t('doctorProfilePage.form.departmentId')"
                >
                  <a-select
                    v-model="formModel.departmentId"
                    :placeholder="
                      $t('doctorProfilePage.form.departmentId.placeholder')
                    "
                    allow-clear
                  >
                    <a-option
                      v-for="dept in departmentOptions"
                      :key="dept.departmentId"
                      :value="dept.departmentId"
                      :label="dept.name"
                    />
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  field="title"
                  :label="$t('doctorProfilePage.form.title')"
                >
                  <a-input
                    v-model="formModel.title"
                    :placeholder="
                      $t('doctorProfilePage.form.title.placeholder')
                    "
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
        <a-col
          :span="24"
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
        row-key="doctorProfileId"
        :loading="loading"
        :pagination="pagination"
        :columns="columns"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-button
            v-permission="{ permissionsTarget: ['ALT_DOCTOR'] }"
            type="text"
            size="small"
            @click="handleEdit(record)"
          >
            {{ $t('doctorProfilePage.columns.operations.edit') }}
          </a-button>
        </template>
      </a-table>
    </a-card>

    <!-- 编辑弹窗 -->
    <DoctorProfileModal
      :visible="modalVisible"
      :user-id="currentUserId"
      @cancel="handleModalCancel"
      @success="handleModalSuccess"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Message, type TableColumnData } from '@arco-design/web-vue';
  import useLoading from '@/hooks/loading';
  import {
    getAllDoctorProfiles,
    DoctorProfileListDTO,
    DoctorProfileGetRequestDTO,
  } from '@/api/doctor-profile';
  import { getAllDepartments, DepartmentListDTO } from '@/api/department';
  import { Pagination } from '@/types/global';
  import DoctorProfileModal from './doctor-profile-modal.vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';

  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);

  // 表单数据
  const formModel = reactive<DoctorProfileGetRequestDTO>({
    departmentId: undefined,
    title: '',
    pageNum: 1,
    pageSize: 10,
  });

  // 科室选项
  const departmentOptions = ref<DepartmentListDTO[]>([]);

  // 表格数据
  const renderData = ref<DoctorProfileListDTO[]>([]);
  const size = ref<SizeProps>('medium');

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
  const currentUserId = ref<number>();

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
      title: t('doctorProfilePage.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
      width: 80,
    },
    {
      title: t('doctorProfilePage.columns.userName'),
      dataIndex: 'userName',
    },
    {
      title: t('doctorProfilePage.columns.departmentName'),
      dataIndex: 'departmentName',
    },
    {
      title: t('doctorProfilePage.columns.title'),
      dataIndex: 'title',
    },
    {
      title: t('doctorProfilePage.columns.specialty'),
      dataIndex: 'specialty',
    },
    {
      title: t('doctorProfilePage.columns.operations.title'),
      dataIndex: 'operations',
      slotName: 'operations',
      width: 180,
      fixed: 'right',
    },
  ]);

  // 获取科室列表
  const fetchDepartments = async () => {
    try {
      const { data } = await getAllDepartments({
        pageNum: 1,
        pageSize: 1000,
      });
      departmentOptions.value = data.list;
    } catch (err) {
      // Message.error(t('doctorProfilePage.message.fetchDepartmentsError'));
    }
  };

  // 获取数据
  const fetchData = async () => {
    setLoading(true);
    try {
      const params: DoctorProfileGetRequestDTO = {
        ...formModel,
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      };
      const { data } = await getAllDoctorProfiles(params);
      renderData.value = data.list;
      pagination.total = data.total;
    } catch (err) {
      Message.error(t('doctorProfilePage.message.fetchError'));
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
    formModel.departmentId = undefined;
    formModel.title = '';
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

  // 编辑
  const handleEdit = (record: DoctorProfileListDTO) => {
    currentUserId.value = record.userId;
    modalVisible.value = true;
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
    fetchDepartments();
    fetchData();
  });
</script>

<style lang="less" scoped>
  .doctor-profile-list {
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
