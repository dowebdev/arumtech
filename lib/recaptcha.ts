/**
 * Google reCAPTCHA v3 — 문의 폼 봇 차단.
 *
 * v3 는 사용자에게 아무것도 묻지 않는다. 스크립트가 행동을 관찰해 점수를 매기고,
 * 그 결과를 담은 토큰을 발급한다. 검증(점수 판정)은 우리가 하지 않고 woori 백엔드가 한다 —
 * 브라우저는 토큰을 만들어 `/message/send_admin` 의 `captcha_token` 으로 넘기기만 하면 된다.
 * 그래서 이 파일엔 비밀키가 없고, 있을 필요도 없다.
 *
 * 사이트키가 없으면 토큰 없이 진행한다. `captcha_token` 은 API 스펙상 선택값이라
 * 백엔드가 캡차를 켜기 전까지는 그대로 접수된다 — 설정이 덜 됐다고 문의가 막히면 안 된다.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

/** 토큰 유효시간은 2분이다. 폼을 열어둔 채 한참 뒤 보내면 만료되므로 제출 시점에 발급한다. */
declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

export function isCaptchaEnabled(): boolean {
  return Boolean(SITE_KEY);
}

let scriptLoad: Promise<void> | undefined;

/**
 * 스크립트를 한 번만 받아온다. 폼이 열릴 때 미리 불러두면 제출이 그만큼 빨라진다.
 * 실패해도 reject 하지 않는다 — 캡차 때문에 문의가 막히는 쪽이 봇보다 나쁘다.
 */
export function loadCaptcha(): Promise<void> {
  if (!SITE_KEY) return Promise.resolve();
  if (scriptLoad) return scriptLoad;

  scriptLoad = new Promise<void>((resolve) => {
    if (window.grecaptcha) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      // 다음 시도에서 다시 받아볼 수 있게 캐시를 비운다.
      scriptLoad = undefined;
      console.error("reCAPTCHA 스크립트를 불러오지 못했습니다.");
      resolve();
    };
    document.head.appendChild(s);
  });

  return scriptLoad;
}

// 배지 숨김은 CSS 로 한다 (app/globals.css 의 .grecaptcha-badge).
// 스크립트 onload 뒤에 querySelector 로 찾아 숨기는 방법은 통하지 않는다 —
// onload 는 스크립트를 받은 시점이고 배지는 그 뒤에 grecaptcha 가 삽입하므로 아직 없다.

/**
 * 토큰을 발급한다. 사이트키가 없거나 스크립트가 죽었으면 undefined 를 준다 (호출부는 그냥 진행한다).
 *
 * v3 토큰은 **1회용**이다 — 같은 토큰으로 두 번 검증하면 두 번째는 실패한다.
 * 요청 하나당 한 번씩 새로 부를 것.
 */
export async function getCaptchaToken(action: string): Promise<string | undefined> {
  if (!SITE_KEY) return undefined;

  await loadCaptcha();
  const g = window.grecaptcha;
  if (!g) return undefined;

  try {
    await new Promise<void>((resolve) => g.ready(resolve));
    return await g.execute(SITE_KEY, { action });
  } catch (err) {
    console.error("reCAPTCHA 토큰 발급 실패:", err);
    return undefined;
  }
}
