<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.importPage']" />
    <ImportList />
  </div>
</template>

<script lang="ts" setup>
  import ImportList from './components/import-list.vue';
</script>

<script lang="ts">
  export default {
    name: 'ImportPage',
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px;
  }
</style>
