<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.doctorProfilePage']" />
    <DoctorProfileList />
  </div>
</template>

<script lang="ts" setup>
  import DoctorProfileList from './components/doctor-profile-list.vue';
</script>

<script lang="ts">
  export default {
    name: 'DoctorProfilePage',
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px;
  }
</style>
