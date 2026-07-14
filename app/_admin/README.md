# 관리자 콘솔 (보류)

Next.js App Router 는 `_` 로 시작하는 폴더를 라우트로 만들지 않는다 (private folder).
즉 이 안의 `layout.tsx` / `inquiries/page.tsx` 는 **URL 로 접근할 수 없다**. 코드는 그대로 살아 있다.

## 왜 꺼놨나

문의 관리 화면(`inquiries/page.tsx`)이 `lib/data.ts` 의 **하드코딩된 더미 문의**를 보여주는 프로토타입인데,
푸터의 "관리자" 링크로 누구나 열 수 있는 상태였다. 인증도 없고 실제 데이터도 아니라서 라우트에서 내렸다.

지금 푸터의 "관리자" 버튼은 대신 로그인 모달(`components/site/AdminLoginModal.tsx`)을 띄운다.

## 다시 켜려면

1. 폴더 이름을 `_admin` → `admin` 으로 되돌린다. `/admin/inquiries` 가 다시 열린다.
2. 로그인하지 않은 사용자를 막는다 — `layout.tsx` 에서 `useAdminAuth()` 의 `isAuthenticated` 를 확인하고
   비로그인 시 홈으로 돌려보낸다. (지금 세션은 localStorage 기반이라 클라이언트에서만 확인 가능하다.)
3. 더미 문의를 실제 데이터로 교체한다. 문의는 현재 woori `/message` 로 발송만 하고 저장하지 않으므로
   (`lib/inquiry.ts`), 문의를 게시판 모듈에 적재하는 작업이 먼저 필요하다.

## 남은 계획 — 게시판 권한

로그인한 관리자에게는 관리자 콘솔 대신 **사이트 게시판에서 직접** 글쓰기·수정·삭제를 열어줄 예정이다
(공지사항·자료실·설치사례). 한강미디어 프로젝트가 같은 구조로 구현돼 있어 참고할 수 있다:

- 쓰기: `POST {API}/contents` · 수정: `PUT {API}/contents` · 삭제: `DELETE {API}/contents`
- 첨부: `POST {API}/files` — 모두 `Authorization: Bearer {access_token}` 필요
