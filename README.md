# nanamate

여러 학문 분야를 한 입구에서 시작하는 통합 학습 허브.

## 구성

- `index.html` — 통합 허브 (3D 디자인)
- `aboutAI/` — 인공지능 학습 사이트 (9개 장)
- `aboutPsy/` — 심리학 학습 사이트 (10개 챕터 + 퀴즈)

각 서브사이트의 사이드바 최상단에 **↑ 통합 허브** 링크가 있어 언제든 메인으로 돌아올 수 있습니다.

## 로컬 미리보기

정적 파일이라 Python 간이 서버로 충분합니다.

```bash
cd nanamate
python -m http.server 8000
# → http://localhost:8000
```

## 배포 (Cloudflare Pages)

1. GitHub에 이 레포 push
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 레포 선택 후
   - **Build command**: 비워둠
   - **Build output directory**: `/`
4. Deploy

## 새 분야 추가

1. `nanamate/` 아래에 새 폴더 생성 (예: `aboutMath/`)
2. 그 폴더의 첫 페이지(예: `index.html`) 사이드바 상단에 통합 허브 링크 삽입:
   ```html
   <a href="../index.html" class="hub-back-link" ...>↑ 통합 허브</a>
   ```
3. 루트 `index.html`의 `.card-grid` 안에 카드 추가
