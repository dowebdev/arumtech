#!/bin/bash
# 배포 — 서버에서 최신 master 를 받아 빌드하고 PM2 를 재시작한다.
#
#   bash scripts/deploy.sh            # 배포 + 점검
#   bash scripts/deploy.sh --check    # 접속만 확인
#   bash scripts/deploy.sh --no-smoke # 점검 생략
#
# 접속 정보는 .env.local 에서 읽는다 (DEPLOY_SSH_HOST/USER/PASS 또는 DEPLOY_SSH_KEY).
# 자세한 서버 구성은 deploy/README.md 참고.

set -uo pipefail
cd "$(dirname "$0")/.."

ENV_FILE=".env.local"
[ -f "$ENV_FILE" ] || { echo "[중단] $ENV_FILE 이 없습니다."; exit 1; }

# .env.local 에서 DEPLOY_* 만 읽는다. 값에 # 이 있어도 잘리지 않게 그대로 가져온다.
get_env() {
  grep -E "^$1=" "$ENV_FILE" | head -1 | cut -d= -f2-
}

HOST=$(get_env DEPLOY_SSH_HOST)
USER=$(get_env DEPLOY_SSH_USER)
PASS=$(get_env DEPLOY_SSH_PASS)
KEY=$(get_env DEPLOY_SSH_KEY)

[ -n "$HOST" ] && [ -n "$USER" ] || {
  echo "[중단] .env.local 에 DEPLOY_SSH_HOST / DEPLOY_SSH_USER 를 넣어주세요."; exit 1; }

# 인증 방식 결정 — 키가 있으면 키, 없으면 비밀번호(sshpass).
SSH_OPTS=(-o ConnectTimeout=15 -o StrictHostKeyChecking=accept-new)
if [ -n "$KEY" ]; then
  [ -f "$KEY" ] || { echo "[중단] DEPLOY_SSH_KEY 경로에 파일이 없습니다: $KEY"; exit 1; }
  SSH=(ssh -i "$KEY" "${SSH_OPTS[@]}")
elif [ -n "$PASS" ]; then
  command -v sshpass >/dev/null || {
    echo "[중단] 비밀번호 인증에는 sshpass 가 필요합니다."
    echo "       brew install hudochenkov/sshpass/sshpass"
    exit 1; }
  # -e 로 환경변수에서 읽는다. -p 를 쓰면 비밀번호가 프로세스 목록에 노출된다.
  export SSHPASS="$PASS"
  SSH=(sshpass -e ssh "${SSH_OPTS[@]}")
else
  echo "[중단] DEPLOY_SSH_PASS 또는 DEPLOY_SSH_KEY 중 하나를 채워주세요."; exit 1
fi

TARGET="$USER@$HOST"

echo "접속 확인: $TARGET"
if ! "${SSH[@]}" "$TARGET" 'echo ok' >/dev/null 2>&1; then
  echo "[중단] SSH 접속 실패 — 계정/비밀번호 또는 키를 확인해주세요."
  exit 1
fi
echo "  접속 성공"

if [ "${1:-}" = "--check" ]; then
  "${SSH[@]}" "$TARGET" 'echo "  서버: $(hostname)"; cd ~/app && echo "  현재 커밋: $(git log --oneline -1)"'
  exit 0
fi

# 푸시 안 한 커밋이 있으면 서버가 받아갈 수 없다.
if [ -n "$(git log origin/master..HEAD --oneline 2>/dev/null)" ]; then
  echo
  echo "[경고] 아직 푸시하지 않은 커밋이 있습니다. 서버는 이 커밋을 받지 못합니다:"
  git log origin/master..HEAD --oneline | sed 's/^/    /'
  echo
fi

echo
echo "배포 시작 — git pull → npm ci → npm run build → pm2 restart"
echo "────────────────────────────────────────────────────────────"
"${SSH[@]}" "$TARGET" 'set -e
  cd ~/app
  git pull
  npm ci
  npm run build
  pm2 restart arumtech
  echo
  echo "배포된 커밋: $(git log --oneline -1)"
  pm2 describe arumtech | grep -E "status|uptime|restarts" | head -3
'
rc=$?
echo "────────────────────────────────────────────────────────────"
[ $rc -eq 0 ] || { echo "[실패] 배포 중 오류 (종료코드 $rc)"; exit $rc; }
echo "배포 완료"

# pm2 restart 직후엔 Next 가 아직 뜨지 않아 Apache 가 503 을 낸다.
# 앱이 응답할 때까지 기다린 뒤 점검해야 한다 (기다리지 않으면 멀쩡한 배포가 실패로 보인다).
echo
echo -n "앱 기동 대기"
for i in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "https://$HOST/" || true)
  if [ "$code" = "200" ]; then echo " — 준비됨 (${i}초)"; break; fi
  echo -n "."
  sleep 1
  [ "$i" = "30" ] && { echo; echo "[실패] 30초 안에 앱이 응답하지 않습니다 (마지막 응답: $code)"; exit 1; }
done

if [ "${1:-}" != "--no-smoke" ]; then
  echo
  bash scripts/smoke.sh "https://$HOST"
fi
