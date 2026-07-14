"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  isExpired,
  login as apiLogin,
  logout as apiLogout,
  type AdminSession,
} from "@/lib/auth";

/**
 * 관리자 로그인 상태를 사이트 전역에 제공한다.
 *
 * 로그인하면 게시판(공지사항·자료실·설치사례)에 글쓰기·수정·삭제 권한이 열린다.
 * 지금은 세션만 유지하고, 게시판 쓰기 UI 는 아직 붙이지 않았다 — `canManage` 로 분기하면 된다.
 *
 * 토큰은 localStorage 에 둔다. 서버컴포넌트에서는 읽을 수 없으므로,
 * 관리 UI 는 반드시 클라이언트 컴포넌트에서 `useAdminAuth()` 로 판단할 것.
 */

const STORAGE_KEY = "arumtech.admin.session";

interface AdminAuthValue {
  session: AdminSession | null;
  /** 게시판 관리 권한 (= 로그인 상태) */
  canManage: boolean;
  /**
   * localStorage 복원이 끝났는지. 첫 렌더에서는 항상 false 다.
   *
   * 로그인 여부로 화면을 막는 쪽(작성 폼)은 이 값이 true 가 될 때까지 기다려야 한다.
   * 자식 컴포넌트의 effect 가 이 provider 의 effect 보다 먼저 돌기 때문에, 기다리지 않으면
   * 로그인한 관리자가 작성 페이지를 새로고침했을 때 비로그인으로 오인돼 목록으로 튕긴다.
   */
  ready: boolean;
  /** 실패 시 LoginError 를 던진다. */
  login: (memberId: string, memberPw: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

function readStored(): AdminSession | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AdminSession>;
    if (!parsed.accessToken || !parsed.refreshToken) return null;
    // 만료된 토큰으로 관리 버튼을 띄우면 눌렀을 때만 실패한다 — 복원 시점에 걸러낸다.
    if (isExpired(parsed.accessToken)) return null;
    return parsed as AdminSession;
  } catch {
    return null;
  }
}

export default function AdminAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [ready, setReady] = useState(false);

  // localStorage 는 서버에 없다. 첫 렌더는 항상 비로그인으로 그리고, 마운트 후 복원한다.
  useEffect(() => {
    setSession(readStored());
    setReady(true);
  }, []);

  const login = useCallback(async (memberId: string, memberPw: string) => {
    const next = await apiLogin(memberId, memberPw);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSession(next);
  }, []);

  const logout = useCallback(async () => {
    const token = session?.accessToken;
    setSession(null);
    window.localStorage.removeItem(STORAGE_KEY);
    if (token) await apiLogout(token);
  }, [session]);

  const value = useMemo<AdminAuthValue>(
    () => ({ session, canManage: session !== null, ready, login, logout }),
    [session, ready, login, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth(): AdminAuthValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth 는 AdminAuthProvider 안에서만 쓸 수 있습니다.");
  }
  return ctx;
}
