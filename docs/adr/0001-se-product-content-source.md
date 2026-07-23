# ADR-0001 — 신규 SE 제품 콘텐츠의 출처

- 상태: 채택 (Accepted)
- 날짜: 2026-07-23

## 배경 (Context)

제품 데이터는 `lib/data.ts` 의 `products[]` 에 사양표·소개글·이미지까지 담긴다.
파일에는 *"없는 제품을 지어내지 않기 위해서다"* 라는 원칙이 명시돼 있다.

`B-18 WP`, `COX-8 WP`, `COX-12 WP`(방수/야외 변형) 3종을 추가해야 했는데,
지시된 출처인 총판 사이트(arumtech.co.kr)의 B-Line·COX-Line 페이지를 직접 받아
확인한 결과 **해당 모델이 등록돼 있지 않았다.** 실제 사양·이미지·설명은
SE 본사 글로벌 사이트(se-audiotechnik.de)에만 존재했다.

- https://se-audiotechnik.de/en/produkt/b-18-wp/
- https://se-audiotechnik.de/en/produkt/cox-8-wp/
- https://se-audiotechnik.de/en/produkt/cox-12-wp/

## 결정 (Decision)

신규·변형 SE 제품이 **총판 사이트에 없으면 SE 본사 공식 사이트를 1차 출처로 사용**한다.

- 사양(spec)은 임의로 생성하지 않는다. 출처에서 확인된 값만 넣고, 확인 불가한 값은 비운다.
- 각 제품의 `sourceUrl` 에 실제 참조한 출처 URL을 기록한다.
- 제조사 이미지는 `public/images/products/<slug>/` 에 내려받아 저장하고
  slug→경로 매핑(`PRODUCT_IMAGES`)에 등록한다. (아름텍은 SE 공식 국내 총판이며,
  기존 페이지도 SE 제조사 원문·이미지를 그대로 사용해 왔다.)
- 출처가 전혀 없는 제품은 지어내지 말고 스텁으로 남기거나 보류한다.

## 결과 (Consequences)

- 신규 제품 상세는 **영문(SE 원문) 소개·사양 + 국문 `kicker`** 혼용이 된다 (기존 제품과 동일한 패턴).
- 두 방수 동축 모델(COX-8 WP / COX-12 WP)은 기존 `COX-8 mk2 / COX-12 mk2` 처럼
  **한 카드(2열 사양표)** 로 묶어 `COX-Line` 그룹에 넣었다.
- 한국 사이트에 WP 제품이 정식 등록되면, 그때 출처를 총판 페이지로 갱신할 수 있다.
