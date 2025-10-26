<template>
  <a-modal
    :title="$t('register.verifyForm.title')"
    :visible="visible"
    :ok-text="$t('register.okText')"
    :cancel-text="$t('register.cancelText')"
    unmount-on-close
    draggable
    @before-ok="handleOk"
    @cancel="handleCancel"
  >
    <div style="width: 100%; text-align: center">
      <h4>{{ $t('register.verifyForm.tip') }} {{ decodeEmail(email) }}</h4>
    </div>
    <a-form :model="verifyForm">
      <a-form-item :label="$t('register.verifyForm.form.code')" required>
        <a-row :gutter="15">
          <a-col :span="16">
            <a-input
              v-model="verifyForm.code"
              :placeholder="$t('register.verifyForm.form.codePlaceholder')"
            >
              <template #prefix>
                <icon-stamp />
              </template>
            </a-input>
          </a-col>
          <a-col :span="8">
            <a-button
              :loading="resendLoading"
              type="primary"
              :disabled="!canResend && countdownSeconds > 0"
              @click="handleReSend"
            >
              <template v-if="canResend || countdownSeconds === 0">
                {{ $t('register.verifyForm.resend') }}
              </template>
              <template v-else>
                {{ countdownSeconds }} {{ $t('register.verifyForm.tip2') }}
              </template>
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, defineProps, ref, watch } from 'vue';
  import { PropType } from 'vue-demi';
  import { verifyRegister, VerifyRegisterParams } from '@/api/auth';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';

  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    setVerifyVisible: {
      type: Function as PropType<(visible: boolean) => void>,
      required: true,
    },
    setRegisterVisible: {
      type: Function as PropType<(visible: boolean) => void>,
      required: true,
    },
    reSend: {
      type: Function as PropType<() => void>,
      required: true,
    },
  });

  const { t } = useI18n();
  const visible = computed(() => props.visible);
  const email = computed(() => props.email);
  const { loading: resendLoading, setLoading } = useLoading(false);

  const generateForm = () => {
    return {
      email: email.value,
      code: '',
    };
  };

  const verifyForm = ref<VerifyRegisterParams>(generateForm());
  const countdownSeconds = ref<number>(0);
  const canResend = ref<boolean>(true);

  const decodeEmail = (data: string) => {
    return data.replace(/(.{2}).*(.{2}@.*)/, '$1****$2');
  };

  const handleOk = async () => {
    try {
      await verifyRegister(verifyForm.value);
      Message.success(t('register.verifyForm.success'));
      props.setVerifyVisible(false);
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    }
  };

  const handleCancel = () => {
    props.setVerifyVisible(false);
    props.setRegisterVisible(true);
  };

  const handleReSend = async () => {
    try {
      setLoading(true);
      await props.reSend();
      setLoading(false);
      countdownSeconds.value = 60;
      canResend.value = false;
      verifyForm.value.code = '';

      const countdownTimer = setInterval(() => {
        countdownSeconds.value -= 1;
        if (countdownSeconds.value === 0) {
          clearInterval(countdownTimer);
          canResend.value = true;
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

  watch(visible, (val) => {
    if (val) {
      verifyForm.value = generateForm();
      countdownSeconds.value = 60;
      canResend.value = false;
      const countdownTimer = setInterval(() => {
        countdownSeconds.value -= 1;
        if (countdownSeconds.value === 0) {
          clearInterval(countdownTimer);
          canResend.value = true;
        }
      }, 1000);
    }
  });
</script>
