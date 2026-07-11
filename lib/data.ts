// =============================================================
// ARUMTECH — central content data (frontend prototype)
// All product / case / download / inquiry content lives here.
// In a future phase this is replaced by a CMS/API layer.
// =============================================================

export type ProductLine =
  | "M-F3A PRO MAX"
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
  | "COX-Line"
  | "소형 M-Line";

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
export interface Feature {
  title: string;
  body: string;
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
  /** 사양표 위 이미지 (치수 도면 등) */
  specImage?: string;
  /** 사양표 위 모델 라벨 ("Model: M-F3A PRO") */
  specModelLabel?: string;
  /** 악세사리 (제품 상세 그리드 / 악세사리 전용 페이지 공용) */
  accessories?: Accessory[];
  /** References — 도입 사례 · 매체 리뷰 */
  references?: ProductReference[];
  /** References 뒤에 붙는 이미지 (지면 리뷰 스캔 등) */
  referenceImage?: string;
  /** 페이지 최하단 상담 유도 배너 */
  ctaImage?: string;
  ctaCaption?: string;
  /** 하단 DIAGRAM 섹션 이미지 (원본의 도해·회전 GIF) */
  diagram?: string[];
  /** 하단 이미지 슬라이더 (원본의 owl carousel) */
  slider?: string[];
  /** 슬라이더 위 제목. 원본에 제목이 없는 페이지도 있어 선택 항목이다. */
  sliderTitle?: string;
  /** 하단 동영상 (YouTube ID) */
  videoId?: string;
  /** 하단 DOWNLOAD 버튼. file 이 없으면 아직 파일을 확보하지 못한 항목이다. */
  downloadLinks?: { label: string; file?: string }[];
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
  "M-F3A PRO MAX",
  "M-Line",
  "L-Line",
  "B-Line",
  "Column",
  "Full Range",
  "Monitor",
  "Amplifiers",
];

export const LINE_DESCRIPTIONS: Record<ProductLine, string> = {
  "M-F3A PRO MAX": "플래그십 컴팩트 라인어레이",
  "M-Line": "모듈형 컴팩트 라인어레이",
  "L-Line": "대형 포맷 라인어레이",
  "B-Line": "고출력 서브우퍼",
  Column: "스티어러블 컬럼",
  "Full Range": "풀레인지 포인트소스",
  Monitor: "스테이지 모니터",
  Amplifiers: "DSP 파워앰프",
};

// Product lines that link to an external page (opened in a new tab) instead of
// the internal /products filter. Keyed by line name.
export const LINE_EXTERNAL_LINKS: Partial<Record<ProductLine, string>> = {
  "M-F3A PRO MAX": "https://se-audiotechnik.de/spotlight/m-f3a-pro-goes-max/",
};

export const LINE_ICONS: Record<ProductLine, string> = {
  "M-F3A PRO MAX": "ph ph-star",
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
  "소형 M-Line",
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
      { label: "M-Line Brochure", file: "/files/m-f3a-pro/M-Line_Brochure_EN.pdf" },
      { label: "Ease® GLL-File", file: "SE-AUDIOTECHNIK-M-F3A-PRO-V10.gll.zip" },
      { label: "M-F3A PRO 시방서", file: "/files/m-f3a-pro/M-F3A_PRO_Specification.hwp" },
      { label: "M-Line Manual", file: "/files/m-f3a-pro/M-Line_Manual.pdf" },
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
    // 원본 DOWNLOAD 4개. 파일 미확보 → 전부 준비중으로 표시된다.
    downloadLinks: [
      { label: "M-F3A Brochure" },
      { label: "M-F3A 시방서" },
      { label: "M-F3A 도면" },
      { label: "GLL Library" },
    ],
    // 대표 이미지는 파일 하단 PRODUCT_IMAGES 맵에서 지정한다.
    // 원본의 "Small size, high SPL" ~ SPECIFICATIONS 직전 구간
    features: [
      {
        title: "Small size, high SPL",
        body: "The M-F3A features small size, same front size as an A4 paper and a weight of only 8kg. Still, one unit of this compact array delivers 123dB SPL max continuously (128dB peak). Advanced cooling and venting measures keep power compression at a minimum.",
      },
      {
        title: "Plug and play",
        body: "The M-F3A is designed to perfect sound for plug and play. Built in high class SMPS technology, two channel class-D amplifier together with proprietary DSP- filtering and limiting, relives you from head aches which and how settings should be used",
      },
      {
        title: "Line source",
        body: "Each unit is already a line array in itself with very wide horizontal and precise controlled vertical dispersion.",
      },
      {
        title: "Scalable",
        body: "Because of its compact array design from the ground up, M-F3A can be scaled for a great variety of uses and venues. From single wall mounting use up to a 4.8m long array, delivering a continuous max SPL of 135dB and exceptional directivity.",
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
      { title: "M-F3A UB", desc: "The U-Bracket allows users to attach up to two M-F3A PRO units when pole mounted on any of our subwoofers via an M20 thread." },
      { title: "M-F3A UB", desc: "M20 Pole Support to pole mount an M-F3A or M-F3A PRO on any subwoofer." },
      { title: "M-F3A SFI S12 / M-F3AW SFI S12", desc: "Stacking frame for ground stacking M-F3A PRO cabinets on either S12 PRO, SUB 112BR or SUB 210BP subwoofers, also available in white." },
      { title: "M-F3A BF / M-F3AW BF", desc: "Bumper frame for flying up to 16 M-F3A or M-F3A PRO, also available in white" },
      { title: "M-F3A FS FB / M-F3A FS BFW", desc: "Multi Purpose Rigging Frame for rigging of different combinations of M-F3A and M-F3A FS, also available in white." },
      { title: "M-F3A FA34 / M-F3A FA 34 W", desc: "3 to 4 point adapter for rigging M-F3A FS and M-F3A (or M-F3A PRO), also available in white." },
      { title: "M-F3A S12 PRO FC", desc: "Flight Case for four M-F3A or M-F3A PRO." },
    ],
  },
  {
    slug: "m-f3",
    line: "M-Line",
    model: "M-F3",
    kicker: "패시브 라인어레이",
    en: "Passive Line Array",
    badge: null,
    featured: false,
    tags: ["강당", "교회", "라인어레이"],
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/MF3",
    specColumns: ["M-F3"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["3\" bassreflex"] },
          { k: "Frequency Range (-6dB)", v: ["120 Hz-18 KHz"] },
          { k: "Power Handling（RMS）", v: ["200 W"] },
          { k: "Sensitivity（1W / 1M）", v: ["100 dB"] },
          { k: "Max. SPL (1m)", v: ["126 dB"] },
          { k: "Impedance", v: ["4Ω"] },
          { k: "Dispersion（H × V）", v: ["120° × 16°"] },
          { k: "transducer MF", v: ["8 × 2.8” Neodymium Magnet with cooling module, 0.75”Voice Coil"] },
          { k: "transducer HF", v: ["7× 1”Neodymium Magnet, 1”Voice Coil"] },
          { k: "Cabinet / Paint", v: ["12mm MDF, white PU texture paint"] },
          { k: "Dimensions (W × H × D)", v: ["210 × 296 × 233 mm"] },
          { k: "Weight", v: ["5.5Kg + 5.5Kg"] },
        ],
      },
      {
        title: "M-F3 SUB",
        rows: [
          { k: "Type", v: ["10” V construction, bandpass"] },
          { k: "Frequency Range (-6dB)", v: ["40 Hz - 250 Hz"] },
          { k: "Power Handling（RMS）", v: ["400 W"] },
          { k: "Sensitivity（1W / 1M）", v: ["98 dB"] },
          { k: "Max. SPL (1m)", v: ["129 dB"] },
          { k: "Impedance", v: ["4Ω"] },
          { k: "transducer LF", v: ["2 × 10”Ferrite Magnet, 2”Voice Coil"] },
          { k: "Power Ampilifer Type", v: ["Class D amplifier, SMPS"] },
          { k: "Signal Processing", v: ["DSP, 48 kHz, 24 bits"] },
          { k: "Protection", v: ["Multiple limiter, short circuit, overheating"] },
          { k: "Controls", v: ["On / Off switch, sub level, Low pass frequency knob, 0°- 180° phase switch"] },
          { k: "Indicators", v: ["On, signal, limit, protect"] },
          { k: "Line Input / Output", v: ["input XLR/ Router-output XLR"] },
          { k: "Cabinet / Paint", v: ["15 mm plywood, black polyurea paint"] },
          { k: "Dimensions (W × H × D)", v: ["400 × 500 × 510 mm"] },
          { k: "Weight", v: ["25 Kg"] },
        ],
      },
      {
        title: "M-F3 AMP",
        rows: [
          { k: "Power Ampilifer Type", v: ["Class D amplifier, SMPS"] },
          { k: "Power Handling（RMS）", v: ["(200 W + 200 W) × 2"] },
          { k: "Input Sensitivity", v: ["- 4 dBV"] },
          { k: "Signal Processing", v: ["DSP, 48 kHz, 24 bits"] },
          { k: "Protection", v: ["Multiple limiter, short circuit, overheating"] },
          { k: "Controls", v: ["On / Off switch, Main level, Full/ SAT switch, Feedback destroy switch, Feedback destroy knob, High shelf knob"] },
          { k: "Indicators", v: ["On, signal, limit, protect"] },
          { k: "Line Input / Output", v: ["input XLR / Router-output XLR, speaker out Neutrik NL-4"] },
          { k: "Dimensions (W × H × D)", v: ["483 × 66 × 347 mm"] },
          { k: "Weight", v: ["6.5 Kg"] },
        ],
      },
    ],
  },
  {
    slug: "s12-pro",
    line: "M-Line",
    model: "S12 PRO",
    kicker: "12인치 액티브 서브우퍼",
    en: "Bassreflex",
    badge: null,
    featured: false,
    tags: ["강당", "공연장", "서브우퍼"],
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/S12PRO",
    specColumns: ["S12 PRO / S12 PRO W"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["Bassreflex"] },
          { k: "Frequency Response (-6dB)", v: ["40 - 135 Hz"] },
          { k: "Amplification (RMS / Continuous / Peak)", v: ["400 W / 800 W / 1600 W"] },
          { k: "Amplifier Type", v: ["Class D, SMPS"] },
          { k: "Sensitivity (1W/1m)", v: ["95 dB"] },
          { k: "Max SPL (@1m) *", v: ["133 dB peak*"] },
          { k: "Dispersion (H x V)", v: ["Omnidirectional"] },
          { k: "Transducers", v: ["WF: 1 x 12” ferrite magnet and 3’’ voice coil"] },
          { k: "DSP", v: ["48 kHz, 24-bit DSP processor, processing latency: 1.1 ms"] },
          { k: "Signal Processing", v: ["Speaker presets, Dealy, EQ, HPF/LPF, Parametric EQ (Q,F, Gain), RMS Limiter, Peak Limiter, Phase Invert, Mute, Output Gain"] },
          { k: "Protection", v: ["Limiter, short-circuit, over-temperature, over-current"] },
          { k: "Controls", v: ["Digital encoder with push-button"] },
          { k: "Indicators", v: ["Power On, Signal In, Limit, Protect"] },
          { k: "Audio Connectors", v: ["XLR 3-pin female line-level input, XLR 3-pin male signal link"] },
          { k: "Power Connectors", v: ["Neutrik PowerCon® type A power input, type B power link (max: 15A, max 4 pcs per line)"] },
          { k: "Hardware", v: ["2x two-point SE stacking system, M20 distance pole thread"] },
          { k: "Power Requirements", v: ["100 - 120 VAC or 220 - 240 VAC"] },
          { k: "Cabinet", v: ["15 mm plywood, black or white polyurea coating"] },
          { k: "Dimensions (W x H x D)", v: ["507 x 355 (385 with rigging) x 495 mm"] },
          { k: "Weight", v: ["23 kg"] },
        ],
      },
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
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/S15PRO",
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
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/112",
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
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/B-18",
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
  },
  {
    slug: "m-a8",
    line: "Column",
    model: "M-A8",
    kicker: "콤팩트 설치형 컬럼",
    en: "Compact Install Column",
    badge: null,
    featured: false,
    tags: ["상업시설", "호텔", "컬럼"],
    keySpecs: [
      { l: "Max.SPL (1m)", v: "131 dB" },
    ],
    sourceUrl: "https://www.arumtech.co.kr/MA8",
    specColumns: ["M-A8"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["2.1 ACTIVE INSTALLATION COLUMN SYSTEM"] },
        ],
      },
      {
        title: "Acoustical Specifications",
        rows: [
          { k: "Frequency Range (-6dB)", v: ["40 Hz - 20 kHz"] },
          { k: "Max.SPL (1m)", v: ["131 dB"] },
          { k: "Horizontal Dispersion (-6dB)", v: ["120°"] },
        ],
      },
      {
        title: "Transducer",
        rows: [
          { k: "LF", v: ["2 × 12\"Ferrit, 3\"Voice Coil"] },
          { k: "MF", v: ["16 × 3.5\" Neodymium magnet, 1\"Voice Coil"] },
          { k: "HF", v: ["2× 1\"CDX-101, 1\"Voice Coil"] },
        ],
      },
      {
        title: "Amplifier",
        rows: [
          { k: "Type", v: ["Class D amplifier, SMPS"] },
          { k: "Signal Processing", v: ["DSP, 48 kHz, 24 bits"] },
          { k: "Power Output (RMS)", v: ["Sub: 800 W Column: 800 W"] },
          { k: "Protection", v: ["Limiter, short circuit, overheating"] },
          { k: "Controls", v: ["On / Off switch, main level, sub level"] },
          { k: "Indicators", v: ["On, signal, limit, protect"] },
        ],
      },
      {
        title: "Input / Output",
        rows: [
          { k: "Line Input", v: ["XLR / 6.3 mm jack (combo) , RCA"] },
          { k: "Line Output", v: ["XLR"] },
          { k: "Processed Sub Slave Control out", v: ["XLR"] },
        ],
      },
      {
        title: "Cabinet",
        rows: [
          { k: "SUB", v: ["V construction, bandpass, 18 mm plywood, Polyurethane paint"] },
          { k: "SAT", v: ["Sealed, 6063 Aluminum, HD coating"] },
          { k: "Connector", v: ["Custom-made multipin connector"] },
        ],
      },
      {
        title: "Dimensions (W × H × D)",
        rows: [
          { k: "SUB", v: ["544 × 475 ×636 mm"] },
          { k: "Top Column: Bottom Column", v: ["120 × 977 × 192 mm 120 × 728 × 180 mm"] },
          { k: "Overall Height", v: ["2180 mm"] },
        ],
      },
      {
        title: "Weight",
        rows: [
          { k: "SUB", v: ["42.5 Kg"] },
          { k: "SAT", v: ["9.5 Kg + 6.5Kg"] },
        ],
      },
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
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/VL8-VLPS215B",
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
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/V118B-V218B",
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
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/CV10i-12i-15i",
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
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/K10i-12i-15i",
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
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/C12-C15",
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
  },
  {
    slug: "m-42g2-242g2",
    line: "Full Range",
    group: "소형 M-Line",
    model: "M-42(W)G2 / 242(W)G2",
    en: "4\" Two Way Passive Loudspeaker (sealed)",
    badge: null,
    featured: false,
    tags: [],
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/M42WG2-242WG2",
    specColumns: ["M-42(W)G2","M-242(W)G2"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["4\" Two Way Passive Loudspeaker (sealed)","4\" Two Way Passive Loudspeaker (sealed)"] },
          { k: "Frequency Response (-6 dB)", v: ["75 Hz-20 KHz","75 Hz-20 KHz"] },
          { k: "Power Handling (RMS / Peak) (AES)", v: ["60 W / 100 W","100W / 180W"] },
          { k: "Sensitivity (1W / 1M)", v: ["85 dB","88 dB"] },
          { k: "MAX SPL (1M)", v: ["103 dB","108 dB"] },
          { k: "Impedance", v: ["16 Ω","8 Ω"] },
          { k: "Dispersion (H × V)", v: ["60° × 60°","60° × 60°"] },
          { k: "LF transducer", v: ["4\"Ferrite Magnet, 1\"Voice Coil","2 × 4\"Ferrite Magnet, 1\"Voice Coil"] },
          { k: "HF transducer", v: ["Neodymium Magnet, 1\" Voice Coil","Neodymium Magnet, 1\" Voice Coil"] },
          { k: "Crossover Frequency", v: ["3.2 KHz","3.2 KHz"] },
          { k: "Input Interface", v: ["Clamp Connection","Clamp Connection"] },
          { k: "Rigging System", v: ["M6 Rigging points","M6 Rigging points"] },
          { k: "Cabinet Material/ Paint", v: ["12 mm MDF / PU Texture Paint","12 mm MDF / PU Texture Paint"] },
          { k: "Dimensions (W × H × D)", v: ["140 × 230 × 130 mm","140 × 378 × 130 mm"] },
          { k: "Net Weight", v: ["2.7 Kg","4.8 kg"] },
        ],
      },
    ],
  },
  {
    slug: "m-62g2",
    line: "Full Range",
    group: "소형 M-Line",
    model: "M-62(W)G2",
    en: "6\" Two Way Passive Loudspeaker (vented)",
    badge: null,
    featured: false,
    tags: [],
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/M62WG2-M62AWG2-M62100VWG2",
    specColumns: ["M-62 (W)G2","M-62A(W)G2","M-62 100V(W)G2"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["6\" Two Way Passive Loudspeaker (vented)","6\" Two Way Active Loudspeaker (vented)","6\" Two Way constant-voltage Loudspeaker (vented)"] },
          { k: "Frequency Response (-6 dB)", v: ["55 Hz-20 KHz","55 Hz-20 KHz","55 Hz-20 KHz"] },
          { k: "Power Handling (RMS / Peak) (AES)", v: ["80 W / 130 W","50 W","80 W / 130 W"] },
          { k: "Sensitivity (1W / 1M)", v: ["87 dB","87 dB","87 dB"] },
          { k: "MAX SPL (1M)", v: ["108 dB","107 dB","108 dB"] },
          { k: "Impedance", v: ["16 Ω","4 Ω","100 V"] },
          { k: "Dispersion (H × V)", v: ["60° × 60°","60° × 60°","60° × 60°"] },
          { k: "LF transducer", v: ["6\"Ferrite Magnet,1\"Voice Coil","6\"Ferrite Magnet,1\"Voice Coil","6\"Ferrite Magnet,1\"Voice Coil"] },
          { k: "HF transducer", v: ["Neodymium Magnet, 1\" Voice Coil","Neodymium Magnet, 1\" Voice Coil","Neodymium Magnet, 1\" Voice Coil"] },
          { k: "Crossover Frequency", v: ["2.7 KHz","2.7 KHz","2.7 KHz"] },
          { k: "Input Interface", v: ["Clamp Connection","Input: XLR / 6.3mm jack, Output: XLR","Clamp Connection"] },
          { k: "Rigging System", v: ["M6 Rigging points","M6 Rigging points","M6 Rigging points"] },
          { k: "Cabinet Material/ Paint", v: ["12 mm MDF / PU Texture Paint","12 mm MDF / PU Texture Paint","12 mm MDF / PU Texture Paint"] },
          { k: "Dimensions (W × H × D)", v: ["200 × 320 × 200 mm","200 × 320 × 200 mm","200 × 320 × 200 mm"] },
          { k: "Net Weight", v: ["4.5 kg","5.5 kg","5 kg"] },
        ],
      },
    ],
  },
  {
    slug: "m-82g2-82ag2",
    line: "Full Range",
    group: "소형 M-Line",
    model: "M-82(W)G2 / M-82AG2",
    en: "8\" Two Way Passive Loudspeaker (vented)",
    badge: null,
    featured: false,
    tags: [],
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/M82WG2-M82AWG2",
    specColumns: ["M-82 (W)G2","M-82A(W)G2"],
    specGroups: [
      {
        rows: [
          { k: "Type", v: ["8\" Two Way Passive Loudspeaker (vented)","8\" Two Way Active Loudspeaker (vented)"] },
          { k: "Frequency Response (-6 dB)", v: ["50 Hz-20 KHz","50 Hz-20 KHz"] },
          { k: "Power Handling (RMS / Peak) (AES)", v: ["120 W / 200 W","80 W"] },
          { k: "Sensitivity (1W / 1M)", v: ["93 dB","93 dB"] },
          { k: "MAX SPL (1M)", v: ["114 dB","114 dB"] },
          { k: "Impedance", v: ["8 Ω","4 Ω"] },
          { k: "Dispersion (H × V)", v: ["60° × 60°","60° × 60°"] },
          { k: "LF transducer", v: ["8\"Ferrite Magnet, 1.5\"Voice Coil","8\"Ferrite Magnet, 1.5\"Voice Coil"] },
          { k: "HF transducer", v: ["Neodymium Magnet, 1\" Voice Coil","Neodymium Magnet, 1\" Voice Coil"] },
          { k: "Crossover Frequency", v: ["2.6 KHz","Same"] },
          { k: "Input Interface", v: ["Clamp Connection","Input: XLR / 6.3mm jack Output: XLR"] },
          { k: "Rigging System", v: ["M6 Rigging points","M6 Rigging points"] },
          { k: "Cabinet Material/ Paint", v: ["12 mm MDF / PU Texture Paint","12 mm MDF / PU Texture Paint"] },
          { k: "Dimensions (W × H × D)", v: ["274 × 410 × 235 mm","274 × 410 × 235 mm"] },
          { k: "Net Weight", v: ["7.0 kg","9.7 kg"] },
        ],
      },
    ],
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
    keySpecs: [],
    sourceUrl: "https://www.arumtech.co.kr/IA202D-402D",
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
  },
];

// Representative product images pulled from the legacy arumtech.co.kr site.
const PRODUCT_IMAGES: Record<string, string> = {
  "m-f3a-pro": "/images/products/m-f3a-pro/main.png",
  "m-f3a-fs": "/images/products/m-f3a-fs.png",
  "s15-pro": "/images/products/s15-pro.png",
  "l-35": "/images/products/l-35.png",
  "l-65": "/images/products/l-65.png",
  "b-15": "/images/products/b-15a.png",
  "b-18": "/images/products/b-18a.png",
  "ic-38x": "/images/products/ic-38x.png",
  "m-a8": "/images/products/m-a8.jpg",
  "la-10-4d": "/images/products/la-10-4d.png",
  // 원본 MF3A 의 DIAGRAM 첫 이미지 (lightbox slide=0, 1000×1000 애니메이션 GIF)
  "m-f3a-w": "/images/arumtech/thumbnail/20200714/3b041165b0365.gif",
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
