<template>
  <a-modal
    :title="$t('resetPassword.title')"
    :visible="visible"
    :ok-text="$t('resetPassword.okText')"
    :cancel-text="$t('resetPassword.cancelText')"
    unmount-on-close
    draggable
    @before-ok="handleVerifyOk"
    @cancel="handleVerifyCancel"
  >
    <a-form :model="resetForm">
      <a-form-item :label="$t('resetPassword.form.email')" name="email">
        <a-input
          v-model="resetForm.email"
          :placeholder="$t('resetPassword.form.emailPlaceholder')"
          :disabled="!emailAvailable"
          @change="handleEmailChange"
        >
          <template #prefix>
            <icon-email />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item :label="$t('resetPassword.form.code')" name="code">
        <a-row :gutter="15">
          <a-col :span="16">
            <a-input
              v-model="resetForm.code"
              :placeholder="$t('resetPassword.form.codePlaceholder')"
            >
              <template #prefix>
                <icon-stamp />
              </template>
            </a-input>
          </a-col>
          <a-col :span="8">
            <a-button
              type="primary"
              :loading="sendCodeLoading"
              :disabled="!canResend && countdownSeconds > 0"
              @click="handleSendCode"
            >
              <template v-if="canResend || countdownSeconds === 0">
                {{ $t('resetPassword.send') }}
              </template>
              <template v-else>
                {{ countdownSeconds }} {{ $t('register.verifyForm.tip2') }}
              </template>
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item
        :label="$t('resetPassword.form.password')"
        name="password"
        :disabled="!passAvailable"
      >
        <a-input-password
          v-model="resetForm.password"
          :placeholder="$t('resetPassword.form.passwordPlaceholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        :label="$t('resetPassword.form.confirmPassword')"
        name="checkPassword"
        :disabled="!passAvailable"
      >
        <a-input-password
          v-model="resetForm.checkPassword"
          :placeholder="$t('resetPassword.form.confirmPasswordPlaceholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, defineProps, PropType, ref } from 'vue';
  import {
    getResetPasswordCode,
    resetPassword,
    ResetPasswordParams,
  } from '@/api/auth';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';

  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
    setVisible: {
      type: Function as PropType<(visible: boolean) => void>,
      required: true,
    },
  });

  const { t } = useI18n();
  const visible = computed(() => props.visible);
  const countdownSeconds = ref<number>(0);
  const canResend = ref<boolean>(true);
  const passAvailable = ref<boolean>(false);
  const emailAvailable = ref<boolean>(true);
  const { loading: sendCodeLoading, setLoading } = useLoading(false);

  const generateForm = () => {
    return {
      email: '',
      code: '',
      password: '',
      checkPassword: '',
    };
  };
  const resetForm = ref<ResetPasswordParams>(generateForm());

  const handleVerifyOk = async () => {
    try {
      await resetPassword(resetForm.value);
      Message.success(t('resetPassword.success'));
      props.setVisible(false);
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    }
  };

  const handleVerifyCancel = () => {
    props.setVisible(false);
  };

  const handleEmailChange = () => {
    passAvailable.value = false;
  };

  const handleSendCode = async () => {
    try {
      setLoading(true);
      await getResetPasswordCode({ email: resetForm.value.email });
      Message.success(
        `${t('register.sendCodeSuccess')} ${resetForm.value.email}`
      );
      setLoading(false);
      countdownSeconds.value = 60;
      canResend.value = false;
      emailAvailable.value = false;
      passAvailable.value = true;
      resetForm.value.code = '';

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
</script>
