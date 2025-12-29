import { defineStore } from "pinia";
import { ref } from "vue";

//사이드바,테마 토글 상태관리
export const useUiStore = defineStore("ui", () => {
  const isSidebarOpen = ref(false);
  const isDarkTheme = ref(false);

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
  const closeSidebar = () => {
    isSidebarOpen.value = false;
  };
  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
  };

  return {
    isSidebarOpen,
    toggleSidebar,
    isDarkTheme,
    toggleTheme,
    closeSidebar,
  };
});
