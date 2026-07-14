# 배포 (arumtech.doweb.kr)

Next.js 를 PM2 로 상주시키고 Apache 가 리버스 프록시한다. 이 호스팅은 원래 정적 SPA 용으로
세팅돼 있어서(모든 요청 → `/index.html`) `.htaccess` 를 프록시용으로 교체해 쓴다.

| 항목 | 값 |
| --- | --- |
| 서버 | `arumtech.doweb.kr` (Rocky Linux 8, Apache 2.4, Node 20, PM2) |
| 앱 경로 | `~/app` (이 저장소를 배포 키로 clone) |
| 포트 | **3100** — 3000 번은 woori 백엔드 API 가 쓰고 있다 |
| PM2 이름 | `arumtech` |
| 웹 루트 | `~/public_html` (여기엔 `.htaccess` 만 있다) |
| 환경변수 | `~/app/.env.local` — 저장소에 없으므로 서버에서 직접 관리 |

## 재배포

```bash
cd ~/app && git pull && npm ci && npm run build && pm2 restart arumtech
```

배포 후 반드시 점검한다 (로컬에서 실행해도 된다):

```bash
bash scripts/smoke.sh https://arumtech.doweb.kr
```

## .htaccess

`deploy/htaccess` 가 정본이다. 서버에 반영하려면:

```bash
scp deploy/htaccess woori_api_arumtech@arumtech.doweb.kr:~/public_html/.htaccess
```

호스팅이 원래 넣어둔 SPA 용 원본은 서버의 `~/htaccess.spa.bak` 에 백업돼 있다.

### 반드시 알아야 할 함정 — RewriteRule 의 `NE` 플래그

Next 는 라우트별 JS 청크를 이런 경로로 요청한다:

```
/_next/static/chunks/app/(site)/about/news/%5Bidx%5D/page-xxxx.js
```

경로에 괄호와 대괄호가 들어간다. `NE`(noescape) 없이 프록시하면 mod_rewrite 가 경로를
다시 이스케이프해 괄호가 `%28`/`%29` 로 바뀌는데, **Next 는 그 형태를 404 로 처리한다.**
(대괄호는 `%5B` 든 리터럴 `[` 든 상관없다. 문제는 괄호다.)

증상이 고약하다:

- 페이지 자체는 **200** 이다. 상태 코드만 보는 점검은 통과한다.
- 그런데 브라우저가 청크를 못 받아서 렌더 중 죽고, 사용자에겐
  `Application error: a client-side exception has occurred` 만 보인다.
- 동적 라우트(`[idx]`, `[slug]`)가 있는 페이지에서만 터진다. 홈·목록은 멀쩡하다.

`scripts/smoke.sh` 가 이 청크를 직접 받아보고 404 면 실패시킨다. 프록시 설정을 건드렸다면
반드시 돌려볼 것.

`B` 플래그는 답이 아니다 — 괄호까지 인코딩해서 같은 증상이 난다.

## 처음부터 다시 세팅한다면

```bash
# 1) 소스 (GitHub 배포 키가 등록돼 있어야 한다)
git clone git@github.com:suni1114/arumtech.git ~/app

# 2) 환경변수 — .env.example 참고해 값을 채운다
vi ~/app/.env.local

# 3) 빌드
cd ~/app && npm ci && npm run build

# 4) PM2 (재부팅 자동 복구는 crontab 으로. pm2 startup 은 root 권한이 필요하다)
PORT=3100 HOSTNAME=127.0.0.1 pm2 start npm --name arumtech -- start
pm2 save
(crontab -l 2>/dev/null; echo "@reboot $(which pm2) resurrect") | crontab -

# 5) Apache 프록시
cp deploy/htaccess ~/public_html/.htaccess
```

제품 다운로드 파일(브로슈어·시방서·도면, 749MB)은 이 서버가 아니라 iwinv 파일서버
(`arumtech.iwinv.net`)의 `public_html/downloads` 에 있다. `NEXT_PUBLIC_PRODUCT_FILE_URL` 로 연결한다.
