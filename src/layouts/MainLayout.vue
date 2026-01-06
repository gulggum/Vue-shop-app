<script setup lang="ts">
import Breadcrumb from "../components/Breadcrumb.vue";
import Header from "../components/Header.vue";
</script>

<template>
  <Header />
  <main>
    <Breadcrumb />
    <RouterView />
  </main>
  <!-- <Footer /> -->
</template>

<style scoped>
main {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
