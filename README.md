# DDM KOREAN SERIES 2026

## GitHub에 업로드할 파일

GitHub 저장소 최상위에 이 폴더의 **내용물**을 그대로 업로드하세요:

- `public/index.html` : 웹앱 화면 및 점수 입력
- `public/logo.png` : 대회 로고
- `netlify/functions/league.mjs` : 여러 기기에서 공유하는 기록 API
- `netlify.toml` : Netlify 배포 설정
- `package.json` : Netlify Blobs 의존성

## Netlify 연결

1. GitHub 저장소를 만들고 위 파일/폴더를 업로드합니다.
2. Netlify의 **Add new project → Import an existing project**에서 GitHub 저장소를 선택합니다.
3. Build command는 비워 두고, Publish directory가 `public`인지 확인합니다. `netlify.toml`에 이미 적혀 있습니다.
4. Netlify 사이트의 **Project configuration → Environment variables**에서 `LEAGUE_ADMIN_PIN`을 만들고 외부에 공개하지 않을 긴 PIN을 입력합니다. Functions 런타임에서 읽을 수 있도록 설정합니다.
5. 배포 후 Netlify 제공 사이트 주소로 접속합니다. 기록을 처음 입력할 때 관리자 PIN을 한 번 묻습니다.
6. 서로 다른 기기에서 같은 배포 URL을 열면 입력된 결과와 관람 학급이 최대 약 10초 간격으로 새로 고쳐집니다.

### 주의

- **Firebase를 사용하지 않습니다.** 점수와 관람 학급은 GitHub가 아니라 Netlify Blobs에 저장되며, GitHub/Netlify 재배포 이후에도 유지됩니다.
- 기존 기기의 localStorage 기록은 자동으로 Netlify에 업로드되지 않습니다. 신규 사이트는 빈 결과로 시작합니다. 기존 기록이 있으면 경기별로 다시 저장해야 합니다.
- Netlify Functions와 Blobs가 없는 단순 파일 실행에서는 이전처럼 브라우저 로컬 저장으로 동작합니다.
- 화면이 공개되어 있어도 입력은 PIN을 아는 사람만 할 수 있습니다. PIN을 GitHub 파일에 적지 마세요.
- 같은 경기의 점수를 동시에 다른 기기에서 수정하면 마지막으로 저장한 값이 적용될 수 있습니다.
- 초기 배포 및 서비스 연결은 사용자의 GitHub/Netlify 계정에서 직접 진행해야 합니다.
