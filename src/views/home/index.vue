<template>
  <div class="home-container">
    <a-result status="success" :title="$t('home.welcome')">
      <template #subtitle>
        {{ $t('home.subtitle') }}
      </template>
    </a-result>
  </div>
</template>

<script lang="ts" setup>
  // 空白首页
</script>

<style lang="less" scoped>
  .home-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 20px;
  }
</style>
