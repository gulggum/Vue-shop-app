<script setup lang="ts">
import fashionImg from "../assets/img/carousel/img_shop_fashion.jpeg";
import digitalImg from "../assets/img/carousel/img_shop_digital.jpeg";
import groceryImg from "../assets/img/carousel/img_shop_grocery.jpeg";
import { useSliderStore } from "../store/slider";
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";

const sliderStore = useSliderStore();
const slideCount = 3; //슬라이드 개수
let interval: number;
onMounted(() => {
  interval = setInterval(() => {
    sliderStore.currentIndex = (sliderStore.currentIndex + 1) % slideCount;
  }, 3000);
});
onUnmounted(() => {
  //슬라이드가 보이지 않는 상태에선 제거
  clearInterval(interval);
});
const items = ref([
  {
    name: "clothing",
    title: "물빠진 청바지!",
    text: "이제 막 도착한 패션 청바지를 구경해 보세요.",
    img: fashionImg,
  },
  {
    name: "electronics",
    title: "신속한 업무처리!",
    text: "다양한 디지털 상품을 둘러보세요.",
    img: digitalImg,
  },
  {
    name: "grocery",
    title: "신선한 식품!",
    text: "농장 직배송으로 더욱 신선한 식료품을 만나보세요.",
    img: groceryImg,
  },
]);
</script>

<template>
  <div class="slideContainer">
    <div class="slider">
      <ul
        class="slider_wrapper"
        :style="{
          transform: `translateX(-${sliderStore.currentIndex * 100}%)`,
        }"
      >
        <li v-for="item in items" :key="item.name" class="slide">
          <img :src="item.img" :alt="item.name" class="slide_img" />
          <div class="slide_info">
            <h3 class="slide_title">{{ item.title }}</h3>
            <p class="slide_text">{{ item.text }}</p>
            <router-link :to="`/${item.name}`">
              <button class="slide_button">바로가기 ➔</button>
            </router-link>
          </div>
        </li>
      </ul>
      <div class="dots">
        <span
          v-for="(item, index) in items"
          :key="item.name"
          :class="[
            'dot',
            { 'dot--active': sliderStore.currentIndex === index },
          ]"
          @click="sliderStore.currentIndex = index"
        ></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider {
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 460px;
  margin-top: 56px;
  font-size: 1rem;
}

.slider_wrapper {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
}

.slide {
  position: relative;
  min-width: 100%;
  height: 100%;
}
.slide_img {
  width: 100%;
  object-fit: cover;
}
.slide_info {
  width: 100%;
  position: absolute;
  top: 50%;
  padding: 100px;
  transform: translate(0, -50%);
  color: #fff;
}
.slide_title {
  letter-spacing: 1px;
  font-size: 3em;
  font-weight: 500;
  margin-bottom: 10px;
}
.slide_text {
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 1.5em;
}

.slide_button {
  padding: 0.5em 1.5em;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  background-color: #3d4451;
  font-size: 1.2em;
}
.slide_button:hover {
  background-color: var(--color-hover);
}

/* 점 네비게이션 */
.dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
  z-index: 5;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot--active {
  background-color: #333;
}
@media screen and (max-width: 768px) {
  .slider {
    height: 200px;
    font-size: 0.5rem;
  }

  .slide_info {
    padding: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
