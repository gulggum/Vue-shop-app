<script setup>
import { useRoute } from "vue-router";
import { useProductsStore } from "../store/products";
import { computed, onMounted } from "vue";
import ProductList from "../components/ProductList.vue";
import { CATEGORY_KR } from "../utils/normalizeCategory";

const route = useRoute();
const productsStore = useProductsStore();
const category = computed(() => route.params.category); //computed로 의존값

onMounted(async () => {
  if (!productsStore.products.length) {
    await productsStore.loadProducts();
  }
});

//해당 카테고리 상품만 필터링
const filteredProducts = computed(() => {
  return productsStore.products.filter(
    (product) => product.topCategory === category.value
  );
});
</script>
<template>
  <section>
    <h2 class="categoryPage_title">
      {{ CATEGORY_KR[category] }}
    </h2>
    <ProductList
      :products="filteredProducts"
      :title="CATEGORY_KR[category.value] ?? ''"
    />
  </section>
</template>

<style scoped>
.categoryPage_title {
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 1em;
}
</style>
