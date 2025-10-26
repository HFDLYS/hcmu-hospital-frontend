<template>
  <a-card class="general-card" :title="$t('userInfo.title.recentProject')">
    <template #extra>
      <!--        TODO: 暂时这样做-->
      <a-button
        v-if="userStore.isSelf(props.userId)"
        type="text"
        @click="onShowMore"
        >{{ $t('userInfo.showMore') }}</a-button
      >
    </template>
    <div v-show="isEmpty" class="icon-empty">
      <icon-empty :size="50" />
    </div>
    <a-row v-show="!isEmpty" :gutter="16">
      <a-col
        v-for="(project, index) in projectList"
        :key="index"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="8"
        :xxl="8"
        class="my-project-item"
      >
        <a-card>
          <a-skeleton v-if="loading" :loading="loading" :animation="true">
            <a-skeleton-line :rows="3" />
          </a-skeleton>
          <a-space v-else direction="vertical">
            <a-typography-text bold>{{
              project.projectName
            }}</a-typography-text>
            <a-typography-text type="secondary">
              {{ roughlyShow(project.info, 27) }}
            </a-typography-text>
          </a-space>
          <template #actions>
            <a-button
              v-if="userStore.isSelf(props.userId)"
              :loading="project.loading"
              type="primary"
              size="small"
              @click="redirect(router, project)"
            >
              {{ $t('userInfo.project.view') }}
            </a-button>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
  import { onMounted, ref, defineProps } from 'vue';
  import { getProjectByUserId } from '@/api/user';
  import useLoading from '@/hooks/loading';
  import { useUserStore } from '@/store';
  import { Router, useRouter } from 'vue-router';
  import { redirectToProject } from '@/utils/switch-page';
  import { Message } from '@arco-design/web-vue';
  import roughlyShow from '@/utils/roughlyShow';

  interface TempProjectRecord {
    projectId: number;
    projectName: string;
    labelId: number;
    info: string;
    roleName: string;
    loading: boolean;
  }

  const { loading } = useLoading();
  const router = useRouter();
  const projectList = ref<TempProjectRecord[]>([]);
  const userStore = useUserStore();
  const isEmpty = ref(true);
  const props = defineProps({
    userId: {
      type: Number,
      required: true,
    },
  });

  const redirect = async (r: Router, project: TempProjectRecord) => {
    try {
      project.loading = true; // Set loading state for the specific project
      await redirectToProject(r, project.projectId);
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    } finally {
      project.loading = false; // Reset loading state for the specific project
    }
  };

  const fetchData = async () => {
    loading.value = true;
    try {
      const res = await getProjectByUserId(props.userId, {
        pageNum: 1,
        pageSize: 6,
      });
      const listWithLoading = res.data.list.map((item) => ({
        ...item,
        loading: false, // Add loading state to each project
      }));
      projectList.value = listWithLoading;
      if (projectList.value.length > 0) {
        isEmpty.value = false;
      }
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    }
    loading.value = false;
  };

  const onShowMore = () => {
    router.push({
      name: 'ProjectCenter',
    });
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style scoped lang="less">
  .icon-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }

  :deep(.arco-card-body) {
    min-height: 128px;
    padding-bottom: 0;
  }

  .my-project {
    &-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    &-title {
      margin-top: 0 !important;
      margin-bottom: 18px !important;
    }

    &-list {
      display: flex;
      justify-content: space-between;
    }

    &-item {
      // padding-right: 16px;
      margin-bottom: 16px;

      &:last-child {
        padding-right: 0;
      }
    }
  }
</style>
