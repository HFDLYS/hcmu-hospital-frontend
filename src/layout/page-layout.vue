<template>
  <router-view v-slot="{ Component, route }">
    <!--进入离开效果-->
    <transition name="fade" mode="out-in" appear>
      <component
        :is="Component"
        v-if="route.meta.ignoreCache"
        :key="route.fullPath"
      />
      <keep-alive v-else :include="cacheList">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useTabBarStore } from '@/store';

  const tabBarStore = useTabBarStore();

  const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="less">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  // 缩放
  .scale-enter-active,
  .scale-leave-active {
    transition: all 0.5s ease;
  }

  .scale-enter-from,
  .scale-leave-to {
    transform: scale(0.9);
    opacity: 0;
  }
  // 滑动
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.75s ease-out;
  }

  .slide-enter-to {
    position: absolute;
    right: 0;
  }

  .slide-enter {
    position: absolute;
    right: -100%;
  }

  .slide-leave-to {
    position: absolute;
    left: -100%;
  }

  .slide-leave {
    position: absolute;
    left: 0;
  }
  // 设置滑动过渡必须给每个组件设定宽度
  .wrapper {
    width: 100%;
    // min-height: 100vh;
    // background: chartreuse;
  }
</style>
