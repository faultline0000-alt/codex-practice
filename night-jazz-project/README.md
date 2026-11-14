# Night Jazz 프로젝트 (20곡)

레퍼런스: Every Night Jazz – "Late Night Jazz Music | Smooth Piano Jazz Instrumental For Deep Sleep And Quiet City View"
(https://youtu.be/hQYPtE0BzD8) — 느낌만 참고, 원곡 멜로디/음원 사용 금지.

## 컨셉
- 장르: 레이트나이트 스무스 / 라운지 재즈, 재즈 발라드
- BPM: 58–85 (대부분 60–80 발라드 템포)
- 악기: 그랜드 피아노 중심 + 업라이트 베이스, 브러시 드럼, 테너 색소폰, 뮤트 트럼펫
- 질감: 바이닐 크래클, 진공관/테이프 따뜻함, 넓은 리버브
- 정서: 비 오는 도시의 밤, 고독, 낭만, 평온, 수면

## 진행 체크리스트
- [ ] Suno로 20곡 생성 (`suno-prompts.md`)
- [ ] 곡별 2~4개 버전 중 베스트 선택 → `02_selected/`
- [ ] 음량 통일(-14 LUFS), 바이닐 노이즈, 크로스페이드 → `03_master/`
- [ ] 배경 영상/썸네일 제작 → `04_visual/`
- [ ] 최종 영상 렌더 → `05_export/`
- [ ] 제목/설명/타임스탬프/태그 작성 → 업로드 (AI 생성 콘텐츠 표시 확인)

## 내 컴퓨터 폴더 구조 (권장)
```
NightJazz_Vol1/
├── 01_suno_raw/      # Suno에서 받은 원본 (곡당 여러 버전)
├── 02_selected/      # 곡별 베스트 1개 (01_Midnight_Window.wav ...)
├── 03_master/        # 음량/질감 정리된 최종 오디오
├── 04_visual/        # 배경 이미지, 루프 영상, 썸네일
├── 05_export/        # 최종 렌더 영상
└── docs/             # 이 README, suno-prompts.md, 업로드 문구
```
