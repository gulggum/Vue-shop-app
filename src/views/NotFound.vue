<script setup lang="ts"></script>

<template>
  <!-- 최상위 박스 -->
  <div class="notFound_box">
    <!-- 404 숫자 -->
    <h2 class="title_404">404</h2>

    <!-- 안내 텍스트 -->
    <p class="text_404">페이지를 찾을 수 없습니다.</p>

    <!-- 메인으로 버튼 -->
    <button class="button_404">
      <router-link to="/">메인으로</router-link>
    </button>
  </div>
</template>

<style scoped>
/* 최상위 박스 */
.notFound_box {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  text-align: center;
}

/* 404 숫자 스타일 */
.title_404 {
  margin-top: 30px;
  font-size: 7em;
  font-weight: 700;
  margin-bottom: 0; /* React에서는 두번 써놨던거 정리 */
  color: var(--color-text); /* 테마 컬러로 변경 가능 */
}

/* 안내 텍스트 */
.text_404 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

/* 버튼 */
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

/* router-link 안에 들어가서 글씨 깨지는 문제 방지 */
.button_404 a {
  color: white;
  text-decoration: none;
}
</style>
