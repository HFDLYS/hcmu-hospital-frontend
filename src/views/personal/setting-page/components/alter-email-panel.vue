<template>
  <a-form :model="formData">
    <a-form-item
      :label="$t('userSetting.changeEmail.form.newEmail')"
      :disabled="!emailAvailable"
    >
      <a-input
        v-model="formData.email"
        allow-clear
        class="input"
        :placeholder="$t('userSetting.changeEmail.form.newEmailPlaceholder')"
      >
      </a-input>
    </a-form-item>
    <a-form-item :label="$t('userSetting.changeEmail.form.code')">
      <a-row :gutter="15">
        <a-col :span="22">
          <a-input
            v-model="formData.code"
            allow-clear
            :placeholder="$t('resetPassword.form.codePlaceholder')"
          >
            <template #prefix>
              <icon-stamp />
            </template>
          </a-input>
        </a-col>
        <a-col :span="2">
          <a-button
            type="primary"
            :loading="sendCodeLoading"
            :disabled="!canResend && countdownSeconds > 0"
            @click="handleSendCode"
          >
            <template v-if="canResend || countdownSeconds === 0">
              {{ $t('userSetting.changeEmail.send') }}
            </template>
            <template v-else>
              {{ countdownSeconds }} {{ $t('userSetting.changeEmail.tip') }}
            </template>
          </a-button>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item wrapper-col="{ span: 18, offset: 6 }">
      <a-space size="medium">
        <a-button type="primary" @click="handleChangeEmail">
          {{ $t('userSetting.changeEmail.title') }}
        </a-button>
        <a-button type="dashed" @click="props.close">
          {{ $t('userSetting.changeEmail.cancel') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { defineProps, ref } from 'vue';
  import { PropType } from 'vue-demi';
  import {
    applyUpdateEmail,
    ApplyUpdateEmailParams,
    verifyEmailCode,
  } from '@/api/user';
  import useLoading from '@/hooks/loading';
  import { useI18n } from 'vue-i18n';
  import { useUserStore } from '@/store';

  import { Message } from '@arco-design/web-vue';

  const { loading: sendCodeLoading, setLoading } = useLoading(false);
  const emailAvailable = ref<boolean>(true);
  const countdownSeconds = ref<number>(0);
  const canResend = ref<boolean>(true);
  const { t } = useI18n();
  const userStore = useUserStore();

  const props = defineProps({
    close: {
      type: Function as PropType<() => void>,
      required: true,
    },
  });

  const formData = ref<ApplyUpdateEmailParams>({
    email: '',
    code: '',
  });

  const handleSendCode = async () => {
    try {
      setLoading(true);
      await applyUpdateEmail(formData.value);
      Message.success(
        `${t('userSetting.changeEmail.sendCodeSuccess')} ${
          formData.value.email
        }`
      );
      setLoading(false);
      countdownSeconds.value = 60;
      canResend.value = false;
      emailAvailable.value = false;
      formData.value.code = '';

      const countdownTimer = setInterval(() => {
        countdownSeconds.value -= 1;
        if (countdownSeconds.value === 0) {
          clearInterval(countdownTimer);
          canResend.value = true;
          emailAvailable.value = true;
        }
      }, 1000);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    }
  };

  const handleChangeEmail = async () => {
    try {
      await verifyEmailCode(formData.value);
      Message.success(t('userSetting.changeEmail.success'));
      // 更新用户信息
      await userStore.info();
      formData.value.email = '';
      formData.value.code = '';
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    }
  };
</script>

<style lang="less" scoped>
  .input {
    width: 500px;
  }
</style>
