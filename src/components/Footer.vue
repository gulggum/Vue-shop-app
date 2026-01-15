<script></script>

<template>
  <footer class="bottom-container">
    <div class="footer-inner">
      <!-- 회사명 -->
      <h3 class="company-name">react shop</h3>

      <!-- 회사 정보 -->
      <div class="company-info">
        <h3 class="info-title">company information</h3>

        <span class="info-item">
          Company Name : ReactShop Inc. &nbsp;&nbsp; CEO: Hong Gil-dong
        </span>

        <span class="info-item">
          Address : 5F, Sample Building, 100 Teheran-ro, Gangnam-gu, Seoul
        </span>

        <span class="info-item"> Email : reactshop.help@example.com </span>
      </div>

      <!-- 아이콘 영역 -->
      <div class="icon-wrapper">
        <a
          class="icon-link"
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <font-awesome-icon :icon="['fab', 'facebook']" />
        </a>

        <a
          class="icon-link"
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>

        <a
          class="icon-link"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <font-awesome-icon :icon="['fab', 'github']" />
        </a>
      </div>

      <!-- 카피라이트 -->
      <p class="copyright">© 2025 reactShop - All Rights Reserved</p>
    </div>
  </footer>
</template>

<style scoped>
.bottom-container {
  width: 100%;
  background-color: var(--color-line);
  color: var(--color-text);
  padding: 0 5px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}

.footer-inner {
  max-width: 1200px;
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.company-name {
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 5px;
  margin-bottom: 10px;
}

.company-info {
  margin-bottom: 10px;
}

.info-title {
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
}

.info-item {
  display: block;
  margin: 5px 0;
  font-size: 14px;
}

.icon-wrapper {
  display: flex;
  gap: 20px;
  margin: 15px 0;
}

.icon-link {
  color: #555;
  font-size: 20px;
  transition: color 0.2s;
}

.icon-link:hover {
  color: var(--hover);
}

.copyright {
  font-size: 13px;
  opacity: 0.8;
}
</style>
