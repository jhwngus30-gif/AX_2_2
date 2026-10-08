"""캐릭터 그림의 단색 배경(흰색·회색)을 투명하게 지운다.

사용법:  python3 remove_bg.py <원본 폴더> <저장 폴더>
그림 위쪽 가장자리와 양옆 위 70%에서 배경색과 비슷한 픽셀을 이어서 지운다.
아래쪽에서는 시작하지 않으므로 화면 아래에 잘린 흰 셔츠가 지워지지 않는다.
필요: Pillow (pip install pillow)
"""
import sys, os
from PIL import Image, ImageFilter
from collections import deque
src, dst = sys.argv[1], sys.argv[2]
for f in sorted(os.listdir(src)):
    if not f.endswith('.png'): continue
    im = Image.open(os.path.join(src, f)).convert('RGBA')
    W, H = im.size
    px = im.load()
    bg = px[2, 2][:3]
    tol = 26
    def near(c): return max(abs(c[0]-bg[0]), abs(c[1]-bg[1]), abs(c[2]-bg[2])) <= tol
    seen = bytearray(W*H)
    q = deque()
    # 위쪽 가장자리와 양옆 위 70%에서만 시작 (아래쪽 셔츠로 새지 않게)
    seeds = [(x, 0) for x in range(W)] + [(0, y) for y in range(int(H*0.7))] + [(W-1, y) for y in range(int(H*0.7))]
    for s in seeds:
        if near(px[s]) and not seen[s[1]*W+s[0]]:
            seen[s[1]*W+s[0]] = 1; q.append(s)
    while q:
        x, y = q.popleft()
        for nx, ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
            if 0 <= nx < W and 0 <= ny < H and not seen[ny*W+nx] and near(px[nx, ny]):
                seen[ny*W+nx] = 1; q.append((nx, ny))
    mask = Image.frombytes('L', (W, H), bytes(0 if v else 255 for v in seen))
    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
    im.putalpha(mask)
    # 투명 영역 비율
    tr = sum(seen) / (W*H)
    im.save(os.path.join(dst, f), optimize=True)
    print(f, 'bg', bg, 'removed %', round(tr*100), round(os.path.getsize(os.path.join(dst, f))/1024), 'KB')
