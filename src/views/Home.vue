<script setup>
import ProductList from "../components/ProductList.vue";
import { useProductsStore } from "../store/products";
import { computed } from "vue";

const productStore = useProductsStore();

const clothingProducts = computed(() =>
  productStore.products.filter((product) => product.topCategory === "clothing")
);
const electronicsProducts = computed(() =>
  productStore.products.filter(
    (product) => product.topCategory === "electronics"
  )
);
const jewelryProducts = computed(() =>
  productStore.products.filter((product) => product.topCategory === "jewelery")
);
</script>

<template>
  <main class="home_container">
    <ProductList title="패션" :products="clothingProducts" />
    <ProductList title="디지털" :products="electronicsProducts" />
    <ProductList title="악세서리" :products="jewelryProducts" />
  </main>
</template>

<style scoped>
.home_container {
  width: 100%;
  height: 100%;
}
</style>
