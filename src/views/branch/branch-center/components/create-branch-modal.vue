<template>
  <a-modal
    :visible="isCreateVisible"
    :title="$t('branchCenter.createBranch.title')"
    unmount-on-close
    draggable
    :ok-text="$t('branchCenter.createBranch.okText')"
    :cancel-text="$t('branchCenter.createBranch.cancelText')"
    @ok="handleCreateBranch"
    @cancel="handleCancelCreateBranch"
  >
    <a-form :model="branchForm">
      <a-form-item :label="$t('branchCenter.createBranch.branchName')" required>
        <a-input
          v-model="branchForm.branchName"
          :placeholder="$t('branchCenter.createBranch.branchName.placeholder')"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('branchCenter.createBranch.branchInfo')" required>
        <a-input
          v-model="branchForm.branchInfo"
          :placeholder="$t('branchCenter.createBranch.branchInfo.placeholder')"
        ></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, defineProps, PropType, ref, watch } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { createBranch, CreateBranchParams } from '@/api/branch';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const props = defineProps({
    isCreateVisible: {
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

  const generateBranchForm = () => {
    return {
      branchName: '',
      branchInfo: '',
    };
  };

  const branchForm = ref<CreateBranchParams>(generateBranchForm());
  const isCreateVisible = computed(() => props.isCreateVisible);

  const handleCreateBranch = async () => {
    try {
      await createBranch(branchForm.value);
      Message.success(
        `${branchForm.value.branchName} ${t(
          'branchCenter.createBranch.success'
        )}`
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

  const handleCancelCreateBranch = () => {
    props.setVisible(false);
  };

  watch(isCreateVisible, (val) => {
    if (val) {
      branchForm.value = generateBranchForm();
    }
  });
</script>
