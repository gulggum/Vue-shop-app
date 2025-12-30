<script setup lang="ts">
import fashionImg from "../assets/img/carousel/img_shop_fashion.jpeg";
import digitalImg from "../assets/img/carousel/img_shop_digital.jpeg";
import groceryImg from "../assets/img/carousel/img_shop_grocery.jpeg";
import { useSliderStore } from "../store/slider";
import { ref } from "vue";

const sliderStore = useSliderStore();
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
        :style="{
          transform: `translateX(-${sliderStore.currentIndex * 100}%)`,
        }"
      >
        <li v-for="item in items" :key="item.name" class="slide">
          <img :src="item.img" :alt="item.name" class="slide_img" />
          <div class="slide_info">
            <h3 class="slide_title">{{ item.title }}</h3>
            <p class="slide_text">{{ item.text }}</p>
            <button class="slide_button">바로가기</button>
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
  width: 100vw;
  position: relative;
  overflow: hidden;
  height: 200px;
}
.slider ul {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  position: relative;
  min-width: 100%;
}
.slide_img {
  width: 100%;
  display: block;
}
.slide_info {
  position: absolute;
  left: 0;
  top: 0;
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
</style>
