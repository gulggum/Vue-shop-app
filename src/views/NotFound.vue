<script setup lang="ts"></script>

<template>
  <div class="notFound_box">
    <h2 class="title_404">404</h2>

    <p class="text_404">페이지를 찾을 수 없습니다.</p>

    <button class="button_404">
      <router-link to="/">메인으로</router-link>
    </button>
  </div>
</template>

<style scoped>
.notFound_box {
  width: 100%;
  padding: 3rem;
  box-sizing: border-box;
  text-align: center;
}

.title_404 {
  margin-top: 30px;
  font-size: 7em;
  font-weight: 700;
  margin-bottom: 0;
  color: var(--color-text);
}

.text_404 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.button_404 {
  padding: 1em 1.5em;
  background-color: #570df8;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  font-size: 1.2em;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button_404:hover {
  background-color: #400bb4;
}

.button_404 a {
  color: white;
  text-decoration: none;
}
</style>
