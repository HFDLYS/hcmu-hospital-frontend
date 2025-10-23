<template>
  <a-card
    class="role-panel"
    title="角色列表"
    :bordered="false"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{
      height: '100%',
      paddingTop: '16px',
      display: 'flex',
      flexFlow: 'column',
      caretColor: 'transparent',
    }"
  >
    <a-space size="medium" direction="vertical">
      <role-card
        :select-role="selectRole"
        :loading="loading"
        :role-list="roleList"
        :re-load="reLoad"
      />
    </a-space>
  </a-card>
</template>

<script lang="ts" setup>
  import { defineProps, ref, PropType, onMounted } from 'vue';
  import roleCard from './role-card.vue';

  interface RoleItem {
    roleId: number;
    roleName: string;
    roleInfo: string;
  }

  const loading = ref(false);
  const roleList = ref<RoleItem[]>([
    {
      roleId: 1,
      roleName: '超级管理员',
      roleInfo: '拥有所有权限',
    },
    {
      roleId: 2,
      roleName: '管理员',
      roleInfo: '医院的管理者',
    },
    {
      roleId: 3,
      roleName: '患者',
      roleInfo: '哈基米大学的学生患者',
    },
    {
      roleId: 4,
      roleName: '医生',
      roleInfo: '哈基米大学注册医师',
    },
  ]);

  const props = defineProps({
    selectedRole: {
      type: Function as PropType<(roleId: number, roleName: string) => void>,
      required: true,
    },
    reLoad: {
      type: Function as PropType<() => void>,
      required: true,
    },
  });

  const selectRole = (roleId: number, roleName: string) => {
    props.selectedRole(roleId, roleName);
  };

  const reLoad = () => {
    // 重新加载角色列表
    props.reLoad();
  };

  onMounted(() => {
    loading.value = false;
  });
</script>

<style lang="less" scoped>
  .role-panel {
    height: 100%;
  }
</style>
