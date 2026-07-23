import { Fragment } from "react";

/**
 * 검색어 하이라이트 — text 안에서 매칭 토큰을 accent 색 <mark> 로 감싼다.
 * 서버 컴포넌트(순수 렌더)로 동작한다.
 */
export default function Highlight({
  text,
  tokens,
}: {
  text: string;
  tokens: string[];
}) {
  const clean = tokens.filter(Boolean);
  if (!clean.length || !text) return <>{text}</>;

  // 긴 토큰 우선, 정규식 특수문자 이스케이프.
  const escaped = clean
    .slice()
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "gi");

  // split 은 캡처그룹(매칭 조각)을 결과에 포함한다.
  const parts = text.split(re);
  const lowered = new Set(clean.map((t) => t.toLowerCase()));

  return (
    <>
      {parts.map((part, i) =>
        part && lowered.has(part.toLowerCase()) ? (
          <mark key={i} className="rounded-[3px] bg-accent/15 px-0.5 text-accent">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
