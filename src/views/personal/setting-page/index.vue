<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.personal.setting']" />
    <a-row style="margin-bottom: 16px">
      <a-col :span="24">
        <UserPanel :update-signal="signal" />
      </a-col>
    </a-row>
    <a-row class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" :title="$t('userSetting.tab.basicInformation')">
            <BasicInformation :send-update-signal="toggle" />
          </a-tab-pane>
          <a-tab-pane key="2" :title="$t('userSetting.tab.securitySettings')">
            <security-settings />
          </a-tab-pane>
          <!--                    <a-tab-pane key="3" :title="$t('userSetting.tab.certification')">-->
          <!--                      <Certification />-->
          <!--                    </a-tab-pane>-->
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import useSignal from '@/hooks/signal';
  import SecuritySettings from '@/views/personal/setting-page/components/security-settings.vue';
  import UserPanel from './components/user-panel.vue';
  import BasicInformation from './components/basic-information.vue';

  const { signal, toggle } = useSignal();
</script>

<script lang="ts">
  export default {
    name: 'Setting',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px;
  }

  .wrapper {
    min-height: 580px;
    padding: 20px 0 0 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  :deep(.section-title) {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 14px;
  }
</style>
