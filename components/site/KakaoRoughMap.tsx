"use client";

import { useEffect, useRef } from "react";

/**
 * 카카오(다음) 지도 퍼가기(약도) 임베드 — 키 없이 소스만으로 동작하는 정적 약도.
 *
 * 로더(roughmapLoader.js)는 내부에서 document.write 로 렌더러를 불러오는데, 스크립트를
 * 동적 삽입하면 document.write 가 무시된다. 그래서 로더가 세팅한 cdn/phase 값으로
 * 렌더러(roughmapLander.js)를 직접 로드한 뒤 Lander.render() 를 호출한다.
 * (지도 아래 주소·전화 정보바는 globals.css 에서 잘라내 가린다.)
 */
const CONTAINER_ID = "daumRoughmapContainer1784104304671";
const LOADER_SRC = "https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js";
const MAP_OPTS = {
  timestamp: "1784104304671",
  key: "r9wo922qxdh",
  mapWidth: "100%",
  mapHeight: "400",
};

declare global {
  interface Window {
    daum?: {
      roughmap?: {
        cdn?: string;
        phase?: string;
        Lander?: new (opts: Record<string, string>) => { render: () => void };
      };
    };
  }
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-roughmap="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") resolve();
      else {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error(src)));
      }
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.setAttribute("charset", "UTF-8");
    s.dataset.roughmap = src;
    s.addEventListener("load", () => {
      s.dataset.loaded = "true";
      resolve();
    });
    s.addEventListener("error", () => reject(new Error(src)));
    document.head.appendChild(s);
  });
}

export default function KakaoRoughMap() {
  const done = useRef(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await loadScript(LOADER_SRC);
        const rm = window.daum?.roughmap;
        if (!rm) return;
        if (!rm.Lander) {
          const proto = location.protocol === "https:" ? "https:" : "http:";
          await loadScript(
            `${proto}//t1.kakaocdn.net/kakaomapweb/roughmap/place/${rm.phase}/${rm.cdn}/roughmapLander.js`
          );
        }
        if (cancelled || done.current) return;
        const Lander = window.daum?.roughmap?.Lander;
        if (!Lander) return;
        const el = document.getElementById(CONTAINER_ID);
        if (el) el.innerHTML = ""; // StrictMode 중복 렌더 방지
        new Lander(MAP_OPTS).render();
        done.current = true;
      } catch {
        /* 지도 로드 실패 — 조용히 무시 */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <div id={CONTAINER_ID} className="root_daum_roughmap root_daum_roughmap_landing w-full" />;
}
