import { useStore } from "vuex";
import { computed } from "vue";

export const useMapGetters = (moduleField) => {
  const store = useStore();
  const field = computed(() => store.getters[moduleField]);
  return {
    field,
  };
};
