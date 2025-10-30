<template>
  <a-card
    class="perm-panel"
    :title="$t('rolePage.permPanel')"
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
          >{{ $t('rolePage.save') }}</a-button
        >
      </a-space>
    </template>
    <p>
      <a-tag color="orange" size="large"> {{ selectedName }}</a-tag>
    </p>
    <a-space size="medium" direction="vertical">
      <permCard
        v-for="(cardTitle, index) in cardTitles"
        :key="index"
        :title="$t(cardTitle)"
        :loading="loading"
        :perm-list="permLists[index]"
        :perm-list-by-id="permListByIds[index]"
        :disabled="permDisabled[index]"
        :change-perm-list="changedMethod[index]"
      ></permCard>
    </a-space>
  </a-card>
</template>

<script lang="ts" setup>
  import { Message, Modal } from '@arco-design/web-vue';
  import { computed, defineProps, ref, watch } from 'vue';
  import {
    getAllPermissions,
    getRolePermissions,
    PermItem,
    updateRolePermissions,
    UpdateRolePermissionsParams,
  } from '@/api/role';
  import useLoading from '@/hooks/loading';
  import permCard from './perm-card.vue';

  const { loading, setLoading } = useLoading(true);

  const saveDisabled = ref<boolean>(true);

  const permLists = ref<PermItem[][]>([[], [], []]);
  const permListByIds = ref<number[][]>([[], [], []]);
  const permDisabled = ref<boolean[]>([]);
  const changedMethod = ref<((permListById: number[]) => void)[]>([]);

  const cardTitles = ref<string[]>([
    'rolePage.sysPerm',
    'rolePage.docterPerm',
    'rolePage.patientPerm',
  ]);

  const props = defineProps({
    selectedRoleId: {
      type: Number,
      default: 0,
    },
    selectedName: {
      type: String,
    },
    selectedType: {
      type: Number,
      default: 0,
    },
    reLoadSignal: {
      type: Boolean,
    },
  });

  const selectedName = computed(() => {
    return props.selectedName;
  });

  const initChangedMethod = () => {
    for (let i = 0; i < 3; i += 1) {
      changedMethod.value.push((permListById: number[]) => {
        permListByIds.value[i] = permListById;
      });
    }
  };

  const saveChanges = async () => {
    const param: UpdateRolePermissionsParams[] = [];

    const permList = permLists.value[0].concat(
      permLists.value[1],
      permLists.value[2]
    );
    const permListById = permListByIds.value[0].concat(
      permListByIds.value[1],
      permListByIds.value[2]
    );

    permList.forEach((perm) => {
      param.push({
        permissionId: perm.permissionId,
        isOwn: permListById.find((id) => id === perm.permissionId) ? 1 : 0,
      });
    });
    try {
      const { data } = await updateRolePermissions(props.selectedRoleId, param);
      Modal.success({
        title: '保存成功',
        content: data,
      });
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    }
  };

  const disabledFilter = (mode: boolean) => {
    if (!mode) {
      permDisabled.value.forEach((item, index) => {
        permDisabled.value[index] = true;
      });
    } else {
      permDisabled.value[0] = false;
      permDisabled.value[1] = false;
      permDisabled.value[2] = false;
    }
  };

  const setNull = () => {
    permListByIds.value.forEach((item, index) => {
      permListByIds.value[index] = [];
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getAllPermissions();
      const permList = data as PermItem[];
      permList.forEach((perm) => {
        permLists.value[perm.type - 1].push(perm);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    saveDisabled.value = true;
    setNull();
    disabledFilter(false);
  };

  const fetchDataById = async (roleId: number) => {
    setLoading(true);
    saveDisabled.value = false;
    disabledFilter(true);
    try {
      const { data } = await getRolePermissions(roleId);
      const permList = data as PermItem[];
      // 清空原有的权限列表
      setNull();
      if (!permList) return;
      permList.forEach((perm) => {
        permListByIds.value[perm.type - 1].push(perm.permissionId);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const init = () => {
    clear();
    initChangedMethod();
    fetchData();
  };

  init();

  // 监听selectedRoleId的变化
  watch(
    () => props.selectedRoleId,
    (newVal) => {
      fetchDataById(newVal);
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
