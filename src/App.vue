<script setup lang="ts">
//setup꼭 써주기(템플릿에서 자동으로 노출되도록)
import Header from "./components/Header.vue";
import Slider from "./components/Slider.vue";
</script>

<template>
  <Header />
  <Slider />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
