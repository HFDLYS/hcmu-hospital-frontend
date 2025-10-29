<template>
  <a-modal
    :visible="visible"
    :title="
      isEdit
        ? $t('departmentPage.modal.editTitle')
        : $t('departmentPage.modal.createTitle')
    "
    :mask-closable="false"
    @cancel="handleCancel"
    @before-ok="handleOk"
  >
    <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-form-item field="name" :label="$t('departmentPage.modal.form.name')">
        <a-input
          v-model="form.name"
          :placeholder="$t('departmentPage.modal.form.name.placeholder')"
        />
      </a-form-item>

      <a-form-item
        field="description"
        :label="$t('departmentPage.modal.form.description')"
      >
        <a-textarea
          v-model="form.description"
          :placeholder="$t('departmentPage.modal.form.description.placeholder')"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-item>

      <a-form-item
        field="location"
        :label="$t('departmentPage.modal.form.location')"
      >
        <a-input
          v-model="form.location"
          :placeholder="$t('departmentPage.modal.form.location.placeholder')"
        />
      </a-form-item>

      <a-form-item
        field="parentId"
        :label="$t('departmentPage.modal.form.parentDepartment')"
      >
        <a-select
          v-model="form.parentId"
          :placeholder="
            $t('departmentPage.modal.form.parentDepartment.placeholder')
          "
          allow-clear
        >
          <a-option
            v-for="dept in departmentOptions"
            :key="dept.departmentId"
            :value="dept.departmentId"
            :label="dept.name"
          />
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Message, FormInstance } from '@arco-design/web-vue';
  import {
    createDepartment,
    updateDepartment,
    getDepartmentById,
    getAllDepartments,
    DepartmentCreateDTO,
    DepartmentUpdateDTO,
    DepartmentListDTO,
  } from '@/api/department';

  const props = defineProps<{
    visible: boolean;
    isEdit: boolean;
    departmentId?: number;
  }>();

  const emit = defineEmits<{
    (e: 'cancel'): void;
    (e: 'success'): void;
  }>();

  const { t } = useI18n();
  const formRef = ref<FormInstance>();

  // 表单数据
  const form = reactive<DepartmentCreateDTO | DepartmentUpdateDTO>({
    name: '',
    description: '',
    location: '',
    parentId: undefined,
  });

  // 父科室选项
  const departmentOptions = ref<DepartmentListDTO[]>([]);

  // 表单验证规则
  const rules = {
    name: [
      {
        required: true,
        message: t('departmentPage.modal.form.name.required'),
      },
    ],
  };

  // 获取所有科室（用于父科室下拉）
  const fetchDepartments = async () => {
    try {
      const { data } = await getAllDepartments({
        pageNum: 1,
        pageSize: 1000, // 获取所有科室
      });
      // 如果是编辑模式，过滤掉当前科室（避免将自己设为父科室）
      if (props.isEdit && props.departmentId) {
        departmentOptions.value = data.data.list.filter(
          (dept) => dept.departmentId !== props.departmentId
        );
      } else {
        departmentOptions.value = data.data.list;
      }
    } catch (err) {
      // Message.error(t('departmentPage.message.fetchDepartmentsError'));
    }
  };

  // 获取科室详情
  const fetchDepartmentDetail = async (id: number) => {
    try {
      const { data } = await getDepartmentById(id);
      form.name = data.data.name;
      form.description = data.data.description;
      form.location = data.data.location;
      form.parentId = data.data.parentId || undefined;
    } catch (err) {
      Message.error(t('departmentPage.message.fetchDetailError'));
    }
  };

  // 重置表单
  const resetForm = () => {
    form.name = '';
    form.description = '';
    form.location = '';
    form.parentId = undefined;
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
      if (props.isEdit && props.departmentId) {
        // 编辑
        await updateDepartment(props.departmentId, form);
        Message.success(t('departmentPage.message.updateSuccess'));
      } else {
        // 创建
        await createDepartment(form);
        Message.success(t('departmentPage.message.createSuccess'));
      }
      resetForm();
      emit('success');
      return true;
    } catch (err: any) {
      Message.error(
        err.response?.data?.msg ||
          (props.isEdit
            ? t('departmentPage.message.updateError')
            : t('departmentPage.message.createError'))
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
        if (props.isEdit && props.departmentId) {
          fetchDepartmentDetail(props.departmentId);
        }
      }
    }
  );
</script>
