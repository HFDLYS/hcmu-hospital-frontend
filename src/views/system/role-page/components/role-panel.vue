<template>
  <a-card
    class="role-panel"
    :title="$t('rolePage.rolePanel')"
    :bordered="false"
    :header-style="{
      paddingBottom: '0',
    }"
    :body-style="{
      height: '100%',
      paddingTop: '16px',
      display: 'flex',
      flexFlow: 'column',
      caretColor: 'transparent',
    }"
  >
    <a-space size="medium" direction="vertical" style="flex: 1; width: 100%">
      <roleCard
        v-for="(title, index) in cardTitles"
        :key="index"
        :title="$t(title)"
        :select-role="selectRole"
        :loading="loading"
        :role-list="roleList[index]"
        :re-load="reLoad"
        :role-type="index + 1"
        style="height: 100%"
      ></roleCard>
    </a-space>
  </a-card>
</template>

<script lang="ts" setup>
  import { defineProps, ref, PropType } from 'vue';
  import { getAllRoles, RoleItem } from '@/api/role';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import roleCard from './role-card.vue';

  const { loading, setLoading } = useLoading(true);

  const roleList = ref<RoleItem[][]>([[], [], []]);
  const cardTitles = ref<string[]>(['rolePage.sysRole']);

  const props = defineProps({
    selectedRole: {
      type: Function as PropType<
        (roleId: number, roleName: string, type: number) => void
      >,
      required: true,
    },
    reLoad: {
      type: Function as PropType<() => void>,
      required: true,
    },
  });

  // 使用父组件传递给子组件的函数
  const selectRole = (roleId: number, roleName: string, roleType: number) => {
    props.selectedRole(roleId, roleName, roleType);
  };

  const roleListSetNull = () => {
    //  将roleList中每一个数组清空
    roleList.value.forEach((item) => {
      item.splice(0, item.length);
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getAllRoles({});
      const roleListAll = data as RoleItem[];
      roleListAll.forEach((item) => {
        roleList.value[0].push(item);
      });
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const reLoad = () => {
    roleListSetNull();
    fetchData();
    props.reLoad();
  };

  fetchData();
</script>
