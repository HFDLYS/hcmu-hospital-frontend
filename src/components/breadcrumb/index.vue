<template>
  <a-breadcrumb class="container-breadcrumb">
    <a-breadcrumb-item>
      <icon-apps />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in items" :key="item">
      {{ needTranslate ? $t(item) : item }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
  import { PropType, defineProps, computed } from 'vue';

  const props = defineProps({
    items: {
      type: Array as PropType<string[]>,
      default() {
        return [];
      },
    },
    needTranslate: {
      type: Boolean,
      default: true,
      required: false,
    },
  });

  const items = computed(() => props.items);
  const needTranslate = computed(() => props.needTranslate);
</script>

<style scoped lang="less">
  .container-breadcrumb {
    margin: 16px 0;
    :deep(.arco-breadcrumb-item) {
      color: rgb(var(--gray-6));
      &:last-child {
        color: rgb(var(--gray-8));
      }
    }
  }
</style>
