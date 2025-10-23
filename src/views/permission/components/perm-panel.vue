<template>
  <a-card
    class="perm-panel"
    title="权限配置"
    :bordered="false"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{
      height: 'auto',
      paddingTop: '16px',
      display: 'flex',
      flexFlow: 'column',
      overflow: 'auto',
    }"
  >
    <template #extra>
      <a-space :size="8" align="end" direction="vertical">
        <a-button
          type="primary"
          size="mini"
          style="font-size: 12px"
          :disabled="saveDisabled"
          @click="saveChanges"
        >
          保存
        </a-button>
      </a-space>
    </template>
    <p>
      <a-tag color="orange" size="large"> {{ selectedName }}</a-tag>
    </p>
    <a-space size="medium" direction="vertical">
      <perm-card
        :loading="loading"
        :perm-list="permList"
        :perm-list-by-id="permListById"
        :disabled="permDisabled"
        :change-perm-list="changePermList"
      />
    </a-space>
  </a-card>
</template>

<script lang="ts" setup>
  import { Message, Modal } from '@arco-design/web-vue';
  import { computed, ref, watch, onMounted } from 'vue';
  import permCard from './perm-card.vue';

  interface PermItem {
    permissionId: number;
    name: string;
    type: number;
  }

  const loading = ref(false);
  const saveDisabled = ref(true);

  // 所有系统权限
  const permList = ref<PermItem[]>([
    // 患者权限
    { permissionId: 1, name: '激活与认证流程', type: 1 },
    { permissionId: 2, name: '个人健康档案', type: 1 },
    { permissionId: 3, name: '智能预约与科室推荐', type: 1 },
    { permissionId: 4, name: '医生与号源搜索筛选', type: 1 },
    { permissionId: 5, name: '预约与支付流程', type: 1 },
    { permissionId: 6, name: '预约记录管理', type: 1 },
    { permissionId: 7, name: '候补队列管理', type: 1 },
    { permissionId: 8, name: '历史就诊记录', type: 1 },
    { permissionId: 9, name: '扫码签到与排队叫号', type: 1 },
    { permissionId: 10, name: '院内导航服务', type: 1 },

    // 医生权限
    { permissionId: 11, name: '医生账户登录', type: 1 },
    { permissionId: 12, name: '医生个人主页管理', type: 1 },
    { permissionId: 13, name: '排班与患者列表查看', type: 1 },
    { permissionId: 14, name: '患者病历信息查阅', type: 1 },
    { permissionId: 15, name: '加号处理流程', type: 1 },
    { permissionId: 16, name: '调班与休假申请流程', type: 1 },

    // 管理员权限
    { permissionId: 17, name: '组织架构管理', type: 1 },
    { permissionId: 18, name: '人员账户管理', type: 1 },
    { permissionId: 19, name: '批量用户导入与管理', type: 1 },
    { permissionId: 20, name: '排班与号源规则引擎', type: 1 },
    { permissionId: 21, name: '挂号退号与候补规则配置', type: 1 },
    { permissionId: 22, name: '业务申请审批流', type: 1 },
    { permissionId: 23, name: '权限配置与角色管理', type: 1 },
    { permissionId: 24, name: '统计报表与数据导出', type: 1 },
    { permissionId: 25, name: '运营可视化大屏', type: 1 },
  ]);

  const permListById = ref<number[]>([]);
  const permDisabled = ref<boolean>(true);

  // 预设每个角色的权限
  const rolePermissions: Record<number, number[]> = {
    1: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25,
    ], // 超级管理员：所有权限
    2: [17, 18, 19, 20, 21, 22, 23, 24, 25], // 管理员：基础信息管理、运营规则配置、业务申请审批与监管、数据决策支持
    3: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // 患者：用户中心、核心挂号流程、预约后服务、线下就诊辅助
    4: [11, 12, 13, 14, 15, 16], // 医生：账户与信息、诊疗管理、考勤管理
  };

  const props = defineProps({
    selectedRoleId: {
      type: Number,
      default: 0,
    },
    selectedName: {
      type: String,
      default: '（请选择一个角色）',
    },
    reLoadSignal: {
      type: Boolean,
    },
  });

  const selectedName = computed(() => props.selectedName);

  const changePermList = (newPermListById: number[]) => {
    permListById.value = newPermListById;
  };

  const saveChanges = async () => {
    try {
      // 这里暂时用模拟的保存，实际应该调用API
      Modal.success({
        title: '保存成功',
        content: '权限配置已更新',
      });
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    }
  };

  const clear = () => {
    saveDisabled.value = true;
    permListById.value = [];
    permDisabled.value = true;
  };

  const fetchDataById = async (roleId: number) => {
    loading.value = true;
    saveDisabled.value = false;
    permDisabled.value = false;
    try {
      // 根据角色ID获取权限
      permListById.value = rolePermissions[roleId] || [];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    loading.value = false;
  });

  // 监听selectedRoleId的变化
  watch(
    () => props.selectedRoleId,
    (newVal) => {
      if (newVal > 0) {
        fetchDataById(newVal);
      } else {
        clear();
      }
    }
  );

  watch(
    () => props.reLoadSignal,
    () => {
      clear();
    }
  );
</script>

<style lang="less" scoped></style>
