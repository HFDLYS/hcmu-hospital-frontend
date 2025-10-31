<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.departmentPage']" />
    <DepartmentList />
  </div>
</template>

<script lang="ts" setup>
  import DepartmentList from './components/department-list.vue';
</script>

<script lang="ts">
  export default {
    name: 'DepartmentPage',
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px;
  }
</style>
