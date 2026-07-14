/**
 * 문의 접수 — woori API (`x-site` 헤더 기반 멀티테넌트).
 *
 *   문자  POST {API}/message/send        { type: 2, option, to, data }
 *   이메일 POST {API}/message/send_admin  { type: 1, option, data }
 *
 * 두 채널 중 하나라도 성공하면 접수 성공으로 본다. 둘 다 실패하면 throw 한다 —
 * 고객에게 "접수되었습니다"를 보여주고 문의를 버리는 일이 없어야 한다.
 */

const API_URL = process.env.NEXT_PUBLIC_WOORI_API_URL;
const SITE_ID = process.env.NEXT_PUBLIC_WOORI_SITE_ID;

const MESSAGE_TYPE_EMAIL = 1;
const MESSAGE_TYPE_SMS = 2;

/**
 * 발송에 쓸 메시지 템플릿 번호 — 채널마다 다르다.
 *
 * 이메일: 문의 전용 템플릿(1000). 백엔드에 등록돼 있고, 문의 내용이 표로 정리돼 나간다.
 *   변수: inquiry_type · name · company_name · email · phone_number · content
 *
 * 문자: 문의 전용 템플릿(1000)이 **아직 등록돼 있지 않다** (서버가 501 을 낸다). 그래서 이미
 *   있는 공용 알림 템플릿(2)을 쓴다. 본문이 한 줄이라 문의 내용을 title 에 모아 담는다(summarize).
 *   문자용 1000 템플릿이 등록되면 NEXT_PUBLIC_INQUIRY_SMS_OPTION=1000 만 넣으면 된다.
 *
 * 두 템플릿이 요구하는 변수를 모두 실어 보내므로(payload) 번호만 바꾸면 코드는 그대로 동작한다.
 */
const EMAIL_OPTION = Number(process.env.NEXT_PUBLIC_INQUIRY_EMAIL_OPTION ?? 1000);
const SMS_OPTION = Number(process.env.NEXT_PUBLIC_INQUIRY_SMS_OPTION ?? 2);

export interface InquiryPayload {
  name: string;
  phone: string;
  email: string;
  company: string;
  category: string;
  subject: string;
  message: string;
  /** 개인정보 수집·이용 동의 여부와 동의 시각 (분쟁 시 입증용) */
  agreePrivacy: boolean;
  agreedAt: string;
}

export class InquiryConfigError extends Error {}

async function post(path: string, body: unknown): Promise<void> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-site": SITE_ID as string },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
}

/**
 * 공용 알림 템플릿(2번)은 본문이 `${module_name} 작성 알림 : [${name}] - ${title}` 한 줄이다.
 * 그대로 두면 연락처·문의 내용이 메일에 안 담기므로 title 에 전부 모아 넣는다.
 * 문의 전용 템플릿(1000)이 등록되면 그 템플릿은 개별 필드를 각각 쓰므로 이 값은 무시된다.
 */
function summarize(d: InquiryPayload): string {
  return [
    d.subject,
    `유형: ${d.category}`,
    `회사: ${d.company || "-"}`,
    `연락처: ${d.phone}`,
    `이메일: ${d.email}`,
    `내용: ${d.message}`,
  ].join(" | ");
}

/** 성공한 채널 목록을 돌려준다. 전부 실패하면 throw. */
export async function sendInquiry(data: InquiryPayload): Promise<Array<"sms" | "email">> {
  if (!API_URL || !SITE_ID) {
    throw new InquiryConfigError(
      "NEXT_PUBLIC_WOORI_API_URL 과 NEXT_PUBLIC_WOORI_SITE_ID 가 설정되지 않았습니다."
    );
  }

  // 두 채널 모두 send_admin 으로 보낸다 — 수신처(관리자 이메일·연락처)는 사이트 설정을 따르므로
  // 코드가 번호를 들고 있을 필요가 없다.
  //
  // 템플릿마다 쓰는 변수 이름이 달라서, 필요한 이름을 모두 실어 보낸다. 템플릿은 자기가 쓰는
  // 것만 꺼내 쓰고 나머지는 무시하므로 안전하다.
  //   · 공용 알림(2)      : module_name, name, title
  //   · 문의 전용(1000)   : inquiry_type, name, company_name, email, phone_number, content
  const payload = {
    ...data,
    // 공용 알림 템플릿(2)용
    module_name: "홈페이지 문의",
    title: summarize(data),
    // 문의 전용 템플릿(1000)용
    inquiry_type: data.category,
    company_name: data.company,
    phone_number: data.phone,
    content: data.message,
  };

  const sent: Array<"sms" | "email"> = [];

  try {
    await post("/message/send_admin", {
      type: MESSAGE_TYPE_EMAIL,
      option: EMAIL_OPTION,
      data: payload,
    });
    sent.push("email");
  } catch (err) {
    console.error("이메일 발송 실패:", err);
  }

  try {
    await post("/message/send_admin", {
      type: MESSAGE_TYPE_SMS,
      option: SMS_OPTION,
      data: payload,
    });
    sent.push("sms");
  } catch (err) {
    console.error("문자 알림 발송 실패:", err);
  }

  if (sent.length === 0) throw new Error("문자·이메일 발송이 모두 실패했습니다.");
  return sent;
}
