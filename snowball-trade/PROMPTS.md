# 그림 만들기 가이드 (캐릭터 · 배경 프롬프트)

이미지 생성 도구(ChatGPT·Gemini·Midjourney·Bing Image Creator 등)에 아래 프롬프트를 붙여넣어 그림을 만들고,
정해진 **파일 이름**으로 `snowball-trade/img/` 폴더에 올리면 게임이 자동으로 그 그림을 씁니다. 없는 그림은 코드로 그린 기본 그림이 나옵니다.

- 프롬프트는 영어가 결과가 더 좋아서 영어로 썼습니다.
- 도구에 따라 영화 제목이나 캐릭터 이름을 넣으면 거절할 수 있어서, 이름 대신 **생김새**로 묘사했습니다. 원작에 더 가깝게 만들고 싶으면 프롬프트 끝에 `, inspired by the movie The Secret Life of Pets`를 붙여 보세요.
- 같은 캐릭터의 표정 여러 장은 **한 대화창에서 이어서** 만들면 생김새가 잘 유지됩니다. (예: 첫 장을 만든 뒤 “같은 캐릭터로 화난 표정”)

## 파일 규칙

| 종류 | 형식 | 게임에서 보이는 방식 |
|---|---|---|
| 캐릭터 | **배경을 지운 PNG** (권장) | 장면 위에 그대로 섭니다 |
| 캐릭터 | JPG (배경 있음) | 흰 테두리 액자 안에 보입니다 |
| 배경 | PNG 또는 JPG, **가로 16:9** (예: 1920×1080) | 화면을 꽉 채웁니다. 휴대폰에서는 가운데가 잘려 보이니 중요한 건 가운데에 |

캐릭터 그림은 흰 배경으로 만든 뒤 배경 지우기 도구(remove.bg, Canva, 휴대폰 사진 앱의 ‘피사체 들기’ 등)로 지우면 됩니다.
세로로 조금 긴 비율(5:6이나 정사각형)에, 캐릭터가 가운데 서 있고 **아래쪽이 잘리지 않게** 만들면 가장 잘 맞습니다.

## 모든 그림에 공통으로 붙일 스타일

캐릭터·배경 프롬프트 앞에 이 문장을 붙이면 그림체가 통일됩니다.

```
3D animated feature film style, modern Hollywood CG animation about pets living in New York City, soft detailed fur, big expressive eyes, warm cinematic lighting, high quality render,
```

---

## 캐릭터

### 🐰 스노우볼 — 주인공, Flushed Trading Co. 대표

- **원작 특징**: 복슬복슬한 새하얀 꼬마 토끼. 파란 큰 눈, 분홍 코, 앞니 두 개가 툭 튀어나옴. 길게 선 귀 안쪽은 분홍. 원래 마술사의 토끼였다가 버려져 ‘버려진 동물들(Flushed Pets)’의 리더가 됨. 겉모습은 세상 귀엽지만 성질이 불같고, 화나면 눈썹부터 치켜올라감. 2편에서는 스스로 슈퍼히어로 ‘캡틴 스노우볼’이 됨.
- **게임 속 역할**: 당근 창고가 비자 무역회사를 차린 초보 대표. 성급하게 질렀다가 수습하며 배움.
- **말투**: 반말, 느낌표 많음. “인간들!”, “으아아악!!”

| 파일 | 표정 | 프롬프트 (공통 스타일 뒤에 붙이기) |
|---|---|---|
| `snow.png` | 평소 | 아래 ① |
| `snow_happy.png` | 기쁨 | 아래 ② |
| `snow_angry.png` | 화남 | 아래 ③ |
| `snow_shock.png` | 놀람 | 아래 ④ |

```
① a tiny, extremely fluffy pure white baby rabbit with a round fluffy head, huge glossy light-blue eyes, small pink nose, two prominent front buck teeth, long upright ears with pink insides, standing upright facing the viewer, confident little smirk, full body, centered, plain solid white background
```
```
② the same tiny fluffy white rabbit with big light-blue eyes and two buck teeth, huge happy open-mouth smile, sparkling eyes, cheeks puffed with joy, holding up a fresh orange carrot, full body, centered, plain solid white background
```
```
③ the same tiny fluffy white rabbit with big light-blue eyes and two buck teeth, furious expression, eyebrows sharply angled down, teeth clenched showing buck teeth, tiny fists raised, fur slightly puffed up, full body, centered, plain solid white background
```
```
④ the same tiny fluffy white rabbit with big light-blue eyes and two buck teeth, shocked expression, eyes wide open with tiny pupils, mouth open in a gasp, ears straight up, paws up near face, full body, centered, plain solid white background
```

### 🐩 기젯 — 꼼꼼한 실무 담당 (`gid.png`)

- **원작 특징**: 하얀 털이 솜사탕처럼 풍성한 포메라니안. 크고 동그란 눈. 맥스를 짝사랑하는 이웃집 강아지. 귀엽고 애교 많지만, 마음먹으면 누구보다 용감하고 싸움도 잘함.
- **게임 속 역할**: 무역 서류를 챙기고, 스노우볼이 폭주하면 말리는 실무자. 존댓말.

```
a small fluffy white Pomeranian dog with very round puffy cotton-candy fur, big round dark brown sparkling eyes, tiny black nose, small pointy ears hidden in fluff, a small pink bow on her head, cheerful and eager expression, holding a clipboard with papers, full body, centered, plain solid white background
```

### 🐕 포피 — 은퇴한 무역 베테랑, 멘토 (`pops.png`)

- **원작 특징**: 나이 든 바셋하운드. 축 늘어진 긴 귀, 처진 눈꺼풀과 눈 밑 주름, 희끗한 눈썹. 뒷다리가 불편해서 바퀴 달린 보조기구를 끌고 다님. 동네 소식에 밝고 투덜대지만 정 많은 할아버지.
- **게임 속 역할**: 선택이 끝날 때마다 “포피 할아버지의 한 줄”로 핵심을 정리. 말투는 “끌끌…”, “이 녀석아”.

```
an elderly basset hound dog with long droopy ears, tan and brown fur with a white muzzle, heavy droopy eyelids, wrinkles and bags under the eyes, bushy grey eyebrows, wise grumpy-but-kind grandpa expression, his back legs resting on a small two-wheeled dog wheelchair cart, full body, centered, plain solid white background
```

### 🦅 타이베리어스 — 포워더(운송 담당) (`tib.png`)

- **원작 특징**: 외로운 붉은꼬리매. 날카로운 노란 눈, 갈고리 부리. 처음엔 작은 동물들을 노리지만, 친구를 사귀고 싶어 하는 허당.
- **게임 속 역할**: 하늘에서 물류를 내려다보는 운송 담당. 해상운임을 청구하고 B/L을 챙기라고 잔소리.

```
a red-tailed hawk with brown feathers, cream speckled chest, sharp yellow eyes with intense brows, yellow hooked beak, slightly awkward friendly grin, wings half spread as if presenting something, upper body, centered, plain solid white background
```

### 🐱 클로이 — 냥냥은행 직원 (`chloe.png`)

- **원작 특징**: 통통한 회색 줄무늬 고양이. 늘 귀찮다는 듯 반쯤 감긴 눈, 시니컬하고 먹을 것에 진심.
- **게임 속 역할**: 송금·신용장·L/G를 처리하는 은행원. 서류는 한 글자까지 대조하지만 늘 하품. 말끝에 “냥.”

```
a chubby grey tabby cat with darker stripes, half-closed sleepy green eyes, bored sarcastic expression, sitting behind a small bank teller counter wearing tiny reading glasses, stamping a document, upper body, centered, plain solid white background
```

### 🐹 노먼 — B/L 원본을 들고 사라진 직원 (`norman.png`)

- **원작 특징**: 기니피그. 영화 내내 환풍구 속에서 길을 잃고 헤맴. 주황·흰색 털에 까만 구슬 눈.
- **게임 속 역할**: B/L 원본을 항구로 가져가다 환풍구에서 길을 잃음.

```
a round guinea pig with orange and white fur, tiny pink ears, shiny black bead eyes, confused lost expression with a sweat drop, clutching a rolled-up shipping document, dusty fur, full body, centered, plain solid white background
```

### 🦮 버디 — 손해보험 담당 (`buddy.png`)

- **원작 특징**: 느긋하고 능청스러운 닥스훈트. 긴 몸통과 주둥이, 축 처진 귀.
- **게임 속 역할**: 적하보험 증권을 확인하고 보상 여부를 알려주는 보험사 직원.

```
a laid-back brown dachshund dog with a long snout and floppy ears, relaxed half-smile, wearing a white shirt and a blue tie like an insurance agent, holding a folder of papers, upper body, centered, plain solid white background
```

### 🐶 맥스 — 마지막 장의 손님 (`max.png`)

- **원작 특징**: 원작 주인공인 잭 러셀 테리어. 흰 털에 갈색 귀와 얼굴 무늬. 주인 케이티를 세상에서 제일 좋아함. 덩치 큰 갈색 털북숭이 듀크와 한집에 삶.
- **게임 속 역할**: 9장 당근 파티에 듀크와 함께 당근을 사러 옴.

```
a small Jack Russell terrier dog with white fur, brown ears and brown patches on the face, bright friendly eyes, tongue out, curious happy expression, wearing a collar, full body, centered, plain solid white background
```

### 🐴 한라 — 제주 깡총농장 대표 (`halla.png`) *게임 오리지널*

- **특징**: 제주 조랑말. 짙은 갈기, 하얀 콧등 무늬, 밝고 친절함. 말끝에 “히힝”.
- **게임 속 역할**: 당근을 수출하는 제주 농장 대표. 오퍼를 보내고 선적서류를 챙김.

```
a small friendly Jeju pony with chestnut brown fur, a dark shaggy mane, a white blaze on the nose, warm smile, wearing a farmer's straw hat, holding a basket of fresh carrots and a tangerine, upper body, centered, plain solid white background
```

### 🐕‍🦺 렉스 — 뉴욕 세관 탐지견 (`rex.png`) *게임 오리지널*

- **특징**: 셰퍼드. 검은 안장 무늬에 황갈색 털, 쫑긋 선 귀. 원칙주의자지만 당근 하나에 약해짐. 말끝에 “킁킁”.
- **게임 속 역할**: 7장 통관의 관문. HS 코드·검역증·원산지증명을 확인.

```
a German shepherd dog with tan fur and a black saddle pattern, tall upright ears, serious stern expression, wearing a navy customs officer cap with a gold badge and a navy uniform vest, sniffing a cardboard box, upper body, centered, plain solid white background
```

---

## 배경

배경 프롬프트에는 캐릭터가 들어가지 않게 했습니다. 캐릭터는 게임이 따로 세웁니다. **가운데 아래쪽은 캐릭터가 설 자리**라 비워 두는 게 좋습니다.

모든 배경 프롬프트 끝에 이 문장을 붙이세요.

```
, no characters, no animals, no text, wide 16:9 composition, the lower center area kept open and uncluttered
```

| 파일 | 쓰이는 곳 | 장면 |
|---|---|---|
| `bg_title.png` | 시작 화면 | 노을 진 맨해튼 아파트 거리 |
| `bg_sewer.png` | 1장 | 버려진 동물들의 하수구 아지트 |
| `bg_office.png` | 2장, 5장 | 아지트 안 무역회사 사무실 |
| `bg_port.png` | 3장 | 부산항 |
| `bg_bank.png` | 4장, 5장(신용장) | 냥냥은행 |
| `bg_portny.png` | 6장 | 뉴욕항 컨테이너 터미널 |
| `bg_customs.png` | 7장 | 뉴욕 세관 검사장 |
| `bg_storm.png` | 8장 | 폭풍 뒤 아지트 창고 |
| `bg_party.png` | 9장 | 당근 파티 |

```
bg_title: a charming New York City Manhattan street at golden sunset, brownstone apartment buildings with fire escapes and open windows, water towers on rooftops, warm orange and purple sky, cozy and lively atmosphere
```
```
bg_sewer: a secret underground hideout inside a New York sewer, curved brick tunnels, rusty pipes and dripping water, glowing green light, makeshift furniture made from junk, old sofa, banner and graffiti, a hidden gang lair for abandoned pets
```
```
bg_office: a tiny makeshift trading company office built inside a sewer hideout, desk made from a crate, old laptop, piles of shipping documents and invoices, world map pinned to a brick wall with string routes from Korea to New York, a warm desk lamp, sacks of carrots in the corner
```
```
bg_port: Busan container port in South Korea on a sunny day, huge colorful shipping containers stacked high, giant cranes, a large cargo ship being loaded with refrigerated containers, blue sea and sky, seagulls in the distance
```
```
bg_bank: a cute elegant small bank interior in New York with a cat theme, marble teller counter, cat paw logo on the wall, brass lamps, stacks of papers and stamps, cozy cushions on the counter, soft purple and gold color scheme
```
```
bg_portny: Port of New York container terminal at late afternoon, colorful stacked shipping containers, cranes, a docked cargo ship, the Manhattan skyline across the water, warm orange sky
```
```
bg_customs: a US customs inspection warehouse, metal inspection tables, x-ray scanner, stacks of cardboard boxes and crates of vegetables, official notice boards, fluorescent lights, slightly strict atmosphere
```
```
bg_storm: inside a dim storage room in a sewer hideout after a storm, an open refrigerated shipping container with seawater puddles, wet soggy carrots spilled on the floor, cold blue-grey light, gloomy mood
```
```
bg_party: a festive carrot party inside a sewer hideout, string lights and colorful bunting, piles of fresh orange carrots, balloons, confetti, warm glowing lights, joyful celebration atmosphere
```
