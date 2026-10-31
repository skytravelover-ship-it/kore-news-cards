# Kore'de Bugün (@korede.bugun) · Hoy en Corea (@hoy.encorea)

한국 뉴스 카드 자동 게시 저장소. 운영 문서는 로컬 `기획안.md`, 매일 절차는 `kore-news-daily` 스킬.

- `posts/<lang>/<id>/` 게시물 (캐러셀 JPEG, 릴스 mp4, 캡션). GitHub Pages로 공개되어 인스타 API가 가져감
- `uploader/queue.json` 게시 일정, `uploader/state.json` 게시 기록
- `.github/workflows/news-publish.yml` 15분마다 실행

시크릿: IG_USER_ID_TR, IG_ACCESS_TOKEN_TR, IG_USER_ID_ES, IG_ACCESS_TOKEN_ES (선택: THREADS_*)
