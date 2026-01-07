<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useUiStore } from "../store/ui";
import { useProductsStore } from "../store/products";
import { computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { CATEGORY_KR } from "../utils/normalizeCategory";
import { useSearchStore } from "../store/search";
import type { Product } from "../api/fetchProduct";
import router from "../router/router";

const uiStore = useUiStore(); //ui토글용
const productsStore = useProductsStore(); //카테고리 용
const searchStore = useSearchStore();

defineProps<{
  title: string;
  products: Product[];
}>();

onMounted(async () => {
  await productsStore.loadProducts();
});

//키워드 필터링
const filteredProducts = computed(() => {
  const keyword = searchStore.keyword.trim();

  if (!keyword) return [];

  return productsStore.products.filter((product) =>
    product.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  );
});

const goDetail = (product: Product) => {
  searchStore.clearKeyword();
  router.push(`/${product.topCategory}/${product.id}`);
};
</script>

<template>
  <header>
    <div class="header_wrapper">
      <div class="left_area">
        <button class="mobile_menuBarBtn" @click="uiStore.toggleSidebar">
          <font-awesome-icon icon="bars" />
        </button>
        <h1 class="logo">
          <router-link to="/">Vue Shop</router-link>
        </h1>
      </div>

      <div class="right_area">
        <button class="themeBtn" @click="uiStore.toggleTheme">
          <font-awesome-icon :icon="uiStore.isDarkTheme ? 'moon' : 'sun'" />
        </button>
        <div class="search_area">
          <input class="search_input" type="text" placeholder="검색..." />
          <button @click="uiStore.toggleSearchInput">
            <font-awesome-icon icon="magnifying-glass" />
          </button>
        </div>
        <button class="cart"><font-awesome-icon icon="shopping-cart" /></button>
      </div>
      <!-- 모바일전용 사이드바 -->
      <div
        v-show="uiStore.isSidebarOpen"
        @click="uiStore.closeSidebar"
        class="sidebar_overlay"
      >
        <transition name="slide"
          ><aside v-show="uiStore.isSidebarOpen" class="sidebar" @click.stop>
            <ul class="menu">
              <li
                class="menu_link"
                v-for="category in productsStore.categories"
                @click="
                  $router.push({ name: 'category', params: { category } });
                  uiStore.closeSidebar();
                "
              >
                {{ CATEGORY_KR[category] }}
              </li>
            </ul>
          </aside></transition
        >
      </div>
    </div>
    <div class="mobile_search_input_area">
      <input
        v-show="uiStore.isSearchOpen"
        v-model="searchStore.keyword"
        class="mobile_search_input"
        type="text"
        placeholder="검색..."
      />
      <ul v-if="searchStore.keyword" class="mobile_search_dropdown">
        <li
          v-for="product in filteredProducts"
          @click="goDetail(product)"
          class="mobile_search_list"
        >
          {{ product.title }}
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
header {
  max-width: 1200px;
  height: 56px;
  justify-content: center;
  margin: 0 auto;
}
.header_wrapper {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: orange;
  padding: 0 16px;
  box-sizing: border-box;
}
.left_area {
  display: flex;
  align-items: center;
}
.right_area {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.search_area {
  display: flex;
  align-items: center;
}
.mobile_menuBarBtn {
  margin-right: 10px;
}
.logo {
  font-size: 1.5em;
  font-weight: 800;
}
/* 검색창 리스트 */
.search_input {
  display: none;
}

.mobile_search_input_area {
  position: relative;
}
.mobile_search_input {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 40px;
  z-index: 5;
}

.mobile_search_dropdown {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 300px;
  background-color: wheat;
  z-index: 2000;
}
.mobile_search_list {
  padding: 10px 5px;
  cursor: pointer;
}
.mobile_search_list :hover {
  background-color: var(--color-hover);
}

/* 사이드바 */
/* 시작 & 끝 상태 */
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* 활성 상태 (애니메이션 시간) */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

/* 열린 상태 */
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

.sidebar_overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}
.sidebar {
  width: 200px;
  height: 100%;
  background-color: white;
  padding: 2em;
}
.menu_link {
  cursor: pointer;
}
</style>
