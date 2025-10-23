<template>
  <div class="container">
    <MemberList></MemberList>
  </div>
</template>

<script lang="ts" setup>
  import MemberList from './components/member-list.vue';
</script>

<script lang="ts">
  export default {
    name: 'Personnel',
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px;
  }
</style>
