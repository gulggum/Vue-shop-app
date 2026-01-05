<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import { useProductsStore } from "../store/products";
import { computed, onMounted } from "vue";
import type { Product } from "../api/fetchProduct";

const productsStore = useProductsStore();
const route = useRoute();
const id = Number(route.params.id); //number로 통일

console.log("😍" + typeof id);
//store에서 products불러오기
onMounted(async () => {
  if (!productsStore.getProductsByCategory) {
    await productsStore.loadProducts();
  }
});

const { data: product } = useQuery<Product | undefined>({
  queryKey: ["product", id],
  queryFn: () => productsStore.getProductById(id),
  enabled: !!id,
});
console.log(product);

//카테고리/breadcrumb 계산
const breadcrumb = computed(() => {
  const found = productsStore.products.find((p) => p.id === +id);
  return found ? ["홈 >", found.topCategory, "> " + found.title] : ["홈"];
});
</script>

<template>
  <Nav>
    <ul class="breadcrumb">
      <li v-for="(item, index) in breadcrumb" :key="index">
        {{ item }}
      </li>
    </ul>
  </Nav>
  <h1>ProductDetail</h1>
  <img :src="product?.image" alt="" />
</template>

<style scoped>
.breadcrumb {
  display: flex;
  li {
    margin-right: 10px;
  }
}
</style>
