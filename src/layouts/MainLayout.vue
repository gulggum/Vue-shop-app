<script setup lang="ts">
import Breadcrumb from "../components/Breadcrumb.vue";
import Header from "../components/Header.vue";
import Slider from "../components/Slider.vue";
import Footer from "../components/Footer.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <Header />
  <Slider v-if="route.path === '/'" />
  <main>
    <Breadcrumb v-if="route.name ! == 'notFoundPage'" />
    <RouterView />
  </main>
  <Footer />
</template>

<style>
main {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
