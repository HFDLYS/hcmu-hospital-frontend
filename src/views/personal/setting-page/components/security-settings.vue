<template>
  <a-list :bordered="false">
    <a-list-item>
      <!--        修改密码-->
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph>
            {{ $t('userSetting.SecuritySettings.form.label.password') }}
          </a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph>
              {{ $t('userSetting.SecuritySettings.placeholder.password') }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link @click="showAlterPassword">
              {{ $t('userSetting.SecuritySettings.button.update') }}
            </a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <AlterPasswordPanel
      v-if="isAlterPasswordVisible"
      :close="hideAlterPassword"
    ></AlterPasswordPanel>

    <!--      重新绑定邮箱-->
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph>
            {{ $t('userSetting.SecuritySettings.form.label.email') }}
          </a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph>
              {{ $t('userSetting.SecuritySettings.placeholder.email') }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link @click="showAlterEmail">
              {{ $t('userSetting.SecuritySettings.button.update') }}
            </a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <AlterEmailPanel
      v-if="isAlterEmailVisible"
      :close="hideAlterEmail"
    ></AlterEmailPanel>
  </a-list>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useVisible from '@/hooks/visible';
  import AlterPasswordPanel from './alter-Password-panel.vue';
  import AlterEmailPanel from './alter-email-panel.vue';

  const {
    visible: isAlterEmailVisible,
    setVisible: setAlterEmailVisible,
    toggle: switchAlterEmailVisible,
  } = useVisible(false);

  const {
    visible: isAlterPasswordVisible,
    setVisible: setAlterPasswordVisible,
    toggle: switchAlterPasswordVisible,
  } = useVisible(false);

  // 显示AlterPassWord组件的函数
  const showAlterPassword = () => {
    switchAlterPasswordVisible();
  };

  const showAlterEmail = () => {
    switchAlterEmailVisible();
  };

  const hideAlterEmail = () => {
    setAlterEmailVisible(false);
  };

  // 隐藏AlterPassWord组件的函数
  const hideAlterPassword = () => {
    setAlterPasswordVisible(false);
  };
</script>

<style scoped lang="less">
  :deep(.arco-list-item) {
    border-bottom: none !important;

    .arco-typography {
      margin-bottom: 20px;
    }

    .arco-list-item-meta-avatar {
      margin-bottom: 1px;
    }

    .arco-list-item-meta {
      padding: 0;
    }
  }

  :deep(.arco-list-item-meta-content) {
    flex: 1;
    border-bottom: 1px solid var(--color-neutral-3);

    .arco-list-item-meta-description {
      display: flex;
      flex-flow: row;
      justify-content: space-between;

      .tip {
        color: rgb(var(--gray-6));
      }

      .operation {
        margin-right: 6px;
      }
    }
  }
</style>
