<template>
  <div class="member-list">
    <a-card class="general-card" title="人事管理">
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
                <a-form-item field="account" label="用户账号">
                  <a-input
                    v-model="formModel.userAccount"
                    placeholder="请输入用户账号"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item field="name" label="用户姓名">
                  <a-input
                    v-model="formModel.userName"
                    placeholder="请输入用户姓名"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item field="name" label="角色名称">
                  <a-input
                    v-model="formModel.roleName"
                    placeholder="请输入角色名称"
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
              查询
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh></icon-refresh>
              </template>
              重置
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
          <a-tooltip content="刷新">
            <div class="action-icon" @click="search">
              <icon-refresh size="18"></icon-refresh>
            </div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip content="密度">
              <div class="action-icon">
                <icon-line-height size="18"></icon-line-height>
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

      <a-table
        row-key="id"
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
          <a-space :size="size" direction="horizontal">
            <a-button
              :size="size"
              status="success"
              @click="handleView(record.userId)"
            >
              查看
            </a-button>
            <a-button
              :size="size"
              style="background-color: rgba(39, 159, 184, 0.65)"
              @click="handleEdit(record.userId)"
            >
              修改角色
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
  import { ref, reactive, computed, onMounted } from 'vue';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import { Message, TableColumnData } from '@arco-design/web-vue';
  import RoleChangeModal from './role-change-modal.vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  const size = ref<SizeProps>('medium');

  interface MemberRecord {
    userId: number;
    userAccount: string;
    userName: string;
    roleName: string;
  }

  const isEditVisible = ref(false);
  const editedUserId = ref<number>(0);

  const setEditVisible = (visible: boolean) => {
    isEditVisible.value = visible;
  };

  const handleEdit = (userId: number) => {
    editedUserId.value = userId;
    isEditVisible.value = true;
  };

  const handleView = (userId: number) => {
    Message.info(`查看用户 ${userId} 的详细信息`);
  };

  const densityList = computed(() => [
    {
      name: '迷你',
      value: 'mini',
    },
    {
      name: '偏小',
      value: 'small',
    },
    {
      name: '中等',
      value: 'medium',
    },
    {
      name: '偏大',
      value: 'large',
    },
  ]);

  const columns = computed<TableColumnData[]>(() => [
    {
      title: '序号',
      dataIndex: 'index',
      slotName: 'index',
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
    },
    {
      title: '用户姓名',
      dataIndex: 'userName',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slotName: 'operations',
    },
  ]);

  // 模拟数据
  const renderData = ref<MemberRecord[]>([
    {
      userId: 1,
      userAccount: 'admin',
      userName: '管理员',
      roleName: '超级管理员',
    },
    {
      userId: 2,
      userAccount: 'doctor01',
      userName: '张医生',
      roleName: '医生',
    },
    {
      userId: 3,
      userAccount: 'patient01',
      userName: '李同学',
      roleName: '患者',
    },
    {
      userId: 4,
      userAccount: 'manager01',
      userName: '王主任',
      roleName: '管理员',
    },
  ]);

  const { loading, setLoading } = useLoading(false);

  const basePagination: Pagination = {
    current: 1,
    pageSize: 10,
    total: 4,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const generateFormModel = () => {
    return {
      userAccount: '',
      userName: '',
      roleName: '',
    };
  };

  const formModel = ref(generateFormModel());

  const fetchData = async () => {
    setLoading(true);
    try {
      // 这里应该调用API获取数据
      // const res = await getAllUsers(params);
      // renderData.value = res.data.list;
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 500);
      });
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
    pagination.current = pageNum;
    fetchData();
  };

  const search = () => {
    fetchData();
  };

  const reset = () => {
    formModel.value = generateFormModel();
    fetchData();
  };

  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined
  ) => {
    size.value = val as SizeProps;
  };
</script>

<style lang="less" scoped>
  .member-list {
    caret-color: transparent;

    :deep(.arco-form-item-label-col) {
      white-space: nowrap;
    }
  }

  .action-icon {
    display: inline-block;
    margin-left: 12px;
    cursor: pointer;
  }

  .action-icon:hover {
    color: rgb(var(--arcoblue-6));
  }

  .general-card {
    :deep(.arco-card-header) {
      border-bottom: 1px solid var(--color-border);
    }
  }
</style>
