import { computed, ref } from "vue";
import { fetchProducts, type Product } from "./../api/fetchProduct";
import { defineStore } from "pinia";
import { normalizeCategory } from "../utils/normalizeCategory";

export const useProductsStore = defineStore("products", () => {
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

  /** 🔹 카테고리별 상품 필터 */
  const getProductsByCategory = (category: string) => {
    return products.value.filter((product) => product.topCategory === category);
  };

  const getProductById = async (id: number): Promise<Product | undefined> => {
    if (!products.value.length) {
      await loadProducts();
    }
    return products.value.find((product) => product.id === id);
  };

  return {
    products, //상품리스트,필터링 활용
    categories, //Nav메뉴,breadcrumb 활용
    getProductById,
    loadProducts,
    getProductsByCategory,
  };
});
