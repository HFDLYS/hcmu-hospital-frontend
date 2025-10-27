<template>
  <div class="container">
    <div class="logo">
      <img alt="logo" :src="logo" style="width: auto; height: 30px" />
      <h1 class="logo-text">{{ $t('login.brand') }}</h1>
    </div>
    <div class="content">
      <div class="header">
        <a-space size="small">
          <a-tooltip :content="$t('settings.language')">
            <a-button
              class="nav-btn"
              type="outline"
              :shape="'circle'"
              @click="setDropDownVisible"
            >
              <template #icon>
                <icon-language />
              </template>
            </a-button>
          </a-tooltip>
          <a-dropdown trigger="click" @select="changeLocale as any">
            <div ref="triggerBtn" class="trigger-btn"></div>
            <template #content>
              <a-doption
                v-for="item in locales"
                :key="item.value"
                :value="item.value"
              >
                <template #icon>
                  <icon-check v-show="item.value === currentLocale" />
                </template>
                {{ item.label }}
              </a-doption>
            </template>
          </a-dropdown>

          <a-tooltip
            :content="
              theme === 'light'
                ? $t('settings.navbar.theme.toDark')
                : $t('settings.navbar.theme.toLight')
            "
          >
            <a-button
              class="nav-btn"
              type="outline"
              :shape="'circle'"
              @click="handleToggleTheme"
            >
              <template #icon>
                <icon-moon-fill v-if="theme === 'dark'" />
                <icon-sun-fill v-else />
              </template>
            </a-button>
          </a-tooltip>
        </a-space>
      </div>
      <div class="content-inner">
        <LoginForm></LoginForm>
      </div>
      <div class="footer">
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import useLocale from '@/hooks/locale';
  import { LOCALE_OPTIONS } from '@/locale';
  import { useAppStore } from '@/store';
  import { useDark, useToggle } from '@vueuse/core';
  import Footer from '@/components/footer/index.vue';
  import logo from '@/assets/images/logo.png';
  import LoginBanner from './components/banner.vue';
  import LoginForm from './components/login-form.vue';

  const appStore = useAppStore();
  const triggerBtn = ref();
  const { changeLocale, currentLocale } = useLocale();
  const locales = [...LOCALE_OPTIONS];

  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      // overridden default behavior
      appStore.toggleTheme(dark);
    },
  });

  const toggleTheme = useToggle(isDark);

  const theme = computed(() => {
    return appStore.theme;
  });

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    triggerBtn.value.dispatchEvent(event);
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    .banner {
      width: 550px;
      background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }

    .header {
      position: absolute;
      top: 10px;
      right: 20px;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      font-size: 20px;
      color: var(--color-text-1);
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
