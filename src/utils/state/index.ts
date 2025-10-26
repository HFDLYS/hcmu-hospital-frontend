interface State {
  state: string;
  code: number;
  color: string;
}

export const RewardState: State[] = [
  { state: 'reward.PENDING', code: 0, color: 'orange' },
  { state: 'reward.APPROVED', code: 1, color: 'green' },
  { state: 'reward.ISSUED', code: 2, color: 'blue' },
  { state: 'reward.REJECTED', code: -1, color: 'red' },
];

export const TaskState: State[] = [
  { state: 'task.UNFINISHED', code: 0, color: 'orange' },
  { state: 'task.FINISHED', code: 1, color: 'green' },
  // { state: 'task.SUSPENDED', code: 3, color: 'purple' },
  { state: 'task.CANCELED', code: -1, color: 'red' },
];

export const UserTaskState: State[] = [
  { state: 'userTask.UNFINISHED', code: 0, color: 'orange' },
  { state: 'userTask.FINISHED', code: 1, color: 'green' },
  { state: 'userTask.CONFIRMED', code: 2, color: 'purple' },
  { state: 'userTask.CANCELED', code: -1, color: 'red' },
];

export function getRewardState(value: number) {
  const { color, state } =
    RewardState.find((item) => item.code === value) || {};
  return { color, state };
}

export function getRewardCode(value: string) {
  return RewardState.find((item) => item.state === value)?.code;
}

export function getTaskState(value: number) {
  const { color, state } = TaskState.find((item) => item.code === value) || {};
  return { color, state };
}

export function getTaskCode(value: string) {
  return TaskState.find((item) => item.state === value)?.code;
}

export function getUserTaskState(value: number) {
  const { color, state } =
    UserTaskState.find((item) => item.code === value) || {};
  return { color, state };
}

export function getUserTaskCode(value: string) {
  return UserTaskState.find((item) => item.state === value)?.code;
}
