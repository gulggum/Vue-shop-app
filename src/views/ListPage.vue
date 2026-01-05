<script setup>
import { useRoute } from "vue-router";
import { useProductsStore } from "../store/products";
import { computed, onMounted } from "vue";
import ProductList from "../components/ProductList.vue";
import { CATEGORY_KR } from "../utils/normalizeCategory";

const route = useRoute();
const id = computed(() => route.params.id);
const productsStore = useProductsStore();

const category = computed(() => route.params.category);

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

//카테고리/breadcrumb 계산
const breadcrumb = computed(() => {
  const found = productsStore.products.find((p) => p.id === +id.value);
  return found ? ["홈 >", found.topCategory, "> " + found.title] : ["홈"];
});
</script>
<template>
  <section>
    <Nav>
      <ul class="breadcrumb">
        <li v-for="(item, index) in breadcrumb" :key="index">
          {{ CATEGORY_KR[item] }}
        </li>
      </ul>
    </Nav>
    <h2 class="categoryPage_title">
      {{ CATEGORY_KR[category] }}
    </h2>
    <ProductList :products="filteredProducts" />
  </section>
</template>

<style scoped>
.categoryPage_title {
  font-size: 2.5em;
}
</style>
