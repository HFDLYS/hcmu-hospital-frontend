import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import { LocationQueryRaw } from 'vue-router';
import router from '@/router';

// 统一后端返回体形式
export interface HttpResponse<T = unknown> {
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    // 如果是文件则放行
    if (response.headers['content-type'] === 'application/pdf') {
      return response;
    }
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      // Message.error({
      //   content: res.msg || 'Error',
      //   duration: 5 * 1000,
      // });
      console.error(res.msg || 'Error');
      // 403:权限认证异常 401：用户身份认证异常
      if (
        [403, 401].includes(res.code) &&
        response.config.url !== '/user/info'
      ) {
        Modal.error({
          title: 'Confirm logout',
          content:
            'You have been logged out, you can cancel to stay on this page, or log in again!',
          okText: 'Re-Login',
          async onOk() {
            const userStore = useUserStore();

            // await userStore.logout();
            // window.location.reload();
            try {
              await userStore.logout();
            } catch (err) {
              if (err instanceof Error) {
                Message.error(err.message);
              } else {
                // 处理非 Error 类型的错误
                Message.error(String(err));
              }
            } finally {
              // 将用户重定向到登录页面，并保存用户尝试访问的 URL
              await router.push({
                name: 'login',
                query: {
                  redirect: router.currentRoute.value.name,
                  ...router.currentRoute.value.query,
                } as LocationQueryRaw,
              });
            }
          },
        });
      }
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
