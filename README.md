# 2026 DDM KOREA SERIES — 공유 기록 버전

## GitHub에 올릴 파일
저장소 최상위에 `public/`, `netlify/functions/`, `package.json`, `netlify.toml`을 그대로 배치합니다.
기존 파일은 같은 경로에 덮어씁니다. `public/mikasa-ball.webp`도 꼭 업로드하세요.

## Netlify 연결
1. Netlify에서 기존 GitHub 저장소에 연결된 사이트를 확인합니다.
2. 변경 사항을 GitHub에 Commit 하면 Netlify가 자동으로 다시 배포합니다.
3. Deploy log에서 Functions 배포 오류가 없는지 확인합니다.
4. 사이트에서 경기 결과를 입력하고 다른 기기에서 10초 정도 후 같은 결과가 나오는지 확인합니다.

## 공유 저장 동작
- Firebase 없음, PIN 없음. Netlify Functions + Netlify Blobs(`ddm-league-2026` 사이트 공용 저장소)를 사용합니다.
- `LEAGUE_ADMIN_PIN` 환경변수는 더 이상 필요하지 않습니다.
- 경기별로 저장해 다른 경기 입력이 덮어쓰기되는 위험을 줄였습니다.
- 연결 오류가 뜨면 다른 기기에 저장됐다고 가정하지 마세요. Netlify의 Functions 로그를 확인하세요.
- `index.html`을 직접 더블클릭해 열면 이 브라우저에만 저장됩니다. **모든 기기 공유는 배포된 Netlify URL에서만 작동합니다.**
- PIN이 없으므로 사이트 주소를 아는 누구나 결과를 입력/수정/삭제할 수 있습니다. URL 공유 범위에 주의하세요.
- 기존 브라우저 로컬 기록은 Netlify Blobs로 자동 이전되지 않습니다.
