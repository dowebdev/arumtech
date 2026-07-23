// =============================================================
// ARUMTECH — central content data (frontend prototype)
// All product / case / download / inquiry content lives here.
// In a future phase this is replaced by a CMS/API layer.
// =============================================================

export type ProductLine =
  | "M-Line"
  | "L-Line"
  | "B-Line"
  | "Column"
  | "Full Range"
  | "Monitor"
  | "Amplifiers";

export interface KeySpec {
  l: string; // label
  v: string; // value
}

export interface GalleryItem {
  src?: string; // image path
  video?: string; // YouTube id → embedded iframe
  /** 이미지 위에 오는 제목·설명 — 원본의 "타이틀 → 설명 → 사진" 배치 */
  title?: string;
  body?: string;
  /** 설명과 이미지 사이의 보조 문구 (상표 고지 등) */
  notes?: string[];
  /** 이미지 아래 문구 */
  caption?: string;
  half?: boolean; // render at half column width (pairs side-by-side)
}

/** Full Range 아래의 서브 라인. 다른 라인에는 서브 그룹이 없다. */
export type ProductGroup =
  | "V-ARRAY"
  | "V-Line"
  | "CV-Line"
  | "K-Line"
  | "C-Line"
  | "COX-Line";

/**
 * 원본 사이트 사양표의 한 행.
 * `v` 가 배열인 이유는 한 페이지가 여러 모델을 열로 나열하기 때문이다.
 * (예: CV-10i / CV-12i / CV-15i → v: ["125 dB", "129 dB", "131 dB"])
 */
export interface SpecRow {
  k: string;
  v: string[];
}

/**
 * 사양 그룹. 원본이 그룹 없이 평면 표인 제품도 있어 `title` 은 선택이다.
 * 그룹명 표기는 원본을 따른다 (`ACOUSTICAL`, `Acoustical Specifications` 등 혼재).
 */
export interface SpecGroup {
  title?: string;
  rows: SpecRow[];
}

/** 악세사리 카드. 제품 상세의 ACCESSORIES 그리드는 이미지가 함께 온다. */
export interface Accessory {
  title: string;
  desc: string;
  image?: string;
}

/** 사양표 위의 특징 블록 (Dome Tweeters, Integrated DSP, EASE® Ready …) */
export interface FeatureImage {
  src: string;
  w?: number;
  h?: number;
}

export interface Feature {
  title: string;
  body: string;
  images?: FeatureImage[];
  /** 특징 본문 아래에 한 줄로 나란히 넣는 보조 이미지들 */
  rowImages?: string[];
}

/** 상세 페이지 하단 References 항목. */
export interface ProductReference {
  title: string;
  body: string;
  image?: string;
}

export interface Product {
  slug: string;
  line: ProductLine;
  /** Full Range 제품만 갖는다. */
  group?: ProductGroup;
  model: string;
  kicker?: string; // 한 줄 설명 (국문)
  en?: string; // English descriptor — 원본 사양표의 Type 행에서 가져온다
  badge: string | null; // "추천" | "NEW" | null
  featured: boolean;
  tags: string[];
  keySpecs: KeySpec[];
  /** 원본 사양표의 값 열 = 모델명. 단일 모델이면 빈 배열. */
  specColumns?: string[];
  /** 원본(arumtech.co.kr) 사양표를 그대로 옮긴 사양. */
  specGroups?: SpecGroup[];
  /** 사양표 하단 각주 (측정 조건 등) */
  specNote?: string;
  /** 사양표 위의 특징 블록 — 원본 순서대로 */
  features?: Feature[];
  /** 특징 블록 뒤의 이미지 (EASE 스크린샷 등) */
  featureImage?: string;
  /** 특징 블록 하단 상표 고지 (영문 · 국문) */
  featureNotes?: string[];
  /** Specifications 제목 바로 위에 오는 소개 문단 */
  specIntro?: string[];
  /** 사양표 위 이미지 (치수 도면 등). 모델이 둘이면 도면도 둘이라 배열도 받는다. */
  specImage?: string | string[];
  /** 사양표 위 모델 라벨 ("Model: M-F3A PRO") */
  specModelLabel?: string;
  /** 악세사리 (제품 상세 그리드 / 악세사리 전용 페이지 공용) */
  accessories?: Accessory[];
  /** ACCESSORIES 카드 위에 오는 도입 문구 (원본의 "Maximum Versatility" 등) */
  accessoriesIntro?: { title?: string; body: string };
  /** References — 도입 사례 · 매체 리뷰 */
  references?: ProductReference[];
  /** References 뒤에 붙는 이미지 (지면 리뷰 스캔 등) */
  referenceImage?: string;
  /** 페이지 최하단 상담 유도 배너 */
  ctaImage?: string;
  ctaCaption?: string;
  /** 하단 DIAGRAM 섹션 이미지 (원본의 도해·회전 GIF) */
  diagram?: string[];
  /** DIAGRAM 섹션: 라벨이 붙은 3-up 도면 그리드 */
  diagramGrid?: { image: string; label: string }[];
  /** DIAGRAM 섹션 하단 전폭 이미지 (설치 방식 등) */
  diagramFooter?: string;
  /** ACCESSORIES 이미지 세로 높이를 px 단위로 통일한다 (미설정 시 원본 비율). */
  accessoryImageHeight?: number;
  /** 하단 이미지 슬라이더 (원본의 owl carousel) */
  slider?: string[];
  /** 슬라이더 위 제목. 원본에 제목이 없는 페이지도 있어 선택 항목이다. */
  sliderTitle?: string;
  /** 하단 동영상 (YouTube ID) */
  videoId?: string;
  /** 소개(intro) 바로 아래에 넣는 유튜브 영상 ID. 하단 videoId 와 별개. */
  introVideoId?: string;
  /** FEATURES 섹션 바로 위에 넣는 전폭 이미지 (원본의 아이콘 배너 등). */
  featuresTopImage?: string;
  /** FEATURES 와 Specifications 사이에 넣는 제품 슬라이더 (예: "Products of the 15'' Series"). */
  productsSlider?: string[];
  productsSliderTitle?: string;
  /** ACCESSORIES 를 카드 대신 전폭 이미지 1장으로 보여줄 때 사용. */
  accessoriesImage?: string;
  /** true 면 ACCESSORIES 를 하단이 아니라 Specifications 위에 렌더한다. */
  accessoriesBeforeSpec?: boolean;
  /** 히어로 라인 뱃지 옆에 표시할 상태 라벨 (예: "단종모델"). */
  statusLabel?: string;
  /**
   * 하단 DOWNLOAD 버튼.
   * - file: 자사 파일서버 경로. file·href 둘 다 없으면 "준비중" 으로 표시된다.
   * - href: 외부 절대 URL (예: 독일 본사 서버) — 있으면 새 탭으로 바로 연결한다.
   * - meta: 포맷·용량·업데이트 등 부가 설명 한 줄.
   */
  downloadLinks?: { label: string; file?: string; href?: string; meta?: string }[];
  /** 원본 페이지 URL — 대조 검증에 쓴다. */
  sourceUrl?: string;
  image?: string; // 대표 제품 이미지 (없으면 플레이스홀더)
  tagline?: { headline: string; sub?: string }; // 상세 페이지 상단 카피
  intro?: { title: string; sections: { heading?: string; body: string }[] }; // 갤러리 앞 소개 문구
  docs?: { cat: string; title: string; fmt: string; size: string; file: string }[]; // 다운로드 자료
  gallery?: GalleryItem[]; // 상세 페이지 콘텐츠 갤러리 (있을 때만 노출)
}

export interface CaseStudy {
  slug: string;
  title: string;
  type: string; // 시설 유형
  en: string;
  region: string;
  used: string[]; // model names
  summary: string;
  problem: string;
  solution: string;
  result: string;
  image?: string; // 설치 현장 사진 (없으면 플레이스홀더)
}

export interface DownloadItem {
  id: number;
  cat: string;
  title: string;
  product: string;
  fmt: string;
  size: string;
}

export type InquiryStatus =
  | "신규"
  | "확인중"
  | "견적발송"
  | "상담완료"
  | "계약완료"
  | "보류"
  | "스팸";

export interface Inquiry {
  id: number;
  type: string;
  name: string;
  company: string;
  phone: string;
  product: string;
  place: string;
  region: string;
  status: InquiryStatus;
  date: string;
}

// ---------------- PRODUCT LINES ----------------

export const PRODUCT_LINES: ProductLine[] = [
  "M-Line",
  "L-Line",
  "B-Line",
  "Column",
  "Full Range",
  "Monitor",
  "Amplifiers",
];

export const LINE_DESCRIPTIONS: Record<ProductLine, string> = {
  "M-Line": "모듈형 컴팩트 라인어레이",
  "L-Line": "대형 포맷 라인어레이",
  "B-Line": "고출력 서브우퍼",
  Column: "스티어러블 컬럼",
  "Full Range": "풀레인지 포인트소스",
  Monitor: "스테이지 모니터",
  Amplifiers: "DSP 파워앰프",
};

// Product lines that link to an external page (opened in a new tab) instead of
// the internal /products filter. Keyed by line name. (현재 외부 링크 라인 없음.)
export const LINE_EXTERNAL_LINKS: Partial<Record<ProductLine, string>> = {};

export const LINE_ICONS: Record<ProductLine, string> = {
  "M-Line": "ph ph-speaker-hifi",
  "L-Line": "ph ph-speaker-high",
  "B-Line": "ph ph-waveform",
  Column: "ph ph-rows",
  "Full Range": "ph ph-circles-three",
  Monitor: "ph ph-monitor-play",
  Amplifiers: "ph ph-sliders-horizontal",
};

/**
 * Full Range 서브 라인 — 제품소개 사이트맵의 3단계.
 * 목록에 있으나 아직 `products` 에 항목이 없는 그룹은 빈 상태로 노출된다.
 * 없는 제품을 지어내지 않기 위해서다.
 */
export const FULL_RANGE_GROUPS: ProductGroup[] = [
  "V-ARRAY",
  "V-Line",
  "CV-Line",
  "K-Line",
  "C-Line",
  "COX-Line",
];

/** 서브 라인별 제품 목록. products 에 실제로 존재하는 항목만 돌려준다. */
export const productsInGroup = (group: ProductGroup) =>
  products.filter((p) => p.group === group);

// Homepage "제품 라인업" — exactly the 6 lines to surface on the main page.
// Kept separate from PRODUCT_LINES (the product-page taxonomy) so the home
// display can differ without affecting product filtering/tagging.
export const HOME_LINEUP: { title: string; desc: string; icon: string; href: string }[] = [
  { title: "M-Line", desc: "모듈형 컴팩트 라인어레이", icon: "ph ph-speaker-hifi", href: "/products?line=M-Line" },
  { title: "L-Line", desc: "대형 포맷 라인어레이", icon: "ph ph-speaker-high", href: "/products?line=L-Line" },
  { title: "I-Line", desc: "인스톨형 라인어레이", icon: "ph ph-rows", href: "/products" },
  { title: "COX-Line", desc: "코액시얼 포인트소스", icon: "ph ph-circles-three", href: "/products" },
  { title: "B-Line", desc: "고출력 서브우퍼", icon: "ph ph-waveform", href: "/products?line=B-Line" },
  { title: "Stage Monitoring", desc: "스테이지 모니터", icon: "ph ph-monitor-play", href: "/products?line=Monitor" },
];

// ---------------- PRODUCTS ----------------

export const products: Product[] = [
  {
    slug: "m-f3a-pro-max",
    line: "M-Line",
    model: "M-F3A PRO MAX",
    kicker: "플래그십 컴팩트 액티브 라인어레이",
    en: "Active Line Array Module",
    badge: null,
    featured: false,
    tags: ["라인어레이", "투어링", "설치", "강당"],
    keySpecs: [
      { l: "Total Power", v: "1000 W" },
      { l: "Maximum Peak SPL", v: "133 dB" },
      { l: "Net weight", v: "12.6 kg" },
    ],
    sourceUrl: "https://se-audiotechnik.de/produkt/m-f3a-pro-max-2/",
    tagline: {
      headline: "More reach. More headroom. The same unmistakable SE sound.",
      sub: "M-F3A PRO MAX",
    },
    intro: {
      title: "M-F3A PRO goes MAX",
      sections: [
        { body: "M-F3A PRO MAX is the evolution of the acclaimed M-F3A PRO system — built for larger, more demanding applications that call for more output, longer throw and refined control. Staying true to the compact, horn-less philosophy of the M-Line, it delivers natural mids, studio-grade highs and consistent coverage in a lightweight format made for both installation and touring. Seamless integration with B-Line subwoofers and M-Line accessories makes it a versatile building block for flown arrays and ground stacks alike." },
        { heading: "Extended mids, refined highs", body: "More vocal presence and musical detail through an extended midrange section and an optimised HF design — natural, open and fatigue-free. Its horn-less clarity and consistent coverage come in a lightweight cabinet that arrays quickly and performs confidently in larger spaces." },
        { heading: "Power and control built in", body: "High-efficiency Class-D amplification works hand in hand with precise DSP, preserving dynamics from delicate speech to high-energy music. Intuitive on-board controls support fast, repeatable tuning across array sizes and venues, while comprehensive protection circuits ensure reliable performance day after day." },
        { heading: "Compact, easy to handle", body: "Despite its extended capabilities, M-F3A PRO MAX stays compact and easy to handle. A lightweight cabinet, rugged finish and user-focused rigging enable fast, safe arraying with precise tilt control. A full ecosystem of accessories — bumper, U-brackets, carts, flight cases, rain covers and stacking frames — simplifies logistics and opens up versatile setups. Combined with B-Line subwoofers, it forms scalable full-range systems for everything from finely tuned corporate productions to large-scale live events." },
      ],
    },
    features: [
      { title: "Natural SE signature sound", body: "More output and throw for larger applications, with the natural SE signature sound kept fully intact." },
      { title: "Horn-less acoustic design", body: "Precise, balanced reproduction without coloration for open, fatigue-free listening at level and over distance." },
      { title: "Active platform with factory voicings", body: "On-board Class-D amplification with precise DSP and factory voicings for fast, repeatable setup and tuning." },
      { title: "Lightweight, safety-focused rigging", body: "A lightweight cabinet with discreet, user-centred rigging for quick, secure flown and stacked arrays." },
      { title: "Seamless B-Line integration", body: "Pairs with B-Line subwoofers and M-Line accessories to build scalable full-range systems without visual clutter." },
    ],
    specColumns: ["M-F3A PRO MAX"],
    specGroups: [
      {
        title: "ACOUSTICAL DATA",
        rows: [
          { k: "Frequency range (-3 dB) *", v: ["135 Hz – 19 kHz"] },
          { k: "Frequency range (-6 dB) *", v: ["108 Hz – 20 kHz"] },
          { k: "Frequency range (-10 dB) *", v: ["95 Hz – 20 kHz"] },
          { k: "Coverage angles [H x V] **", v: ["120° x 16°"] },
          { k: "Maximum Peak SPL ***", v: ["133 dB"] },
          { k: "Maximum continuous SPL ***", v: ["121 dB"] },
          { k: "System type", v: ["2-way active"] },
          { k: "Crossover frequency (ac.)", v: ["1.9 kHz"] },
          { k: "Transducers", v: ["MF: 16 × 2.8″ drivers (0.8″ voice coil), HF: 8 × 1″ tweeters (1″ voice coil)"] },
          { k: "Enclosure type", v: ["Bass reflex"] },
        ],
      },
      {
        title: "ELECTRICAL DATA",
        rows: [
          { k: "Amplifier class", v: ["Amplifier: Class-D, Power supply: SMPS"] },
          { k: "Total power ****", v: ["1000 W"] },
          { k: "Output power per channel *****", v: ["MF: 500 W, HF: 500 W"] },
          { k: "Protection", v: ["Short circuit | Temperature"] },
          { k: "Indicators", v: ["LEDs | ON (green) | SIGNAL (green) | LIMIT (red) | PROTECT (red)"] },
          { k: "Connectors", v: ["1 × XLR line input (balanced), 1 × XLR line output (balanced), 1 × powerCON® AC input 20A, 1 × powerCON® AC output 20A"] },
          { k: "Wiring", v: ["XLR: Pin 2: Signal+ | Pin 3: Signal- | Pin 1: Shield  ·  powerCON®: Pin N: Neutral | Pin L: Line | Pin E: Ground"] },
          { k: "Mains voltage", v: ["MAINS IN: 100–120 V~ / 50–60 Hz | 20A max. / 5.8A unit  ·  220–240 V~ / 50–60 Hz | 16A max. / 2.9A unit    MAINS OUT: 100–120 V~ | 14.2A max.  ·  220–240 V~ | 13.1A max."] },
          { k: "Input sensitivity", v: ["0 dBu"] },
          { k: "DSP", v: ["48 kHz / 24 bit with extended dynamics"] },
          { k: "Signal processing", v: ["Crossover | Limiter | EQ | Level | low-noise AD-DA"] },
          { k: "User controls", v: ["LEVEL: 8-position rotary (-10 | -6 | -5 | -4 | -3 | -2 | -1 | 0)  ·  HF LEVEL: 8-position rotary (1~8)"] },
        ],
      },
      {
        title: "MECHANICAL DATA",
        rows: [
          { k: "Product dimensions [H x W x D]", v: ["329 x 328 x 384 mm"] },
          { k: "Weight", v: ["12.6 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["485 x 415 x 452 mm"] },
          { k: "Total weight", v: ["14 kg"] },
          { k: "Cabinet", v: ["12 mm plywood"] },
          { k: "Cabinet finishing", v: ["Black polyurea coating"] },
          { k: "Grille", v: ["Powder-coated perforated steel"] },
          { k: "Rigging system", v: ["Three-point rigging, 3 × SE AUDIOTECHNIK® 6 mm locking pins"] },
          { k: "Splay angles", v: ["0.25° | 0.5° | 1° | 1.5° | 2° | 3° | 4° | 5° | 6.5° | 8°"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Bumper frame", v: ["M-F3A PRO MAX BF"] },
          { k: "Stacking frame", v: ["B 18 SFi MAX"] },
          { k: "U-bracket / frame", v: ["M-F3A PRO MAX UB"] },
          { k: "Transport cart", v: ["M-F3A PRO MAX TK 43"] },
          { k: "Flight case", v: ["M-F3A PRO MAX FC"] },
          { k: "Rain cover", v: ["M-F3A PRO MAX FRC 8 / 12 / 16"] },
        ],
      },
    ],
    specNote: "* Whole space | -10 dBu / 1m | reference axis   ** (-6 dB | 500 Hz – 6000 Hz)   *** SPL / 1m | whole space | pink noise | 12 dB crest factor | +10 dBu input level   **** Total power is the sum of the individual output channel power   ***** According to EIA-426B Standard (based on RMS voltage)",
    slider: ["/images/products/m-f3a-pro-max/main.webp", "/images/products/m-f3a-pro-max/open.webp", "/images/products/m-f3a-pro-max/back.webp", "/images/products/m-f3a-pro-max/tower.webp"],
    sliderTitle: "M-F3A PRO MAX",
  },
  {
    slug: "m-f3a-pro",
    line: "M-Line",
    model: "M-F3A PRO",
    kicker: "컴팩트 액티브 라인어레이",
    en: "Compact Active Line Array",
    badge: "추천",
    featured: true,
    tags: ["강당", "교회", "렌탈", "라인어레이"],
    keySpecs: [
      { l: "Total Power", v: "600 W" },
      { l: "Maximum Peak SPL", v: "129 dB" },
      { l: "Net weight", v: "8.3 kg" },
    ],
    tagline: {
          headline: "Born to perform everywhere.",
          sub: "The one compact Line-Array System.",
        },
    intro: {
          title: "Small Size Plus Plug & Play",
          sections: [
            {
              body: "The M-Line consists of self-powered modular PA systems suitable for in and outdoor audiences ranging from small crowds to a few thousand people. When extremely natural sound matters and/or space for placing is scarce, you will benefit from the solutions offered by this flexible, compact and sophisticated product line.",
            },
            {
              heading: "Plug & Play",
              body: "Easy-to-handle controls, tailor-made amplifiers with ready-to-go DSP settings allow for super fast setup times with amazing results. All amplifiers are combined with rock-solid DSP filtering and limiting, providing outstanding audio quality, whilst ensuring worry-free driver protection. Every product is available in both black and white polyurea coated finishes. Every component is exclusively designed and made by SE AUDIOTECHNIK. The variety of accessories allows you to operate and scale the system according to the application with minimum effort and resources needed.",
            },
          ],
        },
    docs: [
          { cat: "브로셔", title: "M-Line Brochure EN", fmt: "PDF", size: "6.13 MB", file: "M-Line_Brochure_EN.pdf" },
          { cat: "CAD", title: "M-F3A PRO", fmt: "DWG", size: "0.57 MB", file: "se_M-F3A_PRO.dwg" },
          { cat: "메뉴얼", title: "M-Line_Manual", fmt: "PDF", size: "6.79 MB", file: "M-Line_Manual.pdf" },
          { cat: "시방서", title: "M-F3A_PRO_시방서", fmt: "HWP", size: "0.96 MB", file: "M-F3A_PRO_Specification.hwp" },
        ],
    gallery: [
          { video: "a155goBcgaU", caption: "M-F3A PRO — Product Video" },
          {
            src: "/images/products/m-f3a-pro/driver-detail.jpg",
            title: "Dome Tweeters",
            body: "Each M-F3A PRO is equipped with eight 2.8\" woofers and seven 1\" dome tweeters. To reduce the dimensions of the cabinet and ensure high-fidelity sound, the dome tweeters form the centerpiece of its unique sound. It allows you to deliver hi-fi sound to your audience in a compact size with plenty of power.",
          },
          {
            src: "/images/products/m-f3a-pro/amp-panel.jpeg",
            title: "Integrated DSP",
            body: "Each M-F3A PRO is equipped with a 600W (300W HF and 300W MF) Class-D power amplifier with switching power supply for minimum weight and maximum flexibility anywhere in the world. In addition, our built-in 24-bit/48 kHz DSP processor provides signal filtering and ensures maximum driver protection with minimum error rate.",
          },
          {
            src: "/images/products/m-f3a-pro/ease-simulation.jpg",
            title: "EASE® Ready",
            body: "AFMG® EASE® and EASE® Focus 3 GLL files are available for the entire M-F3A PRO family. This allows users to simulate and calculate various parameters such as range, sound pressure level, frequency response, spread angle, delay times and more. The corresponding files are available in the Downloads section.",
            notes: ["EASE® and AFMG® are registered trademarks of AFMG Technologies GmbH."],
            caption: "EASE® 및 AFMG®는 AFMG Technologies GmbH의 등록 상표입니다.",
          },
        ],
    // Dome Tweeters → driver-detail.jpg, Integrated DSP → amp-panel.jpeg 위로 옮겼다.
    // Dome Tweeters / Integrated DSP / EASE® Ready 는 모두 갤러리 이미지 위로 옮겼다.
    // 사양표 위 이미지는 원본의 c0207b196c5be.png 대신 dimensions.png 를 쓴다.
    specImage: "/images/products/m-f3a-pro/dimensions.png",
    specModelLabel: "Model: M-F3A PRO",
    accessories: [
      { title: "M-F3A BF", desc: "Bumper frame for flying up to 16 M-F3A or M-F3A PRO, also available in white.", image: "/images/arumtech/thumbnail/20210830/7745f383ec918.png" },
      { title: "M-F3A UB", desc: "The U-Bracket allows users to attach up to two M-F3A PRO units when pole mounted on any of our subwoofers via an M20 thread.", image: "/images/arumtech/thumbnail/20210830/560d0bc1d81ff.png" },
      { title: "SPS 20", desc: "M20 Pole Support to pole mount an M-F3A or M-F3A PRO on any subwoofer.", image: "/images/arumtech/thumbnail/20210830/6d57f84dc689d.png" },
      { title: "M-F3A FC", desc: "Flight Case for four M-F3A or M-F3A PRO.", image: "/images/arumtech/thumbnail/20210830/65e39c4a3928b.png" },
      { title: "M-F3A PRO TK44", desc: "Transport cart (up to 4x4 units)", image: "/images/arumtech/thumbnail/20210830/75dbd3df8605f.png" },
      { title: "M-F3A FS FB", desc: "Multi Purpose Rigging Frame for rigging of different combinations of M-F3A and M-F3A FS, also available in white.", image: "/images/arumtech/thumbnail/20210830/7855834308a35.png" },
      { title: "M-F3A FA34", desc: "3 to 4 point adapter for rigging M-F3A FS and M-F3A (or M-F3A PRO), also available in white.", image: "/images/arumtech/thumbnail/20210830/0ee2f73e12c2e.png" },
      { title: "M-F3A SFI S12", desc: "Stacking frame for ground stacking M-F3A PRO cabinets on either S12 PRO, SUB 112BR or SUB 210BP subwoofers, also available in white.", image: "/images/arumtech/thumbnail/20210830/5a4b24adc1e9b.png" },
    ],
    references: [
      { title: "Bremerhaven City Hall opts for an M-Line speaker system by German specialist SE AUDIOTECHNIK", body: "Jan Hendrik Banaschewski (Technical Manager):\"In our search for a new sound system, we came across SE Audiotechnik from Solingen. We were promptly given the opportunity to have a demonstration of the M-Line in-house. Manne Sumfleth from SE-Audiotechnik, in cooperation with Blue Sound / Herbert Heinze as an executing partner (blue-sound-gmbh.de), demonstrated the advantages of the compact but powerful M-Line system.\"", image: "/images/arumtech/thumbnail/20210830/9df99356e970f.jpg" },
      { title: "Review M-F3A PRO and S12 PRO (PRODUCTION PARTNER 7/2019)", body: "With the M-F3A Pro, SE Audiotechnik presents a new version of the com-pact M-Line array with new drivers and integrated electronics. The match-ing S12 subwoofer is also available in a Pro version with a new 12″ enclo-sure and active electronics.", image: "/images/arumtech/thumbnail/20220328/5d144f95e3559.png" },
    ],
    referenceImage: "/images/arumtech/thumbnail/20220328/3d1cd616dee00.png",
    ctaImage: "/images/products/m-f3a-pro/cta-appointment.png",
    ctaCaption: "Interested in the product? Then make an appointment now.",
    slider: [
      "/images/arumtech/thumbnail/20200716/d202605cf089b.png",
      "/images/arumtech/thumbnail/20200701/c6ec7ec5ce1c9.png",
      "/images/arumtech/thumbnail/20200716/3aa3c9d2d7b83.png",
      "/images/arumtech/thumbnail/20200701/743a60dbb218d.png",
      "/images/arumtech/thumbnail/20200716/2f61fe8b4fb97.png",
    ],
    // 원본 하단 DOWNLOAD 6개. "Review M-F3A PRO" 만 파일 미확보 → 준비중으로 표시된다.
    // 도면은 원본 파일명 그대로인 se_M-F3A_PRO.dwg (AC1032 · AutoCAD 2018+) 를 쓴다.
    // 같은 폴더의 M-F3A_PRO.dwg 는 AC1027(2013) 판본으로, 현재 어디에도 연결돼 있지 않다.
    downloadLinks: [
      { label: "M-Line Brochure", file: "M-Line_Brochure_EN.pdf" },
      { label: "Engineering Data Sheet", file: "M-F3A_PRO_Engineering_Data_Sheet.pdf" },
      { label: "Review M-F3A PRO" },
      { label: "M-F3A PRO 시방서", file: "M-F3A_PRO_Specification.hwp" },
      { label: "M-F3A PRO 도면", file: "se_M-F3A_PRO.dwg" },
      { label: "M-Line User Manual", file: "M-Line_Manual.pdf" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/MF3APRO",
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3 dB)", v: ["140 Hz – 20 kHz"] },
          { k: "Frequency range (-10 dB)", v: ["100 Hz – 20 kHz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["120° x 16°"] },
          { k: "Maximum Peak SPL *", v: ["129 dB"] },
          { k: "System type", v: ["2-way active"] },
          { k: "Crossover frequency", v: ["1.9 kHz"] },
          { k: "Transducers", v: ["MF: 8 x 2.8″ drivers HF: 7 x 1″ dome tweeters"] },
          { k: "Enclosure type", v: ["Vented box"] },
        ],
      },
      {
        title: "AMPLIFICATION",
        rows: [
          { k: "Type", v: ["2 channel, class-D with SMPS"] },
          { k: "Total Power **", v: ["600 W"] },
          { k: "Output power per channel", v: ["MF: 300 W HF: 300 W"] },
          { k: "Protection", v: ["Short circuit, overheating, overcurrent"] },
          { k: "Connectors", v: ["Input signal: balanced XLR 3-pin female Link output: balanced XLR 3-pin male Power input: powerCON® 20A Power link output: powerCON® 20A"] },
          { k: "Wiring", v: ["Pin N: Neutral Pin L: Conductor Pin E: Ground"] },
          { k: "Input sensitivity", v: ["0 dBu"] },
          { k: "DSP", v: ["48 kHz/24 bit with extended dynamics Processing latency: 1.1 ms"] },
          { k: "Processing", v: ["Level, factory EQ presets"] },
          { k: "User controls", v: ["Power: On/Off switch Level: 8-position rotary knob (-50, -20, -10, -6, -3, -2, -1, 0) Line units: 8-position rotary knob (1 – 8+)"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["317 x 265 x 359 mm"] },
          { k: "Net weight", v: ["8.3 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["388 x 290 x 440 mm"] },
          { k: "Total weight", v: ["9.5 kg"] },
          { k: "Cabinet", v: ["12 mm plywood"] },
          { k: "Cabinet finishing", v: ["Black or white polyurea coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Hardware", v: ["Rear handle in 12 mm plywood plus side grips embedded in cabinet"] },
          { k: "Rigging", v: ["Three-point rigging system, 3 x SE Audiotechnik® 6 mm locking pins"] },
          { k: "Splay angles", v: ["0º, 1º, 2º, 3º, 4º, 6º, 8º"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Bumper frame", v: ["M-F3A BF"] },
          { k: "U-bracket", v: ["M-F3A UB"] },
          { k: "Flight case (4 units)", v: ["M-F3A FC"] },
          { k: "Carry-on bag (1 unit)", v: ["M-F3A CTB"] },
          { k: "Transport kart (up to 4×4 units)", v: ["M-F3A PRO TK44"] },
          { k: "Line rain cover (8, 12 or 18 units)", v: ["M-F3A PRO FRC 8 / 12 / 18"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Measured with 12 dB Crest factor Pink Noise, whole space ** Total power value is the sum of all individual channel output power",
  },
  {
    slug: "m-f3a-fs",
    line: "M-Line",
    model: "M-F3A FS",
    kicker: "풀레인지 플로어 시스템",
    en: "Full-range Floor System",
    badge: null,
    featured: false,
    tags: ["강당", "렌탈", "풀레인지"],
    keySpecs: [
      { l: "Total Power", v: "800 W" },
      { l: "Maximum Peak SPL", v: "127 dB" },
      { l: "Net weight", v: "23 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/MF3AFS",
    // 원본 PICTURE 섹션 — 슬라이드 항목이 1장뿐이다.
    sliderTitle: "PICTURE",
    slider: ["/images/arumtech/thumbnail/20200706/f18a7a4a4fcd7.png"],
    // 원본 DOWNLOAD 6개. M-Line 브로셔·매뉴얼과 M-F3A PRO 시방서는 M-F3A PRO 와
    // 같은 파일이라 복사하지 않고 절대경로로 공유한다.
    downloadLinks: [
      { label: "M-Line Brochure", file: "/downloads/m-f3a-pro/M-Line_Brochure_EN.pdf" },
      { label: "Ease® GLL-File", file: "SE-AUDIOTECHNIK-M-F3A-PRO-V10.gll.zip" },
      { label: "M-F3A PRO 시방서", file: "/downloads/m-f3a-pro/M-F3A_PRO_Specification.hwp" },
      { label: "M-Line Manual", file: "/downloads/m-f3a-pro/M-Line_Manual.pdf" },
      { label: "M-F3A FS 시방서", file: "M-F3A_FS_Specification.hwp" },
      { label: "M-F3A FS 도면", file: "se_M-F3A_FS.dwg" },
    ],
    specIntro: [
      "The M-F3A FS is a flyable bass extension module for the popular M-F3A PRO line array systems. It uses two specially designed 6″ x 9″ woofers that offer a slim and discreet design in addition to high sound pressure levels. The height is double that of an M-F3A PRO unit, complementing the system in every way.",
      "The unit contains a newly developed 800 W Class D power amplifier and is equipped with a 24-bit/48 kHz DSP. Using the LCD screen and rotary encoder, the user can control various system parameters such as delay, EQ, filter and other parameters.",
      "The user’s configurations can then be saved as user presets. In addition, the built-in factory presets reduce set-up times for existing M-Line systems in various configurations. For example, when flown with the M-F3A PRO, the unit can deliver rich, deep bass to handle setups where there is no room for floor subwoofers.",
    ],
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3 dB)", v: ["60 Hz – 103 Hz"] },
          { k: "Frequency range (-10 dB)", v: ["52 Hz – 143 Hz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["Omnidirectional"] },
          { k: "Maximum Peak SPL *", v: ["127 dB"] },
          { k: "System type", v: ["1-way active system"] },
          { k: "Crossover frequency", v: ["–"] },
          { k: "Transducers", v: ["2 x 6″ by 9″ drivers"] },
          { k: "Enclosure type", v: ["Vented box"] },
        ],
      },
      {
        title: "AMPLIFICATION",
        rows: [
          { k: "Type", v: ["Single channel, class-D with SMPS"] },
          { k: "Total Power **", v: ["800 W"] },
          { k: "Output power per channel", v: ["MF: 300 W HF: 300 W"] },
          { k: "Protection", v: ["Short circuit, overheating, overcurrent"] },
          { k: "Connectors", v: ["Input signal: balanced XLR 3-pin female Link output: balanced XLR 3-pin male Power input: powerCON® 20A Power link output: powerCON® 20A"] },
          { k: "Wiring", v: ["Pin N: Neutral Pin L: Conductor Pin E: Ground"] },
          { k: "Input sensitivity", v: ["0 dBu"] },
          { k: "DSP", v: ["48 kHz/24 bit with extended dynamics Processing latency: 1.1 ms"] },
          { k: "Processing", v: ["Factory and user presets, EQ, delay, phase inversion"] },
          { k: "User controls", v: ["Power: ON/OFF switch DSP: display with digital encoder"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["651 x 265 x 430 mm"] },
          { k: "Net weight", v: ["23 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["743 x 310 x 530 mm"] },
          { k: "Total weight", v: ["25 kg"] },
          { k: "Cabinet", v: ["15 mm plywood"] },
          { k: "Cabinet finishing", v: ["Black or white polyurea coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Hardware", v: ["Top handle embedded in cabinet"] },
          { k: "Rigging", v: ["Four-point rigging system 4 x SE Audiotechnik® 6 mm locking pins"] },
          { k: "Splay angles", v: ["0º, 1º, 2º, 3º, 4º, 5º, 6º, 7º, 8º"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Bumper frame", v: ["M-F3A FS BF"] },
          { k: "4 to 3 point adapter", v: ["M-F3A FA34"] },
          { k: "Amplifier rain cover", v: ["P801DL RC"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Measured with MF3AP preset ** Measured with 12 dB Crest factor Pink Noise, whole space",
  },
  {
    slug: "m-f3a-w",
    line: "M-Line",
    model: "M-F3A (W)",
    kicker: "화이트 컬러 액티브 라인어레이",
    en: "2.8\" Bassreflex",
    badge: null,
    featured: false,
    tags: ["교회", "강당", "라인어레이"],
    keySpecs: [
      { l: "Max. SPL (1m)", v: "128 dB" },
      { l: "Weight", v: "8 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/MF3A",
    // 원본 하단 구성: DIAGRAM → PICTURE → 동영상 → DOWNLOAD
    diagram: [
      "/images/arumtech/thumbnail/20200714/3b041165b0365.gif",
      "/images/arumtech/thumbnail/20200714/4d080246c8ae1.gif",
      "/images/arumtech/thumbnail/20200714/83bf492657cdc.gif",
    ],
    sliderTitle: "PICTURE",
    slider: [
      "/images/arumtech/thumbnail/20200630/734bc9aa06aac.jpg",
      "/images/arumtech/thumbnail/20200630/23b3dc59d2291.jpg",
      "/images/arumtech/thumbnail/20200630/4311ef38ed8e2.jpg",
      "/images/arumtech/thumbnail/20200630/2127d62ed5867.jpg",
    ],
    videoId: "P-sJVso5lSQ",
    // 원본 DOWNLOAD 4개.
    downloadLinks: [
      { label: "M-F3A Brochure", file: "M-F3A-brochure.pdf" },
      { label: "M-F3A 시방서", file: "M-F3A_Array_System_Specification.hwp" },
      { label: "M-F3A 도면", file: "se_M-F3A.dwg" },
      { label: "GLL Library", file: "se-M-F3A-v1.60.gll_-1.zip" },
    ],
    // 대표 이미지는 파일 하단 PRODUCT_IMAGES 맵에서 지정한다.
    // 원본의 "Small size, high SPL" ~ SPECIFICATIONS 직전 구간
    features: [
      {
        title: "Small size, high SPL",
        body: "The M-F3A features small size, same front size as an A4 paper and a weight of only 8kg. Still, one unit of this compact array delivers 123dB SPL max continuously (128dB peak). Advanced cooling and venting measures keep power compression at a minimum.",
        images: [{ src: "/images/products/m-f3a-w/Small-size-high-SPL.png", w: 246, h: 272 }],
      },
      {
        title: "Plug and play",
        body: "The M-F3A is designed to perfect sound for plug and play. Built in high class SMPS technology, two channel class-D amplifier together with proprietary DSP- filtering and limiting, relives you from head aches which and how settings should be used",
        images: [{ src: "/images/products/m-f3a-w/Plug-and-play.png", w: 323, h: 354 }],
      },
      {
        title: "Line source",
        body: "Each unit is already a line array in itself with very wide horizontal and precise controlled vertical dispersion.",
        images: [
          { src: "/images/products/m-f3a-w/Line-source01.png", w: 355, h: 268 },
          { src: "/images/products/m-f3a-w/Line-source02.png", w: 355, h: 268 },
        ],
      },
      {
        title: "Scalable",
        body: "Because of its compact array design from the ground up, M-F3A can be scaled for a great variety of uses and venues. From single wall mounting use up to a 4.8m long array, delivering a continuous max SPL of 135dB and exceptional directivity.",
        images: [{ src: "/images/products/m-f3a-w/Scalable.png", w: 114, h: 296 }],
      },
    ],
    specIntro: [
      'M-F3A is a compact and scale able active array system of small size and light weight. Each M-F3A contains 8 pieces of high-efficiency 2.8" full range speakers and 7 pieces of 1" direct radiate tweeter w/o horn, all vertically aligned to form a line array. Combining these components on the area of an A4 paper and weighing only 8 kg, each speaker box can produce an impressive 123 dB SPL continuously and 128 dB peak SPL. Built-in high class SMPS technology and two-channel class-D amplifiers, together with proprietary DSP- filtering and limiting, ensure a reliable and steady performance at all times.',
    ],
    specColumns: ["M-F3A"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["2.8\" Bassreflex"] },
          { k: "Frequency Range (-6dB)", v: ["120 Hz - 20 kHz"] },
          { k: "Power Handling（RMS）", v: ["200 W + 200 W"] },
          { k: "Max. SPL (1m)", v: ["128 dB"] },
          { k: "Max. Qty of rigging (12: 1 Safety Factor, using s)))e original accessories)", v: ["18 pcs"] },
          { k: "Dispersion（H × V）", v: ["120° × 16°"] },
          { k: "transducer MF", v: ["8 × 2.8” Neodymium Magnet with cooling module, 0.75”Voice Coil"] },
          { k: "transducer HF", v: ["7× 1”Neodymium Magnet, 1”Voice Coil"] },
          { k: "Power Ampilifer Type", v: ["Class D amplifier, SMPS"] },
          { k: "Input Sensitivity", v: ["-4 dBV"] },
          { k: "Signal Processing", v: ["DSP, 48 kHz, 24 bits"] },
          { k: "Protection", v: ["Multiple limiter, short circuit, overheating"] },
          { k: "Controls", v: ["On / Off switch, main level, high shelf knob"] },
          { k: "Indicators", v: ["On, signal, limit, protect"] },
          { k: "Line Input / Output", v: ["Input XLR / Router-output XLR"] },
          { k: "Power Input / Output", v: ["Neutrik PowerCon"] },
          { k: "Cabinet / Paint", v: ["12 mm plywood, black polyurea coating"] },
          { k: "Dimensions (W × H × D)", v: ["210 × 317 × 359 mm"] },
          { k: "Weight", v: ["8 kg"] },
        ],
      },
    ],
  },
  {
    slug: "m-line-accessory",
    line: "M-Line",
    model: "M-LINE 악세사리",
    kicker: "M-Line 전용 리깅·액세서리",
    en: "M-Line Accessories",
    badge: null,
    featured: false,
    tags: ["액세서리", "리깅"],
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/125",
    accessories: [
      { title: "M-F3A UB", desc: "The U-Bracket allows users to attach up to two M-F3A PRO units when pole mounted on any of our subwoofers via an M20 thread.", image: "/images/products/m-line-accessory/1-m-f3a-ub.png" },
      { title: "M-F3 SPS20", desc: "M20 Pole Support to pole mount an M-F3A or M-F3A PRO on any subwoofer.", image: "/images/products/m-line-accessory/2-m-f3-sps20.png" },
      { title: "M-F3A SFI S12", desc: "Stacking frame for ground stacking M-F3A PRO cabinets on either S12 PRO, SUB 112BR or SUB 210BP subwoofers, also available in white.", image: "/images/products/m-line-accessory/3-m-f3a-sfi-s12.png" },
      { title: "M-F3A BF", desc: "Bumper frame for flying up to 16 M-F3A or M-F3A PRO, also available in white", image: "/images/products/m-line-accessory/4-m-f3a-bf.png" },
      { title: "M-F3 FS FB", desc: "Multi Purpose Rigging Frame for rigging of different combinations of M-F3A and M-F3A FS, also available in white.", image: "/images/products/m-line-accessory/5-m-f3-fs-fb.png" },
      { title: "M-F3A 34", desc: "3 to 4 point adapter for rigging M-F3A FS and M-F3A (or M-F3A PRO), also available in white.", image: "/images/products/m-line-accessory/6-m-f3a-34.png" },
      { title: "M-F3 S12 PRO FC", desc: "Flight Case for four M-F3A or M-F3A PRO.", image: "/images/products/m-line-accessory/7-m-f3-s12-pro-fc.png" },
    ],
  },
  {
    slug: "s15-pro",
    line: "M-Line",
    model: "S15 PRO",
    kicker: "15인치 액티브 서브우퍼",
    en: "Bassreflex",
    badge: null,
    featured: true,
    tags: ["강당", "공연장", "서브우퍼"],
    keySpecs: [
      { l: "Max SPL (@1m)", v: "136 dB" },
      { l: "Weight", v: "32 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/S15PRO",
    tagline: {
      headline: "A louder and reliable ground support for the M-Line",
    },
    intro: {
      title: "A Louder and Reliable Ground Support for the M-Line",
      sections: [
        {
          body: 'The S15 PRO is a compact active subwoofer designed especially for the M-Line systems. It is composed by a single 15" driver in a bassreflex configuration, powered by an 800 W Class-D amplifier. Its efficient design and compact size guarantees flexible placement in all kinds of environments. In addition, a two-point SE rigging system allows for safe and easy stacking. The unit contains a newly designed 800 W Class-D power amplifier and is equipped with 24-bit/48 kHz DSP. By using the LCD screen and rotary encoder, users can control various system parameters such as delay, EQ, filters and more.',
        },
      ],
    },
    features: [
      {
        title: "Built-in power amplifier & DSP",
        body: "Each S15 PRO subwoofer is equipped with an 800W class-D power amplifier with switching-mode power supply for minimum weight and maximum flexibility anywhere in the world. Additionally to that our 24bit/48kHz DSP processor provides signal filtering and ensures maximum driver protection.",
        images: [{ src: "/images/products/s12-pro/feat-amp-dsp.png" }],
      },
      {
        title: "DSP Presets",
        body: "Integrated presets help to quickly load different system setups to be used with various M-F3A and M-F3A Pro configurations. Setting up an end-fire or cardioid setup e.g. can be done by choosing dedicated factory presets.",
        images: [{ src: "/images/products/s12-pro/feat-dsp-presets.png" }],
      },
      {
        title: "Integrated Rigging",
        body: "S15 PRO subwoofers are equipped with two-point SE stacking system that compromises 2 pieces of slide & lock mechanisms to connect two stacked subwoofers to each other. The same system is used to connect optional M-F3A SF stacking frame.",
        images: [{ src: "/images/products/s12-pro/feat-rigging.jpg" }],
      },
      {
        title: "Cardioid subwoofer setups",
        body: "Due to the intelligent stacking design, it is possible to operate our S15 subwoofers as a cardioid setup without any problems.",
        images: [{ src: "/images/products/s12-pro/feat-cardioid.png" }],
      },
      {
        title: "EASE® Ready",
        body: "AFMG® EASE® and EASE® Focus 3 GLL are available for the whole M-F3A PRO family. This allows users to simulate and calculate various parameters such as audience coverage, SPL, frequency response, splay angles, delay times and more.",
        images: [{ src: "/images/products/s12-pro/feat-ease.jpg" }],
      },
    ],
    specImage: "/images/products/s15-pro/spec.png",
    specColumns: ["S15 PRO / S15 PRO W"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["Bassreflex"] },
          { k: "Frequency Response (-6dB)", v: ["40 - 135 Hz"] },
          { k: "Amplification (Peak)", v: ["800 W"] },
          { k: "Amplifier Type", v: ["Class D, SMPS"] },
          { k: "Sensitivity (1W/1m)", v: ["98 dB"] },
          { k: "Max SPL (@1m) *", v: ["136 dB peak*"] },
          { k: "Dispersion (H x V)", v: ["Omnidirectional"] },
          { k: "Transducers", v: ["WF: 1 x 15” ferrite magnet and 3’’ voice coil"] },
          { k: "DSP", v: ["48 kHz, 24-bit DSP processor, processing latency: 1.1 ms"] },
          { k: "Signal Processing", v: ["Speaker presets, Dealy, EQ, HPF/LPF, Parametric EQ (Q, F, Gain), RMS Limiter, Peak Limiter, Phase Invert, Mute, Output Gain"] },
          { k: "Protection", v: ["Limiter, short-circuit, over-temperature, over-current"] },
          { k: "Controls", v: ["Digital encoder with push-button"] },
          { k: "Indicators", v: ["Power On, Signal In, Limit, Protect"] },
          { k: "Audio Connectors", v: ["XLR 3-pin female line-level input, XLR 3-pin male signal link"] },
          { k: "Power Connectors", v: ["Neutrik PowerCon® type A power input, type B power link (max: 15A, max 4 pcs per line)"] },
          { k: "Hardware", v: ["2x two-point SE stacking system, M20 distance pole thread"] },
          { k: "Power Requirements", v: ["100 - 120 VAC or 220 - 240 VAC"] },
          { k: "Cabinet", v: ["15 mm plywood, black or white polyurea coating"] },
          { k: "Dimensions (W x H x D)", v: ["586 x 460 x 520 mm"] },
          { k: "Weight", v: ["32 kg"] },
        ],
      },
    ],
    accessoryImageHeight: 270,
    accessories: [
      { title: "", desc: "", image: "/images/products/s15-pro/acc1.png" },
      { title: "", desc: "", image: "/images/products/s15-pro/acc2.png" },
      { title: "", desc: "", image: "/images/products/s15-pro/acc3.png" },
    ],
    sliderTitle: "PICTURE",
    slider: ["/images/products/s15-pro/picture.png"],
    downloadLinks: [
      { label: "M-Line Data Sheet" },
      { label: "M-Line Brochure", file: "/downloads/s15-pro/M-Line_Brochure.pdf" },
      { label: "M-Line Manual", file: "/downloads/s15-pro/M-Line_Manual.pdf" },
      { label: "S15 PRO 시방서", file: "/downloads/s15-pro/S15_PRO_Specification.hwp" },
      { label: "S15 PRO 도면", file: "/downloads/s15-pro/se_M-F3A_S15_PRO.dwg" },
    ],
  },
  {
    slug: "software",
    line: "L-Line",
    model: "software",
    kicker: "시스템 운용·제어 소프트웨어",
    en: "System Software",
    badge: null,
    featured: false,
    tags: ["소프트웨어", "DSP"],
    keySpecs: [],
    tagline: {
      headline: "SE Mission Control",
      sub: "The comfortable and advanced command centre",
    },
    // 원본 https://www.arumtech.co.kr/145 본문 문구 그대로
    intro: {
      title: "SE Mission Control",
      sections: [
        {
          body: "The SE Mission Control is your command center and puts you right in the spot of all your audio and system operation. From here you have full system access to control and monitor your SE sound solution – easy – just over a standard network. SE Mission Control is the ideal tool for all your installation and “on the road” applications.",
        },
        {
          body: "Set your system for tonal balance and a homogeneous level between all speakers and subwoofers. Adjust the sound reproduction parameters based on your project requirements and the performance venue. You can time-align individual channels and groups of speakers and subwoofers. With Mission Control you can constantly monitor signal and temperature levels of all SE System Engines. Initiate your setup procedure in no time, thanks to the comprehensive device presets. This is the best and fastest way to select speaker type, inputs and many more options. Presets are developed to set your system in kind of auto-mode, by supporting many application and setup scenarios. The system is prepared for line array elements and loudspeaker combinations such as 4x L 35, 4x L 65 or 2x B 18 and 2x SMX monitors – and many more.",
        },
        {
          body: "Experience the features of DSP and network capabilities and the new control software which is called SE Mission Control.",
        },
        {
          heading: "System requirements",
          body: "It is recommended to run Mission Control on computers running Windows 10 (or higher) or Mac OS 10.12 (or higher) with a minimum of 4 GB of RAM. The more RAM your computer is equipped with, the better performance you will experience. Ensure to have at least 200 MB free hard disk space available. It is highly recommended to use a dedicated network setup to remote control your SE AUDIOTECHNIK DSP amplifier(s).",
        },
      ],
    },
    // 독일 본사(se-audiotechnik.de) SE Mission Control 다운로드 3종.
    // 대용량 바이너리라 자사 저장소에 넣지 않고 본사 서버 파일로 직접 연결한다.
    downloadLinks: [
      {
        label: "macOS 소프트웨어",
        href: "https://se-audiotechnik.de/wp-content/uploads/2025/07/se_mission_control_-_1.2.1.dmg_.zip",
        meta: "ZIP · 80.8 MB · 2026.05 업데이트",
      },
      {
        label: "Windows 소프트웨어",
        href: "https://se-audiotechnik.de/wp-content/uploads/2025/07/se_mission_control_-_1.2.1_win_setup.exe_.zip",
        meta: "ZIP · 96.5 MB · 2026.05 업데이트",
      },
      {
        label: "릴리즈 노트",
        href: "https://se-audiotechnik.de/wp-content/uploads/2025/07/SE-MissionControl-v1.2-v1.2.1-ReleaseNotes-v202603.pdf",
        meta: "PDF · 393 KB · 2026.05 업데이트",
      },
    ],
    sourceUrl: "https://www.arumtech.co.kr/145",
  },
  {
    slug: "l-35",
    line: "L-Line",
    model: "L-35",
    kicker: "중형 라인어레이 엘리먼트",
    en: "Mid-format Line Array",
    badge: null,
    featured: false,
    tags: ["강당", "공연장", "라인어레이"],
    keySpecs: [
      { l: "Maximum Peak SPL", v: "129 dB" },
      { l: "Net weight", v: "3.6 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/138",
    tagline: {
      headline: "Overcome the limitations of space",
      sub: "With the L 35, line arrays can also be set up in low-ceilinged rooms.",
    },
    intro: {
      title: "Overcome the limitations of space",
      sections: [
        {
          body: "With the L 35, line arrays can also be set up in low-ceilinged rooms. Unobtrusive! And still sounds like a rocket launch. The L 35 is loud. Especially when its lightweight construction is taken into account: The 2-way speaker weighs an astounding 3.6 kg. Yet, the 2-way speaker is as small as the mission description in the flight manual. And all that with a weight of just 3.6 kg! At the same time, this system boasts an incredible 129 dB max. SPL. This is a respectable figure even for significantly bigger systems. L 35 means tangible savings: More space in the shuttle. Weightless assembly. Save time while rigging.",
        },
      ],
    },
    introVideoId: "rttirimgZR4",
    features: [
      {
        title: "Internal values",
        body: "Ultra-compact line array with a robust front panel made of die-cast aluminium. Two powerful 3.5-inch neodymium drivers. 1-inch compression driver. A solo device providing a 123 dB sound pressure – with excellent sound reproduction.",
      },
      {
        title: "Quick to assemble",
        body: 'Save valuable time! Despite its two 3.5" woofers, its 1" compression driver and the rig, the L 35 line array weighs only an astounding 3,6 kg. Being a small size and a flyweight will save space in transport and protect your back. Build quickly with fewer staff!',
      },
      {
        title: "Light-weight",
        body: "3,6 kg in total weight simply means that you will never again need to worry about the statics. That many L 35 s already grind on the floor before they would be too heavy for a rig.",
      },
      {
        title: "Sparkly and new for the outdoors",
        body: "The L 35 line array is available in black and white. The Outdoor versions are also protected with a grille. Thus, the speakers and housing are securely covered. If required, covers can be fitted for cable connections as well.",
      },
    ],
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3dB)*", v: ["110 Hz – 18 kHz"] },
          { k: "Frequency range (-10dB)*", v: ["95 Hz – 19 kHz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["100° x 20°"] },
          { k: "Nominal impedance", v: ["16 Ω"] },
          { k: "Sensitivity **", v: ["91 dB"] },
          { k: "Peak power", v: ["400 W"] },
          { k: "Continuous power ***", v: ["100 W"] },
          { k: "Maximum Peak SPL ****", v: ["129 dB"] },
          { k: "System type", v: ["2-way passive system"] },
          { k: "2-way passive system", v: ["2.2 kHz"] },
          { k: "Transducers", v: ["LF: 2 x 3.5″ drivers MHF: 1″ compression driver"] },
          { k: "Enclosure type", v: ["Vented box"] },
          { k: "Connectors", v: ["Input signal: 1 x Neutrik speakON® NL4 Link output: 1 x Neutrik speakON® NL4"] },
          { k: "Wiring", v: ["Input signal: switchable 1+/1- or 2+/2- Link output: 1+/1- and 2+/2-"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["131 x 312 x 234 mm"] },
          { k: "Net weight", v: ["3.6 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["225 x 415 x 311 mm"] },
          { k: "Total weight", v: ["4.7 kg"] },
          { k: "Cabinet", v: ["12 mm plywood with die-cast aluminium front"] },
          { k: "Cabinet finishing", v: ["Black or white polyurea coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Rigging", v: ["Three-point rigging system: two front and one rear 6 mm SE Audiotechnik® locking pins."] },
          { k: "Stacking", v: ["Two-point SE Audiotechnik® stacking system"] },
          { k: "Splay angles", v: ["0º, 2.5º, 5º, 7.5º, 10º"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Bumper frame", v: ["L35 BF / L35 BF W"] },
          { k: "U-bracket", v: ["U-bracket"] },
          { k: "Stacking frame for B15 subwoofer", v: ["B15 SFi L35"] },
          { k: "Stacking frame for B18 subwoofer", v: ["B18 SFi L35"] },
          { k: "Pole bar", v: ["SPS20"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Measured with IA 402D amplifier and 2L35 preset ** Whole space, 1W / 1m, on axis *** According to EIA-426B Standard (based on RMS Voltage) **** For 4 units measured with IA 402D amplifier and 4L35 preset + 12 dB Crest Factor",
    accessoryImageHeight: 240,
    accessories: [
      { title: "L 35 BF", desc: "", image: "/images/products/l-35/acc-bf.png" },
      { title: "L 35 UB", desc: "", image: "/images/products/l-35/acc-ub.png" },
      { title: "SPS 20", desc: "", image: "/images/products/l-35/acc-sps20.png" },
    ],
    slider: [
      "/images/products/l-35/slide1.png",
      "/images/products/l-35/slide2.png",
      "/images/products/l-35/slide3.png",
      "/images/products/l-35/slide4.png",
    ],
    downloadLinks: [
      { label: "L-Line Brochure", file: "/downloads/l-35/SE-AUDIOTECHNIK_L-Line_brochure_v2.7.pdf" },
      { label: "L-35 / IA402D Manual", file: "/downloads/l-35/L35_IA402D_ApplicationGuide_v210316_EN.pdf" },
      { label: "LA-804D Data Sheet", file: "/downloads/l-35/SE-LA804D-SpecSheet-v1.0p.pdf" },
      { label: "L-35 Data Sheet", file: "/downloads/l-35/L35-SpecSheet_1.pdf" },
      { label: "L-35 FS Data Sheet", file: "/downloads/l-35/L35FS-SpecSheet.pdf" },
      { label: "L-35 시방서", file: "/downloads/l-35/L-35_Specification.hwp" },
      { label: "L-65 시방서", file: "/downloads/l-35/L-65_Specification.hwp" },
      { label: "LA-804D 시방서", file: "/downloads/l-35/LA-804D_Specification.hwp" },
      { label: "L-35 도면", file: "/downloads/l-35/se_L_35_R.dwg" },
    ],
  },
  {
    slug: "l-35-fs",
    line: "L-Line",
    model: "L-35 FS",
    kicker: "L-35 플로어 시스템",
    en: "L-35 Floor System",
    badge: null,
    featured: false,
    tags: ["공연장", "라인어레이"],
    keySpecs: [
      { l: "Maximum Peak SPL", v: "124 dB" },
      { l: "Net weight", v: "9,4 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/139",
    tagline: {
      headline: "The smart bass extension for the L 35",
      sub: "Not on the ground, but immediately suspended along the array.",
    },
    intro: {
      title: "The smart bass extension for the L 35",
      sections: [
        {
          body: 'L 35 FS is the smart bass extension for the L 35 – not on the ground, but immediately suspended along the array. At only 8 kg, the ultra-compact Flysub weighs as little as a Champions League trophy. Its impact should however never be underestimated: This tiny unit generates 128 dB SPL for a glorious round, powerful sound. The standard housing features an 8" driver. Upwards of 47 Hz, you\'ll be sure to hear it. With its mini size, the L 35 FS is suitable for Light and Sound Rental companies, professional bands and fixed installations with high level requirements. For planning professionals, it is ideal if you need something to be loud in a small space, but where visual discretion is required.',
        },
      ],
    },
    features: [
      {
        title: "Space saving compact design",
        body: 'The L 35 Flysub is the most compact, flyable subwoofer. With its 8" woofer, it weighs only 8 kg. In terms of size, it resembles a small overnight bag. This makes it extremely transportable. A dozen subwoofers like this will fit easily into any small car!',
      },
      {
        title: "Outdoor version",
        body: "The L 35 FS subwoofer is available in black and white and as an outdoor version, just like the entire L-Line. Outdoor is equipped with a stable grille. Thus, the speakers and housing are securely covered and protected.",
      },
    ],
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3 dB) *", v: ["64 Hz – 110 H"] },
          { k: "Frequency range (-10 dB) **", v: ["57 Hz – 133 Hz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["Omnidirectional"] },
          { k: "Nominal impedance", v: ["16 Ω"] },
          { k: "Sensitivity", v: ["86 dB"] },
          { k: "Peak power", v: ["1200 W"] },
          { k: "Continuous power ***", v: ["300 W"] },
          { k: "Maximum Peak SPL ****", v: ["124 dB"] },
          { k: "System type", v: ["1-way passive system"] },
          { k: "Transducers", v: ["1 x 8″ driver"] },
          { k: "Enclosure type", v: ["Vented box"] },
          { k: "Connectors", v: ["Input signal: 1 x Neutrik speakON® NL4 Link output: 1 x Neutrik speakON® NL4"] },
          { k: "Wiring", v: ["Input signal: switchable 1+/1- or 2+/2- Link output: 1+/1- and 2+/2-"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["131 x 312 x 234 mm"] },
          { k: "Net weight", v: ["9,4 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["473 x 410 x 340 mm"] },
          { k: "Total weight", v: ["11 kg"] },
          { k: "Cabinet", v: ["12 mm plywood"] },
          { k: "Cabinet finishing", v: ["Black or white polyurea coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Rigging", v: ["Three-point rigging system: two front and one rear 6 mm SE Audiotechnik® locking pins."] },
          { k: "Stacking", v: ["Two-point SE Audiotechnik® stacking system"] },
          { k: "Splay angles", v: ["0º"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Bumper frame", v: ["L35 FS BF"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Measured with IA 402D amplifier and L35FS+SAT preset ** Whole space, 1W / 1m, on axis *** According to EIA-426B Standard (based on RMS Voltage) **** For 2 flysubs measured with IA 402D amplifier and L35FS+SAT preset + 12 dB Crest Factor",
    accessoryImageHeight: 240,
    accessories: [
      {
        title: "L 35 BF",
        desc: "The L 35 BF universal bumper frame can be used for hanging, ground stacking or together with a pole.",
        image: "/images/products/l-35-fs/acc-bf.png",
      },
    ],
    slider: [
      "/images/products/l-35-fs/slide1.png",
      "/images/products/l-35-fs/slide2.png",
      "/images/products/l-35-fs/slide3.png",
      "/images/products/l-35-fs/slide4.png",
    ],
    downloadLinks: [
      { label: "L-Line Brochure", file: "/downloads/l-35-fs/L-Line_Brochure.pdf" },
      { label: "L-Line Application Guide", file: "/downloads/l-35-fs/L35_IA402D_ApplicationGuide_v210316_EN.pdf" },
      { label: "L 35 FS dwg", file: "/downloads/l-35-fs/se_L_35FS_R.dwg" },
    ],
  },
  {
    slug: "l-65",
    line: "L-Line",
    model: "L-65",
    kicker: "대형 라인어레이 엘리먼트",
    en: "Large-format Line Array",
    badge: null,
    featured: true,
    tags: ["공연장", "컨벤션", "라인어레이"],
    keySpecs: [
      { l: "Maximum Peak SPL", v: "137 dB" },
      { l: "Net weight", v: "22.7 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/140",
    tagline: {
      headline: "Ground Control to Major Tom",
      sub: "With the L 65, you'll make a safe landing!",
    },
    intro: {
      title: "Ground Control to Major Tom",
      sections: [
        {
          body: "Ground Control to Major Tom: With the L 65, you'll make a safe landing! Our passive 3-way line array is a reliable all-rounder for light and sound rental companies, professional bands and fixed installations with high level requirements. With an SPL of 137 dB at a weight of less than 23 kg, the sound is galactic, without tearing black holes in the cash register.",
        },
        {
          body: "The rigging is easy – because of its simple suspension and low weight in relation to its performance. Thus you can dock anywhere quickly.",
        },
        {
          body: "For thunderous sound like that of a rocket engine, SE Audiotechnik uses a passive 3-way system in the L 65 with a value for money that is out of this world.",
        },
        {
          body: "The three drivers provide for an assertive, neutral sound through the entire frequency range – the ideal launch pad for exciting space manoeuvres. Thanks to the passive construction, up to three L 65 can be used on a 4Ω channel power amplifier. This is a massive saving on amplifiers!",
        },
        {
          body: "We developed the L 65 in Germany and manufacture them in our own factory. Therefore, all components are matched to one another precisely and deliver maximum sound pressure with minimal distortion.",
        },
        {
          body: "Since we do not outsource our production, we also retain full quality control. Therefore, our clients get more for less.",
        },
        {
          body: "With their tough outer skin, low weight and fast assembly and disassembly, the L 65 is the ideal tour companion. It is not cumbersome to transport and represents a wonderful starting point in the mix.",
        },
        {
          body: "Its homogeneous sound characteristics can perfectly combine with other elements of the L-Line. And treat yourself to the flying bass L 65 FS to round it off.",
        },
        {
          heading: "Max. configuration:",
          body: "1x LA 10.4D (4 ch mode) / 12x L 65 (3 pcs/ ch)",
        },
      ],
    },
    featuresTopImage: "/images/products/l-65/features-top.png",
    features: [
      {
        title: "Homogeneous directivity",
        body: "It continues beyond the horizon… The symmetrical layout generates a wonderfully homogeneous horizontal coverage!",
      },
      {
        title: "Passive crossovers",
        body: "The L 65 will save you from buying additional amplifiers: With the L 65's passive crossovers, fewer amplifier channels are required.",
      },
      {
        title: "3-way",
        body: "Optimised throughout the entire frequency range. Each driver is automatically assigned its frequency range without being overloaded.",
      },
      {
        title: "Easy to combine",
        body: "The L 65 can be easily combined with our series. It is half as tall as the L 65 FS and twice as tall as our compact L 35. This enables easy integration into existing systems.",
      },
    ],
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3 dB)", v: ["95 Hz – 17.5 kHz"] },
          { k: "Frequency range (-10 dB)", v: ["60 Hz – 18 kHz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["100° x 20°"] },
          { k: "Nominal impedance", v: ["16 Ω"] },
          { k: "Sensitivity *", v: ["98.6 dB"] },
          { k: "Peak power", v: ["1000 W"] },
          { k: "Continuous power **", v: ["250 W"] },
          { k: "Maximum Peak SPL ***", v: ["137 dB"] },
          { k: "System type", v: ["3-way passive system"] },
          { k: "2-way passive system", v: ["2.2 kHz"] },
          { k: "Crossover frequency", v: ["MF: 400 Hz HF: 1.8 kHz"] },
          { k: "Transducers", v: ["LF: 2 x 6.5″ woofers MF: 4 x 3.5″ drivers HF: 2 x 1″ compression drivers"] },
          { k: "Enclosure type", v: ["Vented box"] },
          { k: "Connectors", v: ["Input / Link signal: 2 Neutrik speakON® NL4"] },
          { k: "Wiring", v: ["Pins 1+/1- : drivers Pins 2+/2- : link signal, pins 1+/1-"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["237 x 766 x 383 mm"] },
          { k: "Net weight", v: ["22.7 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["363 x 810 x 480 mm"] },
          { k: "Total weight", v: ["25 kg"] },
          { k: "Cabinet", v: ["12 mm plywood"] },
          { k: "Cabinet finishing", v: ["Black or white polyurea coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Hardware", v: ["Two side handles in plywood embedded in cabinet Two rear heatsink panels"] },
          { k: "Rigging", v: ["Four-point rigging system: two front and two rear 8 mm SE Audiotechnik® locking pins"] },
          { k: "Splay angles", v: ["0º, 1º, 2º, 3º, 4º, 6º, 8º"] },
          { k: "Stacking", v: ["Two-point SE Audiotechnik® stacking system"] },
          { k: "Bumper frame", v: ["L65 BF / L65 BF W"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "L35 Under frame adapter", v: ["L65 UFB"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Whole space, 1W / 1m, on axis ** According to EIA-426B Standard (based on RMS Voltage) *** Max Peak SPL = Sensitivity + 10log10(Continuous Power) + 12 dB Crest Factor",
    accessoryImageHeight: 240,
    accessories: [
      { title: "L 65 BF", desc: "", image: "/images/products/l-65/acc-bf.png" },
      { title: "L 65 UFB", desc: "", image: "/images/products/l-65/acc-ufb.png" },
    ],
    slider: [
      "/images/products/l-65/slide1.png",
      "/images/products/l-65/slide2.png",
      "/images/products/l-65/slide3.png",
      "/images/products/l-65/slide4.png",
    ],
    downloadLinks: [
      { label: "L-Line Brochure", file: "/downloads/l-65/L-Line_Brochure.pdf" },
      { label: "L-Line Application Guide", file: "/downloads/l-65/L35_IA402D_ApplicationGuide_v210316_EN.pdf" },
      { label: "L라인 메뉴얼", file: "/downloads/l-65/L-Line_Manual.pdf" },
      { label: "L 65 dwg", file: "/downloads/l-65/se_L_65.dwg" },
    ],
  },
  {
    slug: "l-65-fs",
    line: "L-Line",
    model: "L-65 FS",
    kicker: "L-65 플로어 시스템",
    en: "L-65 Floor System",
    badge: null,
    featured: false,
    tags: ["공연장", "라인어레이"],
    keySpecs: [
      { l: "Maximum Peak SPL", v: "129 dB" },
      { l: "Net weight", v: "30 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/141",
    tagline: {
      headline: "The brilliant flysub for every mission",
      sub: "A slim flying subwoofer for the L 65 line array.",
    },
    intro: {
      title: "The brilliant flysub for every mission",
      sections: [
        {
          body: "When you have no room for floor subwoofers in front of the stage, and you need a wide dispersion, the L 65 FS is a brilliant solution. This slim flysub in the L 65 line array provides a massive boost in lofty highs and punchy and clear bass from 45 Hz upwards. This makes it suitable for light and sound rental companies, live events and fixed installations with high level requirements.",
        },
        {
          body: "The powerful 15\" driver with neodymium magnet provides a stable bass foundation – thus the L 65 FS remains pleasantly light. At only 30 kg, it is easy to transport and allows for an uncomplicated assembly. Even with a two-man outdoor team and extremely low load allowances for the rigging.",
        },
        {
          body: "Its compact shape, easy set-up thanks to the low weight and its sound pressure of 134 dB make the L 65 FS a reliable companion on tour. An uncomplicated 4-point rigging allows for a quick integration. Both in terms of the sound characteristics and the dimensions, it is ideal as a complement to L 65 array. Angles of up to 8° provide additional flexibility to align fly systems.",
        },
        {
          body: 'Thanks to its versatile mounting options and balanced sound characteristics, the L 65 FS is also a sophisticated and aesthetic solution for installations. With fixed installations, its compact size and minimal weight come to the fore – and it also sounds much "heavier" than it is!',
        },
        {
          body: "Furthermore, in theatres where seating is close to the stage, you will appreciate flying this lightweight, powerful bass. Wherever the journey takes you, this flysub is the brilliant solution for every mission.",
        },
      ],
    },
    featuresTopImage: "/images/products/l-65-fs/features-top.png",
    features: [
      {
        title: "Punch and dynamics",
        body: 'The powerful 15" neodymium speakers in the L 65 FS ensures punchy and dynamic sound from 45 Hz upwards.',
      },
      {
        title: "Mega Sound – Mini Weight",
        body: 'Despite its performance, the L 65 FS is an absolute lightweight. Thanks to the powerful 15" neodymium woofer, it weighs only 30 kg. On many missions, this will be a deciding factor.',
      },
      {
        title: "Perfect in terms of combinations",
        body: "The L 65 FS is twice as tall as the L 65 and four times as tall as our compact L 35. This allows you to easily integrate it into existing systems.",
      },
      {
        title: "Safely protected when outdoors",
        body: "The L 65 FS is available in black and white. In the outdoor version, a grille safely covers speakers and housing. Additionally you can install rear panels.",
      },
    ],
    specGroups: [
      {
        rows: [
          { k: "ACOUSTICAL", v: ["Model:L 65 FS"] },
          { k: "Frequency range (-3dB) *", v: ["60 – 200 Hz"] },
          { k: "Frequency range (-6dB) *", v: ["45 – 275 Hz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["Omnidirectional"] },
          { k: "Nominal impedance", v: ["8 Ω"] },
          { k: "Sensitivity **", v: ["92 dB"] },
          { k: "Peak power", v: ["2000 W"] },
          { k: "Continuous power ***", v: ["500 W"] },
          { k: "Maximum Peak SPL ****", v: ["129 dB"] },
          { k: "System type", v: ["1-way passive system"] },
          { k: "Transducers", v: ["1 x 15″ woofer (4″ voice coil)"] },
          { k: "Enclosure type", v: ["Vented box"] },
          { k: "Connectors", v: ["Input / Link signal: 2 Neutrik speakON® NL4"] },
          { k: "Wiring", v: ["Pins 1+/1- (both NL4): drivers Pins 2+/2- (both NL4): link signal"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["447 x 766 x 385 mm"] },
          { k: "Net weight", v: ["30 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["573 x 810 x 480 mm"] },
          { k: "Total weight", v: ["33 kg"] },
          { k: "Cabinet", v: ["12 mm plywood"] },
          { k: "Cabinet finishing", v: ["Black or white polyurea coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Hardware", v: ["Side handles in plywood embedded in cabinet"] },
          { k: "Rigging", v: ["Four-point rigging system: two front and two rear 8 mm SE Audiotechnik® locking pins."] },
          { k: "Splay angles", v: ["0º, 1º, 2º, 3º, 4º, 6º, 8º"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Bumper frame", v: ["L 65 BF"] },
          { k: "L35 Under frame adapter", v: ["L 65 UFB"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Measured with a 6th-order Butterworth low-pass filter applied at 130 Hz ** Whole space, 1W / 1m, on axis. Measured with Pink Noise from 50 Hz to 160 Hz *** According to EIA-426B Standard (based on RMS Voltage) **** Max Peak SPL = Max RMS SPL + 12 dB Crest Factor",
    accessoryImageHeight: 240,
    accessories: [
      { title: "L 65 BF", desc: "", image: "/images/products/l-65/acc-bf.png" },
      { title: "L 65 UFB", desc: "", image: "/images/products/l-65/acc-ufb.png" },
    ],
    slider: [
      "/images/products/l-65-fs/slide1.png",
      "/images/products/l-65-fs/slide2.png",
      "/images/products/l-65-fs/slide3.png",
      "/images/products/l-65-fs/slide4.png",
    ],
    downloadLinks: [
      { label: "L-Line Brochure", file: "/downloads/l-65-fs/L-Line_Brochure.pdf" },
      { label: "L-Line Application Guide", file: "/downloads/l-65-fs/L35_IA402D_ApplicationGuide_v210316_EN.pdf" },
      { label: "EU declaration of conformity", file: "/downloads/l-65-fs/EU_Declaration_of_Conformity.pdf" },
      { label: "L 65 FS dwg", file: "/downloads/l-65-fs/se_L_65_FS_R.dwg" },
    ],
  },
  {
    slug: "b-15",
    line: "B-Line",
    model: "B-15 / B-15A",
    kicker: "15인치 서브우퍼 (패시브/액티브)",
    en: 'Subwoofer 15" (Passive / Active)',
    badge: null,
    featured: false,
    tags: ["강당", "렌탈", "서브우퍼"],
    // B 15 / B 15A / B 15A FS 모두 같은 값이라 모델별로 나누지 않는다.
    keySpecs: [{ l: "Maximum Peak SPL", v: "136 dB" }],
    sourceUrl: "https://www.arumtech.co.kr/112",
    tagline: {
      headline: "Multipurpose | Low Distortion | Easy Handling",
      sub: "B-15 / B-15A / B-15A FS",
    },
    intro: {
      title: "Multipurpose | Low Distortion | Easy Handling",
      sections: [
        {
          body: "The B 15 comprises a single 15″ driver mounted in a vented box, with a sophisticated adaptive port that optimises the airflow and improves its response. This technology, developed through exhaustive research, enables a lower cut-off frequency while having smaller volume. This translates into deeper and dynamic bass from a compact enclosure. In addition to the speakON® connectors on the back, the subwoofer includes two additional located on the front. This guarantees wiring flexibility and ease of use, reducing setup time even in large configurations. Finally, the set of accessories specially designed for the B-Line, makes their setup and transportation easier, safer and more comfortable.",
        },
      ],
    },
    features: [
      {
        title: "Built-in Amplifier",
        body: "The great advantage of powered speakers is the built in amplifier. So there is no need for an external device – the internal amp is optimally matched to the woofer! In the B 15A and the B 15A FS, an 800 W (peak) Class-D amplifier is at work. Integrated DSP presets allow loading of preset system setups that are optimally matched to SE Audiotechnik products. Thus, the entire system is quickly and easily set up and perfectly adjusted. The directivity can be effortlessly changed in a flash from normal to cardioid or end-fire configuration via the large display and the push/rotary controller. Parameters such as EQ, Delay, Sensitivity and Phase can be adjusted and stored in your own User Presets.",
        images: [{ src: "/images/products/b-15/feat1.png" }],
      },
      {
        title: "Flying Subwoofer Configuration",
        body: "If there is no room for floor subwoofers in front of or under the stage, but low frequencies need to be reproduced cleanly and powerfully, then you have to fly the sub. That's why we've given the B 15A a flying harness, making the B 15A FS the most versatile model of the B-Line. Like the B 15A, it can be operated on the ground or in a stack, but can also be flown by means of a quick and easy-to-attach flying grid. From 34 Hz upwards, the flying subwoofer provides support from lofty heights with rich bass, if required. The B 15A FS delivers 133 dB max SPL and is impressively powered by an 800 W (peak) Class-D amp with a wide range of adjustment options.",
        images: [{ src: "/images/products/b-15/feat2.png" }],
      },
    ],
    productsSliderTitle: "Products of the 15'' - Series",
    productsSlider: [
      "/images/products/b-15/slide1.png",
      "/images/products/b-15/slide2.png",
      "/images/products/b-15/slide3.png",
      "/images/products/b-15/slide4.png",
    ],
    specImage: "/images/products/b-15/spec.png",
    specColumns: ["B 15", "B 15A", "B 15A FS"],
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3dB) *", v: ["39 Hz – 130 Hz","40 Hz – 220 Hz","42 Hz – 220 Hz"] },
          { k: "Frequency range (-6dB) *", v: ["33 Hz – 160 Hz","33 Hz – 260 Hz","33 Hz – 260 Hz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["Omnidirectional","Omnidirectional","Omnidirectional"] },
          { k: "Nominal impedance", v: ["8 Ω","8 Ω","8 Ω"] },
          { k: "Sensitivity **", v: ["92 dB","+14 dBu (3.88 V) +4 dBu (1.23 V) 0 dBu (0.775 V) 0 dBV (1 V) -10 dBV (0.316 V)","+14 dBu (3.88 V) +4 dBu (1.23 V) 0 dBu (0.775 V) 0 dBV (1 V) -10 dBV (0.316 V)"] },
          { k: "Peak power", v: ["1600 W","800 W","800 W"] },
          { k: "Continuous power ***", v: ["500 W","",""] },
          { k: "Maximum Peak SPL ****", v: ["136 dB","136 dB","136 dB"] },
          { k: "System type", v: ["1-way passive system","1-way self-powered system","1-way self-powered system"] },
          { k: "Transducers", v: ["1 x 15″ driver","1 x 15″ driver","1 x 15″ driver"] },
          { k: "Enclosure type", v: ["Vented box","Vented box","Vented box"] },
          { k: "Connectors", v: ["Input / Link signal: 4 Neutrik speakON® NL4 Link output: 1 Neutrik speakON® NL4","Input signal: balanced XLR 3-pin female Link output: balanced XLR 3-pin male Power input: powerCON® 20A Power link output: powerCON® 20A","Input signal: balanced XLR 3-pin female Link output: balanced XLR 3-pin male Power input: powerCON® 20A Power link output: powerCON® 20A"] },
          { k: "Wiring", v: ["Pins 1+/1- : driver Pins 2+/2- : link (Output CH 2, pins 1+/1-)","Pin N: Neutral Pin L: Conductor Pin E: Ground","Pin N: Neutral Pin L: Conductor Pin E: Ground"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["514 x 494 x 650 mm","520 x 495 x 654 mm","520 x 495 x 654 mm"] },
          { k: "Net weight", v: ["30 kg","37.1 kg","37.1 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["613 x 550 x 733 mm","613 x 550 x 733 mm","613 x 550 x 733 mm"] },
          { k: "Total weight", v: ["33.1 kg","37.1 kg","37.1 kg"] },
          { k: "Cabinet", v: ["15 – 18 mm plywood","15 – 18 mm plywood","15 – 18 mm plywood"] },
          { k: "Cabinet finishing", v: ["Black or white polyurea coating","Black or white polyurea coating","Black or white polyurea coating"] },
          { k: "Grille", v: ["Powder coated perforated steel","Powder coated perforated steel","Powder coated perforated steel"] },
          { k: "Hardware", v: ["– 4 rubber feet and top recesses for stacking – M20 pole thread – 2 SE Audiotechnik® ergonomic handles","– 4 rubber feet and top recesses for stacking – M20 pole thread – 2 SE Audiotechnik® ergonomic handles","– 4 rubber feet and top recesses for stacking – M20 pole thread – 2 SE Audiotechnik® ergonomic handles"] },
          { k: "Stacking", v: ["Two-point SE Audiotechnik® stacking system","Two-point SE Audiotechnik® stacking system","Four-point SE Audiotechnik® rigging system"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Stacking frame for M-F3A PRO", v: ["B15 SFi M","B15 SFi M","B15 SFi M"] },
          { k: "Stacking frame for L35", v: ["B15 SFi L35","B15 SFi L35","B15 SFi L35"] },
          { k: "Transport dolly", v: ["B15 TD","B15 TD","B15 TD"] },
          { k: "Transport cover", v: ["B15 TC","B15 TC","B15 TC"] },
          { k: "Amplifier rain cover", v: ["","P801DL RC","P801DL RC"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Measured with a 6th-order Butterworth low-pass filter applied at 130 Hz ** Half space, 1W / 1m, on axis **** Max Peak SPL = Sensitivity + 10log10(Continuous Power) + 12 dB Crest Factor",
    accessoriesImage: "/images/products/b-15/accessories.png",
    downloadLinks: [
      { label: "B-Line Data Sheet", file: "/downloads/b-15/B-Line_data-sheet.pdf" },
      { label: "B-Line Brochure", file: "/downloads/b-15/B_line_EN_WEB_V2.pdf" },
      { label: "B-15 시방서", file: "/downloads/b-15/B-15_Specification.hwp" },
      { label: "B-Line User Manual", file: "/downloads/b-15/B-Line_Manual_v210127_EN.pdf" },
      { label: "EU declaration of conformity", file: "/downloads/b-15/CE-Declaration-General-Passive-Loudspeakers.pdf" },
      { label: "EASE® GLL", file: "/downloads/b-15/se-B_15A-v1.00.gll" },
      { label: "B 15 dwg", file: "/downloads/b-15/se_B_15.dwg" },
      { label: "B 15 A dwg", file: "/downloads/b-15/se_B_15A.dwg" },
      { label: "B 15 A FS dwg", file: "/downloads/b-15/se_B_15A_FS.dwg" },
    ],
  },
  {
    slug: "b-18",
    line: "B-Line",
    model: "B-18 / B-18A",
    kicker: "18인치 서브우퍼 (패시브/액티브)",
    en: 'Subwoofer 18" (Passive / Active)',
    badge: null,
    featured: true,
    tags: ["공연장", "렌탈", "서브우퍼"],
    // B 18 / B 18A 모두 같은 값이라 모델별로 나누지 않는다.
    keySpecs: [{ l: "Maximum Peak SPL", v: "138 dB" }],
    sourceUrl: "https://www.arumtech.co.kr/B-18",
    tagline: {
      headline: "Here comes the Boom",
      sub: "B-18 / B-18A",
    },
    intro: {
      title: "Here comes the Boom",
      sections: [
        {
          body: "The B 18 comprises a single 18″ driver mounted in a vented box, with a sophisticated adaptive port that optimises the airflow and improves its response. This technology, developed through exhaustive research, enables a lower cut-off frequency while having smaller volume. This translates into deeper and dynamic bass from a compact enclosure. In addition to the speakON® connectors on the back, the subwoofer includes two additional located on the front. This guarantees wiring flexibility and ease of use, reducing setup time even in large configurations. Finally, the set of accessories specially designed for the B-Line, makes their setup and transportation easier, safer and more comfortable.",
        },
      ],
    },
    featuresTopImage: "/images/products/b-18/banner.png",
    features: [
      {
        title: "Built-in Amplifier",
        body: "The great advantage of powered speakers is the built in amplifier. So there is no need for an external device – the internal amp is optimally matched to the woofer! The B 18A is driven by a mighty 1,600 W (peak) Class-D amplifier. Integrated DSP presets allow loading of preset system setups that are optimally matched to SE Audiotechnik products. Thus, the entire system is quickly and easily set up and perfectly adjusted. The directivity can be effortlessly changed in a flash from normal to cardioid or end-fire configuration via the large display and the push/rotary controller. Parameters such as EQ, Delay, Sensitivity and Phase can be adjusted and stored in your own User Presets.",
        images: [{ src: "/images/products/b-18/feat-amp.png" }],
      },
    ],
    specColumns: ["B 18", "B 18A"],
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3dB) *", v: ["37 Hz – 130 Hz","34 Hz – 210 Hz"] },
          { k: "Frequency range (-6dB) *", v: ["29 Hz – 160 Hz","28 Hz – 260 Hz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["Omnidirectional","Omnidirectional"] },
          { k: "Nominal impedance", v: ["8 Ω","8 Ω"] },
          { k: "Sensitivity **", v: ["98 dB","0 dB"] },
          { k: "Peak power", v: ["2400 W","1600 W"] },
          { k: "Continuous power ***", v: ["600 W",""] },
          { k: "Maximum Peak SPL ****", v: ["138 dB","138 dB"] },
          { k: "System type", v: ["1-way passive system","1-way self-powered system"] },
          { k: "Transducers", v: ["1 x 18″ driver","1 x 18″ driver"] },
          { k: "Enclosure type", v: ["Vented box","Vented box"] },
          { k: "Connectors", v: ["Input / Link signal: 4 Neutrik speakON® NL4 Link output: 1 Neutrik speakON® NL4","Input signal: balanced XLR 3-pin female Link output: balanced XLR 3-pin male Power input: powerCON® 20A Power link output: powerCON® 20A"] },
          { k: "Wiring", v: ["Pins 1+/1- : driver Pins 2+/2- : link (Output CH 2, pins 1+/1-)","Pin N: Neutral Pin L: Conductor Pin E: Ground"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["572 x 542 x 797 mm","572 x 542 x 797 mm"] },
          { k: "Net weight", v: ["41 kg","45 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["721 x 615 x 885 mm","721 x 615 x 885 mm"] },
          { k: "Total weight", v: ["49.5 kg","53 kg"] },
          { k: "Cabinet", v: ["15 – 18 mm plywood","15 – 18 mm plywood"] },
          { k: "Cabinet finishing", v: ["Black or white polyurea coating","Black or white polyurea coating"] },
          { k: "Grille", v: ["Powder coated perforated steel","Powder coated perforated steel"] },
          { k: "Hardware", v: ["2 SE Audiotechnik® ergonomic handles 4 rubber feet and top recesses for stacking M20 pole thread","2 SE Audiotechnik® ergonomic handles 4 rubber feet and top recesses for stacking M20 pole thread"] },
          { k: "Stacking", v: ["Two-point SE Audiotechnik® stacking system","Two-point SE Audiotechnik® stacking system"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Stacking frame for M-F3A PRO", v: ["B18 SFi M","B18 SFi M"] },
          { k: "Stacking frame for L35", v: ["B18 SFi L35","B18 SFi L35"] },
          { k: "Pole bar", v: ["SPS20","SPS20"] },
          { k: "Transport dolly", v: ["B18 TD","B18 TD"] },
          { k: "Transport cover", v: ["B18 TC","B18 TC"] },
          { k: "Amplifier rain cover", v: ["","P801DL RC"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Measured with a 6th-order Butterworth low-pass filter applied at 130 Hz ** Half space, 1W / 1m, on axis *** According to EIA-426B Standard (based on RMS Voltage **** Max Peak SPL = Sensitivity + 10log10(Continuous Power) + 12 dB Crest Factor",
    accessoryImageHeight: 240,
    accessories: [
      { title: "B18 SFi M", desc: "", image: "/images/products/b-18/acc-sfi-m.png" },
      { title: "B18 SFi L35", desc: "", image: "/images/products/b-18/acc-sfi-l35.png" },
      { title: "SPS 20", desc: "", image: "/images/products/b-18/acc-sps20.png" },
      { title: "B18 TD", desc: "", image: "/images/products/b-18/acc-td.png" },
    ],
    downloadLinks: [
      { label: "B-Line Data Sheet", file: "/downloads/b-18/190409_SE-AUDIOTECHNIK_B-Line_data-sheet_PLS-Frankfurt_2019_CMYK.pdf" },
      { label: "B-Line Brochure", file: "/downloads/b-18/SE_B-Line_Folder_EN-2.pdf" },
      { label: "B-Line Manual", file: "/downloads/b-18/B-Line_Manual_v210127_EN.pdf" },
      { label: "B-18 시방서", file: "/downloads/b-18/B-18_Specification.hwp" },
      { label: "B-Line 시방서", file: "/downloads/b-18/B-21_Specification.hwp" },
      { label: "B 18 A dwg", file: "/downloads/b-18/se_B_18A.dwg" },
      { label: "B 18 SFi M", file: "/downloads/b-18/se_B_18_SFi_M.dwg" },
    ],
  },
  {
    slug: "b-18-wp",
    line: "B-Line",
    model: "B-18 WP",
    kicker: "18인치 IP55 방수 서브우퍼",
    en: "18\" Passive Weatherproof Subwoofer",
    badge: "출시예정",
    featured: false,
    tags: ["방수", "야외", "설치", "서브우퍼"],
    keySpecs: [
      { l: "Ingress Protection", v: "IP 55" },
      { l: "Maximum Peak SPL", v: "140 dB" },
      { l: "Net weight", v: "45 kg" },
    ],
    sourceUrl: "https://se-audiotechnik.de/produkt/b-18-wp-2/",
    tagline: { headline: "Built for the elements. Tuned for bass immersion.", sub: "B-18 WP" },
    intro: {
      title: "Built for the Elements",
      sections: [
        { body: "B 18 WP is a weatherised passive subwoofer engineered for permanent outdoor installations where reliable low-frequency quality and long-term protection are essential. Pairing marine-grade construction with an IP-rated design and installer-friendly mechanics, it delivers deep, controlled bass and integrates seamlessly with SE outdoor systems such as M3 MAX WP." },
      ],
    },
    features: [
      { title: "Outdoor-grade durability", body: "Marine-grade materials, robust coatings, and a multi-layer grille system safeguard performance in challenging weather conditions." },
      { title: "Deep bass with control", body: "A tuned vented design and hydrophobic driver treatment focus energy in the audience area while reducing unwanted artefacts." },
      { title: "Installer-friendly by design", body: "Weather-resistant connectivity, neat cable management, and flexible mounting options streamline permanent installs." },
    ],
    specColumns: ["B 18 WP"],
    specGroups: [
      {
        title: "ACOUSTICAL DATA",
        rows: [
          { k: "Type", v: ["18\" Passive Weatherproof Subwoofer"] },
          { k: "Frequency range (-3 dB) *", v: ["40 Hz – 130 Hz"] },
          { k: "Frequency range (-6 dB) *", v: ["33 Hz – 150 Hz"] },
          { k: "Frequency range (-10 dB) *", v: ["29 Hz – 160 Hz"] },
          { k: "Coverage angles (-6 dB) [H x V]", v: ["Omnidirectional"] },
          { k: "Nominal impedance", v: ["8 Ω"] },
          { k: "Sensitivity **", v: ["99 dB"] },
          { k: "Peak power", v: ["3200 W"] },
          { k: "Continuous power ***", v: ["800 W"] },
          { k: "Maximum Peak SPL ****", v: ["140 dB"] },
          { k: "System type", v: ["1-way passive system"] },
          { k: "Crossover frequency", v: ["-"] },
          { k: "Transducers", v: ["1 × 18\" driver (4\" voice coil)"] },
          { k: "Enclosure type", v: ["Vented box"] },
          { k: "Connectors", v: ["Input signal: PG11, wire diameter range: 5–10 mm"] },
          { k: "Wiring", v: ["PIN1: Positive Terminal (+), PIN2: Negative Terminal (−)"] },
        ],
      },
      {
        title: "MECHANICAL DATA",
        rows: [
          { k: "Product dimensions [H x W x D]", v: ["512 x 570 x 793 mm"] },
          { k: "Net weight", v: ["45 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["890 x 615 x 701 mm"] },
          { k: "Total weight", v: ["52.2 kg"] },
          { k: "Cabinet", v: ["15 mm birch board"] },
          { k: "Cabinet finishing", v: ["Black or white polyurea coating"] },
          { k: "Grille", v: ["Powder-coated perforated steel with acoustic waterproof and dust-proof fabric"] },
          { k: "Ingress protection", v: ["IP 55"] },
          { k: "Hardware", v: ["17 × M8 rigging points, 4 rubber feet on the bottom"] },
          { k: "Stacking", v: ["4 stacking grooves on the top"] },
          { k: "Splay angles", v: ["0°"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Flying frame", v: ["B 18 WP BF"] },
          { k: "Mounting / stacking kits", v: ["B 18 WP Mounting / Stacking Kits"] },
          { k: "Connection cable", v: ["Connection cable"] },
          { k: "Cable-gland seal", v: ["Silicone plug for sealing unused cable entries (Ø 10 mm, length 20 mm)"] },
        ],
      },
    ],
    specNote: "* Measured with a 6th-order Butterworth low-pass filter applied at 130 Hz   ** Half space, 1W / 1m, on axis   *** According to EIA-426B Standard (based on RMS Voltage)   **** Max Peak SPL = Sensitivity + 10log10(Continuous Power) + 12 dB Crest Factor",
    slider: ["/images/products/b-18-wp/main.webp", "/images/products/b-18-wp/left.webp", "/images/products/b-18-wp/rear.webp"],
    sliderTitle: "B-18 WP",
  },
  {
    slug: "ic-32",
    line: "Column",
    model: "IC 32",
    kicker: "컬럼 스피커",
    en: "Column Speaker",
    badge: null,
    featured: false,
    tags: ["관공서", "교회", "컬럼"],
    keySpecs: [
      { l: "Maximum Peak SPL", v: "123 dB" },
      { l: "Net weight", v: "2 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/148",
    tagline: {
      headline: "Intelligent installation",
      sub: "I-Line Column Speaker",
    },
    intro: {
      title: "Intelligent installation",
      sections: [
        {
          body: "The I-Line is designed for fixed installations with ambitious requirements regarding aesthetics, speech reproduction and music playback. The system comprises two different sized column speakers, an adjustable mounting bracket, a dedicated subwoofer and two system amplifiers. No matter if you want to fill a conference room, the sales area of a shop or a bar with sound – this lineup offers you freedom of choice to compose a setup which suits your needs best. All speakers are available in both black and white finishes.",
        },
      ],
    },
    features: [
      {
        title: "Easy Mounting",
        body: "I-Line column speakers are built to be used together with SE AUDIOTECHNIK SMB Smart Mounting Bracket. Together with this bracket a quick and intuitive speaker placement and aiming can be achieved in any installation. IC 32 is equipped with one mounting position on the center of the back panel that allows for both vertical and horizontal orientation.",
        images: [{ src: "/images/products/ic-32/feat1.jpg" }],
      },
      {
        title: "Die-cast Aluminum Body",
        body: "The cabinet of IC 32 is made from solid die-cast aluminum for maximum rigidity and to ensure that the speakers last for years to come. Aluminum also allowed us to create an elegant form and design that will easily fit in many environments. All I-Line speakers are available in black and white color.",
        images: [{ src: "/images/products/ic-32/feat2.png" }],
      },
      {
        title: "Connectivity",
        body: "All I-Line column speakers are equipped with Phoenix MSTB 4-pin input and link connectors for quick and easy connection. Additionally they all have built-in 2-way switch that allows users to select between two signal channels. Cost-saving, improved looks and faster installation times are the most significant benefits when used with 4-wire cables. Our IA 202D and IA 402D power amplifiers have dual-channel output to make installations easy and care-free.",
        images: [{ src: "/images/products/ic-32/feat3.jpg" }],
      },
    ],
    specImage: "/images/products/ic-32/spec.png",
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3 dB)", v: ["150 Hz – 17 kHz"] },
          { k: "Frequency range (-10 dB)", v: ["100 Hz – 20 kHz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["120° – 60°"] },
          { k: "Nominal impedance", v: ["16 Ω"] },
          { k: "Sensitivity *", v: ["91 dB"] },
          { k: "Peak power", v: ["400 W"] },
          { k: "Continuous power **", v: ["100 W"] },
          { k: "Connectors", v: ["Input / Link: Phoenix contact MSTB 4-pins"] },
          { k: "User controls", v: ["2-positions input selection switch"] },
          { k: "Wiring", v: ["Pins 1+/1- or 2+/2- (switchable)"] },
          { k: "Maximum Peak SPL *", v: ["123 dB"] },
          { k: "System type", v: ["1-way passive system"] },
          { k: "Transducers", v: ["2 x 3.5″ neodymium drivers"] },
          { k: "Enclosure type", v: ["Vented box"] },
          { k: "Connectors", v: ["Input / Link: Phoenix contact MSTB 4-pins"] },
          { k: "User controls", v: ["2-positions input selection switch"] },
          { k: "Wiring", v: ["Pins 1+/1- or 2+/2- (switchable)"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["247 x 116 x 150 mm"] },
          { k: "Net weight", v: ["2 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["405 x 268 x 375 mm"] },
          { k: "Total weight", v: ["6.35 kg"] },
          { k: "Cabinet", v: ["Die-Cast aluminium housing, plastic"] },
          { k: "Cabinet finishing", v: ["Black or white powder coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Mounting", v: ["Centered mounting point for SMB bracket Vertical and horizontal orientation Safety wire fixing point"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Smart Mounting Bracket", v: ["SMB"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Whole space, 1W / 1m, on axis. With dedicated IA 402D amplifier´s preset. ** According to EIA-426B Standard (based on RMS Voltage) *** Max Peak SPL = Sensitivity + 10log10(Continuous Power) + 12 dB Crest Factor",
    accessoryImageHeight: 240,
    accessoriesBeforeSpec: true,
    accessories: [
      {
        title: "SMB",
        desc: "The SMB – Smart Mounting Bracket – was developed for uncomplicated, time-saving installation and the greatest possible flexibility in alignment. With this bracket, the speakers can be installed quickly and easily almost anywhere and at an ideal angle. The SMB is included with every I-Line speaker. An SMB mounted column speaker can be adjusted on both axes by up to ± 90° in 10° steps. Maximum load-bearing capacity: 10 kg.",
        image: "/images/products/ic-32/acc-smb.png",
      },
    ],
    sliderTitle: "PICTURE",
    slider: [
      "/images/products/ic-32/related1.png",
      "/images/products/ic-32/related2.png",
      "/images/products/ic-32/related3.png",
      "/images/products/ic-32/related4.png",
    ],
    downloadLinks: [
      { label: "IC32 Data Sheet", file: "/downloads/ic-32/IC-32-SpecSheet.pdf" },
      { label: "IC34 Data Sheet", file: "/downloads/ic-32/IC-34-Spec.pdf" },
      { label: "IC38 Data Sheet", file: "/downloads/ic-32/IC-38X_Data_Sheet.pdf" },
      { label: "I-Line Brochure", file: "/downloads/ic-32/I-Line_Brochure.pdf" },
      { label: "I-Line Manual", file: "/downloads/ic-32/I-Line_Manual_v210330_EN.pdf" },
      { label: "IC32 시방서", file: "/downloads/ic-32/IC-32_Specification.hwp" },
      { label: "IC34 시방서", file: "/downloads/ic-32/IC-34_Specification.hwp" },
      { label: "IC32 dwg", file: "/downloads/ic-32/se_IC_32_20191106.dwg" },
      { label: "IC34 dwg", file: "/downloads/ic-32/se_IC_34_20191106.dwg" },
    ],
  },
  {
    slug: "ic-34",
    line: "Column",
    model: "IC34",
    kicker: "컬럼 스피커",
    en: "Column Speaker",
    badge: null,
    featured: false,
    tags: ["관공서", "교회", "컬럼"],
    keySpecs: [
      { l: "Maximum Peak SPL", v: "129 dB" },
      { l: "Net weight", v: "4 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/IC34",
    tagline: {
      headline: "Intelligent installation",
      sub: "I-Line Column Speaker",
    },
    intro: {
      title: "Intelligent installation",
      sections: [
        {
          body: "The I-Line is designed for fixed installations with ambitious requirements regarding aesthetics, speech reproduction and music playback. The system comprises two different sized column speakers, an adjustable mounting bracket, a dedicated subwoofer and two system amplifiers. No matter if you want to fill a conference room, the sales area of a shop or a bar with sound – this lineup offers you freedom of choice to compose a setup which suits your needs best. All speakers are available in both black and white finishes.",
        },
      ],
    },
    features: [
      {
        title: "Easy Mounting",
        body: "I-Line column speakers are built to be used together with SE AUDIOTECHNIK SMB Smart Mounting Bracket. Together with this bracket a quick and intuitive speaker placement and aiming can be achieved in any installation. IC 34 is equipped with one mounting position on the center of the back panel that allows for both vertical and horizontal orientation.",
        images: [{ src: "/images/products/ic-32/feat1.jpg" }],
      },
      {
        title: "Die-cast Aluminum Body",
        body: "The cabinet of IC 34 is made from solid die-cast aluminum for maximum rigidity and to ensure that the speakers last for years to come. Aluminum also allowed us to create an elegant form and design that will easily fit in many environments. All I-Line speakers are available in black and white color.",
        images: [{ src: "/images/products/ic-32/feat2.png" }],
      },
      {
        title: "Connectivity",
        body: "All I-Line column speakers are equipped with Phoenix MSTB 4-pin input and link connectors for quick and easy connection. Additionally they all have built-in 2-way switch that allows users to select between two signal channels. Cost-saving, improved looks and faster installation times are the most significant benefits when used with 4-wire cables. Our IA 202D and IA 402D power amplifiers have dual-channel output to make installations easy and care-free.",
        images: [{ src: "/images/products/ic-32/feat3.jpg" }],
      },
    ],
    specImage: "/images/products/ic-32/spec.png",
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3 dB)", v: ["150 Hz – 17 kHz"] },
          { k: "Frequency range (-10 dB)", v: ["100 Hz – 20 kHz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["120° – 40°"] },
          { k: "Nominal impedance", v: ["8 Ω"] },
          { k: "Sensitivity *", v: ["94 dB"] },
          { k: "Peak power", v: ["800 W"] },
          { k: "Continuous power **", v: ["200 W"] },
          { k: "Maximum Peak SPL ***", v: ["129 dB"] },
          { k: "System type", v: ["1-way passive system"] },
          { k: "Transducers", v: ["4 x 3.5″ neodymium drivers"] },
          { k: "Enclosure type", v: ["Vented box"] },
          { k: "Connectors", v: ["Input / Link: Phoenix contact MSTB 4-pins"] },
          { k: "User controls", v: ["2-positions input selection switch"] },
          { k: "Wiring", v: ["Pins 1+/1- or 2+/2- (switchable)"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["462 x 116 x 150 mm"] },
          { k: "Net weight", v: ["4 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["620 x 268 x 375 mm"] },
          { k: "Total weight", v: ["10.1 kg"] },
          { k: "Cabinet", v: ["Die-Cast aluminium housing, plastic"] },
          { k: "Cabinet finishing", v: ["Black or white powder coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Mounting", v: ["Centered mounting point for SMB bracket Vertical and horizontal orientation Safety wire fixing point"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Smart Mounting Bracket", v: ["SMB"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Whole space, 1W / 1m, on axis. With dedicated IA 402D amplifier´s preset. ** According to EIA-426B Standard (based on RMS Voltage) *** Max Peak SPL = Sensitivity + 10log10(Continuous Power) + 12 dB Crest Factor",
    sliderTitle: "PICTURE",
    slider: [
      "/images/products/ic-34/related1.png",
      "/images/products/ic-34/related2.png",
      "/images/products/ic-34/related3.png",
      "/images/products/ic-34/related4.png",
    ],
    downloadLinks: [
      { label: "IC32 Data Sheet", file: "/downloads/ic-34/IC-32-SpecSheet.pdf" },
      { label: "IC34 Data Sheet", file: "/downloads/ic-34/IC-34-Spec.pdf" },
      { label: "IC38 Data Sheet", file: "/downloads/ic-34/IC-38X_Data_Sheet.pdf" },
      { label: "I-Line Brochure", file: "/downloads/ic-34/I-Line_Brochure.pdf" },
      { label: "I-Line Manual", file: "/downloads/ic-34/I-Line_Manual_v210330_EN.pdf" },
      { label: "IC32 시방서", file: "/downloads/ic-34/IC-32_Specification.hwp" },
      { label: "IC34 시방서", file: "/downloads/ic-34/IC-34_Specification.hwp" },
      { label: "IC32 dwg", file: "/downloads/ic-34/se_IC_32_20191106.dwg" },
      { label: "IC34 dwg", file: "/downloads/ic-34/se_IC_34_20191106.dwg" },
    ],
  },
  {
    slug: "ic-38x",
    line: "Column",
    model: "IC 38X",
    kicker: "스티어러블 컬럼 스피커",
    en: "Steerable Column Array",
    badge: "NEW",
    featured: true,
    tags: ["관공서", "교회", "컬럼"],
    keySpecs: [
      { l: "Maximum Peak SPL", v: "134 dB" },
      { l: "Net weight", v: "8.3 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/149",
    tagline: {
      headline: "Intelligent installation",
      sub: "I-Line Steerable Column Array",
    },
    intro: {
      title: "Intelligent installation",
      sections: [
        {
          body: "The I-Line is designed for fixed installations with ambitious requirements regarding aesthetics, speech reproduction and music playback. The system comprises two different sized column speakers, an adjustable mounting bracket, a dedicated subwoofer and two system amplifiers. No matter if you want to fill a conference room, the sales area of a shop or a bar with sound – this lineup offers you freedom of choice to compose a setup which suits your needs best. All speakers are available in both black and white finishes.",
        },
      ],
    },
    features: [
      {
        title: "Easy Mounting",
        body: "I-Line column speakers are built to be used together with SE AUDIOTECHNIK SMB Smart Mounting Bracket. Together with this bracket a quick and intuitive speaker placement and aiming can be achieved in any installation. IC 38X is equipped with center and bottom mounting points for the SMBX bracket that allow for flexible and secure placement.",
        images: [{ src: "/images/products/ic-32/feat1.jpg" }],
      },
      {
        title: "Die-cast Aluminum Body",
        body: "The cabinet of IC 38X is made from solid die-cast aluminum for maximum rigidity and to ensure that the speakers last for years to come. Aluminum also allowed us to create an elegant form and design that will easily fit in many environments. All I-Line speakers are available in black and white color.",
        images: [{ src: "/images/products/ic-32/feat2.png" }],
      },
      {
        title: "Connectivity",
        body: "All I-Line column speakers are equipped with Phoenix MSTB 4-pin input and link connectors for quick and easy connection. Additionally they all have built-in 2-way switch that allows users to select between two signal channels. Cost-saving, improved looks and faster installation times are the most significant benefits when used with 4-wire cables. Our IA 202D and IA 402D power amplifiers have dual-channel output to make installations easy and care-free.",
        images: [{ src: "/images/products/ic-32/feat3.jpg" }],
      },
    ],
    specImage: "/images/products/ic-38x/spec.png",
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3 dB)", v: ["240 Hz – 18 kHz"] },
          { k: "Frequency range (-10 dB)", v: ["110 Hz – 20 kHz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["120° – 30°"] },
          { k: "Nominal impedance", v: ["4 Ω"] },
          { k: "Sensitivity *", v: ["96 dB"] },
          { k: "Peak power", v: ["1600 W"] },
          { k: "Continuous power **", v: ["400 W"] },
          { k: "Maximum Peak SPL ***", v: ["134 dB"] },
          { k: "System type", v: ["2-way passive system"] },
          { k: "Crossover frequency", v: ["3 kHz"] },
          { k: "Transducers", v: ["LMF: 8 x 3.5″ neodymium drivers (1″ voice coil) HF: 2 x 0.5″ exit compression drivers (1″ voice coil)"] },
          { k: "Enclosure type", v: ["Vented box"] },
          { k: "Connectors", v: ["Input / Link: Phoenix contact MSTB 4-pins"] },
          { k: "User controls", v: ["2-positions input selection switch"] },
          { k: "Wiring", v: ["Pins 1+/1- or 2+/2- (switchable)"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["820 x 118 x 155m"] },
          { k: "Net weight", v: ["8.3 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["975 x 233 x 255 mm"] },
          { k: "Total weight", v: ["9.75 kg"] },
          { k: "Cabinet", v: ["Die-Cast aluminium housing, plastic"] },
          { k: "Cabinet finishing", v: ["Black or white powder coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Mounting", v: ["Center and Bottom Mounting Points for SMBX Bracket Safety Wire Fixing Point"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Smart Mounting Bracket", v: ["SMB"] },
          { k: "Ceiling Mounting Bracket", v: ["IC38X CMB"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Whole space, 1W / 1m, on axis. With dedicated IA 402D amplifier´s preset. ** According to EIA-426B Standard (based on RMS Voltage) *** Max Peak SPL = Sensitivity + 10log10(Continuous Power) + 12 dB Crest Factor",
    accessoryImageHeight: 240,
    accessoriesBeforeSpec: true,
    accessories: [
      {
        title: "SMB",
        desc: "The SMB – Smart Mounting Bracket – was developed for uncomplicated, time-saving installation and the greatest possible flexibility in alignment. With this bracket, the speakers can be installed quickly and easily almost anywhere and at an ideal angle. The SMB is included with every I-Line speaker. An SMB mounted column speaker can be adjusted on both axes by up to ± 90° in 10° steps. Maximum load-bearing capacity: 10 kg.",
        image: "/images/products/ic-38x/acc-smb.png",
      },
    ],
    sliderTitle: "PICTURE",
    slider: ["/images/products/ic-38x/main.png", "/images/products/ic-38x/back.png"],
    downloadLinks: [
      { label: "IC32 Data Sheet", file: "/downloads/ic-38x/IC-32-SpecSheet.pdf" },
      { label: "IC34 Data Sheet", file: "/downloads/ic-38x/IC-34-Spec.pdf" },
      { label: "IC38 Data Sheet", file: "/downloads/ic-38x/IC-38X_Data_Sheet.pdf" },
      { label: "I-Line Brochure", file: "/downloads/ic-38x/I-Line_Brochure.pdf" },
      { label: "I-Line Manual", file: "/downloads/ic-38x/I-Line_Manual.pdf" },
      { label: "IC32 시방서", file: "/downloads/ic-38x/IC-32_Specification.hwp" },
      { label: "IC34 시방서", file: "/downloads/ic-38x/IC-34_Specification.hwp" },
      { label: "IC 38X dwg", file: "/downloads/ic-38x/se_IC_38X_20190708.dwg" },
    ],
  },
  {
    slug: "v-l8-vlps215b",
    line: "Full Range",
    group: "V-ARRAY",
    model: "V-L8 / V-LPS215B",
    badge: null,
    featured: false,
    tags: [],
    keySpecs: [
      { l: "Max. SPL (1M)", v: "136 dB" },
      { l: "Net Weight (V-L8)", v: "27.5 kg" },
      { l: "Net Weight (V-LPS215B)", v: "81.5 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/VL8-VLPS215B",
    tagline: {
      headline: "LINE ARRAY V-L8 / V-LPS215B",
    },
    intro: {
      title: "LINE ARRAY V-L8 / V-LPS215B",
      sections: [
        {
          body: 'The V-L8 is dual 8" vertical line source concert system with variable curvature, primarily designed for live performances from small to large indoor and outdoor venuse. The power handling is 650W RMS each top.',
        },
        {
          body: 'The V-LPS215B is a dual 15", bandpass subwoofer with 1200W RMS. Offering plenty of tight and punchy bass, the V-LPS215B blends beautifully with the V-L8 or V-L4 and form an excellent full range response with high SPL and clear sound.',
        },
      ],
    },
    specColumns: ["V-L8","V-LPS215B"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["Dual 8\" two way line array speaker","Dual 15\" bandpass subwoofer"] },
        ],
      },
      {
        title: "Acoustical Specifications",
        rows: [
          { k: "Frequency Range(-6dB)", v: ["70 - 19 kHz","34 Hz - 150 Hz"] },
          { k: "Max. SPL(1m)", v: ["136 dB","136 dB"] },
          { k: "Horizontal Dispersion(-6dB)", v: ["100°",""] },
          { k: "Vertical Dispersion(-6dB)", v: ["10°× 1, adjustable to 1°",""] },
          { k: "Max Qty of rigging (12 : 1 Safety Factor, using s)))e original accessories)", v: ["24 pcs",""] },
          { k: "Vertical Dispersion(-6dB)", v: ["LF: RMS / Peak (AES): 500 W / 2000 W HF: RMS / Peak (AES): 150 W / 600 W",""] },
        ],
      },
      {
        title: "Transducer",
        rows: [
          { k: "LF", v: ["LF: 2 x 8\", neodymium magnet, 2\" voice coil 1× 16 Ω (2 pcs of 8Ω in series connection) 2× 250 W RMS (AES / 2 hrs)","2× 15\", 4\" voice coil 1× 4 Ω (2 pcs of 8 Ω in parallel connection) 2× 600 W RMS (AES / 2 hrs)"] },
          { k: "Sensitivity(1W / 1M)", v: ["103 dB","99 dB"] },
          { k: "Max. SPL(AES)", v: ["136 dB","136 dB"] },
          { k: "HF", v: ["2× 1\", neodymium magnet, titanium diaphragm, 1.35\" voice coil 1× 16 Ω (2 pcs of 8 Ω in series connection) 2× 75 W RMS (AES / 2 hrs)",""] },
          { k: "Sensitivity(1W / 1M)", v: ["108 dB",""] },
          { k: "Max. SPL(AES)", v: ["136 dB",""] },
          { k: "Recommended Amplifier", v: ["4 pcs of V-L8 as a set",""] },
          { k: "LF", v: ["2× 1200 W / 8 Ω, Dual channel",""] },
          { k: "HF", v: ["2× 800 W / 8 Ω, Dual channel",""] },
        ],
      },
      {
        title: "Recommended Crossover Frequency",
        rows: [
          { k: "LF / HF", v: ["1.6 kHz",""] },
          { k: "Enclosure", v: ["18 mm birch plywood, polyurethane coating","18 mm birch plywood, polyurethane coating"] },
          { k: "Rigging System", v: ["6061 Aluminium, SUS 630 sainless steel safety pin, 12:1 safety factor","6061 Aluminium, SUS 630 sainless steel safety pin, 12:1 safety factor"] },
          { k: "Input Interface", v: ["Neutrik®Speakon 2×NL-4 pins+1/-1 LF pins+2/-2 HF","Neutrik®Speakon 2×NL-4 pins+1/-1 LF pins+2/-2 N.C."] },
          { k: "Dimensions (W×H×D)", v: ["740 x 247 x 467 mm","740 x 506 x 732 mm"] },
          { k: "Net Weight", v: ["27.5 kg","81.5 kg"] },
        ],
      },
    ],
    diagramGrid: [
      { image: "/images/products/v-l8-vlps215b/diagram-options.jpg", label: "V-L8 Operation Options" },
      { image: "/images/products/v-l8-vlps215b/diagram-dimensions.jpg", label: "V-L8 / V-LPS215B 치수" },
    ],
    sliderTitle: "PICTURE",
    slider: [
      "/images/products/v-l8-vlps215b/pic1.jpg",
      "/images/products/v-l8-vlps215b/pic2.jpg",
      "/images/products/v-l8-vlps215b/pic3.jpg",
      "/images/products/v-l8-vlps215b/pic4.jpg",
      "/images/products/v-l8-vlps215b/pic5.jpg",
      "/images/products/v-l8-vlps215b/pic6.jpg",
      "/images/products/v-l8-vlps215b/pic7.jpg",
    ],
    downloadLinks: [
      {
        label: "V-L8 / V-LPS215B Brochure",
        file: "/downloads/v-l8-vlps215b/V-L8_V-LPS215B.pdf",
      },
      { label: "V-L8 시방서", file: "/downloads/v-l8-vlps215b/V-L8_Specification.hwp" },
      { label: "V-LPS 215B 시방서", file: "/downloads/v-l8-vlps215b/V-LPS215B_Specification.hwp" },
      { label: "V-L8 dwg", file: "/downloads/v-l8-vlps215b/se_V-L8_.dwg" },
      { label: "V-LPS215B dwg", file: "/downloads/v-l8-vlps215b/se_V-LPS215_20181130.dwg" },
    ],
  },
  {
    slug: "v-8",
    line: "Full Range",
    group: "V-Line",
    model: "V-8",
    kicker: "8인치 풀레인지 포인트소스",
    en: "8'' Two way passive full range loudspeaker",
    badge: null,
    featured: false,
    tags: ["상업시설", "다목적", "풀레인지"],
    keySpecs: [
      { l: "MAX SPL (1M)", v: "125 dB" },
      { l: "Net Weight", v: "12 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/V8",
    tagline: {
      headline: "FULL RANGE V-8",
      sub: '8" Two Way Passive / Active Full Range Loudspeaker',
    },
    intro: {
      title: "FULL RANGE V-8",
      sections: [
        {
          body: 'The V-8 is a two way passive full range loudspeaker with 250W RMS. The series consists of 8", 10", 12" and 15" multi-purpose speakers for an excellent price/value relation. The uniquely designed cabinets are all made of multiplex and pained with the Polyurea coating which helps stand up to the tough daily demands of touring and live applications.',
        },
      ],
    },
    specImage: "/images/products/v-8/spec-graphs.jpeg",
    specColumns: ["V-8"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["8'' Two way passive full range loudspeaker"] },
          { k: "Frequency Range (-6dB)", v: ["70 Hz - 20 kHz"] },
          { k: "Power Output (RMS)", v: ["250 W / 1000 W"] },
          { k: "Sensitivity (1W / 1M)", v: ["95 dB"] },
          { k: "MAX SPL (1M)", v: ["125 dB"] },
          { k: "Impedance", v: ["8 Ω"] },
          { k: "Dispersion (H × V)", v: ["70° × 55°, HF-Horn rotable"] },
          { k: "LF Transducer", v: ["8'', Neodymium magnet, 2.5'' voice coil"] },
          { k: "HF Transducer", v: ["1'', Neodymium magnet, titianium diaphragm, 1.35'' voice coil"] },
          { k: "Protection", v: ["Tweeter protection"] },
          { k: "Input Interface", v: ["2× Neutrik NL-4 pins+1/-1 input/ THRU, pins+2/-2 N.C."] },
          { k: "Rigging System", v: ["10×M8 rigging points"] },
          { k: "Cabinet Material / Coating", v: ["15mm birch plywood / Polyurea coating"] },
          { k: "Dimensions(W × H × D)", v: ["286 × 460 × 266 mm"] },
          { k: "Net Weight", v: ["12 kg"] },
          { k: "Features", v: ["Ergonomic handles, Alu stand support (36 mm), M8 rigging points"] },
        ],
      },
    ],
    diagramGrid: [{ image: "/images/products/v-8/diagram.gif", label: "V-8 diagram" }],
    sliderTitle: "PICTURE",
    slider: [
      "/images/products/v-8/pic1.jpg",
      "/images/products/v-8/pic2.jpg",
      "/images/products/v-8/pic3.jpg",
    ],
    downloadLinks: [
      { label: "V-8 / V-8A brochure", file: "/downloads/V-8/SE_10_11_V8.pdf" },
      { label: "V-8 시방서", file: "/downloads/V-8/V-8_Specification.hwp" },
      { label: "V-8 dwg", file: "/downloads/V-8/se_V-8.dwg" },
    ],
  },
  {
    slug: "v-10",
    line: "Full Range",
    group: "V-Line",
    model: "V-10",
    kicker: "10인치 풀레인지 포인트소스",
    en: "10'' Two way passive full range loudspeaker",
    badge: null,
    featured: false,
    tags: ["상업시설", "다목적", "풀레인지"],
    keySpecs: [
      { l: "MAX SPL (1M)", v: "125 dB" },
      { l: "Net Weight", v: "16.3 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/V10",
    tagline: {
      headline: "FULL RANGE V-10",
      sub: '10" Two Way Passive / Active Full Range Loudspeaker (Not Available in Europe)',
    },
    intro: {
      title: "FULL RANGE V-10",
      sections: [
        {
          body: 'The V-10 is a two way full range loudspeaker with 350W RMS. The series consists of 8", 10", 12" and 15" multi-purpose speakers for an excellent price/value relation. The uniquely designed cabinets are all made of multiplex and pained with the Polyurea coating which helps stand up to the tough daily demands of touring and live applications.',
        },
      ],
    },
    specImage: "/images/products/v-10/spec-graphs.jpeg",
    specColumns: ["V-10"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["10'' Two way passive full range loudspeaker"] },
          { k: "Frequency Range (-6dB)", v: ["65 Hz - 19 kHz"] },
          { k: "Power Output (RMS)", v: ["350 W / 1400 W"] },
          { k: "Sensitivity (1W / 1M)", v: ["97 dB"] },
          { k: "MAX SPL (1M)", v: ["125 dB"] },
          { k: "Impedance", v: ["8 Ω"] },
          { k: "Dispersion (H × V)", v: ["70° × 55°, HF-Horn rotable"] },
          { k: "LF Transducer", v: ["10'' Neodymium magnet, 3'' voice coil"] },
          { k: "HF Transducer", v: ["1'' Neodymium magnet, Titianium diaphragm, 1.35'' voice coil"] },
          { k: "Crossover Frequency", v: ["1.9 kHz"] },
          { k: "Protection", v: ["Tweeter protection"] },
          { k: "Input Interface", v: ["2× Neutrik NL-4 pins+1/-1 input/ THRU, pins+2/-2 N.C."] },
          { k: "Rigging System", v: ["10×M8 rigging points"] },
          { k: "Cabinet Material / Coating", v: ["15mm birch plywood / Polyurea paint"] },
          { k: "Dimensions(W × H × D)", v: ["340x 535 x 322 mm"] },
          { k: "Net Weight", v: ["16.3 kg"] },
          { k: "Features", v: ["Ergonomic handles,Stand support adjustable vertically(SM707), M8 rigging points"] },
        ],
      },
    ],
    diagramGrid: [
      { image: "/images/products/v-10/diagram-dimensions.gif", label: "V-10 치수" },
      { image: "/images/products/v-10/diagram-options.gif", label: "V-LINE Operation Options" },
    ],
    sliderTitle: "PICTURE",
    slider: ["/images/products/v-10/pic1.jpg", "/images/products/v-10/pic2.jpg"],
    downloadLinks: [
      { label: "V-10 / V-10A brochure", file: "/downloads/V-10/SE_12_13_V10.pdf" },
      { label: "V-10 시방서", file: "/downloads/V-10/V-10_Specification.hwp" },
      { label: "V-10 dwg", file: "/downloads/V-10/se_V-10.dwg" },
    ],
  },
  {
    slug: "v-12",
    line: "Full Range",
    group: "V-Line",
    model: "V-12",
    kicker: "12인치 풀레인지 포인트소스",
    en: "12'' Two way passive full range loudspeaker",
    badge: null,
    featured: false,
    tags: ["컨벤션", "다목적", "풀레인지"],
    keySpecs: [
      { l: "MAX SPL (1M)", v: "132 dB" },
      { l: "Net Weight", v: "22.5 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/V12",
    tagline: {
      headline: "FULL RANGE V-12",
      sub: '12" Two Way Passive / Active Full Range Loudspeaker (Not Available in Europe)',
    },
    intro: {
      title: "FULL RANGE V-12",
      sections: [
        {
          body: 'The V-12 is a two way full range loudspeaker with 500W RMS. The series consists of 8", 10", 12" and 15" multi-purpose speakers for an excellent price/value relation. The uniquely designed cabinets are all made of multiplex and painted with the Polyurea coating which helps stand up to the tough daily demands of touring and live applications.',
        },
      ],
    },
    specImage: "/images/products/v-12/spec-graphs.jpeg",
    specColumns: ["V-12"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["12'' Two way passive full range loudspeaker"] },
          { k: "Frequency Range (-6dB)", v: ["55 Hz - 19 kHz"] },
          { k: "Power Output (RMS)", v: ["500 W / 2000 W"] },
          { k: "Sensitivity (1W / 1M)", v: ["99 dB"] },
          { k: "MAX SPL (1M)", v: ["132 dB"] },
          { k: "Impedance", v: ["8 Ω"] },
          { k: "Dispersion (H × V)", v: ["70° × 55°, HF-Horn rotable"] },
          { k: "LF Transducer", v: ["12'' Neodymium magnet, 3'' voice coil"] },
          { k: "HF Transducer", v: ["1.4'' Neodymium magnet, PEN diaphragm, 1.75'' voice coil"] },
          { k: "Crossover Frequency", v: ["1.7 kHz"] },
          { k: "Protection", v: ["Tweeter protection"] },
          { k: "Input Interface", v: ["2× Neutrik NL-4 pins+1/-1 input/ THRU, pins+2/-2 N.C."] },
          { k: "Rigging System", v: ["6×M8 rigging points"] },
          { k: "Cabinet Material / Coating", v: ["15mm birch plywood / Polyurea paint"] },
          { k: "Dimensions(W × H × D)", v: ["390 x 620x 368 mm"] },
          { k: "Net Weight", v: ["22.5 kg"] },
          { k: "Features", v: ["Ergonomic handles, Stand support adjustablevertically(SM707), M8 rigging points"] },
        ],
      },
    ],
    diagramGrid: [
      { image: "/images/products/v-12/diagram-dimensions.gif", label: "V-12" },
      { image: "/images/products/v-12/diagram-options.gif", label: "V-Line Operation Options" },
    ],
    sliderTitle: "PICTURE",
    slider: [
      "/images/products/v-12/pic1.jpg",
      "/images/products/v-12/pic2.jpg",
      "/images/products/v-12/pic3.jpg",
      "/images/products/v-12/pic4.jpg",
      "/images/products/v-12/pic5.jpg",
      "/images/products/v-12/pic6.jpg",
    ],
    downloadLinks: [
      { label: "V-12 / V-12A brochure", file: "/downloads/V-12/V12.pdf" },
      { label: "V-12 시방서", file: "/downloads/V-12/V-12_Specification.hwp" },
      { label: "V-12 dwg", file: "/downloads/V-12/se_V-12_.dwg" },
    ],
  },
  {
    slug: "v-15",
    line: "Full Range",
    group: "V-Line",
    model: "V-15",
    kicker: "15인치 풀레인지 포인트소스",
    en: "15'' Two way passive full range loudspeaker",
    badge: null,
    featured: false,
    tags: ["컨벤션", "공연장", "풀레인지"],
    keySpecs: [
      { l: "MAX SPL (1M)", v: "134 dB" },
      { l: "Net Weight", v: "31.5 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/99",
    tagline: {
      headline: "FULL RANGE V-15",
      sub: '15" Two Way Passive / Active Full Range Loudspeaker (Not Available in Europe)',
    },
    intro: {
      title: "FULL RANGE V-15",
      sections: [
        {
          body: 'The V-15 is a two way full range loudspeaker with 650W RMS. The series consists of 8", 10", 12" and 15" multi-purpose speakers for an excellent price/value relation. The uniquely designed cabinets are all made of multiplex and painted with the Polyurea coating which helps stand up to the tough daily demands of touring and live applications.',
        },
        {
          heading: "Application",
          body: "· Band performance, pub, concert hall, church\n· Theater, multifunctional hall",
        },
      ],
    },
    specImage: "/images/products/v-15/spec-graphs.jpeg",
    specColumns: ["V-15"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["15'' Two way passive full range loudspeaker"] },
          { k: "Frequency Range (-6dB)", v: ["50 Hz - 20 kHz"] },
          { k: "Power Output (RMS)", v: ["650 W / 2600 W"] },
          { k: "Sensitivity (1W / 1M)", v: ["100 dB"] },
          { k: "MAX SPL (1M)", v: ["134 dB"] },
          { k: "Impedance", v: ["8 Ω"] },
          { k: "Dispersion (H × V)", v: ["70° × 55°, HF-Horn rotable"] },
          { k: "LF Transducer", v: ["15'' Neodymium magnet, 4'' voice coil"] },
          { k: "HF Transducer", v: ["1.4'' BMS 4554, 1.75'' voice coil"] },
          { k: "Crossover Frequency", v: ["1.6 kHz"] },
          { k: "Protection", v: ["Tweeter protection"] },
          { k: "Input Interface", v: ["2× Neutrik NL-4 pins+1/-1 input/ THRU, pins+2/-2 N.C."] },
          { k: "Rigging System", v: ["6×M8 rigging points"] },
          { k: "Cabinet Material / Coating", v: ["15mm birch plywood / Polyurea paint"] },
          { k: "Dimensions(W × H × D)", v: ["450 × 716 × 448 mm"] },
          { k: "Net Weight", v: ["31.5 kg"] },
          { k: "Features", v: ["Ergonomic handles, Stand support adjustablevertically(SM707), M8 rigging points"] },
        ],
      },
    ],
    diagramGrid: [{ image: "/images/products/v-15/diagram.png", label: "V-15" }],
    sliderTitle: "PICTURE",
    slider: [
      "/images/products/v-15/pic1.jpg",
      "/images/products/v-15/pic2.jpg",
      "/images/products/v-15/pic3.jpg",
      "/images/products/v-15/pic4.jpg",
      "/images/products/v-15/pic5.jpg",
      "/images/products/v-15/pic6.jpg",
    ],
    downloadLinks: [
      { label: "V-15 / V-15A brochure", file: "/downloads/V-15/V15.pdf" },
      { label: "V-15 시방서", file: "/downloads/V-15/V-15_Specification.hwp" },
      { label: "V-15 dwg", file: "/downloads/V-15/se_V-15.dwg" },
    ],
  },
  {
    slug: "v-118b-218b",
    line: "Full Range",
    group: "V-Line",
    model: "V-118B / V-218B",
    kicker: "18인치 서브우퍼 (1×/2×)",
    en: "18\" Bandpass Subwoofer",
    badge: null,
    featured: false,
    tags: ["공연장", "렌탈", "서브우퍼"],
    keySpecs: [
      { l: "MAX SPL (V-118B)", v: "135 dB" },
      { l: "MAX SPL (V-218B)", v: "136 dB" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/V118B-V218B",
    tagline: {
      headline: "FULL RANGE V-118B / V-218B",
    },
    intro: {
      title: "FULL RANGE V-118B / V-218B",
      sections: [
        {
          heading: 'The V-118B is a 18" bandpass subwoofer with 800W RMS and 135 dB Max SPL.',
          body: "Engineered with CATAR technology (Clear audio time aligned responds) it provides an outstanding sound reproduction. Offering plenty of tight and punchy bass, the V-218B blends beautifully with the V-LINE or V-ARRAY and form an excellent full range response with high SPL and clear sound. The uniquely designed cabinets are all made of multiplex and coated with the Polyurea coating-which helps stand up to the tough daily demands of touring and live applications.",
        },
        {
          heading: 'The V-218B is a dual 18" bandpass subwoofer with 1600W RMS and 136dB Max SPL.',
          body: "Engineered with CATAR technology (Clear audio time aligned responds) it provides an outstanding sound reproduction. Offering plenty of tight and punchy bass, the V-218B blends beautifully with the V-LINE or V-ARRAY and form an excellent full range response with high SPL and clear sound. The uniquely designed cabinets are all made of multiplex and coated with the Polyurea coating-which helps stand up to the tough daily demands of touring and live applications.",
        },
      ],
    },
    specImage: [
      "/images/products/v-118b-218b/diagram-v118b.jpg",
      "/images/products/v-118b-218b/diagram-v218b.jpg",
    ],
    specColumns: ["V-118B","V-218B"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["18\" Bandpass Subwoofer","Dual 18\" Bass-Reflex Subwoofer"] },
          { k: "Frequency Range (-6dB)", v: ["36Hz-200Hz","38Hz-200Hz"] },
          { k: "Power Output (RMS)", v: ["800W/ 3200W","1600W/ 6400W"] },
          { k: "Sensitivity (1W / 1M)", v: ["100dB","98 dB"] },
          { k: "MAX SPL (1M)", v: ["135dB","136 dB"] },
          { k: "Impedance", v: ["8 Ω","4Ω"] },
          { k: "LF Transducer", v: ["18\" Ferrite magnet, 4\"voice coil","2 x18\" Ferrite magnet, 4\" voice coil"] },
          { k: "Input Interface", v: ["2x Neutrik NL-4 pins+1/-1 input/ THRU, pins+2/-2 N.C.","2x Neutrik NL-4 pins+1/-1 input/ THRU, pins+2/-2 N.C."] },
          { k: "Cabinet Material / Coating", v: ["18mm Birch Plywood / Polyurea Paint","18mm Birch Plywood / Polyurea Paint"] },
          { k: "Dimensions(W × H × D)", v: ["762 x 558 x 762mm","762 x 552 x 1067mm"] },
          { k: "Net Weight", v: ["66Kg","86Kg"] },
          { k: "Features", v: ["Ergonomic handles, Threaded flange(M20), Prepared for transport Wheels","Ergonomic handles, Prepared for transport Wheels"] },
        ],
      },
    ],
    sliderTitle: "PICTURE",
    slider: [
      "/images/products/v-118b-218b/pic1.jpg",
      "/images/products/v-118b-218b/pic2.jpg",
      "/images/products/v-118b-218b/pic3.jpg",
      "/images/products/v-118b-218b/pic4.jpg",
      "/images/products/v-118b-218b/pic5.jpg",
      "/images/products/v-118b-218b/pic6.jpg",
      "/images/products/v-118b-218b/pic7.jpg",
    ],
    downloadLinks: [
      {
        label: "V-118B / V-218B Brochure",
        file: "/downloads/v-118b-218b/V-118B_V-218B_data_sheet.pdf",
      },
      { label: "V-118B 시방서", file: "/downloads/v-118b-218b/V-118B_Specification.hwp" },
      { label: "V-218B 시방서", file: "/downloads/v-118b-218b/V-218B_Specification.hwp" },
      { label: "V-118B dwg", file: "/downloads/v-118b-218b/se_V-118B_.dwg" },
    ],
  },
  {
    slug: "cv-10i-12i-15i",
    line: "Full Range",
    group: "CV-Line",
    model: "CV-10i / 12i / 15i",
    en: "10\" Two way passive full range loudspeaker",
    badge: null,
    featured: false,
    tags: [],
    keySpecs: [
      { l: "MAX SPL (CV-10i)", v: "125 dB" },
      { l: "MAX SPL (CV-12i)", v: "129 dB" },
      { l: "MAX SPL (CV-15i)", v: "131 dB" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/CV10i-12i-15i",
    tagline: {
      headline: "FULL RANGE CV-10i / 12i / 15i",
      sub: '10" / 12" / 15" Two way full range passive loudspeaker',
    },
    intro: {
      title: "FULL RANGE CV-10i / 12i / 15i",
      sections: [
        {
          body: "The CV-10i is a two way full range loudspeaker with 250W RMS power handling.\nThe CV-12i is a two way full range loudspeaker with 375W RMS power handling.\nThe CV-15i is a two way full range loudspeaker with 450W RMS power handling.",
        },
        {
          body: "The 18pcs of M8 rigging points are equipped to help meet various requirements of fixed installation.",
        },
      ],
    },
    specColumns: ["CV-10i","CV-12i","CV-15i"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["10\" Two way passive full range loudspeaker","12\" Two way passive full range loudspeaker","15\" Two way passive full range loudspeaker"] },
          { k: "Frequency Response (-6 dB)", v: ["60 Hz - 19 kHz","55 Hz - 19 kHz","45 Hz - 19 kHz"] },
          { k: "Power Handling (RMS / Peak) (AES)", v: ["250 W / 1000 W","375 W / 1500 W","450 W / 1800 W"] },
          { k: "Sensitivity (1W / 1M)", v: ["95 dB","97 dB","98 dB"] },
          { k: "MAX SPL (1M)", v: ["125 dB","129 dB","131 dB"] },
          { k: "Impedance", v: ["8 Ω","8 Ω","8 Ω"] },
          { k: "Dispersion (H × V)", v: ["90° × 60°, HF-horn rotable","90° × 60°, HF-horn rotable","90° × 60°, HF-horn rotable"] },
          { k: "LF Transducer", v: ["10\" ferrite magnet, 2\" voice coil","12\" ferrite magnet, 3\" voice coil","15\" ferrite magnet, 3\" voice coil"] },
          { k: "HF Transducer", v: ["1\" ferrite PEN film compression unit, 1.75\"voice coil","1\" ferrite PEN film compression unit, 1.75\" voice coil","1\" ferrite magnet, 1.75\" voice coil"] },
          { k: "Crossover Frequency", v: ["1.9 kHz","1.7 kHz","1.6 kHz"] },
          { k: "Protection", v: ["Tweeter protection","Tweeter protection","Tweeter protection"] },
          { k: "Input Interface", v: ["2× Neutrik NL-4 pins+1/-1 input / THRU, pins+2/-2 N.C.","2× Neutrik NL-4 pins+1/-1 input / THRU, pins+2/-2 N.C.","2× Neutrik NL-4 pins+1/-1 input / THRU, pins+2/-2 N.C."] },
          { k: "Rigging System", v: ["18× M8 rigging point","18× M8 rigging point","18× M8 rigging point"] },
          { k: "Cabinet Material /Coating", v: ["15 mm selected plywood / Water borne texture coating","15 mm selected plywood / Water borne texture coating","15 mm selected plywood / Water borne texture coating"] },
          { k: "Dimensions (W × H × D)", v: ["332 × 535 × 332 mm","386 × 620 × 386 mm","446 × 716 × 446 mm"] },
          { k: "Net Weight", v: ["15.5 kg","22.5 kg","28.5 kg"] },
        ],
      },
    ],
    diagramGrid: [
      { image: "/images/products/cv-10i-12i-15i/diagram-10i.gif", label: "CV-10i Diagram" },
      { image: "/images/products/cv-10i-12i-15i/diagram-12i.gif", label: "CV-12i Diagram" },
      { image: "/images/products/cv-10i-12i-15i/diagram-15i.gif", label: "CV-15i Diagram" },
    ],
    sliderTitle: "PICTURE",
    slider: [
      "/images/products/cv-10i-12i-15i/pic1.jpg",
      "/images/products/cv-10i-12i-15i/pic2.jpg",
      "/images/products/cv-10i-12i-15i/pic3.jpg",
      "/images/products/cv-10i-12i-15i/pic4.jpg",
      "/images/products/cv-10i-12i-15i/pic5.jpg",
    ],
    downloadLinks: [
      { label: "CV-LINE Data Sheet", file: "/downloads/cv-10i-12i-15i/CV-10i_CV-12i_CV-15i.pdf" },
      { label: "CV-10 시방서", file: "/downloads/cv-10i-12i-15i/CV-10_Specification.hwp" },
      { label: "CV-12 시방서", file: "/downloads/cv-10i-12i-15i/CV-12_Specification.hwp" },
      { label: "CV-15 시방서", file: "/downloads/cv-10i-12i-15i/CV-15_Specification.hwp" },
      { label: "CV-10i dwg", file: "/downloads/cv-10i-12i-15i/se_CV-10i_.dwg" },
      { label: "CV-12i dwg", file: "/downloads/cv-10i-12i-15i/se_CV-12i_20181130.dwg" },
      { label: "CV-15i dwg", file: "/downloads/cv-10i-12i-15i/se_CV-15i_.dwg" },
    ],
  },
  {
    slug: "cv-212",
    line: "Full Range",
    group: "CV-Line",
    model: "CV-212",
    badge: null,
    featured: false,
    tags: [],
    keySpecs: [
      { l: "Maximum Peak SPL", v: "141 dB" },
      { l: "Net weight", v: "35 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/143",
    tagline: {
      headline: "FULL RANGE CV-212",
    },
    intro: {
      title: "FULL RANGE CV-212",
      sections: [
        {
          body: "The CV 212 is a powerful yet compact 2-way passive loudspeaker, designed to fulfill the most demanding requirements in a wide range of PA, monitoring and installation applications.",
        },
        {
          body: 'Two 12” woofers mounted in a fine-tuned vented housing, generate twice SPL levels over the lower frequencies, while keeping ample headroom for maximal performance. In addition, a 1.4" compression driver with horn covers the mid and high frequencies for defined reproduction across the entire audible frequency range. With a continuous power handling of 800 W, this speaker is capable of delivering high quality sound with a wide dynamic range up to a maximum sound pressure level of 135 dB.',
        },
        {
          body: "The CV 212 is equipped with a rotatable horn that allows the vertical and horizontal coverage to be swapped. The two speakON® NL4 connectors simplify cabling and signal distribution. In addition, the special housing design offers various set-up options and orientations. Handling and installation is as easy as it is safe thanks to the ergonomic handles, the 14 M10 flying points, the lower M20 pole thread and the special CV 212 UB U-bracket.",
        },
        {
          body: "From touring events to theaters and houses of worship, either as a floor, standing or suspended sound system, many venues and applications benefit from this exceptional loudspeaker. CV 212 can be expanded with SE subwoofers such as CV-118, CV-218, B 18 or B 21.",
        },
      ],
    },
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3 dB)*", v: ["100 Hz – 15 kHz"] },
          { k: "Frequency range (-10 dB)*", v: ["50 Hz – 16 kHz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["90° × 60°, HF-horn rotatable"] },
          { k: "Nominal impedance", v: ["4 Ω"] },
          { k: "Sensitivity*", v: ["100 dB"] },
          { k: "Peak power", v: ["3200 W"] },
          { k: "Continuous power**", v: ["800 W"] },
          { k: "Maximum Peak SPL***", v: ["141 dB"] },
          { k: "System type", v: ["2-way system"] },
          { k: "Crossover frequency", v: ["1.15 kHz"] },
          { k: "Transducers", v: ["Coaxial driver with: LF: 2 x 12″ driver (3″ voice coil) HF: 1.4″ compression driver (3″ voice coil)"] },
          { k: "Enclosure type", v: ["Vented box"] },
          { k: "Connectors", v: ["Input signal: Neutrik speakON ® NL4 Link output: Neutrik speakON ® NL4"] },
          { k: "Wiring", v: ["Pins 1+/1- : drivers Pins 2+/2- : link signal to pins 1+/1- of THRU output"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["1017 x 380 x 388 mm"] },
          { k: "Net weight", v: ["35 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["1123 x 480 x 485 mm"] },
          { k: "Total weight", v: ["38 kg"] },
          { k: "Cabinet", v: ["15 mm plywood"] },
          { k: "Cabinet finishing", v: ["Black polyurea coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Hardware", v: ["Two side plastic cup handles Four bottom rubber feet 14 x M10 threads for hanging: 3 on top, bottom and sides, and 2 on the rear."] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Pole bar", v: ["SPS20"] },
          { k: "U-bracket for truss hanging", v: ["CV 212 UB"] },
          { k: "Transport cover", v: ["SMX 12TC"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Half space, 1W / 1m, on axis ** According to EIA-426B Standard *** Max Peak SPL = Max. Cont. SPL (Cont. Power / 1m) + 12 dB Crest Factor",
    // 원본은 Related Products 가 사양표 뒤 · DOWNLOAD 앞에 온다 → 하단 슬라이더 자리를 쓴다.
    sliderTitle: "Related Products",
    slider: ["/images/products/cv-212/rel1.png", "/images/products/cv-212/rel2.png"],
    downloadLinks: [
      { label: "CV-212 Data Sheet", file: "/downloads/CV-212/SE-CV-Line-CV212-EDS-EN-v202205.pdf" },
      { label: "CV-212 메뉴얼", file: "/downloads/CV-212/SE-CV-Line-CV212-Manual-EN-v202107.pdf" },
    ],
  },
  {
    slug: "k-10i-12i-15i",
    line: "Full Range",
    group: "K-Line",
    model: "K-10i / 12i / 15i",
    en: "10\"Two Way Passive Full Range Loudspeaker",
    badge: null,
    featured: false,
    tags: [],
    keySpecs: [
      { l: "MAX SPL (K-10i)", v: "124 dB" },
      { l: "MAX SPL (K-12i)", v: "127 dB" },
      { l: "MAX SPL (K-15i)", v: "130 dB" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/K10i-12i-15i",
    tagline: {
      headline: "FULL RANGE K-10i / 12i / 15i",
    },
    intro: {
      title: "FULL RANGE K-10i / 12i / 15i",
      sections: [
        {
          body: 'With crystal clear sound penetration, K-series two way full range loudspeakers can be used for indoor sound reinforcement of KTVs, conference rooms or other venues of similar size. The 50 -100°×55° constant directional unsymmetric rotary compression horn enables both vertical and horizontal installations of the speaker boxes. Flat frequency response together with accurate crossover guarantees excellent sound effect. Blended with 15" active or 18" passive subwoofers, the two way full range loudspeakers are able to produce different styles of music perfectly.',
        },
      ],
    },
    specColumns: ["K-10i","K-12i","K-15i"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["10\"Two Way Passive Full Range Loudspeaker","12\"Two Way Passive Full Range Loudspeaker","15\"Two Way Passive Full Range Loudspeaker"] },
          { k: "Frequency Response (-6dB)", v: ["65 Hz-18 KHz","55 Hz-18 KHz","50 Hz-18 KHz"] },
          { k: "Power Handling (RMS/ Peak)(AES)", v: ["200 W / 800 W","350 W / 1400 W","400 W / 1600 W"] },
          { k: "Sensitivity (1W / 1M)", v: ["95 dB","96 dB","98 dB"] },
          { k: "MAX SPL (1M )", v: ["124 dB","127 dB","130 dB"] },
          { k: "Impedance", v: ["8Ω","8Ω","8Ω"] },
          { k: "Dispersion (H × V)", v: ["50°-100° × 55°, HF-Horn rotable","50°-100° × 55°, HF-Horn rotable","50°-100° × 55°, HF-Horn rotable"] },
          { k: "LF transducer", v: ["10\"Ferrite Magnet, 2\" Voice Coil","12\"Ferrite Magnet, 2.4\" Voice Coil","15\"Ferrite Magnet, 2.4\" Voice Coil"] },
          { k: "HF transducer", v: ["1 \"Ferrite polyester film comp -ression unit,1\" Voice Coil","1\"Ferrite polyester film comp -ression unit,1.75\" Voice Coil","1\"Ferrite polyester film comp -ression unit,1.75\" Voice Coil"] },
          { k: "Crossover Frequency", v: ["2.0 KHz","1.8 KHz","1.7 KHz"] },
          { k: "Protection", v: ["Tweeter Protection","Tweeter Protection","Tweeter Protection"] },
          { k: "Input Interface", v: ["2 NL-4 pins+1/-1 input/ THRU pins+2/-2 N.C.","2 NL-4 pins+1/-1 input/ THRU pins+2/-2 N.C.","2 NL-4 pins+1/-1 input/ THRU pins+2/-2 N.C."] },
          { k: "Rigging System", v: ["18 × M8 Rigging point","18 × M8 Rigging point","18 × M8 Rigging point"] },
          { k: "Cabinet Material / Paint", v: ["15 mm MDF PU Texture Paint","15 mm MDF PU Texture Paint","15 mm MDF PU Texture Paint"] },
          { k: "Dimensions (W × H × D)", v: ["322 × 500 × 308 mm","378 × 590 × 362 mm","434 × 672 × 416 mm"] },
          { k: "Net Weight", v: ["14 Kg","20.5 Kg","26.8 Kg"] },
        ],
      },
    ],
    diagramGrid: [
      { image: "/images/products/k-10i-12i-15i/diagram-10i.gif", label: "K-10i Diagram" },
      { image: "/images/products/k-10i-12i-15i/diagram-12i.gif", label: "K-12i Diagram" },
      { image: "/images/products/k-10i-12i-15i/diagram-15i.gif", label: "K-15i Diagram" },
    ],
    sliderTitle: "PICTURE",
    slider: ["/images/products/k-10i-12i-15i/pic1.jpg"],
    downloadLinks: [
      {
        label: "K-10i / K-12i / K-15i Brochure",
        file: "/downloads/k-10i-12i-15i/K-Line_Brochure.pdf",
      },
      { label: "K-10i 시방서", file: "/downloads/k-10i-12i-15i/K-10i_Specification.hwp" },
      { label: "K-12i 시방서", file: "/downloads/k-10i-12i-15i/K-12i_Specification.hwp" },
      { label: "K-15i 시방서", file: "/downloads/k-10i-12i-15i/K-15i_Specification.hwp" },
      { label: "K-10i dwg", file: "/downloads/k-10i-12i-15i/se_K-10i_20181130.dwg" },
      { label: "K-12i dwg", file: "/downloads/k-10i-12i-15i/se_K-12i_.dwg" },
      { label: "K-15i dwg", file: "/downloads/k-10i-12i-15i/se_K-15i_20181130.dwg" },
    ],
  },
  {
    slug: "k-18b",
    line: "Full Range",
    group: "K-Line",
    model: "K-18B",
    en: "18\" Bass-Reflex Subwoofer",
    badge: null,
    featured: false,
    tags: [],
    keySpecs: [
      { l: "MAX SPL(1M)", v: "135 dB" },
      { l: "Net Weight", v: "43.5Kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/K18B",
    tagline: {
      headline: "SUBWOOFER K-18B",
      sub: '18" Bass-Reflex Subwoofer',
    },
    intro: {
      title: "SUBWOOFER K-18B",
      sections: [
        {
          body: 'K-18B is a 18" bassreflex subwoofer with RMS 600W. It blends beautifully with K series and form an excellent full range response with high SPL and clear sound, which stands up to the tough daily demands of touring and live applications.',
        },
      ],
    },
    specColumns: ["K-18B"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["18\" Bass-Reflex Subwoofer"] },
          { k: "Frequency Response(-6dB)", v: ["40Hz-200Hz"] },
          { k: "Power Handling (RMS/ Peak)(（AES)", v: ["600W/2400W"] },
          { k: "Sensitivity (1W/ 1M)", v: ["101 dB"] },
          { k: "MAX SPL(1M)", v: ["135 dB"] },
          { k: "Impedance", v: ["8Ω"] },
          { k: "LF transducer", v: ["18\"Ferrite Magnet, 4\"Voice Coil"] },
          { k: "Input Interface", v: ["2 NL-4 pins+1/-1 input/ THRU pins+2/-2 N.C."] },
          { k: "Cabinet Material/ Paint", v: ["18 mm MDF / PU Texture Paint"] },
          { k: "Dimensions(W×H×D)", v: ["592 × 692 × 573 mm"] },
          { k: "Net Weight", v: ["43.5Kg"] },
        ],
      },
    ],
    diagramGrid: [{ image: "/images/products/k-18b/diagram.gif", label: "K-18B Diagram" }],
    sliderTitle: "PICTURE",
    slider: [
      "/images/products/k-18b/pic1.jpg",
      "/images/products/k-18b/pic2.jpg",
      "/images/products/k-18b/pic3.jpg",
      "/images/products/k-18b/pic4.jpg",
      "/images/products/k-18b/pic5.jpg",
      "/images/products/k-18b/pic6.jpg",
    ],
    downloadLinks: [
      { label: "K-18B Brochure", file: "/downloads/K-18B/SE_30_31_K-18B_M-12AB.pdf" },
      { label: "K-18B 시방서", file: "/downloads/K-18B/K-18B_Specification.hwp" },
      { label: "K-18B dwg", file: "/downloads/K-18B/se_K-18B_.dwg" },
    ],
  },
  {
    slug: "c-10",
    line: "Full Range",
    group: "C-Line",
    model: "C-10",
    en: "10\" Two way passive full range loudspeaker",
    badge: null,
    featured: false,
    tags: [],
    keySpecs: [
      { l: "MAX SPL (1M)", v: "125 dB" },
      { l: "Net Weight", v: "15.5 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/C10",
    tagline: {
      headline: "FULL RANGE C-10",
      sub: "Two way passive full range loudspeaker",
    },
    intro: {
      title: "FULL RANGE C-10",
      sections: [
        {
          heading: "Two way passive full range loudspeaker",
          body: "C-LINE engineering fixed-installations featured with high quality, wide dynamic range, high SPL and extended frequency response. It is reliable enough to be not only used for sound reinforcement of small-sized system, but also for zoned sound reinforcement of large-sized system. The uniquely designed cabinets are made of selected multiplex and coated with resistant water-soluble spot painting in black. Equipped with a complete set of fly ware, the series product can be perfectly applied to engineering fixed-installation. Additionally, the 90°×60° rotating horn realizes flexible switch in both horizontal and vertical direction, which helps meet the demands of multi-functional and sound reinforcement applications.",
        },
      ],
    },
    specColumns: ["C-10"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["10\" Two way passive full range loudspeaker"] },
          { k: "Frequency / Response (-6 dB)", v: ["60 Hz - 19 kHz"] },
          { k: "Power Handling (RMS / Peak) (AES)", v: ["250 W / 1000 W"] },
          { k: "Sensitivity (1W / 1M)", v: ["95 dB"] },
          { k: "MAX SPL (1M)", v: ["125 dB"] },
          { k: "Impedance", v: ["8 Ω"] },
          { k: "Dispersion (H × V)", v: ["90° × 60°, HF-horn rotable"] },
          { k: "LF Transducer", v: ["10\" ferrite magnet, 2.5\" voice coil"] },
          { k: "HF Transducer", v: ["1\" ferrite PEN film compression unit, 1.75\" voice coil"] },
          { k: "Protection", v: ["Tweeter protection"] },
          { k: "Input Interface", v: ["2× Neutrik NL-4 pins+1/-1 input / THRU, pins+2/-2 N.C."] },
          { k: "Rigging System", v: ["14× M8 rigging point, 1× 5 cargo tracks"] },
          { k: "Cabinet Material / Coating", v: ["15 mm selected plywood / Water borne texture coating"] },
          { k: "Dimensions (W × H × D)", v: ["332 × 542 × 344 mm"] },
          { k: "Net Weight", v: ["15.5 kg"] },
        ],
      },
    ],
    diagramGrid: [{ image: "/images/products/c-10/diagram.jpg", label: "C-10 Diagram" }],
    sliderTitle: "PICTURE",
    slider: ["/images/products/c-10/pic1.jpg"],
    downloadLinks: [
      { label: "C-10 Data Sheet", file: "/downloads/C-10/C-8_C-10_Catalogues.pdf" },
      { label: "C-10 시방서", file: "/downloads/C-10/C-10_Specification.hwp" },
      { label: "C-10 dwg", file: "/downloads/C-10/se_C-10.dwg" },
    ],
  },
  {
    slug: "c-12-c-15",
    line: "Full Range",
    group: "C-Line",
    model: "C-12 / C-15",
    en: "12\" Two way passive full range loudspeaker",
    badge: null,
    featured: false,
    tags: [],
    keySpecs: [
      { l: "MAX SPL (C-12)", v: "129 dB" },
      { l: "MAX SPL (C-15)", v: "131 dB" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/C12-C15",
    tagline: {
      headline: "FULL RANGE C-12 / C-15",
      sub: "Two way passive full range loudspeaker",
    },
    intro: {
      title: "FULL RANGE C-12 / C-15",
      sections: [
        {
          heading: "Two way passive full range loudspeaker",
          body: "C-LINE engineering fixed-installations featured with high quality, wide dynamic range, high SPL and extended frequency response. It is reliable enough to be not only used for sound reinforcement of small-sized system, but also for zoned sound reinforcement of large-sized system. The uniquely designed cabinets are made of selected multiplex and coated with resistant water-soluble spot painting in black. Equipped with a complete set of fly ware, the series product can be perfectly applied to engineering fixed-installation. Additionally, the 90°×60° rotating horn realizes flexible switch in both horizontal and vertical direction, which helps meet the demands of multi-functional and sound reinforcement applications.",
        },
      ],
    },
    specColumns: ["C-12","C-15"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["12\" Two way passive full range loudspeaker","15\" Two way passive full range loudspeaker"] },
          { k: "Frequency / Response (-6 dB)", v: ["55 Hz - 19 kHz","45 Hz - 19 kHz"] },
          { k: "Power Handling (RMS / Peak) (AES)", v: ["375 W / 1500 W","450 W / 1800 W"] },
          { k: "Sensitivity (1W / 1M)", v: ["97 dB","98 dB"] },
          { k: "MAX SPL (1M)", v: ["129 dB","131 dB"] },
          { k: "Impedance", v: ["8 Ω","8 Ω"] },
          { k: "Dispersion (H × V)", v: ["90° × 60°, HF-horn rotable","90° × 60°, HF-horn rotable"] },
          { k: "LF Transducer", v: ["12\" ferrite magnet, 3\" voice coil","15\" ferrite magnet, 3\" voice coil"] },
          { k: "HF Transducer", v: ["1\" ferrite PEN film compression unit, 1.75\" voice coil","1\" ferrite PEN film compression unit, 1.75\" voice coil"] },
          { k: "Protection", v: ["Tweeter protection","Tweeter protection"] },
          { k: "Input Interface", v: ["2× Neutrik NL-4 pins+1/-1 input / THRU, pins+2/-2 N.C.","2× Neutrik NL-4 pins+1/-1 input / THRU, pins+2/-2 N.C."] },
          { k: "Rigging System", v: ["12× M8 rigging point, 4× 3 cargo tracks","8× M8 rigging point, 4× 3 cargo tracks"] },
          { k: "Cabinet Material / Coating", v: ["15 mm selected plywood / Water borne texture coating","15 mm selected plywood / Water borne texture coating"] },
          { k: "Dimensions (W × H × D)", v: ["386 × 627 × 400 mm","446 × 723 × 456 mm"] },
          { k: "Net Weight", v: ["23 kg","28.5 kg"] },
        ],
      },
    ],
    diagramGrid: [
      { image: "/images/products/c-12-c-15/diagram-c12.jpg", label: "C-12 Diagram" },
      { image: "/images/products/c-12-c-15/diagram-c15.jpg", label: "C-15 Diagram" },
    ],
    sliderTitle: "PICTURE",
    slider: ["/images/products/c-12-c-15/pic1.jpg"],
    downloadLinks: [
      { label: "C-12 / C-15 Data Sheet", file: "/downloads/C-12C-15/C-12_C-15_Catalogues.pdf" },
      { label: "C-12 시방서", file: "/downloads/C-12C-15/C-12_Specification.hwp" },
      { label: "C-15 시방서", file: "/downloads/C-12C-15/C-15_Specification.hwp" },
      { label: "C-12 dwg", file: "/downloads/C-12C-15/se_C-12_.dwg" },
      { label: "C-15 dwg", file: "/downloads/C-12C-15/se_C-15_.dwg" },
    ],
  },
  {
    slug: "cox-8-cox-12",
    line: "Full Range",
    group: "COX-Line",
    model: "COX-8 mk2 / COX-12 mk2",
    badge: null,
    featured: false,
    tags: [],
    keySpecs: [
      { l: "Maximum Peak SPL", v: "132 dB" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/COX8-COX12",
    tagline: {
      headline: "FULL RANGE COX 8 MKII / COX 12 MKII",
    },
    intro: {
      title: "FULL RANGE COX 8 MKII / COX 12 MKII",
      sections: [
        {
          body: "Introducing COX 8 MKII – an 8”/1.75” coaxial loudspeaker system – a great solution for any sound application. Whether you are looking for a high-quality audio system for your installation projects or need a compact portable setup for mobile and monitoring applications, this loudspeaker has you covered.",
        },
        {
          body: "With its 8” woofer and 1.75” PEN compression driver in coaxial configuration with a co-magnetic design, this compact and versatile loudspeaker delivers a clear and coherent sound with an excellent sound localization and uniform sound dispersion. Thanks to its versatility, compact dimensions and unobtrusive appearance, the system is suitable for a wide range of applications.",
        },
        {
          body: "In terms of installation, COX 8 MKII is easy to set up and can be used as either a floor, standing, wall mounted or suspended sound system. The SE AUDIOTECHNIK IA amplifiers provide the necessary power for the unique, balanced COX 8 MKII sound. As a low bass extension, the SE subwoofers C6 SE, S12 PRO, S15 PRO, S112i PRO and B 15(A) are a great choice.",
        },
      ],
    },
    features: [
      {
        title: "Performance",
        body: "8” woofer (2” VC), 1.75” PEN compression driver, 2-way coaxial system | 250 W continuous power handling (1,000 W peak) | up to 132 dB SPL | 96 dB sensitivity (1W/1m) | 74 Hz – 20 kHz usable frequency range | only 7.8 kg",
      },
      {
        title: "Versatility",
        body: "Can be used on the floor, standing, suspended or wall mounted | Smart Mounting Bracket (SMB) option | M8/M5 flying points | expandable with SE subwoofer lines | matches perfect with SE IA installation power amplifiers | speakON® and 4-pin Phoenix connectors | audio signal pass through",
      },
      {
        title: "Reliability",
        body: "Wooden enclosure | polyurea coating | rugged front grille | multifunctional enclosure shape",
      },
      {
        title: "Application",
        body: "Suitable for installations, conference rooms, bars, stage monitoring, side and front fills, architectural sound and small mobile sound applications",
      },
    ],
    // 원본의 "Applications" 설치 방식 도해 (특징 블록 뒤 · 사양표 앞)
    featureImage: "/images/products/cox-8-cox-12/applications.png",
    specModelLabel: "Model: COX 8 MKII",
    specGroups: [
      {
        title: "ELECTRO-ACOUSTICAL",
        rows: [
          { k: "Frequency Response (-3 dB)*", v: ["102 Hz – 16 kHz"] },
          { k: "Frequency range (-10 dB)*", v: ["74 Hz – 20 kHz"] },
          { k: "Coverage angles (-6 dB) [H x V]**", v: ["114° x 100°"] },
          { k: "Mean Coverage angles (-6 dB) [H x V]***", v: ["122° x 116°"] },
          { k: "Nominal impedance", v: ["8 Ω"] },
          { k: "Sensitivity*", v: ["96 dB"] },
          { k: "Peak power", v: ["1000 W"] },
          { k: "Continuous power****", v: ["250 W"] },
          { k: "Maximum Peak SPL*****", v: ["132 dB"] },
          { k: "System type", v: ["2-way coaxial system"] },
          { k: "Crossover frequency", v: ["1.9 kHz"] },
          { k: "Transducers", v: ["Coaxial driver with: LF: 1 x 8″ driver (2″ voice coil) HF: 1x 1.75″ PEN compression driver"] },
          { k: "Enclosure type", v: ["Vented box"] },
          { k: "Connectors", v: ["Neutrik speakON® NL4 Phoenix 4-Pin Verbinder MSTB"] },
          { k: "Wiring", v: ["speakON® NL4: Pins 1+ / 1- : driver; Pins 2+ / 2- : N.C. Phoenix: Pins 1+ / 1- : driver; Pins 2+ / 2- : link"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["352 x 240 x 208 mm"] },
          { k: "Weight", v: ["7.8 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["460 x 342 x 310 mm"] },
          { k: "Total weight", v: ["9.1 kg"] },
          { k: "Cabinet", v: ["12 mm plywood"] },
          { k: "Cabinet finishing", v: ["Black polyurea coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Rigging", v: ["6x M8 rigging points: 1 on the top, 3 on the bottom, 1 on each side 6x M5 rigging points: 2 on the top, 2 on each side, 2 on the bottom 1x mounting point for SMB bracket on rear side"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "Wall Mounting Bracket", v: ["COX8 WB"] },
          { k: "Smart Mounting Bracket", v: ["SMB"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without notice. * Full space, 1W / 1m, on axis ** Coverage angles at 4 kHz *** Coverage angles mean value (800 Hz – 6 kHz) **** According to EIA-426B Standard (based on RMS Voltage) ***** Max Peak SPL = Sensitivity + 10log10(Continuous Power) + 12 dB Crest Factor",
    sliderTitle: "PICTURE",
    slider: [
      "/images/products/cox-8-cox-12/pic1.png",
      "/images/products/cox-8-cox-12/pic2.png",
      "/images/products/cox-8-cox-12/pic3.png",
      // 원본은 상단에 정면·후면을 나란히 보여준다. 후면은 히어로에 못 담아 여기에 둔다.
      "/images/products/cox-8-cox-12/rear.png",
    ],
    downloadLinks: [
      {
        label: "COX 8 MK2 Data Sheet",
        file: "/downloads/cox-8-cox-12/SE-COX-Line-COX8MKII-EDS-IT-v202403.pdf",
      },
      {
        label: "COX 12 MK2 Data Sheet",
        file: "/downloads/cox-8-cox-12/SE-COX-Line-COX12MKII-EDS-EN-v202403.pdf",
      },
      { label: "COX 12 MK2 Manual", file: "/downloads/cox-8-cox-12/cox-12_mk2.pdf" },
      { label: "COX-8 시방서", file: "/downloads/cox-8-cox-12/COX-8_Specification.hwp" },
      { label: "COX-12 시방서", file: "/downloads/cox-8-cox-12/COX-12_Specification.hwp" },
      { label: "COX-8 dwg", file: "/downloads/cox-8-cox-12/se_COX_8_MKII.dwg" },
      { label: "COX-12 dwg", file: "/downloads/cox-8-cox-12/se_COX_12_MKII.dwg" },
    ],
  },
  {
    slug: "cox-8-wp",
    line: "Full Range",
    group: "COX-Line",
    model: "COX 8 WP",
    kicker: "8인치 방수 동축 스피커",
    en: "8\" All-weather Coaxial Point Source",
    badge: "출시예정",
    featured: false,
    tags: ["방수", "야외", "동축", "설치"],
    keySpecs: [
      { l: "Ingress Protection", v: "IP 56" },
      { l: "Maximum Peak SPL", v: "130 dB" },
      { l: "Coverage [H x V]", v: "80° x 80°" },
    ],
    sourceUrl: "https://se-audiotechnik.de/produkt/cox-8-wp-2/",
    tagline: { headline: "Built for the elements. Tuned for clarity.", sub: "COX 8 WP" },
    intro: {
      title: "All-Weather Coaxial Sound",
      sections: [
        { body: "COX 8 WP is a compact, all-weather coaxial loudspeaker designed for permanent outdoor use. With true point-source imaging, controlled directivity and a robust weatherised build, it delivers clear speech and musical detail across plazas, theme parks, concourses, terraces, poolsides and other open-air spaces. Installer-friendly hardware and watertight connectivity make integration fast, tidy and reliable." },
        { heading: "Engineered for outdoor reliability", body: "Designed for reliable outdoor operation, COX 8 WP combines a weather-resistant polymer enclosure with a multi-layer front grille that keeps out dust and water while preserving acoustic transparency. A sealed input panel with cable-gland entries maintains protection even when the cabinet is tilted, and corrosion-resistant metalwork ensures long-term durability in sun, humidity, salt air and temperature swings." },
        { heading: "Coherent point-source performance", body: "At its core is a true coaxial driver with horn-loaded high frequencies, behaving as a single acoustic source for coherent imaging and consistent coverage. A passive crossover with overload protection simplifies deployment and pairs smoothly with standard installation amplifiers, while input and link terminals enable straightforward daisy-chaining — equally at home as a main loudspeaker in compact systems or as fill/delay within larger distributed rigs." },
      ],
    },
    features: [
      { title: "Weatherproof by design", body: "Sealed construction, multi-layer grille and watertight I/O deliver dependable performance in harsh outdoor conditions." },
      { title: "Coherent point-source performance", body: "True coaxial topology with horn-loaded HF provides uniform coverage, natural voicing and high speech intelligibility." },
      { title: "Installer-friendly integration", body: "Passive crossover, input/link terminals and robust mounting hardware streamline specification, wiring and fit-out." },
    ],
    specColumns: ["COX 8 WP"],
    specGroups: [
      {
        title: "ELECTRO-ACOUSTICAL DATA",
        rows: [
          { k: "System type", v: ["2-way passive coaxial system"] },
          { k: "Frequency response (-3 dB) *", v: ["110 Hz – 20 kHz"] },
          { k: "Frequency range (-6 dB) *", v: ["90 Hz – 20 kHz"] },
          { k: "Frequency range (-10 dB) *", v: ["76 Hz – 20 kHz"] },
          { k: "Coverage angles (-6 dB) [H x V] **", v: ["80° x 80°"] },
          { k: "Nominal impedance", v: ["8 Ω"] },
          { k: "Sensitivity *", v: ["96 dB"] },
          { k: "Peak power", v: ["600 W"] },
          { k: "Continuous power ***", v: ["150 W"] },
          { k: "Maximum Peak SPL ****", v: ["130 dB"] },
          { k: "Crossover frequency", v: ["2 kHz"] },
          { k: "Transducers", v: ["1 × 8\" woofer (2\" VC), 1 × 1\" tweeter (1.4\" VC)"] },
          { k: "Enclosure type", v: ["Enclosed box"] },
          { k: "Connectors", v: ["Input/output signal: PG11, wire Ø 5–10 mm"] },
          { k: "Wiring", v: ["Input: INPUT-, INPUT+  ·  Link: OUTPUT-, OUTPUT+"] },
        ],
      },
      {
        title: "MECHANICAL DATA",
        rows: [
          { k: "Product dimensions [H x W x D] (incl. rigging)", v: ["302 x 300 x 334 mm"] },
          { k: "Weight", v: ["10 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["362 x 332 x 335 mm"] },
          { k: "Total weight", v: ["11.3 kg"] },
          { k: "Cabinet", v: ["Weather-resistant polymer resin"] },
          { k: "Cabinet finishing", v: ["Black or grey painting"] },
          { k: "Grille", v: ["Powder-coated perforated steel"] },
          { k: "Ingress protection", v: ["IP 56"] },
          { k: "Rigging / Hardware", v: ["2 × M8 side rigging points"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "U-bracket", v: ["COX8 WP UB — U-shaped stainless steel mounting bracket"] },
        ],
      },
    ],
    specNote: "* Whole space, 1W / 1m, on axis   ** Coverage angles mean value   *** According to EIA-426B Standard   **** Max Peak SPL = Sensitivity + 10log10(Continuous Power) + 12 dB Crest Factor",
    slider: ["/images/products/cox-8-wp/main.webp", "/images/products/cox-8-wp/2.webp", "/images/products/cox-8-wp/3.webp", "/images/products/cox-8-wp/4.webp"],
    sliderTitle: "COX 8 WP",
  },
  {
    slug: "cox-12-wp",
    line: "Full Range",
    group: "COX-Line",
    model: "COX 12 WP",
    kicker: "12인치 방수 동축 스피커",
    en: "12\" All-weather Coaxial Point Source",
    badge: "출시예정",
    featured: false,
    tags: ["방수", "야외", "동축", "설치"],
    keySpecs: [
      { l: "Ingress Protection", v: "IP 56" },
      { l: "Maximum Peak SPL", v: "135 dB" },
      { l: "Coverage [H x V]", v: "80° x 80°" },
    ],
    sourceUrl: "https://se-audiotechnik.de/produkt/cox-12-wp-2/",
    tagline: { headline: "Natural detail. True resilience. Coherent source.", sub: "COX 12 WP" },
    intro: {
      title: "All-Weather Coaxial Sound",
      sections: [
        { body: "COX 12 WP is a compact, all-weather coaxial loudspeaker engineered for clear speech and musical punch in permanent outdoor systems. With true point-source imaging, controlled directivity and a robust weatherised build, it integrates seamlessly into theme parks, plazas, stadium concourses, terraces, poolsides and other outdoor venues — delivering consistent coverage with installer-friendly mechanics and tidy, watertight connectivity." },
        { heading: "Engineered for outdoor reliability", body: "Built for year-round operation in exposed locations, COX 12 WP combines a weather-resistant polymer enclosure with a multi-layer grille that keeps out dust and water while preserving acoustic transparency. A double-sealed input panel with cable-gland entries maintains enclosure protection even when slightly tilted, and corrosion-resistant metalwork withstands sun, humidity, salt air and temperature swings for reliable operation and a clean appearance over time." },
        { heading: "Coherent point-source performance", body: "COX 12 WP uses a true coaxial driver arrangement with horn-loaded high frequencies. Acting as a single acoustic source, it delivers coherent imaging, uniform voicing and controlled coverage — ideal for intelligible speech and musical clarity outdoors and in reflective environments. A tuned low-frequency design adds punch and warmth, while a passive crossover with overload protection simplifies integration with standard installation amplifiers. Input and link terminals enable straightforward daisy-chaining for distributed systems and fill positions alongside other weatherproof SE loudspeakers and subwoofers." },
      ],
    },
    features: [
      { title: "Weatherproof by design", body: "Sealed construction, multi-layer grille and watertight I/O deliver dependable performance in harsh outdoor conditions." },
      { title: "Coherent point-source performance", body: "True coaxial topology with horn-loaded HF provides uniform coverage, natural voicing and high speech intelligibility." },
      { title: "Installer-friendly integration", body: "Passive crossover, input/link terminals and robust mounting hardware streamline specification, wiring and fit-out." },
    ],
    specColumns: ["COX 12 WP"],
    specGroups: [
      {
        title: "ELECTRO-ACOUSTICAL DATA",
        rows: [
          { k: "System type", v: ["2-way passive coaxial system"] },
          { k: "Frequency response (-3 dB) *", v: ["100 Hz – 17 kHz"] },
          { k: "Frequency range (-6 dB) *", v: ["90 Hz – 18 kHz"] },
          { k: "Frequency range (-10 dB) *", v: ["60 Hz – 20 kHz"] },
          { k: "Coverage angles (-6 dB) [H x V] **", v: ["80° x 80°"] },
          { k: "Nominal impedance", v: ["8 Ω"] },
          { k: "Sensitivity *", v: ["98 dB"] },
          { k: "Peak power", v: ["1200 W"] },
          { k: "Continuous power ***", v: ["300 W"] },
          { k: "Maximum Peak SPL ****", v: ["135 dB"] },
          { k: "Crossover frequency", v: ["2 kHz"] },
          { k: "Transducers", v: ["1 × 12\" woofer (3\" VC), 1 × 1\" tweeter (1.7\" VC)"] },
          { k: "Enclosure type", v: ["Vented box"] },
          { k: "Connectors", v: ["Input/output signal: PG11, wire Ø 5–10 mm"] },
          { k: "Wiring", v: ["Input: INPUT-, INPUT+  ·  Link: OUTPUT-, OUTPUT+"] },
        ],
      },
      {
        title: "MECHANICAL DATA",
        rows: [
          { k: "Product dimensions [H x W x D] (incl. rigging)", v: ["411 x 407 x 443 mm"] },
          { k: "Weight", v: ["18 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["472 x 442 x 460 mm"] },
          { k: "Total weight", v: ["19.9 kg"] },
          { k: "Cabinet", v: ["Weather-resistant polymer resin"] },
          { k: "Cabinet finishing", v: ["Black or grey painting"] },
          { k: "Grille", v: ["Powder-coated perforated steel"] },
          { k: "Ingress protection", v: ["IP 56"] },
          { k: "Rigging / Hardware", v: ["2 × M8 side rigging points"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "U-bracket", v: ["COX8 WP UB — U-shaped stainless steel mounting bracket"] },
        ],
      },
    ],
    specNote: "* Whole space, 1W / 1m, on axis   ** Coverage angles mean value   *** According to EIA-426B Standard   **** Max Peak SPL = Sensitivity + 10log10(Continuous Power) + 12 dB Crest Factor",
    slider: ["/images/products/cox-12-wp/main.webp", "/images/products/cox-12-wp/2.webp", "/images/products/cox-12-wp/3.webp", "/images/products/cox-12-wp/4.webp"],
    sliderTitle: "COX 12 WP",
  },
  {
    slug: "m-121among2",
    line: "Monitor",
    model: "M-121AMONG2",
    kicker: "12인치 액티브 스테이지 모니터",
    en: "12\" Two way co-axial active stage monitor",
    badge: null,
    featured: false,
    tags: ["무대", "공연장", "모니터"],
    keySpecs: [
      { l: "MAX SPL (1M)", v: "124 dB" },
      { l: "Net Weight", v: "17.8 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/M-121AMONG2",
    tagline: {
      headline: "STAGE MONITOR M-121AMONG2",
      sub: '12" Two Way Co-axial Active Stage Monitor (Not Available in Europe)',
    },
    intro: {
      title: "STAGE MONITOR M-121AMONG2",
      sections: [
        {
          body: 'M-121AMONG2 features a high end 12" co-axial speaker with a compression driver and offers precise sound reproduction of various instruments. The Volex power supply system allows a secure connection of further active monitors, this feature enables the installation of a big active stage monitor system while using only one power plug. The monitor also features a soft clip-limiter as well as a volume control. The housing was built out of high-quality plywood with black polyurea coating. The monitor angle is 35°.',
        },
        {
          body: 'M-121AMON2는 압축 드라이버를 사용한 하이엔드 12" 동축 스피커가 특징이며 다양한 악기를 정밀한 음성으로 재현할 수 있습니다. Volex 전원 공급 시스템은 액티브 모니터를 안전하게 연결할 수 있으며, 이 기능을 통해 하나의 전원 플러그만 사용하여 대형 무대 모니터 시스템을 구축할 수 있습니다. 모니터에는 볼륨 조절뿐만 아니라 부드러운 클립 제한 장치도 있습니다. 하우징은 검은색 폴리우레아 코팅이 된 고급 합판으로 만들어 졌으며, 모니터 각도는 35° 입니다.',
        },
      ],
    },
    specColumns: ["M-121A MONG2"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["12\" Two way co-axial active stage monitor"] },
          { k: "Frequency Response (-6 dB)", v: ["80 Hz - 20 kHz"] },
          { k: "Power Handling (RMS)", v: ["250 W"] },
          { k: "Sensitivity (1W / 1M)", v: ["100 dB"] },
          { k: "MAX SPL (1M)", v: ["124 dB"] },
          { k: "Impedance", v: ["4 Ω"] },
          { k: "Dispersion (H × V)", v: ["75° × 75°"] },
          { k: "LF Transducer", v: ["12\" ferrite magnet, 2.4\" voice coil"] },
          { k: "HF Transducer", v: ["1\" Exit, ferrite polyester film compression unit, 1.35\" voice coil"] },
          { k: "Crossover Frequency", v: ["1.8 kHz"] },
          { k: "Protection", v: ["Limiter, short circuit"] },
          { k: "Input Interface", v: ["Input: XLR / 6.3 mm jack (combo) Output: XLR"] },
          { k: "Cabinet Material / Coating", v: ["15 mm selected plywood Polyurea coating"] },
          { k: "Dimensions (W × H × D)", v: ["440 × 360 × 513 mm"] },
          { k: "Net Weight", v: ["17.8 kg"] },
        ],
      },
    ],
    diagramGrid: [
      { image: "/images/products/m-121among2/diagram.gif", label: "M-121AMONG2 diagram" },
    ],
    sliderTitle: "PICTURE",
    slider: [
      "/images/products/m-121among2/main.jpg",
      "/images/products/m-121among2/rear.jpg",
    ],
    downloadLinks: [
      { label: "M-121AMONG2 Brochure", file: "/downloads/M-121AMONG2/M-121A_MONG2.pdf" },
      { label: "M-121AMONG2 시방서", file: "/downloads/M-121AMONG2/M-121A_MONG2_Specification.hwp" },
      { label: "M-121AMONG2 dwg", file: "/downloads/M-121AMONG2/se_M-121AMONG2.dwg" },
    ],
  },
  {
    slug: "smx-12a",
    line: "Monitor",
    model: "SMX-12A",
    kicker: "12인치 액티브 모니터",
    en: 'Active Monitor 12"',
    badge: null,
    featured: false,
    tags: ["무대", "스튜디오", "모니터"],
    keySpecs: [
      { l: "Total power", v: "484 W" },
      { l: "Maximum Peak SPL", v: "129 dB" },
      { l: "Net weight", v: "22 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/SMX12-SMX12A",
    tagline: {
      headline: "STAGE MONITOR SMX-12A",
    },
    intro: {
      title: "STAGE MONITOR SMX-12A",
      sections: [
        {
          body: 'The active SMX 12A is a compact, extremely versatile 2-way coaxial monitor in bass reflex design. Thanks to the built-in 12" LF with powerful 3" voice coil and a 1" HF with a 1.7" voice coil, the SMX 12A monitor is powerful and assertive in any mix and feature a harmonious, neutral sound character. This allows any musician to hear themselves better and bring out every nuance of their performance. The clearly audible signal in the 80° x 80° coverage angle is easy on any singer’s voice – the more precise they hear themselves, the less effort is required for their performance. At the same time, the SMX 12A monitor remains uncomplicated and feedback-proof.',
        },
        {
          body: "The SMX 12A boasts a 2-channel Class-D amplifier with a total power of 484 W (LF: 416 W @ 6.5 Ω, HF: 68 W @ 14 Ω) on board. So there is no need for an external device – the internal amp is optimally matched to the speakers and brings eight DSP presets to make the set-up as short and simple as possible.",
        },
      ],
    },
    features: [
      {
        title: '12" High efficiency woofer',
        body: "SMX 12A is a compact yet powerful tool for various monitoring requirements on and off stage.",
      },
      {
        title: "8 intelligent DSP presets",
        body: "Gain and a special preset selector with 8 practical factory settings increase the application range.",
      },
      {
        title: "Recessed connector panel",
        body: "Due to the recessed I/O panel of the monitoring system, no connectors are visible to the viewer.",
      },
    ],
    accessoriesBeforeSpec: true,
    accessoriesIntro: {
      title: "Maximum Versatility",
      body: "SMX 12 and SMX 12A are excellent stage monitors – and much more. The extensive accessories allow for a large number of different applications besides classic monitoring. The centrepiece is the SMX 12 UB mounting frame – it allows the SMX 12 and SMX 12A to be tilted steplessly, for example, for wall mounting. With the SMX 12A mounting pole, the SMX monitors can be mounted on a subwoofer in a flash and thus become an ultra-portable PA system or a quickly set-up side fill. Rigging is also possible with the SMX 12 or SMX 12A flown as front fill, for example. In short, using the speakers of the SMX Series exclusively as monitors is an excellent choice – but almost a waste.",
    },
    accessories: [
      {
        title: "SMX 12UB",
        desc: "This U-bracket provides mounting holes for wall mounting or pole support adapter PS35 or other industry-standard hardware, like truss clamp.",
      },
      {
        title: "PS35",
        desc: "Pole support adapter, model PS35, M10 to 35 mm speaker poles.",
      },
      {
        title: "SPS 20",
        desc: "Distance bar/pole support to connect from M20 thread in subwoofers to PS35.",
      },
      {
        title: "SMX 12TC",
        desc: "SMX 12 transport and storage protection cover",
      },
    ],
    productsSliderTitle: "Related products",
    productsSlider: [
      "/images/products/smx-12a/rel1.png",
      "/images/products/smx-12a/rel2.png",
      "/images/products/smx-12a/rel3.jpg",
      "/images/products/smx-12a/rel4.png",
    ],
    specImage: "/images/products/smx-12a/dimensions.png",
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3 dB)*", v: ["65 Hz – 17 kHz"] },
          { k: "Frequency range (-10 dB)*", v: ["60 Hz – 20 kHz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["80° x 80°"] },
          { k: "Maximum Peak SPL *", v: ["129 dB"] },
          { k: "System type", v: ["2-way coaxial system"] },
          { k: "Transducers", v: ["Coaxial driver with: LF: 1 x 12″ driver (3″ voice coil) HF: 1″ compression driver (1.7″ voice coil)"] },
          { k: "Enclosure type", v: ["Vented box"] },
        ],
      },
      {
        title: "AMPLIFICATION",
        rows: [
          { k: "Type", v: ["2 channel, class-D with SMPS"] },
          { k: "Total power **", v: ["484 W"] },
          { k: "Output power (per channel)", v: ["LF: 416 W @ 6.5 Ω HF: 68 W @ 14 Ω"] },
          { k: "Protection", v: ["Short circuit, overheating, overcurrent, 2-band limiter"] },
          { k: "Connectors", v: ["Input Signal: balanced XLR 3-pin female or balanced 6.5 mm TS jack Link output: balanced XLR 3-pin male Power input: powerCON® 20A Power link output: powerCON® 20A"] },
          { k: "Operating Voltage", v: ["100 VAC – 240 VAC, 50 – 60 Hz"] },
          { k: "Wiring", v: ["Pin N: Neutral Pin L: Conductor Pin E: Ground"] },
          { k: "Input sensitivity", v: ["0 dBu"] },
          { k: "DSP", v: ["48 kHz/24-bit with extended dynamics Processing latency: 1.1 ms"] },
          { k: "Processing", v: ["Level, factory EQ presets"] },
          { k: "User controls", v: ["Power: ON/OFF switch Level: 8-position rotary knob (-50, -20, -10, -4, -2, 0, +2, +4) DSP presets: 8-position rotary knob"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["368 x 450 x 575 mm"] },
          { k: "Net weight", v: ["22 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["447 x 535 x 660 mm"] },
          { k: "Total weight", v: ["25 kg"] },
          { k: "Cabinet", v: ["15 mm plywood"] },
          { k: "Cabinet finishing", v: ["Black polyurea coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Hardware", v: ["1 top and 2 side handles embedded in cabinet Rubber feet 2 x M10 for U-bracket mounting"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "U-bracket", v: ["SMX 12UB"] },
          { k: "M10 screw to 35mm pole socket", v: ["PS35"] },
          { k: "Transport cover", v: ["SMX 12TC"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * Measured with 12 dB Crest factor Pink Noise, Whole space ** Total power value is the sum of all individual channel output power",
    downloadLinks: [
      { label: "SMX 12A Datasheet", file: "/downloads/SMX-12A/SMX12A-EDS-EN-v202208.pdf" },
      { label: "SMX 12A Owner Manual", file: "/downloads/SMX-12A/SE-SMX-SMX12A-Manual-EN-v202201.pdf" },
      { label: "SMX Brochure", file: "/downloads/SMX-12A/SMX_Brochure.pdf" },
      { label: "SMX-12 dwg", file: "/downloads/SMX-12A/se_SMX_12_20200414.dwg" },
    ],
  },
  {
    slug: "smx-12",
    line: "Monitor",
    model: "SMX 12",
    kicker: "12인치 패시브 모니터",
    en: 'Passive Monitor 12"',
    badge: null,
    featured: false,
    tags: ["무대", "스튜디오", "모니터"],
    keySpecs: [
      { l: "Maximum Peak SPL", v: "136 dB" },
      { l: "Net weight", v: "19 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/150",
    tagline: {
      headline: "STAGE MONITOR SMX-12",
    },
    intro: {
      title: "STAGE MONITOR SMX-12",
      sections: [
        {
          body: 'The SMX 12 is a compact, extremely versatile 2-way passive coaxial monitor in bass reflex design. Thanks to the built-in 12"-LF with powerful 3" voice coil and a 1"-HF with 1.7" voice coil, the SMX 12 monitor is powerful and assertive in any mix and has a harmonious, neutral sound character. This allows any musician to hear themselves better and bring out every nuance of their performance. The clearly audible signal in the 80° x 80° coverage angle is easy on any singer’s voice – the more precise they hear themselves, the less effort is required for their performance. At the same time, the SMX 12 monitor remains uncomplicated and feedback-proof.',
        },
        {
          body: "With a power handling of 1,600 W (peak) and 136 dB max. SPL (peak), the SMX 12 boasts an impressive stage presence, yet keeps distortion at an extremely low level over the entire frequency range from 60 Hz to 20 kHz. The high sensitivity of 99 dB enables smooth, powerful reproduction throughout the entire dynamic range.",
        },
      ],
    },
    features: [
      {
        title: '12" High efficiency woofer',
        body: "SMX 12 is a compact yet powerful tool for various monitoring requirements on and off stage.",
      },
      {
        title: "3 handles for easy handling in all situations",
        body: "Gain and a special preset selector with 8 practical factory settings increase the application range.",
      },
      {
        title: "Recessed connector panel",
        body: "Due to the recessed I/O panel of the monitoring system, no connectors are visible to the viewer.",
      },
    ],
    accessoriesBeforeSpec: true,
    accessoriesIntro: {
      title: "Maximum Versatility",
      body: "SMX 12 and SMX 12A are excellent stage monitors – and much more. The extensive accessories allow for a large number of different applications besides classic monitoring. The centrepiece is the SMX 12 UB mounting frame – it allows the SMX 12 and SMX 12A to be tilted steplessly, for example, for wall mounting. With the SMX 12A mounting pole, the SMX monitors can be mounted on a subwoofer in a flash and thus become an ultra-portable PA system or a quickly set-up side fill. Rigging is also possible with the SMX 12 or SMX 12A flown as front fill, for example. In short, using the speakers of the SMX Series exclusively as monitors is an excellent choice – but almost a waste.",
    },
    accessories: [
      {
        title: "SMX 12UB",
        desc: "This U-bracket provides mounting holes for wall mounting or pole support adapter PS35 or other industry-standard hardware, like truss clamp.",
      },
      {
        title: "PS35",
        desc: "Pole support adapter, model PS35, M10 to 35 mm speaker poles.",
      },
      {
        title: "SMX 12TC",
        desc: "SMX 12 transport and storage protection cover",
      },
    ],
    specImage: "/images/products/smx-12/dimensions.png",
    specGroups: [
      {
        title: "ACOUSTICAL",
        rows: [
          { k: "Frequency range (-3 dB)*", v: ["125 Hz – 16 kHz"] },
          { k: "Frequency range (-10 dB)*", v: ["60 Hz – 20 kHz"] },
          { k: "Coverage angles (-6dB) [H x V]", v: ["80° x 80°"] },
          { k: "Nominal impedance", v: ["LF: 8 Ω HF: 16 Ω"] },
          { k: "Sensitivity *", v: ["99 dB"] },
          { k: "Peak power", v: ["1600 W"] },
          { k: "Continuous power **", v: ["400 W"] },
          { k: "Maximum Peak SPL ***", v: ["136 dB"] },
          { k: "System type", v: ["2-way coaxial system"] },
          { k: "Crossover type", v: ["LPF: Butterworth 2nd Order HPF: Butterworth 3th Order"] },
          { k: "Crossover frequency", v: ["1.3 kHz"] },
          { k: "Transducers", v: ["Coaxial driver with: LF: 1 x 12″ driver (3″ voice coil) HF: 1″ compression driver (1.7″ voice coil)"] },
          { k: "Enclosure type", v: ["Vented box"] },
          { k: "Connectors", v: ["Input signal: 1 x Neutrik speakON® NL4 Link output: 1 x Neutrik speakON® NL4"] },
          { k: "Wiring", v: ["Pins 1+ / 1- : driver"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product dimensions [H x W x D] (Including rigging)", v: ["368 x 450 x 575 mm"] },
          { k: "Net weight", v: ["19 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["447 x 535 x 660 mm"] },
          { k: "Total weight", v: ["23 kg"] },
          { k: "Cabinet", v: ["15 mm plywood"] },
          { k: "Cabinet finishing", v: ["Black polyurea coating"] },
          { k: "Grille", v: ["Powder coated perforated steel"] },
          { k: "Hardware", v: ["1 top and 2 side handles embedded in cabinet Rubber feet 2 x M10 for U-bracket mounting"] },
        ],
      },
      {
        title: "ACCESSORIES",
        rows: [
          { k: "U-bracket", v: ["SMX 12UB"] },
          { k: "M10 screw to 35mm pole socket", v: ["PS35"] },
          { k: "Transport cover", v: ["SMX 12TC"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * 1 Whole space, 1W / 1m, on-axis ** According to EIA-426B Standard *** Max Peak SPL = Sensitivity + 10log10(Continuous Power) + 12 dB Crest Factor",
    downloadLinks: [
      { label: "SMX 12A Datasheet", file: "/downloads/SMX-12/SMX12A-EDS-EN-v202208.pdf" },
      { label: "SMX 12A Owner Manual", file: "/downloads/SMX-12/SE-SMX-SMX12A-Manual-EN-v202201.pdf" },
      { label: "SMX Brochure", file: "/downloads/SMX-12/SMX_Brochure.pdf" },
      { label: "SMX-12 dwg", file: "/downloads/SMX-12/se_SMX_12_20200414.dwg" },
    ],
  },
  {
    slug: "la-10-4d",
    line: "Amplifiers",
    model: "LA 10.4D",
    kicker: "4채널 DSP 파워앰프",
    en: "4-Channel DSP Amplifier",
    badge: null,
    featured: true,
    tags: ["앰프", "DSP", "시스템"],
    keySpecs: [
      { l: "Net weight", v: "14.5 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/142",
    tagline: {
      headline: "L-Line LA 10.4D",
      sub: "A light in the dark? We developed the LA 10.4D so that you remain in control at all times.",
    },
    intro: {
      title: "L-Line LA 10.4D",
      sections: [
        {
          body: "A light in the dark? We developed the LA 10.4D so that you remain in control at all times. A 4-channel amplifier with more than 4x 2,500 W specifically for line array systems of the L-Line. Lots of power in a tiny space – for up to 16 speakers per amp! The user-friendly software sets everything up immediately.",
        },
        {
          body: "Your personal chief assistant allows for full performance monitoring. In this amplifier, signal processing is optimised – all parameters can be set centrally and the operation of the system is constantly monitored.",
        },
        {
          body: "With this core piece, you will keep the overview: Your Power Station features a high-quality processed integrated DSP, a Dante® network audio connection and remote network control. To optimise the system, you can count on reliable tools: Limiters, parametric EQ to adapt to the room, Delay and FIR filtering.",
        },
        {
          body: "Now we come to the pulse: The LA 10.4D is a four-channel amplifier system with a capacity of 4x 2,500 W per channel. Thanks to the minimum impedance of 4 Ω, you can connect up to 16 speakers.",
        },
        {
          body: "The intuitive user interface ensures your supremacy. Optimise your personal work flow by means of the network control! Adjustments can be saved just how you like it. The professional Audio Toolkit saves valuable time. The multiple-users compatibility ensures maximum security – the settings are stored in the amp and not in the computer. Simply reposition, done.",
        },
        {
          body: "Future-proofed software allows you to plan, analyse and run your application. Control all parameters centrally. Monitor what is happening on your computer. In short, this amp is your power plant. Enjoy your full supremacy!",
        },
      ],
    },
    featuresTopImage: "/images/products/la-10-4d/features-row.png",
    features: [
      {
        title: "Flexible connectors",
        body: "The power amplifier serves the three most widely used audio formats. Specifically: 4 analogue XLR inputs with link outputs, in combination with 4 AES EBU inputs, plus 4 DANTE® inputs. And in the output range: 4x Neutrik speakON® NL4 connectors. Remain maximally flexible!",
      },
      {
        title: "DSP integrated security",
        body: "The 48/96kHz DSP processor provides precise Filter, EQ and Limiter settings for all L-line speakers. Thus, you have full control at the mixing desk. Thanks to the speaker Presets, EQ controller and Delay set up your system quickly and easily.",
      },
      {
        title: "Network-ready, touch screen and memory",
        body: "Control of the system is done centrally from the cockpit via the computer. If necessary, the chief assistant supports a 3.5 inch display. It provides all the information and is intuitive to operate. Touch the screen and turn the knob… The library will deliver safe, consistent results.",
      },
      {
        title: "An overview that makes sense",
        body: "Change important settings even in low-light environments. Thanks to the LED lighting, you can quickly access the mute buttons and the most important parameters are always in plain sight.",
      },
      {
        title: "Everything in the flow",
        body: "Floating point processor. High-resolution signal flow. High dynamic range. High signal-to-noise ratio. The LA 10.4D turns you into a Master of the Universe.",
      },
    ],
    specModelLabel: "Model: LA 10.4D",
    specGroups: [
      {
        title: "ELECTRICAL",
        rows: [
          { k: "Type", v: ["Networked DSP amplifier with 4x BTL Class D and Switch Mode Power Supply"] },
          { k: "Channels", v: ["Four"] },
          { k: "Output Power*", v: ["4 x 1200 W @ 8 Ω, 1 kHz, 1%THD 4 x 1390 W @ 8 Ω, 1 kHz, 2%THD 4 x 1720 W @ 4 Ω, 1 kHz, 1%THD 4 x 2570 W @ 4 Ω, 1 kHz, 2%THD 4 x 1460 W @ 8 Ω, 50 Hz, 4%THD 4 x 1550 W @ 4 Ω, 50 Hz, 4%THD"] },
          { k: "Minimum load impedance", v: ["4 Ω"] },
          { k: "Frequency response (Line In) (4 Ω)", v: ["20 Hz to 20 kHz: -1 dB"] },
          { k: "Damping factor", v: ["8 Ω: > 500 @ 1 kHz 4 Ω: > 250 @ 1 kHz"] },
          { k: "Input impedance", v: ["> 20 kΩ balanced"] },
          { k: "Maximum input level", v: ["+23 dBu"] },
          { k: "SNR Line In to Spk out", v: ["110,7 dB, 113,5 dB(A) (@1500 W/8 Ω, +42 dBu)"] },
          { k: "Noise Floor", v: ["-68,7 dBu (280 uV), -71,5 dBu(A) (200 uV(A))"] },
          { k: "Channel crosstalk", v: ["-97,8 dB"] },
          { k: "THD+N", v: ["< 0.0087% at 175 W into 4 Ω (1/8th of Rated Power) < 0.0095% at 350 W into 4 Ω (1/4th of Rated Power)"] },
          { k: "DSP", v: ["48/96 kHz, 32 bit SHARC CPU with floating point processing"] },
          { k: "System latency", v: ["1 ms to 10 ms (preset dependent)"] },
          { k: "Protection", v: ["Short circuit, overheating, overcurrent"] },
          { k: "Cooling", v: ["Two fans with temperature dependant speed and tacho feedback Front-to-back air flow"] },
          { k: "Power efficiency", v: ["Up to 76%"] },
          { k: "Power consumption (both PowerCON® summed)", v: ["Off: 3 W Idle: 70 W at 1/8 of Rated power: 1000 W at 1/4 of Rated power: 2000 W at 1/3 of Rated power: 2666 W Peak power: 8000 W"] },
          { k: "Inrush current (per PowerCON®)", v: ["40 A (<1 ms) when connected to mains 9 A (<250 ms) when switching on"] },
          { k: "Operating voltage range", v: ["90 – 265 VAC 50/60 Hz"] },
        ],
      },
      {
        title: "HARDWARE",
        rows: [
          { k: "Indicators", v: ["12x Input signal detect LED 4x Input signal clip Led 4x Channel Led: Mute, Active, -30dB, -12dB, -6dB, Limit, Protect 6x Status Led: Dante, AES1+2, AES3+4, LAN, Stand-By, Fault"] },
          { k: "Screen", v: ["3.5″ TFT Color display with Touch Panel & 320 x 240 resolution RGB"] },
          { k: "User controls", v: ["Control encoder with push-button Touch Screen 4x output MUTE Power On"] },
          { k: "Input signal connectors", v: ["4x XLR-3 male line-level inputs and buffered link outputs 2x XLR-3 male AES/EBU inputs and buffered link outputs 1x Dante® Ultimo 4ch input via separate etherCON terminal 1x Network control via separate etherCON terminal 1x Front USB"] },
          { k: "Output signal connectors", v: ["4x Neutrik SpeakON® NL4 outputs"] },
          { k: "Power connector", v: ["1x Neutrik PowerCON® 32A"] },
        ],
      },
      {
        title: "SOFTWARE",
        rows: [
          { k: "DSP Features", v: ["Levels, Parametric EQ, Delay, Phase, RMS Limiter, Peak Limiter, IIR/FIR Filtering"] },
          { k: "Configuration handling", v: ["Loading of factory presets provided by SE Audiotechnik® Saving and recalling of user presets"] },
          { k: "Remote control via network", v: ["Controlling of individual amplifiers or parameter-groups in distributed amplifiers via desktop software Configuring of arbitrary numbers of amplifiers with parameters resulting from venue-sound field simulations"] },
          { k: "Monitoring", v: ["Temperatures Fan speeds Voltages Connection states Fault states System events Runtime"] },
        ],
      },
      {
        title: "MECHANICAL",
        rows: [
          { k: "Product Dimensions [H x W x D]", v: ["89 x 483 x 480 mm / 2 RU"] },
          { k: "Net weight", v: ["14.5 kg"] },
          { k: "Packaging dimensions [H x W x D]", v: ["143 x 588 x 380 mm"] },
          { k: "Total weight", v: ["7.65 kg"] },
          { k: "Cabinet", v: ["Aluminum front panel, steel housing"] },
          { k: "Rack mounting:Rack mounting", v: ["Four frontal 6 mm holes at sides"] },
          { k: "Operating ambient temperature range", v: ["[5°C ; 40°C]"] },
          { k: "Storage temperature range", v: ["[-20°C ; 90°C]"] },
          { k: "Ingress Protection", v: ["IP20"] },
        ],
      },
    ],
    specNote: "All product specifications are subject to change without prior notice. * According to CEA-2006.",
    sliderTitle: "PICTURE",
    slider: ["/images/products/la-10-4d/main.png", "/images/products/la-10-4d/rear.png"],
    downloadLinks: [
      { label: "L-Line 브로슈어", file: "/downloads/la-10-4d/SE-L-Line-Brochure-EN-v202506-11.pdf" },
      { label: "LA 10.4D 메뉴얼", file: "/downloads/la-10-4d/SE-L-Line-L10.4D-Manual-EN-v202301-4.pdf" },
      {
        label: "SE Mission Control 1.2 (macOS)",
        file: "/downloads/la-10-4d/se_mission_control_-_1.2.dmg_.zip",
      },
      {
        label: "SE Mission Control 1.2 (Windows)",
        file: "/downloads/la-10-4d/se_mission_control_-_1.2_win_setup.exe_.zip",
      },
    ],
  },
  {
    slug: "ia-402d",
    line: "Amplifiers",
    model: "IA 402D",
    kicker: "설치용 4채널 DSP 앰프",
    en: "Class-D, SMPS",
    badge: null,
    featured: false,
    tags: ["앰프", "DSP", "설치"],
    keySpecs: [
      { l: "SNR (At rated power)", v: "95 dB" },
      { l: "Weight", v: "4.7 kg" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/IA202D-402D",
    tagline: {
      headline: "COLUMN SYSTEM IA 402D",
      sub: "Noticeable quiet | Efficient | Effortless",
    },
    intro: {
      title: "COLUMN SYSTEM IA 402D",
      sections: [
        {
          body: "Noticeable quiet | Efficient | Effortless — The necessary power is provided by two 2-channel Class D power amplifiers optimally tuned to the I-Line column speakers – the IA 202D with 2x 250 W at 8 Ω and the IA 402D with either 2x 200 W at 8 Ω or 2x 400 W at 4 Ω.",
        },
        {
          body: "The built-in 24bit/48kHz DSP processor supplies all I-Line speakers with customised and precise filter, EQ and limiter settings. A rotary push-button on the front panel conveniently controls pre-set speaker presets, delay and other functions. This ensures fast, uncomplicated and carefree system setup and tuning.",
        },
        {
          body: "Both amplifiers operate the speakers remarkably quietly – made possible by a sensor-controlled fan, an aerodynamically optimised front to back airflow, and a very low idle power. Ideal for quiet environments!",
        },
        {
          body: "The I-Line amplifiers are equipped with the three most common analogue input and output connectors. 2-channel XLR inputs with link outputs in conjunction with Phoenix MSTB 3-pin inputs cover the majority of all input requirements. Maximum flexibility at the outputs is provided by 3x Neutrik speakON® connectors in parallel to 4-pin Phoenix MSTB connectors.",
        },
      ],
    },
    features: [
      {
        title: "Connectivity",
        body: "IA 202D & 402D power amplifier are equipped with 3 most widely used analog input and output connections in professional audio. 2 channel XLR inputs with link outputs together with Phoenix MSTB 3-pin inputs will cover most of the input needs. Outputs are equipped with 3x Neutrik speakON® connectors in parallel with 4-pin Phoenix MSTB connectors for maximum flexibility.",
      },
      {
        title: "DSP",
        body: "24bit/48kHz DSP processor provides all I-line speakers with correct and precise filter, EQ and limiter settings. As always - good sounding and well protected speaker systems are the ultimate aim of the SE AUDIOTECHNIK engineering team. Built-in speaker presets, EQ control, delay and other features allow for an easy, cost-effective and quick system setup and tuning.",
      },
    ],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["Class-D, SMPS"] },
          { k: "Power Output", v: ["2 x 250W @ 8 Ω , 2 x 125W @ 16 Ω"] },
          { k: "Minimum Load Impedance", v: ["8 Ω"] },
          { k: "Input Impedance", v: ["20 kΩ balanced, 10 kΩ unbalanced"] },
          { k: "SNR (At rated power)", v: ["95 dB"] },
          { k: "Crosstalk", v: ["64 dB"] },
          { k: "DSP", v: ["48 kHz, 24-bit DSP processor, processing latency: 1.1 ms"] },
          { k: "Signal Processing", v: ["Speaker presets, Delay, High Shelf, High-Pass, Parametric Equalizer, Limiter, Phase Invert, Mute, Input Gain"] },
          { k: "Controls", v: ["Digital encoder with push button"] },
          { k: "Maximum Input Level", v: ["+20 dBu"] },
          { k: "Signal Connectors", v: ["XLR 3-pin male line-level inputs/link outputs, Phoenix Contact MSTB 3-pin inpults/link outputs"] },
          { k: "Speaker Connectors", v: ["Neutrik Speakon® NL4 outputs, Phoenix Contact MSTB 4-pin outputs"] },
          { k: "Protection", v: ["short-circuit, over-heating, over-current"] },
          { k: "Cooling", v: ["Sensor controlled fan, front-to-back air flow"] },
          { k: "Power Efficiency", v: ["76.00%"] },
          { k: "Power Consumption (Idle, Full Power)", v: ["29 W / 600 W"] },
          { k: "Power Requirements", v: ["100 - 240 VAC"] },
          { k: "Dimensions (W x H x D)", v: ["483 x 66 x 256 mm / 1.5 HU"] },
          { k: "Weight", v: ["4.7 kg (netto)"] },
        ],
      },
    ],
    references: [
      {
        title: "I-Line Review in Production Partner Magazine 1|2021",
        body: "With the I-Line, the Solingen-based manufacturer SE Audiotechnik presents a series of compact loudspeakers with sets consisting of two tops in column design, two DSP amplifiers and an active 12” subwoofer. How will this combination perform in fixed installations?",
        image: "/images/products/ia-402d/review-approved.png",
      },
    ],
    sliderTitle: "PICTURE",
    slider: ["/images/products/ia-402d/pic-402d.png", "/images/products/ia-402d/pic-202d.png"],
    downloadLinks: [
      { label: "I-Line Data Sheet", file: "/downloads/402D/IA-402D-SpecSheet.pdf" },
      {
        label: "I-Line Brochure",
        file: "/downloads/402D/SE-AUDIOTECHNIK_I-Line-brochure-v.2_web-rev.1.pdf",
      },
      { label: "IA 402D Manual", file: "/downloads/402D/IA_202D-IA402D_Instruction_Manual_20180417.pdf" },
      { label: "IA 402D 시방서", file: "/downloads/402D/IA-402D_Specification.hwp" },
      { label: "IA 402D dwg", file: "/downloads/402D/se_IA_202D(402D).dwg" },
    ],
  },
  {
    slug: "ma-2000",
    line: "Amplifiers",
    model: "MA 2000 Series",
    kicker: "멀티채널 파워앰프 시리즈",
    en: "Multi-channel Amplifier Series",
    badge: null,
    featured: false,
    tags: ["앰프", "시스템"],
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/MA2000Series",
    tagline: {
      headline: "AMPLIFIERS MA 2000 Series",
      sub: "Dual-channel Pro Power Amplifier",
    },
    intro: {
      title: "AMPLIFIERS MA 2000 Series",
      sections: [
        {
          body: "Dual-channel Pro Power Amplifier — MA 2000 series power amplifier is equipped with DDT compression and double overheating protection system by adopting German technology. It possesses functions of mute switch protection and also startup protection for overheating/DC/short circuit/overloading. The series has been modified in terms of appearance design, internal structure, circuit design and sound performance so as to provide extraordinary sound quality. With features of high power, multifunction, high quality, stability and reliability, the series is a kind of class AB pro power amplifier which is able to fulfill the demands of both indoor and outdoor applications.",
        },
        {
          body: "MA 2000 시리즈 파워앰프는 독일 기술을 채택해 DDT 압축과 이중과열 방지 시스템을 탑재했습니다. 음소거 스위치 보호 기능, overheating/DC/short circuit/overloading 등 시동 보호 기능도 갖췄습니다. 이 시리즈는 뛰어난 음질을 제공하도록 외관 설계, 내부 구조, 회로 설계 및 음향 성능 측면에서 고안되었습니다. 고출력, 다기능, 고품질, 안정성, 신뢰성이 특징인 이 시리즈는 AB 프로 파워앰프의 일종으로 실내 및 실외 적용으로 모두의 수요를 충족시킬 수 있습니다.",
        },
      ],
    },
    specColumns: ["MA 2300","MA 2400","MA 2600","MA 2800","MA 21200"],
    specGroups: [
      {
        title: "Output Power 1KHz, < 0.05％THD :",
        rows: [
          { k: "8 Ω", v: ["2 x 300W","2 x 400W","2 x 600W","2 x 800W","2 x 1200W"] },
          { k: "4 Ω", v: ["2 x 450W","2 x 600W","2 x 900W","2 x 1200W","2 x 1800W"] },
          { k: "2 Ω", v: ["Inapplicable","2 x 800W","2 x 1100W","2 x 1400W","2 x 2400W"] },
          { k: "16 ΩBridge", v: ["napplicable","Inapplicable","Inapplicable","Inapplicable","2400W"] },
          { k: "8 ΩBridge", v: ["700W","1000W","1800W","2000W","3600W"] },
          { k: "4 ΩBridge", v: ["Inapplicable","1200W","2000W","2400W","4800W"] },
          { k: "Frequency Response(+/- 0.1dB)", v: ["20Hz-20 KHz","20Hz-20 KHz","20Hz-20 KHz","20Hz-20 KHz","20Hz-20 KHz"] },
          { k: "Reflex Response(@ 1W20Hz-20 KHz)", v: ["+ 15°","+ 15°","+ 15°","+ 15°","+ 15°"] },
          { k: "THD 1KHz(20Hz-20 KHz)", v: ["≤ 0.05％","≤ 0.05％","≤ 0.05％","≤ 0.05％","≤ 0.03％"] },
          { k: "IMD (SMPTE)", v: ["≤ 0.05％","≤ 0.05％","≤ 0.05％","≤ 0.05％","≤ 0.01％"] },
          { k: "Damping Factor(20Hz-500Hz@ 8 Ω)", v: ["400:1","450:1","500:1","550:1","650:1"] },
          { k: "Crosstalk(20Hz-20 KHz)", v: [">75 dB",">75 dB",">75 dB",">75 dB",">75 dB"] },
          { k: "Gain (optional)", v: ["26 / 32 / 38 dB","26 / 32 / 38 dB","26 / 32 / 38 dB","26 / 32 / 38 dB","26 / 32 / 38 dB"] },
          { k: "Sensitivity", v: ["0.775 / 1.0 / 1.55 V","0.775 / 1.0 / 1.55 V","0.775 / 1.0 / 1.55 V","0.775 / 1.0 / 1.55 V","0.775 / 1.0 / 1.44 V"] },
          { k: "Signal to Noise Ratio", v: ["103 dB","105 dB","105 dB","106 dB","106 dB"] },
          { k: "Dimensions(WxHxD)", v: ["483 x 88 x 420 mm","483 x 88 x 420 mm","483 x 88 x 490 mm","483 x 88 x 490 mm","483 x 133 x 500 mm"] },
          { k: "Net Weight(Kg)", v: ["17 Kg","18 Kg","23 Kg","25 Kg","40 Kg"] },
        ],
      },
    ],
    diagramGrid: [
      { image: "/images/products/ma-2000/diagram.gif", label: "MA 2000 Series diagram" },
    ],
    sliderTitle: "PICTURE",
    slider: [
      "/images/products/ma-2000/pic1.jpg",
      "/images/products/ma-2000/pic2.jpg",
      "/images/products/ma-2000/pic3.jpg",
    ],
    downloadLinks: [
      { label: "MA 2000 series Brochure", file: "/downloads/ma-2000/SE_82_83_MA_SERIES.pdf" },
      { label: "MA 2300 시방서", file: "/downloads/ma-2000/MA-2300_Specification.hwp" },
      { label: "MA 2400 시방서", file: "/downloads/ma-2000/MA-2400_Specification.hwp" },
      { label: "MA 2600 시방서", file: "/downloads/ma-2000/MA-2600_Specification.hwp" },
      { label: "MA 2800 시방서", file: "/downloads/ma-2000/MA-2800_Specification.hwp" },
      {
        label: "MA 2300(2400/2600/2800) dwg",
        file: "/downloads/ma-2000/se_MA-2300(2400_2600_2800)_20181130.dwg",
      },
      { label: "MA-LINE 메뉴얼", file: "/downloads/ma-2000/SE-MA-Line-Manual-EN-v202302-15.pdf" },
    ],
  },
];

// Representative product images pulled from the legacy arumtech.co.kr site.
const PRODUCT_IMAGES: Record<string, string> = {
  "m-f3a-pro-max": "/images/products/m-f3a-pro-max/main.webp",
  "m-f3a-pro": "/images/products/m-f3a-pro/main.png",
  "m-f3a-fs": "/images/products/m-f3a-fs.png",
  "s15-pro": "/images/products/s15-pro/main.png",
  "l-35": "/images/products/l-35/main.png",
  "l-35-fs": "/images/products/l-35-fs/slide1.png",
  "l-65": "/images/products/l-65/slide1.png",
  "l-65-fs": "/images/products/l-65-fs/slide1.png",
  "b-15": "/images/products/b-15/main.png",
  "b-18": "/images/products/b-18/main.png",
  "b-18-wp": "/images/products/b-18-wp/main.webp",
  "ic-32": "/images/products/ic-32/main.png",
  "ic-34": "/images/products/ic-34/main.png",
  "ic-38x": "/images/products/ic-38x/main.png",
  "la-10-4d": "/images/products/la-10-4d/main.png",
  "ia-402d": "/images/products/ia-402d/main.png",
  "ma-2000": "/images/products/ma-2000/main.jpg",
  "v-l8-vlps215b": "/images/products/v-l8-vlps215b/main.png",
  "v-8": "/images/products/v-8/main.jpg",
  "v-10": "/images/products/v-10/main.jpg",
  "v-12": "/images/products/v-12/main.jpg",
  "v-15": "/images/products/v-15/main.jpg",
  "v-118b-218b": "/images/products/v-118b-218b/main.jpg",
  "cv-10i-12i-15i": "/images/products/cv-10i-12i-15i/main.jpg",
  "cv-212": "/images/products/cv-212/main.png",
  "k-10i-12i-15i": "/images/products/k-10i-12i-15i/main.jpg",
  "k-18b": "/images/products/k-18b/main.jpg",
  "c-10": "/images/products/c-10/main.jpg",
  "c-12-c-15": "/images/products/c-12-c-15/main.jpg",
  "cox-8-cox-12": "/images/products/cox-8-cox-12/main.png",
  "cox-8-wp": "/images/products/cox-8-wp/main.webp",
  "cox-12-wp": "/images/products/cox-12-wp/main.webp",
  // 원본 MF3A 대표 이미지 (직접 업로드)
  "m-f3a-w": "/images/products/m-f3a-w/main.png",
  "m-line-accessory": "/images/products/m-line-accessory/main.png",
  "m-121among2": "/images/products/m-121among2/main.jpg",
  "smx-12a": "/images/products/smx-12a/main.png",
  "smx-12": "/images/products/smx-12/main.png",
};
// 맵에 없는 제품까지 undefined 로 덮어쓰면 제품 객체에 직접 적은 image 가 조용히 사라진다.
products.forEach((p) => {
  const mapped = PRODUCT_IMAGES[p.slug];
  if (mapped) p.image = mapped;
});

// ---------------- CASE STUDIES ----------------

export const cases: CaseStudy[] = [
  {
    slug: "univ-aud",
    title: "○○대학교 대강당 음향 시스템",
    type: "학교 / 강당",
    en: "Education · Auditorium",
    region: "서울",
    used: ["M-F3A PRO", "S15 PRO"],
    summary:
      "2,200석 규모 대강당의 후면부 명료도 저하 문제를 라인어레이 기반 메인 PA로 해결.",
    problem:
      "기존 포인트소스 시스템은 강당 후면부에서 음성 명료도와 음압이 크게 떨어져, 학술 행사와 공연 모두에서 민원이 반복되었습니다.",
    solution:
      "좌우 메인에 M-F3A PRO 라인어레이 8박스를 플라잉하고, S15 PRO 서브우퍼 4기를 그라운드 스택으로 배치해 전 객석 균일 커버리지를 확보했습니다.",
    result:
      "후면부 음압 편차 ±2dB 이내, STI 0.62 달성. 음성 명료도와 음악 재생 품질이 동시에 개선되었습니다.",
  },
  {
    slug: "church-main",
    title: "○○교회 본당 라인어레이 구축",
    type: "종교시설 / 예배당",
    en: "Religious · Worship",
    region: "경기",
    used: ["M-F3A PRO", "B-18A"],
    summary:
      "3,000석 본당의 말소리 명료도와 찬양 재생을 동시에 만족시키는 프리미엄 구성.",
    problem:
      "높은 천장과 긴 잔향으로 설교 명료도가 부족했고, 찬양팀의 풀밴드 사운드를 감당할 저역이 부족했습니다.",
    solution:
      "M-F3A PRO 라인어레이를 좌우 12박스씩 플라잉, B-18A 카디오이드 서브 6기로 무대 저역 누출을 억제했습니다.",
    result:
      "설교 명료도와 찬양 임팩트를 모두 확보하고, 무대 모니터 간섭을 최소화했습니다.",
  },
  {
    slug: "city-hall",
    title: "○○시청 대회의실 / 강당",
    type: "관공서 / 회의",
    en: "Government · Conference",
    region: "부산",
    used: ["L-65", "IC 38X"],
    summary:
      "다목적 강당과 회의 공간을 분리 제어하는 스티어러블 컬럼 + 라인어레이 하이브리드.",
    problem:
      "의회·행사·강연 등 용도가 다양해 단일 구성으로는 명료도와 미관을 동시에 만족시키기 어려웠습니다.",
    solution:
      "대강당은 L-65 라인어레이, 회의 구역은 IC 38X 스티어러블 컬럼으로 벽부 설치해 시야와 음향을 모두 확보했습니다.",
    result:
      "프리셋 기반으로 용도별 즉시 전환이 가능해졌고, 관리자 운용 부담이 크게 줄었습니다.",
  },
  {
    slug: "convention",
    title: "○○컨벤션센터 전시홀",
    type: "컨벤션 / 전시",
    en: "Convention · Exhibition",
    region: "인천",
    used: ["V-12", "B-15A"],
    summary: "대공간 전시홀의 분산 음향을 V-12 포인트소스 다분할로 구성.",
    problem:
      "천장고가 낮고 면적이 넓은 전시홀에서 균일한 안내방송과 행사 음향이 필요했습니다.",
    solution: "V-12 포인트소스를 존 단위로 분산 배치하고 B-15A로 저역을 보강했습니다.",
    result: "존별 음량 제어와 비상방송 연동까지 통합 운용이 가능해졌습니다.",
  },
  {
    slug: "highschool-gym",
    title: "○○고등학교 체육관",
    type: "학교 / 체육관",
    en: "Education · Gymnasium",
    region: "대구",
    used: ["IC 38X"],
    summary: "잔향이 긴 체육관에서 스티어러블 컬럼으로 명료도를 확보한 사례.",
    problem:
      "노출 콘크리트와 철골 구조로 잔향이 길어 안내방송이 거의 들리지 않았습니다.",
    solution:
      "IC 38X 스티어러블 컬럼을 객석 방향으로 빔 스티어링해 천장·바닥 반사를 회피했습니다.",
    result:
      "동일 출력에서 명료도가 크게 향상되었고, 행사·체육 수업 모두 활용도가 높아졌습니다.",
  },
  {
    slug: "culture-hall",
    title: "○○문화회관 공연장",
    type: "공연장 / 다목적",
    en: "Performance · Multi-purpose",
    region: "광주",
    used: ["M-F3A PRO", "B-18A"],
    summary: "클래식부터 대중 공연까지 폭넓게 대응하는 다목적 공연장 메인 PA.",
    problem: "장르별 음향 요구가 달라 고정 시스템으로는 운용 유연성이 부족했습니다.",
    solution:
      "M-F3A PRO 메인 + B-18A 서브 구성에 DSP 프리셋을 장르별로 구축했습니다.",
    result: "운영팀이 장르별 프리셋만으로 빠르게 세팅을 전환할 수 있게 되었습니다.",
  },
];

// Real installation photos pulled from the legacy arumtech.co.kr reference board.
const CASE_IMAGES: Record<string, string> = {
  "univ-aud": "/images/cases/univ-aud.png",
  "church-main": "/images/cases/church-main.png",
  "city-hall": "/images/cases/city-hall.png",
  convention: "/images/cases/convention.png",
  "highschool-gym": "/images/cases/highschool-gym.png",
  "culture-hall": "/images/cases/culture-hall.png",
};
cases.forEach((c) => {
  c.image = CASE_IMAGES[c.slug];
});

export const CASE_CATEGORIES = [
  "전체",
  "학교 / 강당",
  "종교시설 / 예배당",
  "관공서 / 회의",
  "공연장 / 다목적",
  "컨벤션 / 전시",
];

// ---------------- DOWNLOADS ----------------

export const downloads: DownloadItem[] = [
  { id: 1, cat: "카탈로그", title: "M-F3A PRO 제품 카탈로그", product: "M-F3A PRO", fmt: "PDF", size: "12.4MB" },
  { id: 2, cat: "시방서", title: "M-Line 시리즈 표준 시방서", product: "M-Line", fmt: "DOCX", size: "1.8MB" },
  { id: 3, cat: "도면자료", title: "M-F3A PRO 리깅 도면 (DWG)", product: "M-F3A PRO", fmt: "DWG", size: "4.2MB" },
  { id: 4, cat: "메뉴얼", title: "LA 10.4D 파워앰프 사용 설명서", product: "LA 10.4D", fmt: "PDF", size: "8.1MB" },
  { id: 5, cat: "기술자료", title: "라인어레이 설계 가이드 화이트페이퍼", product: "전체", fmt: "PDF", size: "6.7MB" },
  { id: 6, cat: "카탈로그", title: "ARUMTECH 통합 제품 카탈로그 2026", product: "전체", fmt: "PDF", size: "34.0MB" },
  { id: 7, cat: "시방서", title: "IC 38X 컬럼 스피커 시방서", product: "IC 38X", fmt: "DOCX", size: "1.2MB" },
  { id: 8, cat: "물가정보", title: "2026 상반기 물가정보 등재 가격표", product: "전체", fmt: "PDF", size: "2.4MB" },
  { id: 9, cat: "도면자료", title: "L-65 어레이 시뮬레이션 리포트", product: "L-65", fmt: "PDF", size: "9.3MB" },
];

export const DOWNLOAD_CATEGORIES = [
  "전체",
  "카탈로그",
  "메뉴얼",
  "기술자료",
  "도면자료",
  "시방서",
  "물가정보",
];

// ---------------- INQUIRIES (admin demo) ----------------

export const inquiries: Inquiry[] = [
  { id: 1, type: "견적문의", name: "김영호", company: "서울사운드", phone: "010-2841-0042", product: "M-F3A PRO", place: "교회 / 본당", region: "경기", status: "신규", date: "2026-06-24 14:22" },
  { id: 2, type: "설치상담", name: "박지훈", company: "○○대학교 시설팀", phone: "010-7720-3318", product: "M-F3A PRO", place: "강당", region: "서울", status: "확인중", date: "2026-06-24 11:05" },
  { id: 3, type: "제품상담", name: "이수민", company: "대구교육청", phone: "010-3391-8820", product: "IC 38X", place: "체육관", region: "대구", status: "견적발송", date: "2026-06-23 16:48" },
  { id: 4, type: "A/S 문의", name: "정대현", company: "문화회관", phone: "010-5512-9043", product: "LA 10.4D", place: "공연장", region: "광주", status: "상담완료", date: "2026-06-23 09:31" },
  { id: 5, type: "견적문의", name: "최은정", company: "인천컨벤션", phone: "010-9982-1177", product: "V-12", place: "전시홀", region: "인천", status: "신규", date: "2026-06-22 18:10" },
  { id: 6, type: "제휴/기타", name: "한도윤", company: "AV렌탈하우스", phone: "010-4408-7765", product: "B-18A", place: "렌탈", region: "서울", status: "보류", date: "2026-06-22 13:55" },
];

export const STATUS_COLORS: Record<InquiryStatus, string> = {
  신규: "#6EA921",
  확인중: "#D89B2B",
  견적발송: "#5B9DD9",
  상담완료: "#2E7D5B",
  계약완료: "#2E7D5B",
  보류: "#A7A9AC",
  스팸: "#C1121F",
};

// ---------------- SITE-WIDE CONTENT ----------------

export const SITE = {
  brandName: "(주)아름텍",
  ceo: "박재성",
  bizNo: "615-86-09919",
  phone: "1800-9810",
  fax: "02-6455-9316",
  email: "se@arumtech.co.kr",
  hqAddress: "경남 김해시 장유로 194번지 투투스빌딩 2관 301호",
  seoulAddress: "서울 금천구 가산로9길 더리즌밸리 지식산업센터 1411호",
  // 본사 주소 (다른 페이지 호환용 별칭)
  address: "경남 김해시 장유로 194번지 투투스빌딩 2관 301호",
  copyright: "Copyright ⓒ 2026 아름텍 All rights reserved.",
};

export const news = [
  { date: "2022.05.30", cat: "전시회", title: "KOBA 2022 전시회 — SE AUDIOTECHNIK 신제품 출시" },
  { date: "2022.05.06", cat: "전시회", title: "ISE 2022 (Integrated Systems Europe) 참가" },
];

export const solutions = [
  { title: "국내 레퍼런스", en: "Domestic", icon: "ph ph-map-pin", art: "domestic" },
  { title: "해외 레퍼런스", en: "International", icon: "ph ph-globe-hemisphere-west", art: "international" },
  { title: "강당 / 공연장", en: "Auditorium · Hall", icon: "ph ph-microphone-stage", art: "mic" },
  { title: "관공서 / 학교", en: "Public · School", icon: "ph ph-graduation-cap", art: "cap" },
  { title: "기업 / 상업시설", en: "Corporate · Retail", icon: "ph ph-buildings", art: "buildings" },
  { title: "종교시설", en: "Worship", icon: "ph ph-church", art: "church" },
] as const;

export const asSteps = [
  { no: "01", title: "접수", desc: "전화 또는 온라인으로 A/S 요청 접수" },
  { no: "02", title: "진단", desc: "증상 확인 및 원격·현장 점검" },
  { no: "03", title: "처리", desc: "부품 교체·수리 또는 현장 출장 처리" },
  { no: "04", title: "완료", desc: "결과 보고 및 처리 이력 저장" },
];

export const CONTACT_TYPES = ["견적문의", "제품상담", "설치상담", "A/S 문의", "제휴/기타"];

export const DOWNLOAD_FMT_COLORS: Record<string, string> = {
  PDF: "#C1121F",
  DWG: "#5B9DD9",
  DOCX: "#2E7D5B",
};

export const DOWNLOAD_CAT_ICONS: Record<string, string> = {
  카탈로그: "ph ph-book-open",
  도면자료: "ph ph-blueprint",
  시방서: "ph ph-file-text",
  메뉴얼: "ph ph-book",
  물가정보: "ph ph-currency-circle-dollar",
};

// ---------------- HELPERS ----------------

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getProductByModel(model: string): Product | undefined {
  return products.find((p) => p.model === model);
}

export function featuredProducts(limit = 6): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function relatedProducts(p: Product, limit = 3): Product[] {
  return products.filter((x) => x.line === p.line && x.slug !== p.slug).slice(0, limit);
}

export function relatedCasesFor(model: string, limit = 2): CaseStudy[] {
  return cases.filter((c) => c.used.includes(model)).slice(0, limit);
}

export function downloadFmtColor(fmt: string): string {
  return DOWNLOAD_FMT_COLORS[fmt] ?? "#6EA921";
}

export function downloadCatIcon(cat: string): string {
  return DOWNLOAD_CAT_ICONS[cat] ?? "ph ph-file-pdf";
}
