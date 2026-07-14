"use client";

import { useState } from "react";
import { useAdminAuth } from "./AdminAuthProvider";
import AdminLoginModal from "./AdminLoginModal";

const BUTTON =
  "flex items-center gap-[5px] rounded-md border border-cream/10 px-[11px] py-[5px] text-[12.5px] text-dim transition-colors hover:border-cream/40 hover:text-accent";

/**
 * 푸터 우측의 관리자 진입점.
 *
 * 비로그인 → "관리자" 클릭 시 로그인 모달.
 * 로그인   → 관리자 이름과 로그아웃 버튼. (로그인 상태에서 열리는 게시판 관리 UI 는 추후 작업)
 */
export default function AdminAccess() {
  const { session, logout } = useAdminAuth();
  const [open, setOpen] = useState(false);

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-[5px] text-[12.5px] text-muted">
          <i className="ph ph-user-circle-check" style={{ color: "#6EA921" }} />
          {session.memberName}
        </span>
        <button type="button" onClick={() => void logout()} className={BUTTON}>
          <i className="ph ph-sign-out" />
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={BUTTON}>
        <i className="ph ph-lock-simple" />
        관리자
      </button>
      <AdminLoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
