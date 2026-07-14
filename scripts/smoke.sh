#!/bin/bash
# 배포 후 점검. 사용법:  bash scripts/smoke.sh https://arumtech.doweb.kr
#
# 특히 "동적 라우트 청크" 검사가 중요하다. Next 는 라우트별 JS 청크를
#   /_next/static/chunks/app/(site)/about/news/%5Bidx%5D/page-xxxx.js
# 처럼 괄호·대괄호가 든 경로로 요청한다. Apache 프록시가 이 경로를 다시 이스케이프하면
# 청크만 404 가 나고, 페이지는 200 인데 브라우저에서 "client-side exception" 으로 죽는다.
# 페이지 상태 코드만 보면 절대 안 잡히는 유형이라 청크까지 직접 확인한다.

set -u
BASE="${1:-http://localhost:3000}"
fail=0

echo "점검 대상: $BASE"
echo

echo "[1/2] 페이지"
for p in / /products /products/m-f3a-pro /cases /downloads /about /about/news /contact /support; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 30 "$BASE$p")
  if [ "$code" = "200" ]; then
    printf '  OK   %-24s %s\n' "$p" "$code"
  else
    printf '  실패 %-24s %s\n' "$p" "$code"
    fail=$((fail + 1))
  fi
done

echo
echo "[2/2] 동적 라우트 청크 (괄호·대괄호 경로)"
# 존재하지 않는 idx 라도 페이지는 렌더되고, HTML 에 그 라우트의 청크가 실려 온다.
html=$(curl -s --max-time 30 "$BASE/about/news/smoke-check")
chunks=$(printf '%s' "$html" | grep -oE '/_next/static/chunks/app/[^"]+\.js' | sort -u)

if [ -z "$chunks" ]; then
  echo "  실패 청크를 못 찾았다 — 페이지가 제대로 렌더되지 않았다"
  fail=$((fail + 1))
else
  while IFS= read -r c; do
    code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 30 "$BASE$c")
    if [ "$code" = "200" ]; then
      printf '  OK   %s\n' "$code $c"
    else
      printf '  실패 %s\n' "$code $c"
      printf '       → .htaccess 의 RewriteRule 에 NE 플래그가 빠졌을 가능성이 높다 (deploy/htaccess 참고)\n'
      fail=$((fail + 1))
    fi
  done <<< "$chunks"
fi

echo
if [ "$fail" -eq 0 ]; then
  echo "통과: 문제 없음"
else
  echo "실패 $fail 건"
  exit 1
fi
