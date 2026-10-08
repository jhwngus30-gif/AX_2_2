# 등장인물 이미지 가이드

이 폴더(`trade-novel/img/`)에 아래 파일 이름 그대로 이미지를 올리면 게임이 자동으로 불러옵니다.
파일이 없으면 캐릭터 색의 도형 아바타가 대신 나옵니다. 일부만 올려도 됩니다.

## 공통 규격

| 항목 | 권장 |
|---|---|
| 형식 | `.png` (배경 투명 권장) — `.webp`도 가능하지만 이름은 `.png`로 맞춰 주세요 |
| 비율·크기 | 정사각형 1:1, 512×512 이상 |
| 구도 | 가슴 위 상반신, 정면 또는 살짝 비스듬히, 머리 위 여백 약간 |
| 화풍 | 6명 모두 같은 화풍 (같은 도구·같은 스타일 문구로 생성) |
| 표정 세트 | 같은 인물은 옷·머리·각도를 고정하고 표정만 바꾸기 |
| 주의 | 모두 가상 인물. 실존 인물·실제 회사 로고와 닮지 않게 |

공통 스타일 문구 (모든 프롬프트 앞에 붙이기):

```
Korean visual novel character portrait, clean anime-style illustration, soft cel shading,
bust-up, facing viewer, plain transparent background, consistent character design, office setting attire
```

파일 이름 규칙: `{캐릭터id}_{표정}.png` — 예: `han_angry.png`
`{캐릭터id}_normal.png` 하나만 있으면 모든 표정에 그 그림을 씁니다.

---

## 1. 한 대리 — `han` (선배 사수)

- **인상**: 30대 초반 한국인 남성. 날카로운 눈매, 짧게 정리한 검은 머리, 피곤해 보이지만 일 잘하는 사람.
- **옷차림**: 소매를 걷은 흰 셔츠, 느슨한 남색 넥타이, 사원증 목걸이. 손에 서류 뭉치나 볼펜.
- **성격**: 반말, 까칠하고 직설적. 답을 먼저 주지 않고 질문으로 찾게 한다. 스스로 찾으면 인정한다.
- **테마 색**: 남색 `#2f4b7c`

| 파일 | 표정 | 쓰이는 때 |
|---|---|---|
| `han_normal.png` | 무표정, 살짝 귀찮은 듯 | 기본 |
| `han_question.png` | 한쪽 눈썹 올리고 팔짱, "그래서?" | 되묻기, 힌트 대신 질문 |
| `han_angry.png` | 미간 찌푸림, 서류를 책상에 탁 | 서류 실수가 드러났을 때 |
| `han_approve.png` | 입꼬리만 살짝, 고개 끄덕 | 플레이어가 스스로 답을 찾았을 때 |
| `han_sigh.png` | 눈 감고 한숨, 이마 짚기 | 플레이어가 모른 채 넘어갔을 때 |

```
Korean man in early 30s, sharp eyes, short neat black hair, slightly tired look,
white dress shirt with rolled-up sleeves, loose navy tie, employee ID lanyard, holding documents
```

## 2. 문 팀장 — `moon` (팀장)

- **인상**: 40대 중반 한국인 여성. 단정한 단발에 옅은 흰머리 몇 가닥, 얇은 안경, 차분하고 따뜻한 눈.
- **옷차림**: 회색 재킷, 차분한 블라우스. 머그잔이나 태블릿.
- **성격**: 존댓말 섞인 차분한 말투. 사고 뒤에만 등장. 탓하지 않고 "지금 할 수 있는 것부터 봅시다".
- **테마 색**: 짙은 청록 `#2a7f7a`

| 파일 | 표정 | 쓰이는 때 |
|---|---|---|
| `moon_normal.png` | 차분한 무표정 | 기본, 상황 파악 |
| `moon_serious.png` | 안경 고쳐 쓰며 진지 | 피해 규모를 짚을 때 |
| `moon_thinking.png` | 턱에 손, 생각 중 | 플레이어에게 수습안을 물을 때 |
| `moon_smile.png` | 부드러운 미소 | 수습안을 잘 냈을 때, 격려 |

```
Korean woman in mid 40s, neat bob haircut with a few gray strands, thin-rimmed glasses,
calm warm eyes, charcoal gray blazer over a soft blouse, holding a mug
```

## 3. Dana Carter — `dana` (정상 미국 바이어)

- **인상**: 30대 후반 미국인 여성. 웨이브 진 갈색 머리, 밝고 자신감 있는 표정.
- **옷차림**: 네이비 블레이저, 노트북 앞 화상회의 느낌. 귀에 작은 무선 이어폰.
- **성격**: 메일 말투, 친절하지만 가격·조건 흥정에 능하다.
- **테마 색**: 코랄 `#d9644a`

| 파일 | 표정 | 쓰이는 때 |
|---|---|---|
| `dana_normal.png` | 밝은 비즈니스 미소 | 기본, 인사 |
| `dana_negotiate.png` | 한쪽 입꼬리, 계산하는 눈빛 | 가격·조건 흥정 |
| `dana_concerned.png` | 눈썹 모으고 걱정 | 문제 제기, 클레임 |
| `dana_happy.png` | 활짝 웃음 | 합의, 거래 성사 |

```
American woman in late 30s, wavy shoulder-length brown hair, confident friendly expression,
navy blazer, small wireless earbud, video-call business look
```

## 4. Marcus Reed — `marcus` (수상한 바이어, 사기 장면 전용)

- **인상**: 40대 남성, 국적 애매. 완벽하게 넘긴 머리, 지나치게 하얀 치아, 너무 매끈한 인상.
- **옷차림**: 광택 있는 고급 정장, 금색 손목시계, 행커치프.
- **성격**: 다정하고 칭찬이 많으며 계속 재촉한다. 호의를 내세워 원칙을 건너뛰게 만든다.
- **테마 색**: 금빛 갈색 `#b8862b`
- **팁**: 처음엔 "좋은 사람"처럼 보이되, 눈이 웃지 않는 느낌을 살짝 넣으면 좋습니다.

| 파일 | 표정 | 쓰이는 때 |
|---|---|---|
| `marcus_normal.png` | 과하게 친절한 미소 | 기본, 칭찬 |
| `marcus_urgent.png` | 미소 유지한 채 손목시계 가리킴 | 재촉 |
| `marcus_cold.png` | 미소가 사라진 차가운 무표정 | 플레이어가 원칙을 지켜 거절했을 때 |

```
man in his 40s, ambiguous nationality, slicked-back hair, very white smile, too-polished look,
glossy expensive suit, gold wristwatch, pocket square, smile that does not reach the eyes
```

## 5. 구 계장 — `gu` (은행 수출입 창구)

- **인상**: 50대 초반 한국인 남성. 반백의 가르마 머리, 돋보기 안경, 무덤덤한 표정.
- **옷차림**: 은행원 조끼(베이지·회색), 흰 셔츠, 창구 명패 느낌.
- **성격**: 건조한 존댓말. 묻는 것에만 딱 그만큼 답한다.
- **테마 색**: 올리브 회색 `#6b705c`

| 파일 | 표정 | 쓰이는 때 |
|---|---|---|
| `gu_normal.png` | 무덤덤 | 기본 |
| `gu_check.png` | 안경 너머로 서류 응시 | 서류 심사 중 |
| `gu_firm.png` | 단호하게 서류를 내밀며 | "하자입니다" |

```
Korean man in early 50s, side-parted salt-and-pepper hair, reading glasses, deadpan expression,
bank teller vest over white shirt, sitting behind a service counter
```

## 6. 오 과장 — `oh` (포워더)

- **인상**: 30대 후반 한국인 남성. 짧은 머리, 활동적이고 바쁜 인상, 땀 약간.
- **옷차림**: 회사 로고 없는 작업 점퍼나 바람막이, 목에 건 휴대폰, 귀에 블루투스 이어폰.
- **성격**: 말이 빠르고 용어를 설명 없이 쓴다. 물으면 쉽게 풀어준다.
- **테마 색**: 주황 `#e08a1e`

| 파일 | 표정 | 쓰이는 때 |
|---|---|---|
| `oh_normal.png` | 휴대폰 들고 바쁜 표정 | 기본, 빠른 말 |
| `oh_explain.png` | 손가락으로 무언가 가리키며 웃음 | 용어를 풀어 설명할 때 |
| `oh_trouble.png` | 머리 긁적, 곤란한 표정 | 배를 놓쳤을 때, 나쁜 소식 |

```
Korean man in late 30s, short hair, energetic and busy look, slight sweat,
plain logistics windbreaker without logos, phone in hand, bluetooth earpiece
```

---

## 선택 (없어도 됨)

| 파일 | 내용 |
|---|---|
| `bg_office.png` | 사무실 배경 (16:9, 흐릿하게) |
| `bg_bank.png` | 은행 창구 배경 |
| `bg_port.png` | 컨테이너 항만 배경 |
| `mail_icon.png` | 메일 장면용 아이콘 (Dana, Marcus 장면) |
