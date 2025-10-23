<template>
  <div class="container">
    <a-card
      class="perm-card"
      :loading="loading"
      title="系统权限"
      :bordered="true"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{
        height: 'auto',
        paddingTop: '16px',
        overflow: 'auto',
        caretColor: 'transparent',
      }"
    >
      <a-space size="small" wrap>
        <a-checkbox-group
          v-model="permListById"
          @change="changePermList($event as number[])"
        >
          <a-grid
            :cols="{ xs: 1, sm: 2, md: 3, lg: 4 }"
            :col-gap="12"
            :row-gap="10"
            class="grid-demo-grid"
          >
            <a-grid-item v-for="perm in permList" :key="perm.permissionId">
              <a-checkbox
                :value="perm.permissionId"
                :disabled="disabled"
                style="font-size: 17px"
              >
                {{ perm.name }}
              </a-checkbox>
            </a-grid-item>
          </a-grid>
        </a-checkbox-group>
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue';

  interface PermItem {
    permissionId: number;
    name: string;
  }

  const props = defineProps({
    permList: {
      type: Array as () => PermItem[],
      required: true,
      default: () => [],
    },
    permListById: {
      type: Array as () => number[],
      required: true,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    changePermList: {
      type: Function as PropType<(permListById: number[]) => void>,
      required: true,
    },
  });

  const permList = computed(() => props.permList);
  const loading = computed(() => props.loading);
  const disabled = computed(() => props.disabled);
  const permListById = computed(() => props.permListById);
  const changePermList = computed(() => props.changePermList);
</script>

<style lang="less" scoped>
  .grid-demo-grid .demo-item,
  .grid-demo-grid .demo-suffix {
    height: 48px;
    line-height: 48px;
    color: var(--color-white);
    text-align: center;
  }
</style>
