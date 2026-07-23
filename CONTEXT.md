# CONTEXT — 아름텍 (SE AUDIOTECHNIK 국내 총판) 사이트

Next.js(App Router) 기반 브랜드/제품 소개 사이트. 모든 콘텐츠는 현재 `lib/data.ts` 에 있다
(추후 CMS/API로 대체 예정). 아래는 이 프로젝트의 공통 용어(ubiquitous language)다.

## 용어집 (Glossary)

- **라인 (Line / `ProductLine`)** — 최상위 제품 분류. 제품소개 페이지의 상단 탭이자
  `lib/data.ts` 각 제품의 `line`. 예: `M-F3A PRO MAX`(플래그십 단독 라인), `M-Line`, `L-Line`,
  `B-Line`, `Column`, `Full Range`, `Monitor`, `Amplifiers`. (`M-F3A PRO MAX` 는 2026-07 실제
  상품이 추가되어 외부 링크에서 내부 상세로 전환됐다.)
- **그룹 / 서브라인 (Group / `ProductGroup`)** — `Full Range` **라인에만** 있는 2단계 분류.
  `FULL_RANGE_GROUPS` 로 노출된다. 예: `V-ARRAY`, `V-Line`, `CV-Line`, `K-Line`, `C-Line`,
  `COX-Line`. (`소형 M-Line` 그룹은 제품 전량 단종으로 2026-07 제거됨.)
- **모델 (Model / `model`)** — 제품 카드·상세의 제목. 한 카드가 여러 실제 모델을 열로 묶기도 한다
  (예: `COX-8 mk2 / COX-12 mk2`, `B-18 / B-18A`). 이때 `specColumns` 가 열 머리글이 되고
  사양 행의 `v` 배열 길이가 열 수와 같아야 한다. 단, **SE 원본에서 페이지가 분리된 제품(WP 변형 등)은
  합치지 않고 각각 독립 카드**로 둔다 ([[../docs/adr/0002-one-page-one-card]]).
- **WP (Weatherproof)** — SE 제품의 **방수/야외 설치용 변형**. IP 등급을 갖는 옥외용.
  콘텐츠 출처 규칙은 [[../docs/adr/0001-se-product-content-source]] 참조.
- **대표 이미지 규칙** — 제품 카드 썸네일은 `PRODUCT_IMAGES`(slug→경로) 맵에서 후처리로 주입된다.
  파일은 `public/images/products/<slug>/` 아래에 둔다.
- **kicker** — 모델명 아래 붙는 **국문 한 줄 설명**. `en` 은 영문 타입 표기.
- **통합 검색 (Unified Search)** — 상단 바 돋보기로 여는 `/search?keyword=` 페이지.
  제품(정적 `lib/data.ts`)과 게시판 3종(자료실·설치사례·공지)을 **대소문자 무시 토큰 AND**
  로 함께 검색해 유형별로 묶어 보여준다. 게시판은 외부 API 목록을 받아 우리 코드에서
  필터한다 (API 의 `search` 는 대소문자를 구분해 쓰지 않음). [[../docs/adr/0003-unified-search]]

## 도메인 결정 (ADR)

- [ADR-0001](docs/adr/0001-se-product-content-source.md) — 신규 SE 제품 콘텐츠의 출처
  (총판 사이트에 없으면 SE 본사 se-audiotechnik.de 를 1차 출처로).
- [ADR-0002](docs/adr/0002-one-page-one-card.md) — SE 원본 1페이지 = 1제품 카드.
  WP(방수) 변형은 합침 카드로 묶지 않고 각각 독립 카드로 둔다 (ADR-0001의 COX WP 합침 결정을 수정).
- [ADR-0003](docs/adr/0003-unified-search.md) — 통합 검색. 제품(정적)+게시판(외부 API)을
  대소문자 무시 토큰 AND 로 서버에서 함께 검색. 게시판은 API 의 대소문자 구분 `search` 대신
  목록 전체를 받아 로컬 필터한다.
