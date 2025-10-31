<template>
  <a-modal
    :visible="visible"
    :title="$t('importPage.modal.importTitle')"
    :width="600"
    :mask-closable="false"
    @cancel="handleCancel"
  >
    <a-form
      :model="formModel"
      :label-col-props="{ span: 6 }"
      :wrapper-col-props="{ span: 18 }"
      label-align="left"
    >
      <a-form-item
        field="roleId"
        :label="$t('importPage.modal.role')"
        :rules="[
          { required: true, message: $t('importPage.modal.roleRequired') },
        ]"
      >
        <a-select
          v-model="formModel.roleId"
          :placeholder="$t('importPage.modal.rolePlaceholder')"
          :options="roleOptions"
        />
      </a-form-item>
      <a-form-item
        field="file"
        :label="$t('importPage.modal.file')"
        :rules="[
          { required: true, message: $t('importPage.modal.fileRequired') },
        ]"
      >
        <a-upload
          v-model="fileList"
          :accept="'.xlsx,.xls,.csv'"
          :max-count="1"
          :on-before-upload="handleBeforeUpload"
          :show-file-list="true"
        >
          <a-button type="primary">
            <template #icon>
              <icon-upload />
            </template>
            {{ $t('importPage.modal.selectFile') }}
          </a-button>
        </a-upload>
        <div class="upload-tip">
          {{ $t('importPage.modal.uploadTip') }}
        </div>
      </a-form-item>
    </a-form>

    <template #footer>
      <a-space>
        <a-button @click="handleCancel">
          {{ $t('importPage.modal.cancel') }}
        </a-button>
        <a-button type="primary" :loading="loading" @click="handleConfirm">
          {{ $t('importPage.modal.confirm') }}
        </a-button>
      </a-space>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Message } from '@arco-design/web-vue';
  import useLoading from '@/hooks/loading';
  import { importPendingUsers } from '@/api/pending-user';
  import { getAllRoles } from '@/api/role';

  interface Props {
    visible: boolean;
  }

  interface Emits {
    (e: 'cancel'): void;
    (e: 'success'): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const { t } = useI18n();
  const { loading, setLoading } = useLoading(false);

  // 表单数据
  const formModel = reactive({
    roleId: undefined as number | undefined,
    file: null as File | null,
  });

  // 文件列表
  const fileList = ref([]);

  // 角色选项
  const roleOptions = ref<Array<{ label: string; value: number }>>([]);

  // 获取角色列表
  const fetchRoles = async () => {
    try {
      const { data } = await getAllRoles({ pageNum: 1, pageSize: 1000 });
      roleOptions.value = data.map((role: any) => ({
        label: role.roleName,
        value: role.roleId,
      }));
    } catch (err) {
      Message.error(t('importPage.modal.fetchRolesError'));
    }
  };

  // 文件上传前处理
  const handleBeforeUpload = (file: File) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
    ];
    if (!allowedTypes.includes(file.type)) {
      Message.error(t('importPage.modal.fileTypeError'));
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      // 10MB
      Message.error(t('importPage.modal.fileSizeError'));
      return false;
    }
    formModel.file = file;
    return false; // 阻止自动上传
  };

  // 取消
  const handleCancel = () => {
    formModel.roleId = undefined;
    formModel.file = null;
    fileList.value = [];
    emit('cancel');
  };

  // 确认导入
  const handleConfirm = async () => {
    if (!formModel.roleId || !formModel.file) {
      Message.warning(t('importPage.modal.fillRequired'));
      return;
    }

    setLoading(true);
    try {
      await importPendingUsers(formModel.file, formModel.roleId);
      Message.success(t('importPage.modal.importSuccess'));
      emit('success');
      handleCancel();
    } catch (err) {
      Message.error(String(err));
    } finally {
      setLoading(false);
    }
  };

  // 监听visible变化，获取角色列表
  watch(
    () => props.visible,
    (newVal) => {
      if (newVal) {
        fetchRoles();
      }
    }
  );
</script>

<style lang="less" scoped>
  .upload-tip {
    margin-top: 8px;
    color: #666;
    font-size: 12px;
  }
</style>
