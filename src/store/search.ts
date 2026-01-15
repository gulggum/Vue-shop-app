import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore("search", () => {
  const keyword = ref("");

  const setKeyword = (value: string) => {
    keyword.value = value;
  };

  const clearKeyword = () => {
    keyword.value = "";
  };
  return { keyword, setKeyword, clearKeyword };
});
