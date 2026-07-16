#!/usr/bin/env python3
"""
설치사례 마이그레이션 — 구 사이트(아임웹) 엑셀 → woori API.

  python3 scripts/migrate-cases.py --dry-run          # 변환만, 업로드·등록 안 함
  python3 scripts/migrate-cases.py --row 2            # 특정 행 1건만
  python3 scripts/migrate-cases.py --all              # 전체 (오래된 글부터)
  python3 scripts/migrate-cases.py --list-existing    # 게시판 현황
  python3 scripts/migrate-cases.py --delete IDX       # 특정 글 삭제

본문 이미지는 cdn.imweb.me 에서 받아 우리 파일서버로 재업로드하고 src 를 치환한다.
등록한 글은 대장(ledger)에 남겨 재실행 시 중복 등록하지 않는다.

API 계약은 lib/contents-write.ts · lib/auth.ts 와 동일하게 맞췄다.
"""

import argparse
import datetime
import html
import json
import os
import re
import sys
import urllib.parse
from pathlib import Path

import openpyxl
import requests

ROOT = Path(__file__).resolve().parent.parent
# macOS 는 한글 파일명을 NFD 로 저장해 한글 glob 패턴이 빗나간다. 확장자로만 찾는다.
XLSX = next(iter(sorted((ROOT / "resource").glob("*.xlsx"))), None)
LEDGER = ROOT / "scripts" / ".migrate-cases-ledger.json"

BOARD = "cases"
MODULE_IDX = "019f4a04-2c98-775b-bea6-dbd6f3ef7125"
FILE_TYPE_IMAGE = 3
PERMIT_PUBLIC = 0
DATE_END_FAR = "2099-12-31"

# 원본 CDN 이 hotlink 를 막아 Referer 가 필요하다.
DL_HEADERS = {
    "Referer": "https://www.arumtech.co.kr/",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
}

# 카테고리 공란 3건 — 제목 기준으로 지정 (사용자 확정).
CATEGORY_OVERRIDE = {
    2: "종교시설",        # 서울 ** 성당 대성전
    3: "기업/상업시설",   # 가평 00리조트 클럽
    4: "International",   # SE-AUDIO 상하이공장 야외시연장
}

# 원본이 삭제돼 404 인 호스트. 이 호스트를 가리키는 <img> 는 태그째 제거한다 (행84).
DEAD_IMG_HOST = "se-audiotechnik.de"

VALID_CATEGORIES = {
    "Domestic", "International", "강당/공연장",
    "관공서/학교", "기업/상업시설", "종교시설",
}


def load_env() -> dict:
    env = {}
    path = ROOT / ".env.local"
    if not path.exists():
        sys.exit("[중단] .env.local 이 없습니다.")
    for line in path.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip()
    return env


ENV = load_env()
API = ENV.get("NEXT_PUBLIC_WOORI_API_URL", "")
SITE = ENV.get("NEXT_PUBLIC_WOORI_SITE_ID", "")
FILE_URL = ENV.get("NEXT_PUBLIC_WOORI_FILE_URL", "")


def login() -> str:
    uid, pw = ENV.get("WOORI_ADMIN_ID"), ENV.get("WOORI_ADMIN_PW")
    if not uid or not pw:
        sys.exit("[중단] .env.local 에 WOORI_ADMIN_ID / WOORI_ADMIN_PW 를 넣어주세요.")
    r = requests.post(
        f"{API}/members/login",
        headers={"Content-Type": "application/json", "x-site": SITE},
        json={"member_id": uid, "member_pw": pw, "member_type": 0},
        timeout=30,
    )
    body = r.json()
    token = (body.get("auth") or {}).get("access_token")
    if not token:
        msg = body.get("message")
        sys.exit(f"[중단] 로그인 실패: {msg}")
    print(f"  로그인 성공 — {(body.get('data') or {}).get('member_id')}")
    return token


def read_rows() -> list[dict]:
    if XLSX is None:
        sys.exit("[중단] resource/설치사례_*.xlsx 를 찾지 못했습니다.")
    ws = openpyxl.load_workbook(XLSX)["Sheet1"]
    rows = []
    for r in range(2, ws.max_row + 1):
        title = ws.cell(r, 3).value
        if not title:
            continue
        cat = ws.cell(r, 1).value or CATEGORY_OVERRIDE.get(r, "")
        if cat and cat not in VALID_CATEGORIES:
            sys.exit(f"[중단] 행{r}: 알 수 없는 카테고리 {cat!r}")
        rows.append({
            "row": r,
            "post_no": str(ws.cell(r, 2).value or ""),
            "category": cat,
            "title": str(title).strip(),
            "html": ws.cell(r, 4).value or "",
            "written_at": ws.cell(r, 7).value or "",
            "ip": str(ws.cell(r, 8).value or "0.0.0.0"),
            "views": int(ws.cell(r, 9).value or 0),
        })
    return rows


def order_val_of(written_at: str) -> int:
    """작성시각(KST 문자열) → epoch ms. 정렬 기준 필드."""
    dt = datetime.datetime.strptime(written_at, "%Y-%m-%d %H:%M:%S")
    kst = datetime.timezone(datetime.timedelta(hours=9))
    return int(dt.replace(tzinfo=kst).timestamp() * 1000)


def strip_dead_images(body: str) -> tuple[str, int]:
    """원본이 사라진 이미지의 <img> 를 태그째 제거."""
    pattern = re.compile(r'<img\b[^>]*?>', re.I)
    removed = 0

    def drop(m):
        nonlocal removed
        if DEAD_IMG_HOST in m.group(0):
            removed += 1
            return ""
        return m.group(0)

    return pattern.sub(drop, body), removed


def public_url(meta: dict) -> str:
    """lib/contents-write.ts 의 publicUrl 과 동일 규칙."""
    q = urllib.parse.urlencode({
        "permit_level": str(PERMIT_PUBLIC),
        "file_path": meta.get("file_path") or "",
        "file_name_origin": meta.get("file_name_origin") or "",
        "file_name_real": meta.get("file_name_real") or "",
    })
    return f"{FILE_URL}/files/get.php?{q}"


def upload_image(src: str) -> str:
    """원본 이미지를 받아 파일서버로 올리고 공개 URL 을 돌려준다."""
    got = requests.get(src, headers=DL_HEADERS, timeout=60)
    got.raise_for_status()
    name = os.path.basename(urllib.parse.urlparse(src).path) or "image.jpg"

    # post.php 는 인증도 x-site 도 보지 않는다. 헤더를 붙이면 CORS 에 막히므로 아무것도 싣지 않는다
    # (lib/contents-write.ts:203-209 주석 참고).
    up = requests.post(
        f"{FILE_URL}/files/post.php",
        files={"file": (name, got.content)},
        data={
            "file_path": BOARD,
            "file_type": str(FILE_TYPE_IMAGE),
            "permit_level": str(PERMIT_PUBLIC),
        },
        timeout=180,
    )
    up.raise_for_status()
    meta = (up.json() or {}).get("data") or {}
    if not meta.get("file_name_real"):
        raise RuntimeError(f"업로드 응답에 file_name_real 없음: {up.text[:200]}")
    return public_url(meta)


def rewrite_body(body: str, dry: bool) -> tuple[str, dict]:
    """죽은 이미지를 걷어내고, 살아있는 이미지를 재업로드해 src 를 치환한다."""
    body, dead = strip_dead_images(body)
    srcs = re.findall(r'<img\b[^>]*?\bsrc="([^"]+)"', body, re.I)
    stats = {"dead_removed": dead, "uploaded": 0, "total": len(srcs)}

    for src in dict.fromkeys(srcs):
        if dry:
            stats["uploaded"] += 1
            continue
        new = upload_image(src)
        # 속성값이므로 & 를 &amp; 로 이스케이프한다 (기존 글도 같은 형태로 저장돼 있다).
        body = body.replace(f'src="{src}"', f'src="{html.escape(new, quote=True)}"')
        stats["uploaded"] += 1
        print(f"      이미지 → {new[:78]}...")
    return body, stats


def create_post(item: dict, body: str, token: str) -> str:
    payload = {
        "module_idx": MODULE_IDX,
        "title": item["title"],
        "content": body,
        "is_html": 1,
        "extras": json.dumps(
            {"isPinned": 0, "category": item["category"], "listImage": ""},
            ensure_ascii=False,
        ),
        "ip": item["ip"],
        # 조회수(count_read)는 보내지 않는다. 스키마에는 있지만 서버가 POST·PUT 양쪽에서 무시하고
        # 글을 읽을 때만 증가시킨다 (전체 필드 PUT·타입 변경·유사 필드명까지 실측으로 확인).
        # 원본 날짜(date_active)도 서버가 생성시각으로 강제한다. 둘 다 복구 불가 — 사용자 확정.
        # order_val 은 반영되므로 정렬 순서는 원본대로 유지된다.
        "order_val": order_val_of(item["written_at"]),
        "date_end": DATE_END_FAR,
        "is_hidden_list": 0,
    }
    r = requests.post(
        f"{API}/contents",
        headers={
            "Content-Type": "application/json",
            "x-site": SITE,
            "Authorization": f"Bearer {token}",
        },
        json=payload,
        timeout=60,
    )
    body_json = r.json()
    if body_json.get("statusCode") != 200:
        raise RuntimeError(f"등록 실패: {body_json.get('message')}")
    idx = (body_json.get("data") or {}).get("idx")
    if not idx:
        raise RuntimeError(f"등록 응답에 idx 없음: {str(body_json)[:200]}")
    return idx


def delete_post(idx: str, token: str) -> None:
    r = requests.delete(
        f"{API}/contents",
        headers={
            "Content-Type": "application/json",
            "x-site": SITE,
            "Authorization": f"Bearer {token}",
        },
        json={"idx": idx},
        timeout=30,
    )
    body = r.json()
    if body.get("statusCode") != 200:
        raise RuntimeError(f"삭제 실패: {body.get('message')}")


def list_existing() -> list[dict]:
    r = requests.get(
        f"{API}/contents/list",
        headers={"x-site": SITE},
        params={"module_idx": MODULE_IDX, "page": 1, "limit": 200, "content_load": 1},
        timeout=60,
    )
    return r.json().get("list") or []


def load_ledger() -> dict:
    return json.loads(LEDGER.read_text()) if LEDGER.exists() else {}


def save_ledger(led: dict) -> None:
    LEDGER.write_text(json.dumps(led, ensure_ascii=False, indent=2))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--row", type=int, help="특정 행 1건만")
    ap.add_argument("--all", action="store_true", help="전체")
    ap.add_argument("--dry-run", action="store_true", help="업로드·등록 없이 변환만")
    ap.add_argument("--list-existing", action="store_true", help="게시판 현황")
    ap.add_argument("--delete", metavar="IDX", help="특정 글 삭제")
    a = ap.parse_args()

    if a.list_existing:
        items = list_existing()
        print(f"설치사례 게시판: {len(items)}건")
        for i in items:
            ex = json.loads(i.get("extras") or "{}")
            print(f"  {i['idx']}  {(i.get('title') or '')[:34]:36s} "
                  f"cat={ex.get('category','')!r:16s} views={i.get('count_read')}")
        return

    if a.delete:
        delete_post(a.delete, login())
        print(f"삭제 완료: {a.delete}")
        return

    rows = read_rows()
    if a.row:
        rows = [x for x in rows if x["row"] == a.row]
        if not rows:
            sys.exit(f"[중단] 행{a.row} 을 찾지 못했습니다.")
    elif not a.all:
        sys.exit("--row N / --all / --dry-run 중 하나를 지정하세요.")

    # 오래된 글부터 등록한다. order_val 을 서버가 덮어써도 최종 정렬이 원본 연대순과 맞는다.
    rows.sort(key=lambda x: x["written_at"])

    ledger = load_ledger()
    token = None if a.dry_run else login()

    done = skipped = failed = 0
    for item in rows:
        tag = f"행{item['row']:3d} [{item['category'] or '(공란)':>12s}] {item['title'][:30]}"
        if item["post_no"] in ledger:
            print(f"  건너뜀 {tag} — 이미 등록됨 ({ledger[item['post_no']]['idx']})")
            skipped += 1
            continue

        print(f"\n  {tag}")
        try:
            body, stats = rewrite_body(item["html"], a.dry_run)
            print(f"      이미지 {stats['uploaded']}장"
                  + (f", 404 제거 {stats['dead_removed']}장" if stats["dead_removed"] else "")
                  + f" | 조회수 {item['views']} | order_val {order_val_of(item['written_at'])}")
            if a.dry_run:
                left = len(re.findall(r'cdn\.imweb\.me|' + DEAD_IMG_HOST, body))
                print(f"      [dry-run] 등록 안 함 (본문 {len(body)}자, 외부URL 잔존 {left}건)")
                done += 1
                continue
            idx = create_post(item, body, token)
            ledger[item["post_no"]] = {"idx": idx, "row": item["row"], "title": item["title"]}
            save_ledger(ledger)
            print(f"      등록 완료 → {idx}")
            done += 1
        except Exception as e:
            print(f"      [실패] {e}")
            failed += 1

    print(f"\n완료: {done}건 / 건너뜀 {skipped}건 / 실패 {failed}건")
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
