<template>
  <div class="infoPanel">
    <a-descriptions
      :data="branchRecord"
      size="small"
      :title="$t('memberList.branchInfo')"
      :column="1"
    ></a-descriptions>
  </div>
</template>

<script lang="ts" setup>
  import { computed, defineProps, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const props = defineProps({
    branchName: {
      type: String,
      default: '',
    },
    branchInfo: {
      type: String,
      default: '',
    },
  });

  const branchRecord = computed(() => {
    return [
      {
        label: t('memberList.branchName'),
        value: props.branchName,
      },
      {
        label: t('memberList.branchDescription'),
        value: props.branchInfo,
      },
    ];
  });
</script>

<style lang="less" scoped>
  .infoPanel {
    caret-color: transparent;
  }
</style>
