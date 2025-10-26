<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.branch',
        'menu.branch.branchCenter',
        'menu.branch.projectList',
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  console.log(route.query.branchId);
</script>

<script lang="ts">
  export default {
    name: 'BranchProjectList',
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px;
  }
</style>
