<template>
  <a-modal
    :visible="visible"
    :title="$t('doctorProfilePage.modal.editTitle')"
    :mask-closable="false"
    @cancel="handleCancel"
    @before-ok="handleOk"
  >
    <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
      <!-- 科室选择 -->
      <a-form-item
        field="departmentId"
        :label="$t('doctorProfilePage.modal.form.departmentId')"
      >
        <a-select
          v-model="form.departmentId"
          :placeholder="
            $t('doctorProfilePage.modal.form.departmentId.placeholder')
          "
          allow-search
        >
          <a-option
            v-for="dept in departmentOptions"
            :key="dept.departmentId"
            :value="dept.departmentId"
            :label="dept.name"
          />
        </a-select>
      </a-form-item>

      <!-- 职称 -->
      <a-form-item
        field="title"
        :label="$t('doctorProfilePage.modal.form.title')"
      >
        <a-input
          v-model="form.title"
          :placeholder="$t('doctorProfilePage.modal.form.title.placeholder')"
        />
      </a-form-item>

      <!-- 专长 -->
      <a-form-item
        field="specialty"
        :label="$t('doctorProfilePage.modal.form.specialty')"
      >
        <a-input
          v-model="form.specialty"
          :placeholder="
            $t('doctorProfilePage.modal.form.specialty.placeholder')
          "
        />
      </a-form-item>

      <!-- 个人简介 -->
      <a-form-item field="bio" :label="$t('doctorProfilePage.modal.form.bio')">
        <a-textarea
          v-model="form.bio"
          :placeholder="$t('doctorProfilePage.modal.form.bio.placeholder')"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Message, FormInstance } from '@arco-design/web-vue';
  import {
    updateDoctorProfile,
    getDoctorProfileByUserId,
    DoctorProfileUpdateDTO,
  } from '@/api/doctor-profile';
  import { getAllDepartments, DepartmentListDTO } from '@/api/department';

  const props = defineProps<{
    visible: boolean;
    userId?: number;
  }>();

  const emit = defineEmits<{
    (e: 'cancel'): void;
    (e: 'success'): void;
  }>();

  const { t } = useI18n();
  const formRef = ref<FormInstance>();

  // 表单数据
  const form = reactive<DoctorProfileUpdateDTO>({
    departmentId: undefined,
    title: '',
    specialty: '',
    bio: '',
  });

  // 科室选项
  const departmentOptions = ref<DepartmentListDTO[]>([]);

  // 表单验证规则
  const rules = {
    departmentId: [
      {
        required: true,
        message: t('doctorProfilePage.modal.form.departmentId.required'),
      },
    ],
    title: [
      {
        required: true,
        message: t('doctorProfilePage.modal.form.title.required'),
      },
    ],
  };

  // 获取科室列表
  const fetchDepartments = async () => {
    try {
      const { data } = await getAllDepartments({
        pageNum: 1,
        pageSize: 1000,
      });
      departmentOptions.value = data.list;
    } catch (err) {
      // Message.error(t('doctorProfilePage.message.fetchDepartmentsError'));
    }
  };

  // 获取医生档案详情
  const fetchDoctorProfileDetail = async (userId: number) => {
    try {
      const { data } = await getDoctorProfileByUserId(userId);
      console.log('医生档案详情数据:', data);
      form.departmentId = data.departmentId;
      form.title = data.title;
      form.specialty = data.specialty;
      form.bio = data.bio;
    } catch (err: any) {
      console.error('获取医生档案详情失败:', err);
      console.error('错误响应:', err.response);
      Message.error(
        err.response?.data?.msg ||
          t('doctorProfilePage.message.fetchDetailError')
      );
    }
  };

  // 重置表单
  const resetForm = () => {
    form.departmentId = undefined;
    form.title = '';
    form.specialty = '';
    form.bio = '';
    formRef.value?.clearValidate();
  };

  // 处理取消
  const handleCancel = () => {
    resetForm();
    emit('cancel');
  };

  // 处理确认
  const handleOk = async () => {
    const valid = await formRef.value?.validate();
    if (valid) {
      return false;
    }

    try {
      if (props.userId) {
        const updateData: DoctorProfileUpdateDTO = {
          departmentId: form.departmentId,
          title: form.title,
          specialty: form.specialty,
          bio: form.bio,
        };
        await updateDoctorProfile(props.userId, updateData);
        Message.success(t('doctorProfilePage.message.updateSuccess'));
      }
      resetForm();
      emit('success');
      return true;
    } catch (err: any) {
      Message.error(
        err.response?.data?.msg || t('doctorProfilePage.message.updateError')
      );
      return false;
    }
  };

  // 监听弹窗打开
  watch(
    () => props.visible,
    (newVal) => {
      if (newVal) {
        fetchDepartments();
        if (props.userId) {
          fetchDoctorProfileDetail(props.userId);
        }
      }
    }
  );
</script>
