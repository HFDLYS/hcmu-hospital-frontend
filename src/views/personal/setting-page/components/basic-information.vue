<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 5 }"
    :wrapper-col-props="{ span: 15 }"
  >
    <a-form-item
      field="sex"
      :label="$t('userSetting.basicInfo.form.label.sex')"
      :rules="[{}]"
    >
      <a-input
        v-model="formData.sex"
        :placeholder="$t('userSetting.basicInfo.placeholder.sex')"
      ></a-input>
    </a-form-item>
    <a-form-item
      field="nickname"
      :label="$t('userSetting.basicInfo.form.label.nickname')"
      :rules="[{}]"
    >
      <a-input
        v-model="formData.nickname"
        :placeholder="$t('userSetting.basicInfo.placeholder.nickname')"
      ></a-input>
    </a-form-item>
    <a-form-item
      field="age"
      :label="$t('userSetting.basicInfo.form.label.age')"
      :rules="[{}]"
    >
      <a-input-number
        v-model="formData.age"
        :placeholder="$t('userSetting.basicInfo.placeholder.age')"
      ></a-input-number>
    </a-form-item>

    <a-form-item
      field="phone"
      :label="$t('userSetting.basicInfo.form.label.phone')"
      :rules="[{}]"
    >
      <a-input
        v-model="formData.phone"
        :placeholder="$t('userSetting.basicInfo.placeholder.phone')"
      ></a-input>
    </a-form-item>

    <a-form-item>
      <a-space>
        <a-button type="primary" @click="saveUpdate()">
          {{ $t('userSetting.save') }}
        </a-button>
        <a-button type="secondary" @click="reset">
          {{ $t('userSetting.reset') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { defineProps, PropType, ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';

  import { useUserStore } from '@/store';
  import { updateUserInfo, UserUpdateDTO } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  const userStore = useUserStore();

  const props = defineProps({
    sendUpdateSignal: {
      type: Function as PropType<() => void>,
      required: true,
    },
  });

  const formRef = ref<FormInstance>();
  const formData = ref<UserUpdateDTO>({
    sex: userStore.sex as string,
    nickname: userStore.nickname as string,
    age: userStore.age as number,
    phone: userStore.phone as string,
  });
  const saveUpdate = async () => {
    try {
      await updateUserInfo(userStore.userId, formData.value);
      Message.success('修改成功');
      await userStore.info();
      props.sendUpdateSignal();
    } catch (error) {
      if (error instanceof Error) {
        Message.error(error.message);
      } else {
        // 处理非 Error 类型的错误
        Message.error(String(error));
      }
    }
  };

  const reset = async () => {
    await formRef.value?.resetFields();
  };
</script>

<style scoped lang="less">
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
