<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import { useProductsStore } from "../store/products";
import { onMounted } from "vue";
import type { Product } from "../api/fetchProduct";
import { formatUSD } from "../utils/normalizeCategory";
import { useCartStore } from "../store/cart";
import StarRating from "./StarRating.vue";

const productsStore = useProductsStore();
const cartStore = useCartStore();
const route = useRoute();
const id = Number(route.params.id); //number로 통일

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

const addItem = (product: Product) => {
  cartStore.addToCart(product);
  console.log("나 상품 들어왔어!", product);
};
</script>

<template>
  <main class="detail_container">
    <div class="detail_product">
      <div class="detail_imageBox">
        <img :src="product?.image" :alt="product?.title" />
      </div>
      <div class="detail_info">
        <div class="detail_title">{{ product?.title }}</div>
        <p class="detail_des">{{ product?.description }}</p>
        <div class="ratingBox"></div>
        <div class="detail_price">{{ formatUSD(product?.price ?? 0) }}</div>
        <div class="star_rating">
          <StarRating
            class="star_Icons"
            v-if="product?.rating?.rate"
            :rating="product.rating.rate"
          /><span>{{ product?.rating.rate }} / </span
          ><span>{{ product?.rating?.count }} 참여</span>
        </div>

        <div class="cartNav_button">
          <button
            class="addCart"
            :disabled="!product"
            @click="product && addItem(product)"
          >
            장바구니에 담기
          </button>
          <router-link to="/cart">
            <button class="goToCart">장바구니로 이동</button>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.detail_container {
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.detail_product {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
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
  background-color: var(--color-item-bg);
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
.star_rating {
  padding: 20px 0px;
  display: flex;
  align-items: center;
  font-size: 1.2em;
  gap: 10px;
}
.addCart {
  background-color: #570df8;
  color: white;
}
.addCart:hover {
  background-color: #400bb4;
  transition: all 0.4s ease;
}
.goToCart {
  background-color: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-text);
  margin-left: 10px;
}
</style>
