# ARUMTECH · 아름텍 공식 홈페이지

SE AUDIOTECHNIK 국내 공식총판 **아름텍**의 B2B 음향장비 브랜드 사이트입니다.
`Markdown 파일 프로토타입/` 의 디자인 시안과 기획 문서를 기준으로 구현했습니다.

> 디자인 톤: 다크 프리미엄(제네시스 참고) · 포인트 컬러 올리브 그린 `#6EA921` · Pretendard + Inter

## 기술 스택

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3** (커스텀 다크 테마 토큰)
- **Phosphor Icons** (CDN) · **Pretendard / Inter** (CDN)

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드 (정적 생성)
npm start        # 빌드 결과 실행
```

## 화면 구성 (라우트)

| 경로 | 화면 |
|---|---|
| `/` | 홈 — Hero / 제품 라인업 / 용도별 솔루션 / 추천 제품 / 설치사례 / 자료 / CTA |
| `/products` | 제품소개 목록 — 카테고리 탭 + 모델명 검색 (`?line=` 딥링크) |
| `/products/[slug]` | 제품 상세 — Hero / 핵심 스펙 / 스펙표 / 사용처 / 관련 사례·제품 / CTA |
| `/cases` | 설치사례 목록 — 시설 유형 필터 |
| `/cases/[slug]` | 설치사례 상세 — 개요 / Challenge·Solution·Result / 적용 제품 |
| `/downloads` | 자료실(다운로드 센터) — 카테고리 탭 (`?cat=` 딥링크) |
| `/contact` | 문의하기 — 유형 선택 + 폼 + 접수완료 화면(알림 시뮬레이션) |
| `/about` | 회사소개 — SE 소개 / 뉴스 / 오시는 길 (앵커 이동) |
| `/support` | A/S 안내 — 처리 절차 / 접수 안내 |
| `/admin/products/new` | (관리자) 제품 등록 — 기본정보 / 이미지 / 스펙 빌더 / 발행 설정 |
| `/admin/inquiries` | (관리자) 문의 관리 — 목록 + 상세 패널 + 상태/메모 |

## 프로젝트 구조

```
app/
  layout.tsx              # 루트 (폰트·아이콘·메타데이터)
  (site)/                 # 공개 사이트 (헤더·푸터·퀵메뉴 레이아웃)
    page.tsx              # 홈
    products/ cases/ downloads/ contact/ about/ support/
  admin/                  # 관리자 콘솔 (사이드바 레이아웃, noindex)
    products/new/  inquiries/
components/
  site/                   # Header, Footer, QuickMenu, ProductCard, CaseCard, CTA …
  admin/                  # AdminSidebar
lib/
  data.ts                 # 제품·사례·자료·문의 등 전체 콘텐츠 데이터 + 헬퍼
public/
  hero-promax.png         # 메인 Hero 제품 이미지
```

## 범위 안내 (Phase 1 — 프론트엔드 + 관리자 UI)

이 단계는 **사용자 화면 전체 + 관리자 화면(UI)** 까지입니다. 다음은 다음 단계(MVP) 대상입니다.

- 콘텐츠 데이터는 `lib/data.ts` 에 정적으로 보관 → 이후 DB/CMS·API 로 대체
- 문의 폼은 화면 동작만(접수완료·알림 시뮬레이션) → 실제 저장·이메일/SMS(LMS) 발송 미연동
- 관리자 화면은 UI 시연용 → 로그인·DB 저장·권한 미연동
- 제품/사례 이미지는 그라데이션 플레이스홀더 → 실제 이미지 업로드로 교체 예정

발신번호 등 운영 정보는 시안 기준 `우리기획 1800-9810` 으로 표기되어 있습니다.
(기획 문서의 `1688-3363` 과 다를 경우 `lib/data.ts` 의 `SITE.phone` 에서 일괄 변경)

## 에셋 출처 / 라이선스

- **제품·설치사례 이미지** (`public/images/`): 기존 아름텍 사이트(아임웹, `cdn.imweb.me`)에서 가져온 자사 보유 자료.
- **히어로 배경 영상** (`public/hero.mp4`): Mixkit 무료 스톡 — "Music concert crowd" (#17631), https://mixkit.co/free-stock-video/music-concert-crowd-17631/ · **Mixkit Free License**(상업적 사용 가능, 저작자표시 불필요). 대형 콘서트 무대·라인어레이 스피커·관객. 웹용 720p·무음·약 3MB로 압축. 파일을 교체하면 즉시 반영되며, 없으면 제품 이미지 히어로로 폴백.
