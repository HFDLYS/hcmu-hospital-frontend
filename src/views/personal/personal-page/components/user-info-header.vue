<template>
  <div class="header">
    <a-space :size="5" direction="vertical" align="center">
      <a-avatar :size="64">
        <template #trigger-icon>
          <icon-camera />
        </template>
        <img :src="userInfo.avatar" />
      </a-avatar>
      <a-typography-title :heading="6" style="margin: 0">
        {{ userInfo.nickname }}
      </a-typography-title>

      <div class="user-msg">
        <a-space :size="18">
          <div>
            <icon-user />
            <a-typography-text>{{ userInfo.userName }}</a-typography-text>
          </div>
          <div>
            <icon-phone />
            <a-typography-text>
              {{ userInfo.phone }}
            </a-typography-text>
          </div>
          <div>
            <icon-email />
            <a-typography-text>{{ userInfo.email }}</a-typography-text>
          </div>
          <div>
            <icon-branch />
            <a-typography-text
              ><a-link style="color: #76d4e8" @click="onBranchClick">{{
                userInfo.branchName
              }}</a-link></a-typography-text
            >
          </div>
        </a-space>
      </div>
      <!--      <a-upload :show-file-list="false" :custom-request="handleUpload">-->
      <!--        <a-button>Click to Upload </a-button>-->
      <!--      </a-upload>-->
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store';
  import { uploadFile } from '@/api/user-center';
  import { RequestOption } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import { defineProps, onMounted, ref } from 'vue';
  import { UserState } from '@/store/modules/user/types';
  import { getUserById } from '@/api/user';

  const isScoreHistoryVisible = ref(false);
  const userStore = useUserStore() as UserState;
  const userInfo = ref<UserState>({
    userId: 0,
    nickname: '',
    userName: '',
    permissions: [],
    score: 0,
    contribution: 0,
    avatar: '',
    roleId: 0,
    roleName: '',
  });
  const router = useRouter();

  const props = defineProps({
    userId: {
      type: Number,
      required: true,
    },
  });

  const fetchData = async () => {
    if (props.userId !== userStore.userId) {
      const res = await getUserById(props.userId);
      userInfo.value = res.data as UserState;
    } else {
      userInfo.value = userStore as UserState;
    }
  };

  const handleUpload = async (option: RequestOption) => {
    try {
      await uploadFile(option.fileItem.file as File);
    } catch (error) {
      console.log(error);
    }
  };

  const onBranchClick = () => {
    if (userInfo.value.branchId) {
      router.push({
        name: 'BranchDetail',
        query: {
          branchId: userInfo.value.branchId,
        },
      });
    } else {
      console.log('branchId is null');
    }
  };

  const onScoreClick = () => {
    isScoreHistoryVisible.value = true;
  };

  const handleScoreHistoryOk = () => {
    isScoreHistoryVisible.value = false;
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style scoped lang="less">
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 210px;
    color: var(--gray-10);
    background: url('//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image')
      no-repeat;
    background-size: cover;
    border-radius: 4px;

    :deep(.arco-avatar-trigger-icon-button) {
      color: rgb(var(--arcoblue-6));

      :deep(.arco-icon) {
        vertical-align: -1px;
      }
    }

    .user-msg {
      .arco-icon {
        color: rgb(var(--gray-10));
      }

      .arco-typography {
        margin-left: 6px;
      }
    }

    .user-score {
      margin-bottom: 0;
    }
  }
</style>
