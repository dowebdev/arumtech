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
const SMS_TO = process.env.NEXT_PUBLIC_INQUIRY_SMS_TO;

const MESSAGE_TYPE_EMAIL = 1;
const MESSAGE_TYPE_SMS = 2;
const MESSAGE_OPTION = 1000;

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

/** 성공한 채널 목록을 돌려준다. 전부 실패하면 throw. */
export async function sendInquiry(data: InquiryPayload): Promise<Array<"sms" | "email">> {
  if (!API_URL || !SITE_ID) {
    throw new InquiryConfigError(
      "NEXT_PUBLIC_WOORI_API_URL 과 NEXT_PUBLIC_WOORI_SITE_ID 가 설정되지 않았습니다."
    );
  }

  const sent: Array<"sms" | "email"> = [];

  if (SMS_TO) {
    try {
      await post("/message/send", {
        type: MESSAGE_TYPE_SMS,
        option: MESSAGE_OPTION,
        to: SMS_TO,
        data,
      });
      sent.push("sms");
    } catch (err) {
      console.error("문자 알림 발송 실패:", err);
    }
  }

  try {
    await post("/message/send_admin", {
      type: MESSAGE_TYPE_EMAIL,
      option: MESSAGE_OPTION,
      data,
    });
    sent.push("email");
  } catch (err) {
    console.error("이메일 발송 실패:", err);
  }

  if (sent.length === 0) throw new Error("문자·이메일 발송이 모두 실패했습니다.");
  return sent;
}
