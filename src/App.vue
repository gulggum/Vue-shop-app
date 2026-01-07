<script setup lang="ts">
import { watch } from "vue";
import { useUiStore } from "./store/ui";

//setup꼭 써주기(템플릿에서 자동으로 노출되도록)

const uiStore = useUiStore();

watch(
  () => uiStore.isDarkTheme,
  (isDark) => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  },
  { immediate: true } //처음 로드될때도 적용
);
</script>

<template>
  <!-- 현재 url에 맞는 최상위 라우트 컴포넌트를 보여주기 -->
  <RouterView :key="$route.path" />
</template>

<style scoped></style>
