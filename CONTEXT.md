# CONTEXT — 아름텍 (SE AUDIOTECHNIK 국내 총판) 사이트

Next.js(App Router) 기반 브랜드/제품 소개 사이트. 모든 콘텐츠는 현재 `lib/data.ts` 에 있다
(추후 CMS/API로 대체 예정). 아래는 이 프로젝트의 공통 용어(ubiquitous language)다.

## 용어집 (Glossary)

- **라인 (Line / `ProductLine`)** — 최상위 제품 분류. 제품소개 페이지의 상단 탭이자
  `lib/data.ts` 각 제품의 `line`. 예: `M-Line`, `L-Line`, `B-Line`, `Column`, `Full Range`,
  `Monitor`, `Amplifiers`, 그리고 외부 링크로 나가는 `M-F3A PRO MAX`.
- **그룹 / 서브라인 (Group / `ProductGroup`)** — `Full Range` **라인에만** 있는 2단계 분류.
  `FULL_RANGE_GROUPS` 로 노출된다. 예: `V-ARRAY`, `V-Line`, `CV-Line`, `K-Line`, `C-Line`,
  `COX-Line`. (`소형 M-Line` 그룹은 제품 전량 단종으로 2026-07 제거됨.)
- **모델 (Model / `model`)** — 제품 카드·상세의 제목. 한 카드가 여러 실제 모델을 열로 묶기도 한다
  (예: `COX-8 WP / COX-12 WP`, `B-18 / B-18A`). 이때 `specColumns` 가 열 머리글이 되고
  사양 행의 `v` 배열 길이가 열 수와 같아야 한다.
- **WP (Weatherproof)** — SE 제품의 **방수/야외 설치용 변형**. IP 등급을 갖는 옥외용.
  콘텐츠 출처 규칙은 [[../docs/adr/0001-se-product-content-source]] 참조.
- **대표 이미지 규칙** — 제품 카드 썸네일은 `PRODUCT_IMAGES`(slug→경로) 맵에서 후처리로 주입된다.
  파일은 `public/images/products/<slug>/` 아래에 둔다.
- **kicker** — 모델명 아래 붙는 **국문 한 줄 설명**. `en` 은 영문 타입 표기.

## 도메인 결정 (ADR)

- [ADR-0001](docs/adr/0001-se-product-content-source.md) — 신규 SE 제품 콘텐츠의 출처
  (총판 사이트에 없으면 SE 본사 se-audiotechnik.de 를 1차 출처로).
