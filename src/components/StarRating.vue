<script setup lang="ts">
import { computed } from "vue";

// 부모로부터 rating 점수 전달받기
const props = defineProps<{
  rating: number;
}>();

// 가득찬 별 개수(정수)
const fullStars = computed(() => {
  return Math.floor(props.rating);
});

// 소수점 0.5이상시 반쪽 별
const hasHalfStar = computed(() => {
  return props.rating % 1 >= 0.5;
});
</script>

<template>
  <div class="star-rating">
    <!-- 총 5개의 별을 반복 렌더링 -->
    <span v-for="index in 5" :key="index" class="star">
      <!--
        index <= fullStars → 꽉 찬 별
        index === fullStars + 1 && hasHalfStar → 반 별
        그 외 → 빈 별
      -->
      <font-awesome-icon v-if="index <= fullStars" :icon="['fas', 'star']" />

      <font-awesome-icon
        v-else-if="index === fullStars + 1 && hasHalfStar"
        :icon="['fas', 'star-half-alt']"
      />

      <font-awesome-icon v-else :icon="['far', 'star']" />
    </span>
  </div>
</template>

<style scoped>
.star-rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.star {
  color: #f5c518; /* IMDb 느낌 노랑 */
  font-size: 18px;
}
</style>
