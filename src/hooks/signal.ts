import { ref } from 'vue';

export default function useSignal(initValue = false) {
  const signal = ref(initValue);
  const setSignal = (value: boolean) => {
    signal.value = value;
  };
  const toggle = () => {
    signal.value = !signal.value;
  };
  const pulse = () => {
    toggle();
    setTimeout(() => {
      toggle();
    }, 100);
  };

  return {
    signal,
    setSignal,
    toggle,
    pulse,
  };
}
