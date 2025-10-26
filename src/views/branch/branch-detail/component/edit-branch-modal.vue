<template>
  <a-modal
    :visible="isEditVisible"
    :title="$t('branchDetail.edit.title')"
    unmount-on-close
    draggable
    :ok-text="$t('branchDetail.edit.okText')"
    :cancel-text="$t('branchDetail.edit.cancelText')"
    @ok="handleEditBranch"
    @cancel="handleCancelEditBranch"
  >
    <a-form :model="branchForm">
      <a-form-item :label="$t('memberList.branchName')">
        <a-input v-model="branchForm.branchName"></a-input>
      </a-form-item>
      <a-form-item :label="$t('memberList.branchInfo')">
        <a-input v-model="branchForm.branchInfo"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, defineProps, PropType, ref, watch } from 'vue';
  import { BranchRecord, updateBranch, UpdateBranchParams } from '@/api/branch';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    branch: {
      type: Object as PropType<BranchRecord>,
      required: true,
    },
    isEditVisible: {
      type: Boolean,
      required: true,
    },
    setVisible: {
      type: Function as PropType<(bool: boolean) => void>,
      required: true,
    },
    reload: {
      type: Function as PropType<() => void>,
      required: true,
    },
  });

  const isEditVisible = computed(() => props.isEditVisible);
  const branch = computed(() => props.branch);
  const { t } = useI18n();

  const generateBranchForm = () => {
    return {
      branchName: '',
      branchInfo: '',
    };
  };

  const branchForm = ref<UpdateBranchParams>(generateBranchForm());

  const handleEditBranch = async () => {
    try {
      await updateBranch(branch.value.branchId, branchForm.value);
      Message.success(
        `${branchForm.value.branchName} ${t('branchDetail.edit.success')}`
      );
      props.reload();
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    }
    props.setVisible(false);
  };

  const handleCancelEditBranch = () => {
    props.setVisible(false);
  };

  watch(isEditVisible, (val) => {
    if (val) {
      branchForm.value = {
        branchName: branch.value.branchName,
        branchInfo: branch.value.branchInfo,
      };
    }
  });
</script>
