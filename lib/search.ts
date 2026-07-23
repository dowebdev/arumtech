/**
 * 통합 검색 로직.
 *
 * - 제품: 정적 `lib/data.ts` 를 토큰 AND 부분일치로 검색한다.
 * - 게시판(자료실·설치사례·공지/뉴스): 외부 API(`lib/contents`)의 `search` 파라미터로
 *   서버에서 직접 질의한다 (검색 페이지에서 처리).
 *
 * 매칭 규칙: 검색어를 소문자화해 공백으로 나눈 뒤, 모든 토큰이 항목의 검색텍스트에
 * 부분일치해야 한다(AND).
 */
import { products } from "@/lib/data";
import type { ContentItem } from "@/lib/contents";

/** 검색어 → 소문자 토큰 배열 (공백 분리, 빈 토큰 제거). */
export function tokenize(keyword: string): string[] {
  return keyword
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/** 모든 토큰이 text 안에 부분일치하면 true. */
export function matchesAll(text: string, tokens: string[]): boolean {
  const hay = text.toLowerCase();
  return tokens.every((t) => hay.includes(t));
}

export interface ProductHit {
  slug: string;
  model: string;
  kicker: string;
  line: string;
  image?: string;
}

/**
 * 제품 검색. 색인 필드: 모델명 · 영문타입(en) · kicker · 라인 · 태그 · 합침카드 열모델명.
 */
export function searchProducts(tokens: string[]): ProductHit[] {
  if (tokens.length === 0) return [];
  return products
    .filter((p) => {
      const hay = [
        p.model,
        p.en ?? "",
        p.kicker ?? "",
        p.line,
        ...(p.tags ?? []),
        ...(p.specColumns ?? []),
      ].join(" ");
      return matchesAll(hay, tokens);
    })
    .map((p) => ({
      slug: p.slug,
      model: p.model,
      kicker: p.kicker ?? "",
      line: p.line,
      image: p.image,
    }));
}

/**
 * 게시판(자료실·설치사례·공지) 항목을 제목·카테고리 기준으로 토큰 AND 필터한다.
 * 외부 API 의 `search` 는 대소문자를 구분하므로, 목록을 통째로 받아 여기서 일관되게
 * 대소문자 무시로 필터한다 (제품 검색과 동일 규칙).
 */
export function filterBoard(items: ContentItem[], tokens: string[]): ContentItem[] {
  if (tokens.length === 0) return [];
  return items.filter((it) =>
    matchesAll([it.title, it.category ?? ""].join(" "), tokens)
  );
}
