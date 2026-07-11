"use client";

import { useMemo, useState } from "react";
import { inquiries, STATUS_COLORS, type InquiryStatus } from "@/lib/data";

const STATUS_OPTIONS: InquiryStatus[] = [
  "신규",
  "확인중",
  "견적발송",
  "상담완료",
  "계약완료",
  "보류",
];

export default function AdminInquiries() {
  const [selectedId, setSelectedId] = useState(inquiries[0].id);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return inquiries;
    const q = search.trim().toLowerCase();
    return inquiries.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.company.toLowerCase().includes(q) ||
        i.phone.includes(q)
    );
  }, [search]);

  const current = inquiries.find((q) => q.id === selectedId) ?? inquiries[0];
  const newCount = inquiries.filter((q) => q.status === "신규").length;

  return (
    <>
      <header
        className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-cream/[0.08] px-7"
        style={{ background: "rgba(11,13,16,0.9)", backdropFilter: "blur(10px)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-[15px] font-semibold text-cream">문의 관리</span>
          <span className="rounded-full bg-white/[0.12] px-2.5 py-[3px] text-[11.5px] font-semibold text-accent">
            신규 {newCount}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-cream/[0.12] bg-raised px-3 py-2">
          <i className="ph ph-magnifying-glass" style={{ fontSize: 14, color: "#6E7178" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이름·회사·연락처"
            className="w-[140px] border-none bg-transparent text-[13px] text-cream outline-none placeholder:text-dim"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 p-7 xl:grid-cols-[1fr_380px]">
        {/* TABLE */}
        <div className="overflow-hidden rounded-[14px] border border-cream/[0.08] bg-panel">
          <div className="grid grid-cols-[1.1fr_1.4fr_1fr_0.9fr] gap-3 border-b border-cream/[0.08] bg-raised px-5 py-3.5 text-[11.5px] tracking-[0.03em] text-dim">
            <span>유형 / 고객</span>
            <span>관심 제품 / 장소</span>
            <span>접수 시각</span>
            <span>상태</span>
          </div>
          {filtered.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedId(q.id)}
              className="grid w-full grid-cols-[1.1fr_1.4fr_1fr_0.9fr] items-center gap-3 border-b border-cream/[0.07] px-5 py-4 text-left transition-colors"
              style={{
                background: q.id === selectedId ? "rgba(255,255,255,0.06)" : "transparent",
              }}
            >
              <div>
                <div className="mb-[3px] text-[11px] font-semibold text-accent">{q.type}</div>
                <div className="text-sm font-medium text-cream">{q.name}</div>
                <div className="mt-0.5 text-[11.5px] text-dim">{q.company}</div>
              </div>
              <div>
                <div className="font-mono text-[13px] text-cream">{q.product}</div>
                <div className="mt-0.5 text-[11.5px] text-dim">
                  {q.place} · {q.region}
                </div>
              </div>
              <div className="font-mono text-xs text-muted">{q.date}</div>
              <div>
                <StatusBadge status={q.status} />
              </div>
            </button>
          ))}
        </div>

        {/* DETAIL PANEL */}
        <div className="sticky top-[92px] overflow-hidden rounded-[14px] border border-cream/10 bg-panel">
          <div className="border-b border-cream/[0.08] px-6 py-[22px]">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-accent">{current.type}</span>
              <span className="font-mono text-[11.5px] text-dim">#{current.id}</span>
            </div>
            <div className="text-xl font-semibold text-cream">
              {current.name}{" "}
              <span className="text-sm font-normal text-muted">· {current.company}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3.5 px-6 py-[22px]">
            <DetailRow icon="ph ph-phone" value={current.phone} mono />
            <DetailRow icon="ph ph-package" value={current.product} />
            <DetailRow icon="ph ph-map-pin" value={`${current.place} · ${current.region}`} />
          </div>
          <div className="px-6 pb-[22px]">
            <div className="mb-2 text-xs text-dim">상담 상태</div>
            <div className="relative">
              <select
                defaultValue={current.status}
                key={current.id}
                className="w-full cursor-pointer appearance-none rounded-lg border border-cream/[0.14] bg-raised px-[13px] py-[11px] text-sm text-cream outline-none"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <i className="ph ph-caret-down pointer-events-none absolute right-[13px] top-[13px] text-dim" />
            </div>

            <div className="mb-2 mt-[18px] text-xs text-dim">관리자 메모</div>
            <textarea
              rows={3}
              placeholder="내부 메모, 다음 연락 예정일 등"
              className="w-full resize-y rounded-lg border border-cream/[0.14] bg-raised px-[13px] py-[11px] text-[13.5px] leading-[1.6] text-cream outline-none"
            />
            <button className="mt-4 w-full cursor-pointer rounded-lg border-none bg-accent py-[13px] text-sm font-semibold text-white">
              저장
            </button>

            <div className="mt-3.5 rounded-[10px] border border-cream/[0.08] bg-raised p-3.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-[7px] text-[12.5px] text-muted">
                  <i className="ph ph-bell-ringing" style={{ color: "#6EA921" }} />
                  상담 알림
                </span>
                <span className="flex items-center gap-[5px] text-[11px] text-ok">
                  <i className="ph ph-check-circle ph-fill" />
                  발송됨
                </span>
              </div>
              <div className="mt-2 text-[11.5px] leading-[1.5] text-dim">
                이메일 · LMS 발송 완료 (발신 1800-9810)
              </div>
              <button className="mt-2.5 w-full cursor-pointer rounded-[7px] border border-cream/[0.14] bg-transparent py-[9px] text-[12.5px] font-medium text-muted transition-colors hover:border-accent hover:text-cream">
                알림 재발송
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: InquiryStatus }) {
  const color = STATUS_COLORS[status];
  return (
    <span
      className="inline-flex items-center gap-[5px] rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
      style={{ color, background: `${color}1f` }}
    >
      <span className="h-[5px] w-[5px] rounded-full" style={{ background: color }} />
      {status}
    </span>
  );
}

function DetailRow({ icon, value, mono }: { icon: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <i className={icon} style={{ color: "#6EA921", width: 18 }} />
      <span className={`text-sm text-cream ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
