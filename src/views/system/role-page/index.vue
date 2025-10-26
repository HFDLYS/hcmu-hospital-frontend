<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.rolePage']" />
    <div class="layout">
      <div class="layout-left-side">
        <rolePanel :selected-role="selectedRole" :re-load="reLoad" />
      </div>
      <div class="layout-right-side">
        <permPanel
          :selected-role-id="selectedRoleId"
          :selected-type="selectedType"
          :re-load-signal="reLoadSignal"
          :selected-name="selectedName"
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
  const selectedType = ref<number>(0);
  const reLoadSignal = ref<boolean>(false);

  const reLoad = () => {
    reLoadSignal.value = !reLoadSignal.value;
    selectedName.value = '（请选择一个角色）';
  };

  const selectedRole = (roleId: number, roleName: string, type: number) => {
    selectedRoleId.value = roleId;
    selectedType.value = type;
    selectedName.value = roleName;
  };
</script>

<script lang="ts">
  export default {
    name: 'Role', // If you want the include property of keep-alive to take effect, you must name the component
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
