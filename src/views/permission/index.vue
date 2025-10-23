<template>
  <div class="container">
    <div class="layout">
      <div class="layout-left-side">
        <role-panel :selected-role="selectedRole" :re-load="reLoad" />
      </div>
      <div class="layout-right-side">
        <perm-panel
          :selected-role-id="selectedRoleId"
          :selected-name="selectedName"
          :re-load-signal="reLoadSignal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import rolePanel from './components/role-panel.vue';
  import permPanel from './components/perm-panel.vue';

  const selectedRoleId = ref<number>(0);
  const selectedName = ref<string>('（请选择一个角色）');
  const reLoadSignal = ref<boolean>(false);

  const selectedRole = (roleId: number, roleName: string) => {
    selectedRoleId.value = roleId;
    selectedName.value = roleName;
  };

  const reLoad = () => {
    reLoadSignal.value = !reLoadSignal.value;
    selectedName.value = '（请选择一个角色）';
  };
</script>

<script lang="ts">
  export default {
    name: 'Permission',
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px;
  }

  .layout {
    display: flex;

    &-left-side {
      flex: 1;
      margin: 0 10px;
    }

    &-right-side {
      flex: 2;
      margin: 0 10px;
    }
  }

  @media (max-width: @screen-lg) {
    .layout {
      flex-direction: column;
    }
  }
</style>
