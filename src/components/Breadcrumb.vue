<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useProductsStore } from "../store/products";
import { useRoute } from "vue-router";
import { CATEGORY_KR } from "../utils/normalizeCategory";
import type { TopCategory } from "../api/fetchProduct";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type BreadcrumbItem = {
  label: string; //화면에 표시될 텍스트(한글변환예정)
  to?: string; //링크가 필요한 경우
};

const route = useRoute();
const productsStore = useProductsStore();

const routeId = computed(() => {
  return route.params.id ? Number(route.params.id) : null;
});
const routeCategory = computed<TopCategory | undefined>(() => {
  const category = route.params.category;

  if (typeof category === "string") {
    return category as TopCategory;
  }

  return undefined;
});

onMounted(async () => {
  if (!productsStore.products.length) {
    await productsStore.loadProducts();
  }
});

const breadcrumb = computed<BreadcrumbItem[]>(() => {
  if (!productsStore.products.length) return [];

  //카테고리 리스트_breadcrumb
  if (routeCategory.value && !routeId.value) {
    return [
      {
        label: "홈",
        to: "/",
      },
      {
        label: routeCategory.value
          ? CATEGORY_KR[routeCategory.value as TopCategory]
          : "",
      },
    ];
  }

  //상세페이지_breadcrumb
  if (routeCategory && routeId) {
    const found = productsStore.products.find(
      (product) => product.id === routeId.value
    );
    if (!found) {
      return [{ label: "홈", to: "/" }];
    }
    return [
      { label: "홈", to: "/" },
      {
        label:
          CATEGORY_KR[found.topCategory as TopCategory] ?? found.topCategory,
        to: `/${found.topCategory}`,
      },
      {
        label: found.title,
      },
    ];
  }
  return [];
});
</script>

<template>
  <nav
    class="breadcrumb_container"
    v-if="routeId !== null || routeCategory !== undefined"
  >
    <ul class="breadcrumb">
      <li
        class="breadcrumb_li"
        v-for="(item, index) in breadcrumb"
        :key="index"
      >
        <span v-if="item.to" class="breadcrumb_link">
          <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          <FontAwesomeIcon
            icon="chevron-right"
            v-if="index < breadcrumb.length - 1"
          />
        </span>
        <span v-else>{{ item.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.breadcrumb_container {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 30px;
  margin-top: 56px;
}

.breadcrumb {
  display: flex;
  overflow: hidden;
}

.breadcrumb_li {
  display: flex;
  flex-shrink: 0;
}

.breadcrumb_li:last-child {
  flex: 1;
  min-width: 0;
}

.breadcrumb_li:last-child span {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.breadcrumb_link svg {
  color: gray;
  opacity: 0.4;
}
.breadcrumb_link :hover {
  color: var(--color-hover);
  font-weight: 600;
}
</style>
