import { defineStore } from "pinia";
import { ref } from "vue";

export const useSliderStore = defineStore("slider", () => {
  const currentIndex = ref(0);

  const nextSlide = (max: number) => {
    if (currentIndex.value < max - 1) currentIndex.value++;
  };
  const prevSlide = () => {
    if (currentIndex.value < 0) currentIndex.value--;
  };

  const goToSlide = (index: number) => {
    currentIndex.value = index;
  };

  return { currentIndex, nextSlide, prevSlide, goToSlide };
});
