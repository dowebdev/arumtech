/**
 * 관리자 인증 클라이언트 — woori `/members` API (한강미디어와 동일 구조).
 *
 *   로그인   POST {API}/members/login    { member_id, member_pw, member_type: 0 }
 *   로그아웃 POST {API}/members/logout   (Authorization: Bearer)
 *
 * 로그인 응답의 auth.access_token 을 이후 쓰기 요청(글쓰기·수정·삭제·파일업로드)의
 * Authorization 헤더에 실어 보낸다. 게시판 읽기(lib/contents.ts)는 인증이 필요 없다.
 *
 * 토큰 보관은 브라우저(localStorage)에서 하며 AdminAuthProvider 가 관리한다.
 */

const API_URL = process.env.NEXT_PUBLIC_WOORI_API_URL;
const SITE_ID = process.env.NEXT_PUBLIC_WOORI_SITE_ID;

/** 일반 회원 (SNS 계정이 아닌 아이디/비밀번호 로그인). */
const MEMBER_TYPE_NORMAL = 0;

export interface AdminSession {
  accessToken: string;
  refreshToken: string;
  /** 로그인 아이디 */
  memberId: string;
  /** 표시용 이름 (없으면 아이디) */
  memberName: string;
}

/** 로그인 실패 — 메시지는 사용자에게 그대로 보여줄 수 있다. */
export class LoginError extends Error {}

interface RawLoginResponse {
  statusCode?: number;
  message?: string[] | string;
  auth?: { access_token?: string; refresh_token?: string } | null;
  data?: { member_id?: string; member_name?: string } | null;
}

/** API 가 배열/문자열 양쪽으로 주는 message 를 한 줄로 만든다. */
function firstMessage(message: RawLoginResponse["message"]): string | undefined {
  if (Array.isArray(message)) return message.find((m) => typeof m === "string" && m);
  return typeof message === "string" && message ? message : undefined;
}

function requireConfig() {
  if (!API_URL || !SITE_ID) {
    throw new LoginError(
      "API 설정이 없습니다. NEXT_PUBLIC_WOORI_API_URL 과 NEXT_PUBLIC_WOORI_SITE_ID 를 확인해주세요."
    );
  }
}

/**
 * 관리자 로그인. 실패하면 LoginError 를 던진다.
 * 서버가 401 등으로 응답해도 본문에 안내 메시지가 들어오므로 res.ok 만으로 판단하지 않는다.
 */
export async function login(memberId: string, memberPw: string): Promise<AdminSession> {
  requireConfig();

  let json: RawLoginResponse;
  try {
    const res = await fetch(`${API_URL}/members/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-site": SITE_ID as string,
      },
      body: JSON.stringify({
        member_id: memberId,
        member_pw: memberPw,
        member_type: MEMBER_TYPE_NORMAL,
      }),
    });
    json = (await res.json()) as RawLoginResponse;
  } catch {
    throw new LoginError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
  }

  const accessToken = json.auth?.access_token;
  const refreshToken = json.auth?.refresh_token;

  if (!accessToken || !refreshToken) {
    throw new LoginError(firstMessage(json.message) ?? "아이디 또는 비밀번호를 확인해주세요.");
  }

  return {
    accessToken,
    refreshToken,
    memberId: json.data?.member_id ?? memberId,
    memberName: json.data?.member_name || json.data?.member_id || memberId,
  };
}

/** 서버 세션 종료. 실패해도 클라이언트 세션은 지워야 하므로 예외를 삼킨다. */
export async function logout(accessToken: string): Promise<void> {
  if (!API_URL || !SITE_ID) return;
  try {
    await fetch(`${API_URL}/members/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-site": SITE_ID as string,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch {
    // 네트워크 실패 — 로컬 세션만 정리하고 넘어간다.
  }
}

/**
 * JWT 의 만료 시각(ms). 형식이 아니거나 exp 가 없으면 null.
 * 저장된 토큰을 복원할 때 이미 만료된 세션을 걸러내는 데 쓴다.
 */
export function tokenExpiry(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload)) as { exp?: unknown };
    return typeof decoded.exp === "number" ? decoded.exp * 1000 : null;
  } catch {
    return null;
  }
}

/** 만료됐는지. exp 를 못 읽으면 만료로 보지 않는다 (서버가 401 로 알려준다). */
export function isExpired(token: string): boolean {
  const exp = tokenExpiry(token);
  return exp !== null && exp <= Date.now();
}
