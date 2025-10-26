<template>
  <a-form
    :model="formData"
    label-col="{ span: 6 }"
    wrapper-col="{ span: 18 }"
    @submit="handleSubmit"
  >
    <a-form-item :label="$t('userSetting.oldPassword')">
      <a-input-password v-model="formData.oldPassword" class="input" />
    </a-form-item>

    <a-form-item :label="$t('userSetting.newPassword')">
      <a-input-password v-model="formData.newPassword" class="input" />
    </a-form-item>

    <a-form-item :label="$t('userSetting.confirmNewPassword')">
      <a-input-password v-model="formData.checkPassword" class="input" />
    </a-form-item>

    <a-form-item wrapper-col="{ span: 18, offset: 6 }">
      <a-space size="medium">
        <a-button type="primary" html-type="submit">
          {{ $t('userSetting.changePassword') }}
        </a-button>
        <a-button type="dashed" @click="props.close">
          {{ $t('userSetting.changePassword.cancel') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive, defineProps } from 'vue';
  import { updatePassword } from '@/api/user';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import useUser from '@/hooks/user';
  import { PropType } from 'vue-demi';

  const formData = reactive({
    oldPassword: '',
    newPassword: '',
    checkPassword: '',
  });

  const errors = reactive({
    oldPassword: '',
    newPassword: '',
    checkPassword: '',
  });

  const { t } = useI18n();
  const { logout } = useUser();

  const props = defineProps({
    close: {
      type: Function as PropType<() => void>,
      required: true,
    },
  });

  const validateForm = () => {
    let valid = true;
    if (!formData.oldPassword) {
      errors.oldPassword = 'Old password is required';
      valid = false;
    } else {
      errors.oldPassword = '';
    }
    if (!formData.newPassword) {
      errors.newPassword = 'New password is required';
      valid = false;
    } else {
      errors.newPassword = '';
    }
    if (formData.newPassword !== formData.checkPassword) {
      errors.checkPassword = 'Passwords do not match';
      valid = false;
    } else {
      errors.checkPassword = '';
    }
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Message.error(t('userSetting.changePassword.formError'));
      return;
    }
    try {
      await updatePassword(formData);
      Message.success(t('userSetting.changePassword.success'));

      setTimeout(() => {
        logout();
      }, 1000);
    } catch (error) {
      Message.error(t('userSetting.changePassword.error'));
    }
  };
</script>

<style scoped lang="less">
  .input {
    width: 500px;
  }
  /* Add any styles for your component */
</style>
