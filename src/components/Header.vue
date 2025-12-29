<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useUiStore } from "../store/ui";

const uiStore = useUiStore();
</script>

<template>
  <header>
    <button class="mobile_menuBar" @click="uiStore.toggleSidebar">
      <font-awesome-icon icon="bars" />
    </button>
    <h1 class="logo">Vue Shop</h1>
    <div class="right_area">
      <button class="themeBtn" @click="uiStore.toggleTheme">
        <font-awesome-icon :icon="uiStore.isDarkTheme ? 'moon' : 'sun'" />
      </button>
      <div class="search">
        <input type="text" placeholder="검색..." />
        <button><font-awesome-icon icon="magnifying-glass" /></button>
      </div>
      <button class="cart"><font-awesome-icon icon="shopping-cart" /></button>
    </div>
    <div v-show="uiStore.isSidebarOpen" class="sidebar_overlay">
      <!-- 사이드바 -->
      <aside :class="['sidebar', { open: uiStore.isSidebarOpen }]">
        <ul class="menu">
          <li>의류</li>
          <li>쥬얼리</li>
          <li>전자</li>
        </ul>
      </aside>
    </div>
  </header>
</template>

<style scoped>
.sidebar {
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sidebar.open {
  transform: translateX(0);
}
</style>
