<template>
  <div class="container">
    <Breadcrumb :items="['menu.personnel', 'menu.personnel.personnelPage']" />
    <MemberList></MemberList>
  </div>
</template>

<script lang="ts" setup>
  import MemberList from './components/member-list.vue';
</script>

<script lang="ts">
  export default {
    name: 'Personnel', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px;
    //background-color: var(--color-fill-2);
  }
</style>
