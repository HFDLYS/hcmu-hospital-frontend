<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-sub-title">{{ $t('login.form.prompt') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="userName"
        :rules="[{ required: true, message: $t('login.form.username.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.userName"
          :placeholder="$t('login.form.username.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword as any"
          >
            {{ $t('login.form.rememberPassword') }}
          </a-checkbox>
          <a-button type="text" @click="setForgetVisible(true)">{{
            $t('login.form.forgetPassword')
          }}</a-button>
        </div>
        <div style="display: flex; justify-content: space-between">
          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
            style="flex: 1; margin-right: 20px"
          >
            {{ $t('login.form.login') }}
          </a-button>
          <a-button
            style="flex: 1"
            type="dashed"
            long
            class="login-form-register-btn"
            @click="handleRegister"
          >
            {{ $t('login.form.register') }}
          </a-button>
        </div>
      </a-space>
    </a-form>
    <a-modal
      :visible="visibleRegister"
      :ok-text="$t('register.okText')"
      :cancel-text="$t('register.cancelText')"
      draggable
      unmount-on-close
      @before-ok="handleRegisterOk"
      @cancel="handleCreateCancel"
    >
      <template #title> {{ $t('register.title') }} </template>
      <a-form :form="registerForm" :model="registerForm" layout="vertical">
        <a-form-item
          field="userName"
          :label="$t('register.form.account')"
          name="userName"
        >
          <a-input
            v-model="registerForm.userName"
            :placeholder="$t('register.form.accountPlaceholder')"
          >
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="name" :label="$t('register.form.name')" name="name">
          <a-input
            v-model="registerForm.name"
            :placeholder="$t('register.form.namePlaceholder')"
          >
            <template #prefix>
              <icon-pen />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          field="password"
          :label="$t('register.form.password')"
          name="password"
        >
          <a-input-password
            v-model="registerForm.password"
            :placeholder="$t('register.form.passwordPlaceholder')"
            :default-visibility="false"
            allow-clear
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item
          field="checkPassword"
          :label="$t('register.form.confirmPassword')"
          name="checkPassword"
        >
          <a-input-password
            v-model="registerForm.checkPassword"
            :placeholder="$t('register.form.confirmPasswordPlaceholder')"
            :default-visibility="false"
            allow-clear
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item
          field="email"
          :label="$t('register.form.email')"
          name="email"
        >
          <a-input
            v-model="registerForm.email"
            :placeholder="$t('register.form.emailPlaceholder')"
          >
            <template #prefix>
              <icon-email />
            </template>
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <RegisterVerifyModal
      :visible="visibleVerify"
      :set-verify-visible="setVerifyVisible"
      :set-register-visible="setRegisterVisible"
      :re-send="handleRegisterOk"
      :email="registerForm.email"
    ></RegisterVerifyModal>
    <ForgetPasswordModal
      :visible="visibleForget"
      :set-visible="setForgetVisible"
    ></ForgetPasswordModal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LoginParams } from '@/api/auth';
  import { encode, decode } from '@/utils/encrypt';
  import { RegisterParams, sendRegisterCode } from '@/api/auth';
  import useVisible from '@/hooks/visible';
  import RegisterVerifyModal from './register-verify-modal.vue';
  import ForgetPasswordModal from './forget-password-modal.vue';

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();
  const { visible: visibleRegister, setVisible: setRegisterVisible } =
    useVisible(false);
  const { visible: visibleVerify, setVisible: setVerifyVisible } =
    useVisible(false);
  const { visible: visibleForget, setVisible: setForgetVisible } =
    useVisible(false);

  //    每次登录的时候在本地存储设置一个默认值
  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    userName: 'user', // 演示默认值
    password: encode('user'), // demo default value
  });
  //    取出本地存储的默认值
  const userInfo = reactive({
    userName: loginConfig.value.userName,
    password: decode(loginConfig.value.password),
  });

  const registerForm = reactive<RegisterParams>({
    userName: '',
    password: '',
    checkPassword: '',
    name: '',
    phone: '',
    email: '',
  });

  const handleRegisterOk = async () => {
    try {
      await sendRegisterCode(registerForm);
      setRegisterVisible(false);
      setVerifyVisible(true);
      Message.success(t('register.sendCodeSuccess'));
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
      setRegisterVisible(false);
      setVerifyVisible(false);
    }
  };

  const handleCreateCancel = () => {
    visibleRegister.value = false;
  };

  const handleRegister = () => {
    visibleRegister.value = true;
  };

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        await userStore.login(values as LoginParams);
        // 方便用户直接跳到登录前的页面
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        // 如果当前路由地址中没有redirect这个参数 则跳转到工作页面
        await router.push({
          name: (redirect as string) || 'PersonalPage',
          query: {
            ...othersQuery,
          },
        });
        Message.success(t('login.form.login.success'));
        const { rememberPassword } = loginConfig.value;
        const { userName, password } = values;
        // 实际生产环境需要进行加密存储。
        // The actual production environment requires encrypted storage.
        loginConfig.value.userName = rememberPassword ? userName : '';
        loginConfig.value.password = rememberPassword ? encode(password) : '';

        localStorage.setItem('login-config', JSON.stringify(loginConfig.value));
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
