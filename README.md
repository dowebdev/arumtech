# ARUMTECH

SE AUDIOTECHNIK 국내 공식총판 아름텍의 B2B 음향장비 브랜드 사이트입니다.

## 주요 기능
- 제품 목록·검색 및 제품 상세 화면
- 설치사례와 다운로드 자료실
- 문의 및 A/S 안내 화면
- 제품 등록과 문의 관리를 위한 관리자 UI

## 기술 구성
- Next.js 15 및 React 19
- TypeScript
- Tailwind CSS 3
- Quill 기반 편집기

## 실행 및 운영

### 로컬 실행

```sh
npm install
npm run dev
```

### 빌드 및 실행

```sh
npm run build
npm start
```

콘텐츠 데이터는 현재 `lib/data.ts`에 정적으로 보관됩니다. 문의 접수와 관리자 기능은 UI 범위이며 실제 저장·연동 여부는 코드와 환경 설정을 확인해야 합니다.
