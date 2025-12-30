<script setup>
import ProductList from "../components/ProductList.vue";
import Slider from "../components/Slider.vue";
</script>

<template>
  <main class="home_container">
    <Slider />
    <ProductList />
  </main>
</template>

<style scoped>
.home_container {
  width: 100%;
  height: 100%;
}
</style>
