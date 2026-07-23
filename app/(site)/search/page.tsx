import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  fetchContentsList,
  type BoardKey,
  type ContentItem,
} from "@/lib/contents";
import { ProductImage, CaseImage } from "@/components/site/Visuals";
import Highlight from "@/components/site/Highlight";
import { tokenize, searchProducts, filterBoard } from "@/lib/search";

export const metadata: Metadata = {
  title: "통합 검색",
  description: "제품 · 자료실 · 설치사례 · 뉴스를 한 번에 검색합니다.",
};

// 검색어마다 결과가 달라지므로 매 요청 렌더한다.
export const dynamic = "force-dynamic";

// 외부 API 의 search 는 대소문자를 구분하므로, 목록 전체를 캐시로 받아
// 우리 코드에서 제품과 동일한 규칙(대소문자 무시 토큰 AND)으로 필터한다.
async function loadBoard(
  board: BoardKey,
  withContent = false
): Promise<{ items: ContentItem[]; error: boolean }> {
  try {
    const res = await fetchContentsList(board, {
      limit: 300,
      withContent,
      revalidate: 300,
    });
    return { items: res.items, error: false };
  } catch {
    return { items: [], error: true };
  }
}

/** 섹션당 최대 표시 수 — 넓은 키워드로 페이지가 지나치게 길어지지 않게 한다. */
const SHOW_LIMIT = 24;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string | string[] }>;
}) {
  const raw = (await searchParams).keyword;
  const keyword = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";
  const tokens = tokenize(keyword);

  const productHits = keyword ? searchProducts(tokens) : [];
  const [cases, archive, notice] = keyword
    ? await Promise.all([
        loadBoard("cases", true),
        loadBoard("archive"),
        loadBoard("notice"),
      ])
    : [emptyBoard(), emptyBoard(), emptyBoard()];

  const caseHits = filterBoard(cases.items, tokens);
  const archiveHits = filterBoard(archive.items, tokens);
  const noticeHits = filterBoard(notice.items, tokens);

  const total =
    productHits.length + caseHits.length + archiveHits.length + noticeHits.length;
  const boardError = cases.error || archive.error || notice.error;

  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="container-site py-12 sm:py-16">
        {/* 헤더 + 인라인 검색폼 */}
        <div className="mb-6 sm:mb-8">
          <div className="font-mono text-[11px] tracking-[0.16em] text-accent sm:text-xs">
            SEARCH
          </div>
          <h1 className="mt-2 text-[26px] font-bold tracking-[-0.01em] text-ink sm:text-[38px]">
            통합 검색
          </h1>
        </div>

        {!keyword ? (
          <p className="mt-2 text-[14px] text-[#6e7178]">
            상단 검색창에서 제품·자료·설치사례를 검색해 보세요.
          </p>
        ) : (
          <>
            <p className="mt-6 text-[14px] text-[#52555b]">
              <span className="font-semibold text-ink">“{keyword}”</span> · 총{" "}
              <span className="font-semibold text-accent">{total}</span>개의 검색 결과
            </p>

            {total === 0 ? (
              <div className="flex flex-col items-center gap-2 py-24 text-center">
                <i
                  className="ph ph-magnifying-glass text-[#c4c7cc]"
                  style={{ fontSize: 44 }}
                />
                <p className="mt-2 text-[16px] font-semibold text-ink">
                  ‘{keyword}’에 대한 검색 결과가 없습니다.
                </p>
                <p className="text-[14px] text-[#9aa0a6]">
                  다른 키워드로 검색해 보세요.
                </p>
              </div>
            ) : (
              <div className="mt-2">
                {/* 제품 */}
                {productHits.length > 0 && (
                  <ResultSection label="제품" count={productHits.length}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {productHits.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/products/${p.slug}`}
                          className="card-light card-hover-light block overflow-hidden"
                        >
                          <div className="relative aspect-[4/3]">
                            <ProductImage
                              src={p.image}
                              alt={p.model}
                              className="h-full w-full"
                              pad="p-7"
                            />
                            <span className="absolute left-3 top-3 rounded-full border border-black/15 bg-white/90 px-2 py-[3px] font-mono text-[10px] font-semibold tracking-[0.08em] text-ink backdrop-blur">
                              {p.line}
                            </span>
                          </div>
                          <div className="p-4">
                            <div className="font-mono text-[17px] font-semibold text-accent">
                              <Highlight text={p.model} tokens={tokens} />
                            </div>
                            {p.kicker && (
                              <div className="mt-1 text-[13px] text-[#6e7178]">
                                <Highlight text={p.kicker} tokens={tokens} />
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </ResultSection>
                )}

                {/* 설치사례 */}
                {caseHits.length > 0 && (
                  <ResultSection label="설치사례" count={caseHits.length}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {caseHits.slice(0, SHOW_LIMIT).map((c) => (
                        <Link
                          key={c.idx}
                          href={`/cases/${c.idx}`}
                          className="card-light card-hover-light block overflow-hidden"
                        >
                          <div className="relative aspect-[16/10]">
                            <CaseImage
                              src={c.thumbnail}
                              alt={c.title}
                              className="h-full w-full"
                            />
                            {c.category && (
                              <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-medium text-cream backdrop-blur">
                                {c.category}
                              </span>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="text-[15px] font-semibold leading-[1.4] text-ink">
                              <Highlight text={c.title} tokens={tokens} />
                            </div>
                            {c.date && (
                              <div className="mt-1.5 text-[12px] text-[#9aa0a6]">
                                {c.date}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                    {caseHits.length > SHOW_LIMIT && <MoreNote />}
                  </ResultSection>
                )}

                {/* 자료실 */}
                {archiveHits.length > 0 && (
                  <ResultSection label="자료실" count={archiveHits.length}>
                    <BoardRows
                      items={archiveHits.slice(0, SHOW_LIMIT)}
                      tokens={tokens}
                      hrefBase="/downloads"
                      icon="ph ph-file-text"
                    />
                    {archiveHits.length > SHOW_LIMIT && <MoreNote />}
                  </ResultSection>
                )}

                {/* 뉴스 */}
                {noticeHits.length > 0 && (
                  <ResultSection label="뉴스" count={noticeHits.length}>
                    <BoardRows
                      items={noticeHits.slice(0, SHOW_LIMIT)}
                      tokens={tokens}
                      hrefBase="/about/news"
                      icon="ph ph-megaphone"
                    />
                    {noticeHits.length > SHOW_LIMIT && <MoreNote />}
                  </ResultSection>
                )}

                {boardError && (
                  <p className="mt-10 text-[13px] text-[#9aa0a6]">
                    일부 게시판 검색을 일시적으로 불러오지 못했습니다.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function emptyBoard() {
  return { items: [] as ContentItem[], error: false };
}

function MoreNote() {
  return (
    <p className="mt-3 text-[12px] text-[#9aa0a6]">
      가장 관련된 {SHOW_LIMIT}건을 표시합니다. 더 많은 결과는 해당 메뉴에서 확인하세요.
    </p>
  );
}

function ResultSection({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <section className="mt-11 first:mt-8">
      <h2 className="mb-5 flex items-baseline gap-2 border-b border-black/10 pb-3 text-[18px] font-bold tracking-[-0.01em] text-ink sm:text-[20px]">
        {label}
        <span className="text-[15px] font-semibold text-accent">{count}</span>
      </h2>
      {children}
    </section>
  );
}

/** 자료실·뉴스 공용 행 목록. */
function BoardRows({
  items,
  tokens,
  hrefBase,
  icon,
}: {
  items: ContentItem[];
  tokens: string[];
  hrefBase: string;
  icon: string;
}) {
  return (
    <div className="divide-y divide-black/[0.07] overflow-hidden rounded-xl border border-black/10">
      {items.map((it) => (
        <Link
          key={it.idx}
          href={`${hrefBase}/${it.idx}`}
          className="group flex items-center gap-4 bg-white px-5 py-4 transition-colors hover:bg-[#f7f8fa]"
        >
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent/[0.08]">
            <i className={`${icon} text-accent`} style={{ fontSize: 18 }} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-medium text-ink">
              <Highlight text={it.title} tokens={tokens} />
            </span>
            {(it.category || it.date || it.fileCount > 0) && (
              <span className="mt-0.5 block text-[12px] text-[#9aa0a6]">
                {[it.category, it.date, it.fileCount > 0 ? `첨부 ${it.fileCount}` : ""]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            )}
          </span>
          <i className="ph ph-arrow-right flex-shrink-0 text-[#c4c7cc] transition-colors group-hover:text-accent" />
        </Link>
      ))}
    </div>
  );
}
