<template>
  <div class="container">
    <Breadcrumb :items="['menu.logPage', 'menu.logPage.logPage']" />
    <div class="logPanel">
      <a-card :title="$t('logPage.title')" class="general-card">
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
                  <a-form-item field="account" :label="$t('logPage.userName')">
                    <a-input
                      v-model="formModel.userName"
                      :placeholder="$t('logPage.userName.placeholder')"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item field="name" :label="$t('logPage.nickname')">
                    <a-input
                      v-model="formModel.nickname"
                      :placeholder="$t('logPage.nickname.placeholder')"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item field="name" :label="$t('logPage.operation')">
                    <a-input
                      v-model="formModel.operation"
                      :placeholder="$t('logPage.operation.placeholder')"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item field="name" :label="$t('logPage.ip')">
                    <a-input
                      v-model="formModel.ip"
                      :placeholder="$t('logPage.ip.placeholder')"
                    ></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-col>
          <a-divider style="height: 100px" direction="vertical"></a-divider>
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
          style="caret-color: transparent"
          @page-change="onPageChange"
        >
          <template #index="{ rowIndex }">
            {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
          </template>
          <template #operations>
            <!--            <a-button type="text" size="small">-->
            <!--              {{ $t('logPage.columns.operations.view') }}-->
            <!--            </a-button>-->
          </template>
        </a-table>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, watch, onMounted } from 'vue';
  import { Pagination } from '@/types/global';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Message, TableColumnData } from '@arco-design/web-vue';
  import cloneDeep from 'lodash/cloneDeep';
  import { findLogs, LogGetRequestDTO, LogRecord } from '@/api/log';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };
  const size = ref<SizeProps>('medium');
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const { t } = useI18n();
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
      title: t('logPage.columns.order'),
      dataIndex: 'index',
      slotName: 'index',
    },
    {
      title: t('logPage.columns.operationInfo'),
      dataIndex: 'operation',
    },
    {
      title: t('logPage.columns.useAccount'),
      dataIndex: 'userName',
    },
    {
      title: t('logPage.columns.nickname'),
      dataIndex: 'nickname',
    },
    {
      title: t('logPage.columns.ip'),
      dataIndex: 'ip',
    },
    {
      title: t('logPage.columns.operationTime'),
      dataIndex: 'createTime',
    },
    {
      title: t('logPage.columns.operation'),
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ]);

  const renderData = ref<LogRecord[]>([]);
  const { loading, setLoading } = useLoading(true);

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
      ip: '',
      operation: '',
      createTime: '',
    };
  };

  const formModel = ref(generateFormModel());

  const fetchData = async (
    params: LogGetRequestDTO = {
      ...formModel.value,
      pageNum: 1,
      pageSize: 20,
    }
  ) => {
    setLoading(true);
    try {
      const res = await findLogs(params);
      renderData.value = res.data.list;
      pagination.current = params.pageNum;
      pagination.total = res.data.total;
    } catch (err) {
      // you can report use errorHandler or other
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

<script lang="ts">
  export default {
    name: 'LogPage', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px;
  }
</style>
