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
import { useCartStore } from "../store/cart";

const uiStore = useUiStore(); //ui토글용
const productsStore = useProductsStore(); //카테고리 용
const searchStore = useSearchStore();
const cartStore = useCartStore();

defineProps<{
  title?: string;
  products?: Product[];
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
  uiStore.isMobileSearchOpen = false;
  searchStore.keyword = "";
};
</script>

<template>
  <header>
    <div class="header_wrapper">
      <div class="left_area">
        <button class="mobile_menuBarBtn" @click="uiStore.toggleSidebar">
          <font-awesome-icon icon="bars" />
        </button>
        <h1>
          <router-link to="/" class="logo">Vue Shop</router-link>
        </h1>
        <div class="menu_nav">
          <ul v-for="category in productsStore.categories">
            <li
              class="menu_link"
              @click="$router.push({ name: 'category', params: { category } })"
            >
              {{ CATEGORY_KR[category] }}
            </li>
          </ul>
        </div>
      </div>

      <div class="right_area">
        <button class="themeBtn" @click="uiStore.toggleTheme">
          <font-awesome-icon :icon="uiStore.isDarkTheme ? 'moon' : 'sun'" />
        </button>
        <!-- 모바일전용 검색버튼 -->
        <button
          class="mobile_search_button"
          @click="uiStore.toggleMobileSearchInput"
        >
          <font-awesome-icon icon="magnifying-glass" />
        </button>
        <!-- Pc버전 검색창 -->
        <div class="search_area">
          <input
            class="search_input"
            type="text"
            placeholder="검색..."
            v-model="searchStore.keyword"
          />
          <ul v-if="searchStore.keyword" class="search_dropdown">
            <li
              v-for="product in filteredProducts"
              @click="goDetail(product)"
              class="search_list"
            >
              {{ product.title }}
            </li>
          </ul>
        </div>
        <!-- cart버튼 -->
        <button class="cart">
          <router-link to="/cart">
            <font-awesome-icon icon="shopping-cart" />
            <span v-if="cartStore.items.length > 0">{{
              cartStore.items.length
            }}</span></router-link
          >
        </button>
      </div>
      <!-- 모바일전용 사이드바 -->
      <div
        v-show="uiStore.isSidebarOpen"
        @click="uiStore.closeSidebar"
        class="sidebar_overlay"
      >
        <transition name="slide"
          ><aside v-show="uiStore.isSidebarOpen" class="sidebar" @click.stop>
            <ul>
              <li
                class="mobile_menu_link"
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
    <!-- 모바일전용 검색창 -->
    <div class="mobile_search_wrap" v-if="uiStore.isMobileSearchOpen">
      <input
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

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  background-color: var(--color-bg);
  color: var(--color-text);
  z-index: 1000;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}

.header_wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
}

.left_area {
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
}
.right_area {
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
}

.logo {
  width: 150px;
  font-size: 1.5em;
  font-weight: 800;
  padding-right: 10px;
  height: 56px;
  line-height: 56px;
}
.logo:hover {
  color: var(--color-hover);
  transition: all 0.4s ease;
}

/* pc용 메뉴 */
.menu_nav {
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.menu_link {
  padding: 10px 15px;
  border-radius: 5px;
}
.menu_link:hover {
  background-color: var(--color-hover);
  transition: all 0.4s ease;
  cursor: pointer;
}

button svg {
  color: var(--color-text);
  font-size: 1.5em;
}

/* cart 뱃지 */
.cart {
  position: relative;
  box-sizing: border-box;
}

.cart span {
  position: absolute;
  top: -3px;
  right: 0;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 3px 7px;
  font-size: 12px;
  z-index: 10000;
}

/* 검색창 리스트 */

.search_area {
  position: relative;
  width: 300px;
  display: flex;
  align-items: center;
}
.search_input {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 5px;
}

.search_dropdown {
  position: absolute;
  width: 100%;
  top: 47px;
  height: 300px;
  background-color: var(--color-bg);
  z-index: 2000;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
.search_list {
  width: 100%;
  padding: 15px 5px;
  cursor: pointer;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: dotted 1px var(--color-line);
}
.search_list:hover {
  background-color: var(--color-hover);
  transition: all 0.4s ease;
}
.mobile_search_button {
  display: none;
}

.mobile_search_wrap {
  position: absolute;
  width: 100%;
  top: 56px;
}

.mobile_search_input {
  position: relative;
  width: 100%;
  z-index: 5;
  border: none;
  background-color: var(--color-line);
  padding: 14px;
  display: none;
}

.mobile_search_dropdown {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 300px;
  background-color: var(--color-bg);
  z-index: 2000;
  display: none;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}
.mobile_search_list {
  width: 100%;
  padding: 15px 5px;
  cursor: pointer;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: dotted 1px var(--color-line);
}
.mobile_search_list:hover {
  background-color: var(--color-hover);
  transition: all 0.4s ease;
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
  position: fixed;
  inset: 0;
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
  position: fixed;
  width: 250px;
  height: 100%;
  background-color: var(--color-bg);
  color: var(--color-text);
  padding: 2em;
  z-index: 1002;
}
.mobile_menu_link {
  cursor: pointer;
  padding: 1.2em 1em;
  border-radius: 5px;
  font-size: 1.5em;
  font-weight: 500;
}
.mobile_menu_link:hover {
  background-color: var(--color-hover);
  transition: all 0.4s ease;
}

/* 모바일용 햄버거버튼 */
.mobile_menuBarBtn {
  display: none;
  margin-right: 10px;
  color: var(--color-text);
}

@media (max-width: 768px) {
  button {
    padding: 5px;
  }
  button svg {
    font-size: 1.3em;
  }
  .mobile_menuBarBtn {
    display: block;
  }
  .menu_nav {
    display: none;
  }
  .search_area {
    display: none;
  }
  .search_input {
    display: none;
  }
  .search_dropdown {
    display: none;
  }
  .mobile_search_button {
    display: block;
  }
  .mobile_search_input {
    display: block;
  }
  .mobile_search_dropdown {
    display: block;
  }
  .cart span {
    padding: 2px 4px;
    font-size: 10px;
  }
}
</style>
