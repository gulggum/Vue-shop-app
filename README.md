# Vue Shop App 🛍️ [Vue 쇼핑몰 프로젝트 클론코딩]

🚧 React 프로젝트를 기반으로 Vue 버전 구현 중...

- 2025/12/26 ~

## 프로젝트 소개

Vue 3 + TypeScript + Vite 기반 쇼핑몰 프로젝트

## 구현기능 소개

- **헤더**: 공통 UI, 다크/라이트 테마 토글, 모바일 햄버거 메뉴 포함
- **사이드바 (모바일)**: 햄버거 메뉴 클릭 시 열리고 오버레이 클릭 시 닫힘, Pinia로 상태 관리
- **아이콘 버튼**: FontAwesome 아이콘 + 클릭 이벤트 지원
- **ProductList 컴포넌트**: 반응형 Grid, 카테고리 필터 적용
- **슬라이더/캐러셀**: 이미지 배열 반복 렌더링, 자동 3초 단위 이동, 점(dot) 네비게이션
- **라우터 구조**: MainLayout → Home/ProductDetail 페이지, RouterView로 자식 페이지 전환

## 트러블 슈팅 기록

- [Vue + TypeScript 환경에서 `.vue` 모듈 선언 파일(shims-vue.d.ts) 누락으로 발생한 에러 해결](https://velog.io/@gulggum/Vue3-TypeScript-.vue-%EB%AA%A8%EB%93%88%EC%9D%84-%EC%B0%BE%EC%9D%84-%EC%88%98-%EC%97%86%EB%8B%A4%EB%8A%94-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0)
