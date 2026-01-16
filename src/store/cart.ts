import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref<CartItem[]>([]);

    const totalCount = computed(() => {
      return items.value.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);
    });

    const totalPrice = computed(() => {
      return items.value.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
    });
    const addToCart = (product: Omit<CartItem, "quantity">) => {
      const existingItem = items.value.find((item) => item.id === product.id);
      console.log("오키 받았다!", existingItem);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        items.value.push({
          ...product,
          quantity: 1,
        });
      }
    };

    const removeFromCart = (id: number) => {
      items.value = items.value.filter((item) => item.id !== id);
    };

    const changeQuantity = (id: number, quantity: number) => {
      const item = items.value.find((item) => item.id === id);
      if (!item) return;

      if (quantity < 1) return;
      item.quantity = quantity;
    };

    const clearCart = () => {
      items.value = [];
    };

    return {
      //state
      items,
      //getters
      totalCount,
      totalPrice,
      //actions
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,
    };
  },
  {
    persist: true, // localStorage 저장
  }
);
