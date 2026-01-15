# Vue Shop App 🛍️ [Vue 쇼핑몰 프로젝트 클론코딩]

🔗 배포 주소: https://vue-shop-app-kappa.vercel.app/

React 프로젝트를 기반으로 Vue 버전 구현 📅 개발 기간: 2025/12/26 ~ 2025/01/15

## 프로젝트 소개

Vue 3 + TypeScript + Vite 기반 쇼핑몰 프로젝트
원본 React 코드[GitHub]:(https://github.com/gulggum/React-shop-app)

## 사용 기술

- Framework: Vue 3 (Composition API)
- Language: TypeScript
- Build Tool: Vite
- State Management:
  - @tanstack/vue-query (서버 상태 관리)
  - Pinia (UI / 전역 상태)
- Routing: Vue Router
- Styling: CSS / Responsive Layout
- Icons: FontAwesome
- API: Fake Store API

## 구현기능 소개

- **MainLayout**
  - Header / Footer / Breadcrumb 공통 레이아웃
  - <RouterView/>를 통한 페이지 전환
- **Pages(views)**
  - Home, Category, Product Detail, NotFound(404)
- **Components**
  - Header / Sidebar
  - ProductList
  - ProductDetail
  - Slider (Carousel)
  - Breadcrumb
  - StarRating

### 주요 기능

- **데이터 상태 관리(store폴더)**

  - @tanstack/vue-query를 활용한 서버 상태 관리
    - 상품 목록 /상품 상세 데이터 fetch
    - 쿼리 캐싱을 통한 불필요한 API요청 방지(vue-query의 핵심기능)
    - 에러 발생 시 예외 처리
  - Pinia를 활용한 클라이언트 상태 관리
    - 장바구니, 검색상태,ui상태, 슬라이더 상태 관리
    - composition API기반 defineStore 방식 사용

- **라우터 & 레이아웃**
  - Vue Router 기반 페이지 라우팅
  - MainLayout + children(RouterView) 구조
  - NotFound(404) 페이지 구현
  - 카테고리 라우트는 /clothing, /electronics, /jewelery 등 유효한 값만 처리되며, 다른 값은 NotFound 페이지로 안내(정규식 기반 매칭으로 구현, 데이터 확장 시 검증 로직으로 전환 가능)
- **공통 UI**
  - Header : 다크/라이트 테마 토글 , 모바일 햄버거 메뉴
  - Sidebar : Pinia로 상태관리(store) , 오버레이 클릭시 닫힘 처리
  - Breadcrumb : 현재 페이지 경로 시각화 , 라우트 기반 동적 생성
- **상품 기능**
  - Fake Store API 연동
  - 상품 목록/상세 데이터 fetch
  - 카테고리별 상품 페이지
  - 반응형 ProductList Grid
  - 상품 상세 페이지 [이미지, 가격, 별점 렌더링..]
- **슬라이더(캐러셀)**
  - 이미지 배열 반복 렌더링
  - 3초 단위 자동 이동
  - dot 네비게이션 클릭 이동
- **검색 기능**
  - 키워드 입력시 상품 자동완성 검색
  - 검색 결과를 드롭다운 리스트 형태로 표시
  - 상품 클릭 시 해당 상품 상세 페이지로 이동
  - 반응형 UX 적용 => pc : 헤더에 검색창 항상 노출 , Mobile : 검색 버튼 클릭시 검색창 토글 표시
- **장바구니 기능**
  - 상품 상세 페이지에서 장바구니 추가
  - 상품 수량 관리 및 삭제 기능
  - 장바구니 아이콘에 아이템 개수 배지 표시
- **테마 관리(Light/Dark)**
  - CSS Variables와 data-theme 속성을 사용해 라이트/다크 테마를 전역으로 관리
- **UI / UX**
  - 반응형 레이아웃 (모바일,PC버전)
  - 접근성을 고려한 버튼 및 네비게이션 구성
- **유틸리티 함수 분리**
  - 공통 비즈니스 로직을 utils 폴더로 분리하여 재사용성 및 유지보수성 개선
  - 카테고리 정규화 및 다국어 대응 처리
  - 가격 포맷팅 로직 공통화

## 트러블 슈팅 기록

- [Vue + TypeScript 환경에서 `.vue` 모듈 선언 파일(shims-vue.d.ts) 누락으로 발생한 에러 해결](https://velog.io/@gulggum/Vue3-TypeScript-.vue-%EB%AA%A8%EB%93%88%EC%9D%84-%EC%B0%BE%EC%9D%84-%EC%88%98-%EC%97%86%EB%8B%A4%EB%8A%94-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0)
- [Vue + TypeScript 환경에서 ComputedRef .value로 TS 에러 및 렌더링 문제 해결"](https://velog.io/@gulggum/Vue-TS)
- [Breadcrumb 컴포넌트와 NotFound 라우트 충돌] : 404라우트에서 Breadcrumb 렌더링 시 에러발생 , 라우트 name기준의 조건부 렌더링으로 해결
