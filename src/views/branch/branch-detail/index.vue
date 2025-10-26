<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.branch',
        'menu.branch.branchCenter',
        'menu.branch.branchDetail',
      ]"
    />
    <a-card
      class="general-card"
      :title="branchInfo.branchName"
      :loading="loading"
    >
      <template #extra>
        <a-button
          v-if="!loading"
          v-inner-permission="{
            permissionsTarget: ['ADD_BRAN'],
            permissions: perms,
          }"
          type="primary"
          @click="onEdit"
        >
          {{ $t('branchDetail.edit.title') }}
        </a-button>
      </template>
      <InfoPanel
        :branch-info="branchInfo.branchInfo"
        :branch-name="branchInfo.branchName"
      ></InfoPanel>
      <a-divider />
      <MemberList
        v-if="
          checkInnerPerm({
            permissionsTarget: ['CHECK_BRAN_MB_INFO'],
            permissions: perms,
          })
        "
        :branch-id="branchInfo.branchId"
        :permissions="perms"
      ></MemberList>
    </a-card>
    <EditBranchModal
      :reload="fetchData"
      :is-edit-visible="isEditVisible"
      :set-visible="setEditVisible"
      :branch="branchInfo"
    ></EditBranchModal>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { getBranchById, BranchRecord } from '@/api/branch';
  import useLoading from '@/hooks/loading';
  import { loadBranchPermissions } from '@/hooks/loadPermissions';
  import { PermissionType } from '@/store/modules/app/types';
  import useVisible from '@/hooks/visible';
  import { Message } from '@arco-design/web-vue';
  import { checkInnerPerm } from '@/utils/permission';
  import InfoPanel from './component/info-panel.vue';
  import MemberList from './component/member-list.vue';
  import EditBranchModal from './component/edit-branch-modal.vue';

  const router = useRouter();
  const route = useRoute();
  const { loading, setLoading } = useLoading(true);
  const { visible: isEditVisible, setVisible: setEditVisible } =
    useVisible(false);

  const perms = ref<PermissionType[]>([]);
  const branchInfo = reactive<BranchRecord>({
    branchId: 0,
    branchName: '',
    branchInfo: '',
  });

  const branchId = parseInt(route.query.branchId as any, 10);

  // 如果没有接收到正确的参数，就跳转到项目中心页面
  if (Number.isNaN(branchId)) {
    router.push({ name: 'BranchCenter' });
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const renderData = (await getBranchById(branchId)).data;
      branchInfo.branchId = renderData.branchId;
      branchInfo.branchName = renderData.branchName;
      branchInfo.branchInfo = renderData.branchInfo;

      // 加载父窗体权限列表
      perms.value = await loadBranchPermissions(renderData.branchId);
    } catch (err) {
      if (err)
        if (err instanceof Error) {
          Message.error(err.message);
        } else {
          // 处理非 Error 类型的错误
          Message.error(String(err));
        }
    } finally {
      setLoading(false);
    }
  };

  const onEdit = () => {
    setEditVisible(true);
  };

  onMounted(() => {
    fetchData();
  });
</script>

<script lang="ts">
  export default {
    name: 'BranchMemberList',
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px;
  }
</style>
