<script setup lang="ts">
import type { Product } from "../api/fetchProduct.ts";
import { formatUSD } from "../utils/normalizeCategory.ts";

defineProps<{
  title: string;
  products: Product[];
}>();
</script>

<template>
  <div class="productsList_container">
    <h2 v-if="title" class="productCategory_title">{{ title }}</h2>
    <ul class="product_list">
      <li
        v-for="product in products"
        @click="$router.push(`${product.topCategory}/${product.id}`)"
        class="product_box"
      >
        <div class="product_img_box">
          <img :src="product.image" :alt="product.title" class="product_img" />
        </div>

        <div class="product_info">
          <h4 class="product_name">{{ product.title }}</h4>
          <span class="product_price">{{ formatUSD(product.price) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.productsList_container {
  max-width: 1200px;
  padding: 1em;
  margin: 0 auto;
}
.productCategory_title {
  font-size: 2.3em;
  padding: 1em;
  text-align: center;
  font-weight: 500;
  margin-bottom: 1em;
  border-bottom: 2px solid var(--color-hover);
}
.product_list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;
}
.product_box {
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--color-item-bg);
  cursor: pointer;
  padding: 15px 10px;
  border-radius: 5px;
  font-size: 1.2em;
  &:hover {
    .product_img {
      scale: 1.1;
      transition: scale 0.3s ease;
    }
  }
}
.product_img_box {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
}
.product_img {
  width: 100px;
}
.product_info {
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  height: 100px;
}

.product_name {
  padding: 5px 10px;
  font-weight: 500;
  line-height: 1.2;
  font-size: 0.9em;
}
.product_price {
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
}
</style>
