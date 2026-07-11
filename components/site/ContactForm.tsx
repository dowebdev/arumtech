"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { CONTACT_TYPES, SITE } from "@/lib/data";
import { InquiryConfigError, sendInquiry } from "@/lib/inquiry";

const FIELD =
  "w-full rounded-lg border border-black/15 bg-white px-3.5 py-[13px] text-[15px] text-ink outline-none placeholder:text-[#9aa0a6]";
const LABEL = "text-[14px] font-semibold text-ink";

/** 상세 필드는 API 스키마에 없어 message 본문 끝에 라벨과 함께 덧붙인다. */
const EXTRA_LABELS: Record<string, string> = {
  product: "관심 제품",
  place: "설치 장소 유형",
  region: "지역",
  budget: "예산 범위",
};

const EMPTY = {
  name: "",
  company: "",
  phone: "",
  email: "",
  product: "",
  place: "",
  region: "",
  budget: "",
  message: "",
  agreePrivacy: false,
  /** 허니팟 — 사람에게는 보이지 않는다. 값이 차 있으면 봇이다. */
  company_website: "",
};

type Status = "idle" | "submitting" | "error";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") ?? "견적문의";

  const [type, setType] = useState(
    CONTACT_TYPES.includes(initialType) ? initialType : "견적문의"
  );
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [sentVia, setSentVia] = useState<Array<"sms" | "email">>([]);
  const [done, setDone] = useState(false);

  function update(key: keyof typeof EMPTY) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({
        ...prev,
        [key]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value,
      }));
  }

  function buildMessage() {
    const extras = Object.entries(EXTRA_LABELS)
      .map(([key, label]) => [label, form[key as keyof typeof EMPTY]] as const)
      .filter(([, value]) => typeof value === "string" && value.trim() !== "")
      .map(([label, value]) => `${label}: ${value}`);

    return extras.length ? `${form.message}\n\n---\n${extras.join("\n")}` : form.message;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // 봇은 조용히 성공 화면으로 보낸다. 재시도를 유도하지 않기 위해서다.
    if (form.company_website) {
      setDone(true);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const sent = await sendInquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        company: form.company,
        category: type,
        subject: `[${type}] ${form.company || form.name}`,
        message: buildMessage(),
        agreePrivacy: form.agreePrivacy,
        agreedAt: new Date().toISOString(),
      });

      setSentVia(sent);
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof InquiryConfigError
          ? "문의 접수 설정이 완료되지 않았습니다. 아래 전화번호로 연락해 주세요."
          : "전송에 실패했습니다. 잠시 후 다시 시도하시거나 아래 전화번호로 연락해 주세요."
      );
    }
  }

  if (done) {
    return (
      <section className="container-site max-w-[720px] px-5 pb-28 pt-24 text-center sm:px-8">
        <div className="mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-full border border-ok/50 bg-ok/[0.12]">
          <i className="ph ph-check" style={{ fontSize: 40, color: "#2E7D5B" }} />
        </div>
        <h1 className="m-0 mt-9 text-[36px] font-semibold tracking-[-0.02em] text-ink">
          상담 요청이 접수되었습니다
        </h1>
        <p className="m-0 mt-4 text-[17px] leading-[1.7] text-[#52555b]">
          담당자가 확인 후 빠르게 연락드리겠습니다.
        </p>

        {sentVia.length > 0 && (
          <div className="mx-auto mt-10 max-w-[420px] rounded-[14px] border border-black/10 bg-[#f4f5f7] p-6 text-left">
            <div className="mb-3.5 flex items-center gap-2.5 text-[14px] text-[#52555b]">
              <i className="ph ph-bell-ringing" style={{ color: "#6EA921" }} />
              담당자 알림 발송 완료
            </div>
            <div className="flex flex-col gap-2.5">
              {sentVia.includes("email") && (
                <div className="flex items-center gap-2.5 text-[14px] text-ink">
                  <i className="ph ph-envelope-simple" style={{ color: "#2E7D5B" }} />
                  관리자 이메일 발송
                </div>
              )}
              {sentVia.includes("sms") && (
                <div className="flex items-center gap-2.5 text-[14px] text-ink">
                  <i className="ph ph-chat-circle-text" style={{ color: "#2E7D5B" }} />
                  관리자 문자 발송
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center gap-3">
          <Link href="/" className="btn-outline-light !px-7 !py-3.5">
            홈으로
          </Link>
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY);
              setSentVia([]);
              setStatus("idle");
              setDone(false);
            }}
            className="btn-primary !px-7 !py-3.5 !text-white"
          >
            새 문의 작성
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 pb-24 pt-12 sm:px-8">
      <div className="eyebrow">CONTACT</div>
      <h2 className="m-0 mb-8 break-keep text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[30px]">
        상담 요청
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-[14px] font-semibold text-ink">문의 유형</div>
        <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {CONTACT_TYPES.map((t) => {
            const active = t === type;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className="cursor-pointer rounded-md border px-[18px] py-[11px] text-center text-[14.5px] transition-colors"
                style={{
                  fontWeight: active ? 600 : 500,
                  borderColor: active ? "#6EA921" : "rgba(0,0,0,0.10)",
                  color: active ? "#1A1D23" : "#52555b",
                  background: active ? "rgba(110,169,33,0.08)" : "transparent",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="이름" name="name" required placeholder="홍길동" value={form.name} onChange={update("name")} />
          <Field label="회사 / 기관명" name="company" required placeholder="○○대학교" value={form.company} onChange={update("company")} />
          <Field label="연락처" name="phone" required type="tel" placeholder="010-0000-0000" value={form.phone} onChange={update("phone")} />
          <Field label="이메일" name="email" required type="email" placeholder="user@example.com" value={form.email} onChange={update("email")} />
          <Field label="관심 제품" name="product" placeholder="M-F3A PRO" value={form.product} onChange={update("product")} />
          <Field label="설치 장소 유형" name="place" placeholder="교회 / 본당" value={form.place} onChange={update("place")} />
          <Field label="지역" name="region" placeholder="서울" value={form.region} onChange={update("region")} />
          <Field label="예산 범위" name="budget" placeholder="미정 / 협의" value={form.budget} onChange={update("budget")} />
        </div>

        <label className="mt-6 block">
          <span className={LABEL}>
            문의 내용 <span className="text-accent">*</span>
          </span>
          <textarea
            required
            name="message"
            rows={6}
            value={form.message}
            onChange={update("message")}
            placeholder="설치 공간 규모, 용도, 현재 시스템 상황 등을 알려주시면 더 정확한 상담이 가능합니다."
            className={`${FIELD} mt-2 resize-y leading-[1.6]`}
          />
        </label>

        <label className="mt-6 flex cursor-pointer items-start gap-2.5">
          <input
            required
            type="checkbox"
            name="agreePrivacy"
            checked={form.agreePrivacy}
            onChange={update("agreePrivacy")}
            className="mt-[3px] h-4 w-4"
            style={{ accentColor: "#6EA921" }}
          />
          <span className="text-[14px] leading-[1.6] text-[#52555b]">
            개인정보 수집 및 이용에 동의합니다. 수집된 정보는 상담 응대 목적으로만 사용되며 관련
            법령에 따라 보관·파기됩니다. <span className="text-accent">(필수)</span>
          </span>
        </label>

        {/* 허니팟 — 사람에게 보이지 않고 탭 이동도 되지 않는다 */}
        <input
          type="text"
          name="company_website"
          value={form.company_website}
          onChange={update("company_website")}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        {status === "error" && (
          <p className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-danger/30 bg-danger/[0.06] px-4 py-3.5 text-[14.5px] text-danger">
            <i className="ph ph-warning-circle" style={{ fontSize: 17 }} />
            {errorMessage}
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-full max-w-[420px] cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-accent py-[17px] text-[17px] font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "보내는 중…" : "상담 요청 보내기"}
            {status !== "submitting" && (
              <i className="ph ph-paper-plane-tilt" style={{ fontSize: 18 }} />
            )}
          </button>
        </div>
      </form>

      {/* 상담 진행 안내 */}
      <div className="mt-20">
        <div className="eyebrow">PROCESS</div>
        <h2 className="m-0 mb-8 text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[30px]">
          상담 진행 안내
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CONSULT_STEPS.map((st, i) => (
            <div
              key={st.title}
              className="group relative rounded-2xl border border-black/10 bg-white p-7 transition-colors hover:border-accent/60"
            >
              {i > 0 && (
                <i
                  className="ph ph-caret-right absolute -left-[19px] top-1/2 hidden -translate-y-1/2 sm:block"
                  style={{ fontSize: 18, color: "#C9CBCF" }}
                  aria-hidden="true"
                />
              )}

              <div className="flex items-center justify-between">
                <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-accent/[0.08] transition-colors group-hover:bg-accent/[0.14]">
                  <i className={`ph ${st.icon}`} style={{ fontSize: 26, color: "#6EA921" }} />
                </span>
                <span className="font-mono text-[13px] font-bold tracking-[0.1em] text-[#c2c5c9]">
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-6 break-keep text-[21px] font-semibold tracking-[-0.01em] text-ink">
                {st.title}
              </div>
              <div className="mt-2.5 break-keep text-[15.5px] leading-[1.65] text-[#52555b]">
                {st.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 전화 상담 */}
      <div className="mt-20">
        <div className="eyebrow">BY PHONE</div>
        <h2 className="m-0 mb-8 text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[30px]">
          전화 상담
        </h2>

        <a
          href={`tel:${SITE.phone}`}
          className="group flex flex-col rounded-2xl border border-accent/30 bg-accent/[0.05] p-8 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent">
              <i className="ph ph-phone-call" style={{ fontSize: 21, color: "#FFFFFF" }} />
            </span>
            <div>
              <div className="font-mono text-[34px] font-bold leading-none tracking-[-0.01em] text-accent">
                {SITE.phone}
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 text-[14px] text-[#6e7178]">
                <i className="ph ph-clock" style={{ fontSize: 15 }} />
                {SITE.brandName} · 평일 09:00 – 18:00
              </div>
            </div>
          </div>
          <i
            className="ph ph-arrow-up-right mt-6 self-end transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:mt-0 sm:self-center"
            style={{ fontSize: 20, color: "#6E7178" }}
          />
        </a>
      </div>
    </section>
  );
}

const CONSULT_STEPS = [
  {
    icon: "ph-clipboard-text",
    title: "문의 접수",
    desc: "접수된 문의를 확인하고 담당자를 배정합니다.",
  },
  {
    icon: "ph-blueprint",
    title: "시스템 제안",
    desc: "공간을 분석하고 알맞은 시스템 구성을 제안합니다.",
  },
  {
    icon: "ph-file-text",
    title: "견적 · 현장 상담",
    desc: "견적을 발송하고 필요 시 현장 상담을 진행합니다.",
  },
];

function Field({
  label,
  name,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className={LABEL}>
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        required={required}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${FIELD} mt-2`}
      />
    </label>
  );
}
