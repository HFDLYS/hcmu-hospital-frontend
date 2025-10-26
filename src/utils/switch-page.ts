import { Router } from 'vue-router';

export default async function redirectToPage(
  router: Router,
  page: string,
  q: Record<string, any>
) {
  await router.push({
    name: page,
    query: q,
  });
}

export async function redirectToPersonal(router: Router, id: number) {
  await redirectToPage(router, 'PersonalPage', { userId: id });
}

export async function redirectToProject(router: Router, id: number) {
  await redirectToPage(router, 'ProjectDetail', { projectId: id });
}

export async function redirectToTask(router: Router, pid: number, tid: number) {
  await redirectToPage(router, 'TaskDetail', { projectId: pid, taskId: tid });
}

export async function redirectToReward(router: Router, id: number) {
  await redirectToPage(router, 'RewardDetail', { rewardId: id });
}

export async function redirectToBranch(router: Router, id: number) {
  await redirectToPage(router, 'BranchDetail', { branchId: id });
}
