<template>
  <div class="container">
    <Breadcrumb :items="['menu.personal', 'menu.personal.personalPage']" />
    <UserInfoHeader :user-id="userId"></UserInfoHeader>
    <div class="content">
      <div
        v-if="checkSimplePerm({ permissionsTarget: ['PROJ_CENTER_PAGE'] })"
        class="content-up"
      >
      </div>
      <!--      <div class="content-down">-->
      <!--        <a-grid :cols="3" :col-gap="16">-->
      <!--          <a-grid-item :span="2">-->
      <!--            <LatestActivity />-->
      <!--          </a-grid-item>-->
      <!--          <a-grid-item :span="1">-->
      <!--            <LatestNotification />-->
      <!--          </a-grid-item>-->
      <!--        </a-grid>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { useUserStore } from '@/store';
  import { UserState } from '@/store/modules/user/types';
  import { checkSimplePerm } from '@/utils/permission';
  import UserInfoHeader from './components/user-info-header.vue';
  import LatestNotification from './components/latest-notification.vue';
  import MyProject from './components/my-project.vue';
  import LatestActivity from './components/latest-activity.vue';

  const route = useRoute();
  const userStore = useUserStore() as UserState;
  const userId = ref<number>(0);

  if (!Number.isNaN(parseInt(route.query.userId as string, 10))) {
    userId.value = Number(route.query.userId);
  } else {
    userId.value = userStore.userId;
  }
</script>

<script lang="ts">
  export default {
    name: 'Personal', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px;
    caret-color: transparent;
  }

  .content {
    display: flex;
    flex-direction: column;
    margin-top: 12px;

    &-up {
      flex: 1;
      overflow: hidden;
      // background-color: var(--color-bg-2);
      :deep(.arco-tabs-nav-tab) {
        margin-left: 16px;
      }
    }

    &-down {
      margin-top: 16px;
    }

    .tab-pane-wrapper {
      padding: 0 16px 16px;
    }
  }
</style>

<style lang="less" scoped>
  .mobile {
    .content {
      display: block;

      &-up {
        margin-right: 0;
        margin-bottom: 16px;
      }

      &-down {
        width: 100%;
      }
    }
  }
</style>
