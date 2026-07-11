"use client";

import { useEffect, useState } from "react";
import SolutionIcon from "./SolutionIcon";
import { solutions } from "@/lib/data";

/**
 * Solution icon grid. Besides the manual hover effect, it auto-cycles a
 * "spotlight" through the items one at a time — each active item gets the same
 * green treatment (ring, glow, accent icon/title + the SVG line animations).
 */
export default function SolutionsShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % solutions.length),
      1800,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
      {solutions.map((sol, i) => {
        const on = i === active;
        return (
          <div
            key={sol.title}
            className={`group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1.5 ${
              on ? "sol-cycle-active -translate-y-1.5" : ""
            }`}
          >
            <span
              className={`relative mb-5 flex h-[96px] w-[96px] items-center justify-center rounded-full border bg-panel transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/[0.06] group-hover:shadow-[0_0_34px_-10px_rgba(110,169,33,0.65)] ${
                on
                  ? "border-accent/40 bg-accent/[0.06] shadow-[0_0_34px_-10px_rgba(110,169,33,0.65)]"
                  : "border-cream/10"
              }`}
            >
              <SolutionIcon
                art={sol.art}
                className={`h-12 w-12 transition-colors duration-300 group-hover:text-accent ${
                  on ? "text-accent" : "text-cream/70"
                }`}
              />
            </span>
            <div
              className={`text-[18px] font-semibold leading-[1.3] transition-colors duration-300 group-hover:text-accent ${
                on ? "text-accent" : "text-cream"
              }`}
            >
              {sol.title}
            </div>
            <div className="mt-1 font-mono text-[11px] tracking-[0.04em] text-muted">
              {sol.en}
            </div>
          </div>
        );
      })}
    </div>
  );
}
