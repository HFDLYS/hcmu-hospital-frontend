<template>
  <div class="card-wrap">
    <a-card v-if="loading" :bordered="false" hoverable>
      <slot name="skeleton"></slot>
    </a-card>
    <a-card v-else :bordered="false" hoverable>
      <!--      <a-avatar-->
      <!--        v-if="icon"-->
      <!--        :size="24"-->
      <!--        style="margin-right: 8px; background-color: #626aea"-->
      <!--      >-->
      <!--        <icon-filter />-->
      <!--      </a-avatar>-->
      <a-card-meta>
        <template #title>
          <a-typography-text style="margin-right: 10px">
            {{ title }}
          </a-typography-text>
        </template>
        <template #description>
          {{ description }}
          <slot></slot>
        </template>
      </a-card-meta>
      <template #actions>
        <a-space>
          <a-button
            :loading="redirectLoading"
            type="primary"
            @click="redirect(router, props.branchId)"
          >
            {{ props.toMemberTxt }}
          </a-button>
          <a-button
            v-permission="{
              permissionsTarget: ['DEL_BRAN'],
            }"
            type="dashed"
            status="danger"
            @click="onDel(props.branchId, props.title)"
          >
            {{ $t('branchCenter.delete.title') }}
          </a-button>
        </a-space>
      </template>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, PropType } from 'vue';
  import { Router, useRouter } from 'vue-router';
  import { Message, Modal } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { deleteBranchById } from '@/api/branch';
  import { redirectToBranch } from '@/utils/switch-page';
  import useLoading from '@/hooks/loading';

  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    openTxt: {
      type: String,
      default: '',
    },
    closeTxt: {
      type: String,
      default: '',
    },
    toMemberTxt: {
      type: String,
      default: '',
    },
    branchId: {
      type: Number,
      default: 0,
    },
    reload: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
  });
  const router = useRouter();
  const { t } = useI18n();

  const { loading: redirectLoading, setLoading: setRedirectLoading } =
    useLoading(false);

  const redirect = async (r: Router, id: number) => {
    try {
      setRedirectLoading(true);
      await redirectToBranch(r, id);
    } catch (err) {
      if (err instanceof Error) {
        Message.error(err.message);
      } else {
        Message.error(String(err));
      }
    } finally {
      setRedirectLoading(false);
    }
  };

  const onDel = (id: number, name: string) => {
    Modal.confirm({
      title: t('branchCenter.delete.title'),
      content: t('branchCenter.delete.deleteContent', { branchName: name }),
      onOk: async () => {
        try {
          await deleteBranchById(id);
          Message.success(t('branchCenter.delete.success'));
          props.reload();
        } catch (err) {
          if (err instanceof Error) {
            Message.error(err.message);
          } else {
            Message.error(String(err));
          }
        }
      },
    });
  };
</script>

<style scoped lang="less">
  .card-wrap {
    height: 100%;
    border: 1px solid var(--color-neutral-3);
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-4px);
      // box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    }

    :deep(.arco-card) {
      height: 100%;
      border-radius: 4px;

      .arco-card-body {
        height: 100%;

        .arco-space {
          width: 100%;
          height: 100%;

          .arco-space-item {
            height: 100%;

            &:last-child {
              flex: 1;
            }

            .arco-card-meta {
              display: flex;
              flex-flow: column;
              height: 100%;

              .arco-card-meta-content {
                flex: 1;

                .arco-card-meta-description {
                  margin-top: 8px;
                  color: rgb(var(--gray-6));
                  font-size: 12px;
                  line-height: 20px;
                }
              }

              .arco-card-meta-footer {
                margin-top: 0;
              }
            }
          }
        }
      }
    }

    :deep(.arco-card-meta-title) {
      display: flex;
      align-items: center;

      // To prevent the shaking
      line-height: 28px;
    }

    :deep(.arco-skeleton-line) {
      &:last-child {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }
    }
  }
</style>
