import Link from "next/link";
import type { Product } from "@/lib/data";
import { ProductImage } from "./Visuals";

export function ProductBadge({ badge, light = false }: { badge: string; light?: boolean }) {
  const color = badge === "NEW" ? "#5B9DD9" : "#6EA921";
  return (
    <span
      className={`rounded-full border px-2 py-[3px] font-mono text-[10px] font-semibold tracking-[0.08em] backdrop-blur ${
        light ? "bg-white/90" : "bg-ink/75"
      }`}
      style={{ color, borderColor: color }}
    >
      {badge}
    </span>
  );
}

export default function ProductCard({
  product,
  showTags = false,
  light = false,
}: {
  product: Product;
  showTags?: boolean;
  light?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`block overflow-hidden ${light ? "card-light card-hover-light" : "card card-hover"}`}
    >
      <div className="relative aspect-[4/3]">
        <ProductImage src={product.image} alt={product.model} className="h-full w-full" iconSize={64} pad="p-7" />
        <div className="absolute left-4 top-4 flex items-center gap-1.5">
          <span
            className={`rounded-full border px-2 py-[3px] font-mono text-[10px] font-semibold tracking-[0.08em] backdrop-blur ${
              light
                ? "border-black/15 bg-white/90 text-ink"
                : "border-cream/[0.18] bg-ink/75 text-cream"
            }`}
          >
            {product.line}
          </span>
          {product.badge && <ProductBadge badge={product.badge} light={light} />}
        </div>
      </div>
      <div className="p-[22px]">
        <div className="font-mono text-xl font-semibold tracking-[0.01em] text-accent">
          {product.model}
        </div>
        <div className={`mt-[5px] text-[13.5px] ${light ? "text-[#52555b]" : "text-muted"}`}>
          {product.kicker}
        </div>
        {product.keySpecs.length > 0 && (
        <div
          className={`mt-[18px] flex gap-[18px] border-t pt-[18px] ${
            light ? "border-black/10" : "border-cream/[0.08]"
          }`}
        >
          {product.keySpecs.map((ks) => (
            <div key={ks.l}>
              <div className="font-mono text-base font-semibold text-accent">{ks.v}</div>
              <div
                className={`mt-0.5 text-[10.5px] tracking-[0.04em] ${
                  light ? "text-[#6e7178]" : "text-dim"
                }`}
              >
                {ks.l}
              </div>
            </div>
          ))}
        </div>
        )}
        {showTags && (
          <div
            className={`mt-4 text-xs tracking-[0.02em] ${light ? "text-[#6e7178]" : "text-dim"}`}
          >
            {product.tags.map((t) => `#${t}`).join("  ")}
          </div>
        )}
      </div>
    </Link>
  );
}
