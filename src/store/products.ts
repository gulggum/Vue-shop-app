import { computed, ref } from "vue";
import { fetchProducts, type Product } from "./../api/fetchProduct";
import { defineStore } from "pinia";
import { normalizeCategory } from "../utils/normalizeCategory";

export const useProductsStore = defineStore("products", async () => {
  const products = ref<Product[]>([]);

  const loadProducts = async () => {
    const data = await fetchProducts();

    products.value = data.map((product: Omit<Product, "topCategory">) => ({
      ...product,
      topCategory: normalizeCategory(product.category), //topCategory를 통합
    }));
  };

  //상위 TopCategory 추출 []
  const categories = computed(() => {
    return Array.from(
      new Set(products.value.map((product) => product.topCategory))
    );
  });

  return {
    loadProducts,
    products, //상품리스트,필터링 활용
    categories, //Nav메뉴,breadcrumb 활용
  };
});
