"use client";

import { useEffect, useRef, useState } from "react";
import { LoginError } from "@/lib/auth";
import { useAdminAuth } from "./AdminAuthProvider";

/** 푸터의 "관리자" 버튼이 여는 로그인 모달. 성공하면 게시판 관리 권한이 열린다. */
export default function AdminLoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { login } = useAdminAuth();
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const idRef = useRef<HTMLInputElement>(null);

  // 열릴 때마다 초기화하고 아이디 칸에 포커스. 닫혀 있는 동안 배경 스크롤을 막는다.
  useEffect(() => {
    if (!open) return;
    setError("");
    setMemberPw("");
    setShowPw(false);
    idRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      await login(memberId.trim(), memberPw);
      onClose();
    } catch (err) {
      setError(
        err instanceof LoginError
          ? err.message
          : "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
      setMemberPw("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-5"
      style={{ background: "rgba(6,7,9,0.72)", backdropFilter: "blur(4px)" }}
    >
      <div className="w-full max-w-[380px] overflow-hidden rounded-2xl border border-cream/10 bg-panel shadow-2xl">
        <div className="flex items-start justify-between border-b border-cream/[0.08] px-7 pb-5 pt-6">
          <div>
            <h2 id="admin-login-title" className="text-[19px] font-semibold text-cream">
              관리자 로그인
            </h2>
            <p className="mt-1.5 text-[12.5px] leading-[1.6] text-dim">
              게시판 관리자만 로그인할 수 있습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="-mr-1.5 -mt-1 flex h-8 w-8 items-center justify-center rounded-lg text-dim transition-colors hover:bg-white/[0.06] hover:text-cream"
          >
            <i className="ph ph-x" style={{ fontSize: 18 }} />
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4 px-7 pb-7 pt-6">
          <label className="flex flex-col gap-2">
            <span className="text-[12.5px] text-muted">아이디</span>
            <input
              ref={idRef}
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              autoComplete="username"
              placeholder="관리자 아이디"
              className="rounded-lg border border-cream/[0.14] bg-raised px-[13px] py-[11px] text-sm text-cream outline-none transition-colors placeholder:text-dim focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[12.5px] text-muted">비밀번호</span>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={memberPw}
                onChange={(e) => setMemberPw(e.target.value)}
                autoComplete="current-password"
                placeholder="비밀번호"
                className="w-full rounded-lg border border-cream/[0.14] bg-raised py-[11px] pl-[13px] pr-11 text-sm text-cream outline-none transition-colors placeholder:text-dim focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 표시"}
                aria-pressed={showPw}
                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-dim transition-colors hover:text-cream"
              >
                <i className={showPw ? "ph ph-eye-slash" : "ph ph-eye"} style={{ fontSize: 17 }} />
              </button>
            </div>
          </label>

          {error && (
            <p className="flex items-start gap-1.5 text-[12.5px] leading-[1.5] text-warn">
              <i className="ph ph-warning-circle mt-[1px]" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !memberId.trim() || !memberPw}
            className="mt-1 rounded-lg bg-accent py-[13px] text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
