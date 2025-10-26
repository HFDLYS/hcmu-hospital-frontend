import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';

import { useUserStore } from '@/store';

// 退出登录
export default function useUser() {
  const router = useRouter();
  const userStore = useUserStore();
  const logout = async (logoutTo?: string) => {
    await userStore.logout();
    const currentRoute = router.currentRoute.value;
    Message.success('登出成功');
    router.push({
      name: logoutTo && typeof logoutTo === 'string' ? logoutTo : 'login',
      query: {
        // TODO: 正常退出暂不需要携带参数，如果需要携带参数，可以在这里添加
        // ...router.currentRoute.value.query,
        // redirect: currentRoute.name as string,
      },
    });
  };
  return {
    logout,
  };
}
