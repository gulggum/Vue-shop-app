<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useUiStore } from "../store/ui";
import { useProductsStore } from "../store/products";
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { CATEGORY_KR } from "../utils/normalizeCategory";

const uiStore = useUiStore(); //ui토글용
const productsStore = useProductsStore(); //카테고리 용

onMounted(async () => {
  await productsStore.loadProducts();
});
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
    <input
      v-show="uiStore.isSearchOpen"
      class="mobile_search_input"
      type="text"
      placeholder="검색..."
    />
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 56px;
  justify-content: center;
}
.header_wrapper {
  max-width: 1200px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: orange;
  padding: 0 16px;
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
.search_input {
  display: none;
}
.mobile_search_input {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 40px;
  z-index: 5;
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
