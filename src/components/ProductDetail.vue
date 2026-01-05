<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import { useProductsStore } from "../store/products";
import { computed, onMounted } from "vue";
import type { Product } from "../api/fetchProduct";
import { formatUSD } from "../utils/normalizeCategory";

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
  <div class="detail_container">
    <div class="detail_product">
      <div class="detail_imageBox">
        <img :src="product?.image" :alt="product?.title" />
      </div>
      <div class="detail_info">
        <div class="detail_title">{{ product?.title }}</div>
        <p class="detail_des">{{ product?.description }}</p>
        <div class="ratingBox"></div>
        <div class="detail_price">{{ formatUSD(product?.price ?? 0) }}</div>
        <div class="cartNav_button">
          <button class="addCart">장바구니에 담기</button>
          <button class="goToCart">장바구니로 이동</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  li {
    margin-right: 10px;
  }
}

.detail_container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 10px;
}

.detail_product {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 35px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.detail_imageBox {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
  }
}
.detail_info {
  padding: 10px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.detail_title {
  font-size: 2em;
  font-weight: 500;
  line-height: 1.5em;
}
.detail_des {
  margin-bottom: 20px;
  line-height: 1.5em;
}
.detail_price {
  font-size: 2.6em;
  font-weight: 600;
}
</style>
