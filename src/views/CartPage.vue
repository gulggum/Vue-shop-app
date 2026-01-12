<script setup>
import { useCartStore } from "../store/cart";
import { normalizeCategory } from "../utils/normalizeCategory";
import { formatUSD } from "../utils/normalizeCategory";

const cartStore = useCartStore();

const increase = (id) => {
  const item = cartStore.items.find((item) => item.id === id);
  if (!item) return;

  cartStore.changeQuantity(id, item.quantity + 1);
};

const decrease = (id) => {
  const item = cartStore.items.find((item) => item.id === id);
  if (!item) return;
  if (item.quantity > 1) cartStore.changeQuantity(id, item.quantity - 1);
};

const onBuying = () => {
  alert("구매해주셔서 감사합니다! 😍");
};
</script>

<template>
  <div class="cart-container">
    <h2 class="page-title">Shopping Cart</h2>

    <!-- 장바구니 비어있을 때 -->
    <p v-if="cartStore.items.length === 0">장바구니가 비어있습니다.</p>

    <!-- 장바구니 아이템 -->
    <ul v-else class="cart_wrap">
      <li v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <!-- 이미지 -->
        <div class="item_image_wrapper">
          <img class="item_image" :src="item.image" alt="이미지" />
        </div>

        <!-- 상품 정보 -->
        <div class="item_detail">
          <span class="item_name">
            {{ item.title }}
          </span>

          <span class="item_price">
            {{ formatUSD(item.price) }}
          </span>

          <!-- 수량 조절 -->
          <div class="count_control">
            <button @click="decrease(item.id)">－</button>
            <span class="quantity_value">
              {{ item.quantity }}
            </span>
            <button @click="increase(item.id)">＋</button>
          </div>

          <span class="count_price">
            $ {{ (item.price * item.quantity).toFixed(2) }}
          </span>
        </div>

        <!-- 버튼 영역 -->
        <div class="control_buttons">
          <button>Buy Now</button>
          <button @click="cartStore.removeFromCart(item.id)">Delete</button>
        </div>
      </li>
    </ul>

    <!-- 총 금액 -->
    <div v-if="cartStore.items.length > 0" class="total_price">
      <span>Total Price:</span>
      <span>{{ formatUSD(cartStore.totalPrice) }}</span>

      <button class="buying_button" @click="onBuying">Buying</button>
    </div>
  </div>
</template>

<style>
.cart-container {
  max-width: 1200px;
  box-sizing: border-box;
  padding: 1rem;
  font-size: 1rem;
}

/* @media (max-width: 768px) {
  .cart-container {
    font-size: 0.8rem;
  }

  .cart-container img {
    width: 50px;
  }
} */

.page-title {
  font-size: 2em;
  font-weight: 500;
  border-bottom: 1px solid var(--text);
  padding-bottom: 20px;
}

.cart_wrap {
  margin-top: 40px;
  width: 100%;
}

.cart-item {
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  background-color: var(--item-bg);
  margin-bottom: 10px;
}

/* @media (max-width: 768px) {
  .cart-item {
    height: 140px;
  }
} */

.item_image_wrapper {
  width: 300px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* @media (max-width: 768px) {
  .item_image_wrapper {
    width: 100px;
  }
} */

.item_image {
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item_detail {
  display: flex;
  min-width: 0;
  flex-direction: column;
  flex: 1;
  padding: 10px;
}

.item_name {
  width: 100%;
  display: inline-block;
  font-weight: 500;
  font-size: 1.2em;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item_name:hover {
  color: var(--hover);
}

.item_price {
  font-size: 1.1em;
  margin-bottom: 2px;
}

.count_control {
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 8px;
}

.count_control button {
  background-color: var(--line);
  border-radius: 5px;
  padding: 5px 8px;
}

.count_control button:hover {
  cursor: pointer;
  background-color: var(--hover);
}

.quantity_value {
  padding: 5px 8px;
  font-size: 15px;
}

.count_price {
  font-weight: 500;
  font-size: 1.5em;
  margin-top: 30px;
}

/* @media (max-width: 768px) {
  .count_price {
    margin: 0;
  }
} */

.control_buttons {
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.control_buttons button {
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  color: var(--text);
}

.control_buttons button:hover {
  background-color: var(--hover);
}

/* @media (max-width: 768px) {
  .control_buttons button {
    margin: 0;
  }
} */

.total_price {
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  background-color: var(--line);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 2em;
  font-weight: 500;
  padding: 10px;
}

.total_price span:first-child {
  font-size: 0.9em;
  text-align: center;
}

.total_price span:not(:first-child) {
  color: #a02727;
  margin: 0 10px;
}

.buying_button {
  padding: 10px 15px;
  background-color: #570df8;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  font-size: 0.7em;
}

.buying_button:hover {
  background-color: #400bb4;
  transition: all 0.4s ease;
}
</style>
