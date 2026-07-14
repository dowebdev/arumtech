"use client";

import Link from "next/link";
import { useAdminAuth } from "./AdminAuthProvider";

/** 게시판 목록의 "글쓰기" 버튼. 관리자로 로그인했을 때만 보인다. */
export default function BoardWriteButton({
  href,
  label = "글쓰기",
}: {
  href: string;
  label?: string;
}) {
  const { canManage } = useAdminAuth();
  if (!canManage) return null;

  return (
    <div className="mb-6 flex justify-end">
      <Link
        href={href}
        className="flex items-center gap-1.5 rounded-lg bg-accent px-5 py-[11px] text-[14.5px] font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        <i className="ph ph-pencil-simple" />
        {label}
      </Link>
    </div>
  );
}
