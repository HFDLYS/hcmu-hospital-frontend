<template>
  <div class="container">
    <Breadcrumb :items="['menu.branch', 'menu.branch.branchCenter']" />
    <div class="list-wrap">
      <a-typography-title class="block-title" :heading="6">
        {{ $t('branchCenter.panel') }}
      </a-typography-title>
      <a-row class="list-row" :gutter="24">
        <a-col
          v-for="item in renderData"
          :key="item.branchId"
          class="list-col"
          :xs="12"
          :sm="12"
          :md="12"
          :lg="6"
          :xl="6"
          :xxl="6"
        >
          <CardWrap
            :loading="loading"
            :branch-id="item.branchId"
            :title="item.branchName"
            :description="item.branchInfo"
            :to-member-txt="$t('branchCenter.branchDetail')"
            :close-txt="$t('branchCenter.projectList')"
            :show-tag="false"
            :reload="fetchData"
          >
            <!--            <a-descriptions-->
            <!--              style="margin-top: 16px"-->
            <!--              :data="item.data"-->
            <!--              layout="inline-horizontal"-->
            <!--              :column="2"-->
            <!--            />-->
            <template #skeleton>
              <a-skeleton :animation="true">
                <a-skeleton-line
                  :widths="['50%', '50%', '100%', '40%']"
                  :rows="4"
                />
                <a-skeleton-line :widths="['40%']" :rows="1" />
              </a-skeleton>
            </template>
          </CardWrap>
        </a-col>
        <a-col
          v-permission="{ permissionsTarget: ['ADD_BRAN'] }"
          :xs="12"
          :sm="12"
          :md="12"
          :lg="6"
          :xl="6"
          :xxl="6"
          class="list-col"
        >
          <div class="card-wrap empty-wrap">
            <a-card :bordered="false" hoverable @click="create">
              <a-result :status="null" :title="$t('branchCenter.add')">
                <template #icon>
                  <icon-plus style="font-size: 20px" />
                </template>
              </a-result>
            </a-card>
          </div>
        </a-col>
      </a-row>
    </div>
    <CreateBranchModal
      :is-create-visible="isCreateVisible"
      :set-visible="setVisible"
      :reload="fetchData"
    ></CreateBranchModal>
  </div>
</template>

<script lang="ts" setup>
  import { findAllBranches, BranchRecord } from '@/api/branch';
  import useRequest from '@/hooks/request';
  import { onMounted, ref } from 'vue';
  import CardWrap from './components/card-wrap.vue';
  import CreateBranchModal from './components/create-branch-modal.vue';

  const loading = ref(false);
  const renderData = ref<BranchRecord[]>([]);
  const defaultValue: BranchRecord[] = [{} as BranchRecord];

  const isCreateVisible = ref(false);

  const setVisible = (visible: boolean) => {
    isCreateVisible.value = visible;
  };

  const create = () => {
    isCreateVisible.value = true;
  };

  const fetchData = async () => {
    const res = await useRequest<BranchRecord[]>(findAllBranches, defaultValue);
    renderData.value = res.response.value;
    loading.value = res.loading.value;
  };

  onMounted(() => {
    fetchData();
  });
</script>

<script lang="ts">
  export default {
    name: 'BranchCenter',
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px;
  }

  .card-wrap {
    height: 100%;
    border: 1px solid var(--color-neutral-3);
    transition: all 0.3s;

    &:hover {
      transform: translateY(-4px);
    }

    :deep(.arco-card-meta-description) {
      color: rgb(var(--gray-6));

      .arco-descriptions-item-label-inline {
        color: rgb(var(--gray-6));
        font-weight: normal;
        font-size: 12px;
      }

      .arco-descriptions-item-value-inline {
        color: rgb(var(--gray-8));
      }
    }
  }

  .empty-wrap {
    height: 100%;
    border-radius: 4px;

    :deep(.arco-card) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      border-radius: 4px;

      .arco-result-title {
        color: rgb(var(--gray-6));
      }
    }
  }

  :deep(.list-wrap) {
    // min-height: 140px;
    .list-row {
      align-items: stretch;

      .list-col {
        margin-bottom: 16px;
      }
    }

    :deep(.arco-space) {
      width: 100%;

      .arco-space-item {
        &:last-child {
          flex: 1;
        }
      }
    }
  }
</style>
