<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { fetchProducts, type Product } from "../api/fetchProduct.ts";

const { data: products } = useQuery<Product[]>({
  queryKey: ["products"],
  queryFn: fetchProducts,
});
console.log(products);
</script>

<template>
  <div class="productsList_container">
    <ul class="product_list">
      <li v-for="product in products" class="product_box">
        <img :src="product.image" :alt="product.title" class="product_img" />
        <h4 class="product_name">{{ product.title }}</h4>
        <span class="product_price">{{ product.price }}</span>
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
.product_list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}
.product_box {
  margin: 0 auto;
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: aliceblue;
}
.product_img {
  width: 130px;
}
</style>
