"""게임 배경 SVG를 그린다. (평면 일러스트, 1600x900)

사용법:  python3 draw_backgrounds.py <저장 폴더>
같은 이름의 PNG(img/bg_이름.png)를 올리면 게임은 PNG를 먼저 쓴다.
"""
import os
import random
import sys

W, H = 1600, 900


def svg(body, defs=''):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">'
            f'<defs>{defs}</defs>{body}</svg>\n')


def lg(id_, stops, x2=0, y2=1):
    s = ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return f'<linearGradient id="{id_}" x1="0" y1="0" x2="{x2}" y2="{y2}">{s}</linearGradient>'


def rect(x, y, w, h, fill, rx=0, extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" {extra}/>'


def skyline(x0, x1, base, seed, colors):
    rnd = random.Random(seed)
    out, x = '', x0
    while x < x1:
        w = rnd.randint(40, 95)
        h = rnd.randint(90, 300)
        c = rnd.choice(colors)
        out += rect(x, base - h, w, h, c)
        for wy in range(base - h + 14, base - 10, 22):
            for wx in range(x + 8, x + w - 10, 16):
                if rnd.random() < .55:
                    out += rect(wx, wy, 7, 10, '#ffffff', extra='opacity=".35"')
        x += w + rnd.randint(2, 10)
    return out


def window(x, y, w, h, seed, sky=('#9fc6e6', '#e4f0f8'), city=('#b8cad9', '#a9bdcf', '#c9d7e3')):
    gid = f'sky{seed}'
    d = lg(gid, [(0, sky[0]), (1, sky[1])])
    b = f'<clipPath id="clip{seed}"><rect x="{x}" y="{y}" width="{w}" height="{h}"/></clipPath>'
    body = rect(x - 10, y - 10, w + 20, h + 20, '#c9d2d9', 4)
    body += f'<g clip-path="url(#clip{seed})">' + rect(x, y, w, h, f'url(#{gid})')
    body += skyline(x - 20, x + w + 20, y + h, seed, city) + '</g>'
    for mx in range(x, x + w + 1, w // 4):
        body += rect(mx - 4, y, 8, h, '#d7dee4')
    body += rect(x, y + h * 0.45, w, 6, '#d7dee4')
    return d + b, body


def monitor(x, y, s=1.0, screen='#5d7a99'):
    w, h = 120 * s, 76 * s
    return (rect(x, y, w, h, '#2b313b', 6) + rect(x + 6 * s, y + 6 * s, w - 12 * s, h - 14 * s, screen, 3)
            + rect(x + w / 2 - 6 * s, y + h, 12 * s, 22 * s, '#3a414c') + rect(x + w / 2 - 30 * s, y + h + 20 * s, 60 * s, 6 * s, '#3a414c', 3))


def plant(x, y, s=1.0):
    leaves = ''
    for dx, dy, rx, ry, rot in [(-30, -70, 22, 60, -30), (30, -75, 22, 62, 30), (0, -95, 20, 70, 0), (-50, -40, 18, 46, -60), (50, -42, 18, 46, 60)]:
        leaves += f'<ellipse cx="{x + dx * s}" cy="{y + dy * s}" rx="{rx * s}" ry="{ry * s}" fill="#5f9466" transform="rotate({rot} {x + dx * s} {y + dy * s})"/>'
    return leaves + f'<path d="M{x - 38 * s} {y} h{76 * s} l-10 {80 * s} h{-56 * s} z" fill="#c9b79c"/>'


def office():
    d1, win1 = window(70, 120, 440, 400, 1)
    d2, win2 = window(1090, 120, 440, 400, 2)
    defs = lg('wall', [(0, '#eef2f5'), (1, '#dfe6ec')]) + lg('floor', [(0, '#bfae96'), (1, '#9f8b72')]) + d1 + d2
    b = rect(0, 0, W, H, 'url(#wall)')
    b += rect(0, 0, W, 64, '#f6f8fa')
    for lx in (140, 520, 900, 1280):
        b += rect(lx, 22, 200, 14, '#ffffff', 4, 'opacity=".95"')
    b += win1 + win2
    b += rect(640, 150, 320, 190, '#f8f9fa', 6) + rect(630, 140, 340, 210, 'none', 8, 'stroke="#b8c2cb" stroke-width="8"')
    b += rect(670, 190, 140, 8, '#9fb3c8', 4) + rect(670, 215, 200, 8, '#c8b59a', 4) + rect(670, 240, 110, 8, '#9fb3c8', 4)
    b += f'<circle cx="1000" cy="105" r="30" fill="#fff" stroke="#8d99a6" stroke-width="5"/><path d="M1000 105 v-18 M1000 105 h14" stroke="#4a5562" stroke-width="4" stroke-linecap="round"/>'
    b += rect(0, 640, W, 260, 'url(#floor)') + rect(0, 634, W, 10, '#c7cfd6')
    # 책상 줄
    b += rect(0, 560, 560, 26, '#d8cfc1') + rect(0, 586, 560, 60, '#c4b8a6')
    b += rect(1040, 560, 560, 26, '#d8cfc1') + rect(1040, 586, 560, 60, '#c4b8a6')
    b += rect(0, 470, 560, 92, '#b9c6cf', 4, 'opacity=".9"') + rect(1040, 470, 560, 92, '#b9c6cf', 4, 'opacity=".9"')
    b += monitor(90, 470) + monitor(330, 470, screen='#6c8aa8') + monitor(1110, 470, screen='#6c8aa8') + monitor(1360, 470)
    b += rect(250, 520, 40, 40, '#e9e2d4', 4) + rect(1300, 530, 50, 30, '#f1ece2', 3)
    b += plant(600, 640, 1.2) + plant(1000, 640, 1.0)
    return svg(b, defs)


def meeting():
    defs = lg('wall', [(0, '#e8ecea'), (1, '#d7dfdb')]) + lg('floor', [(0, '#8f9d93'), (1, '#76847a')]) + lg('table', [(0, '#a8896a'), (1, '#8a6e53')])
    b = rect(0, 0, W, H, 'url(#wall)') + rect(0, 0, W, 60, '#f3f5f4')
    for lx in (300, 700, 1100):
        b += f'<ellipse cx="{lx + 100}" cy="34" rx="110" ry="12" fill="#fffbe9" opacity=".9"/>'
    # 블라인드 창
    b += rect(1120, 110, 420, 420, '#cfe0ea', 4)
    for by in range(118, 520, 18):
        b += rect(1120, by, 420, 11, '#eef3f6')
    b += rect(1110, 100, 440, 440, 'none', 6, 'stroke="#b6c1c8" stroke-width="10"')
    # 화이트보드와 차트
    b += rect(80, 130, 460, 300, '#fafbfb', 6) + rect(70, 120, 480, 320, 'none', 8, 'stroke="#aab4ba" stroke-width="8"')
    b += '<polyline points="120,380 200,330 280,350 360,260 440,290 500,200" fill="none" stroke="#2a7f7a" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>'
    b += rect(120, 160, 160, 12, '#c26e5a', 6) + rect(120, 186, 230, 10, '#9fb0b8', 5)
    b += rect(560, 150, 480, 6, '#c3ccd1')  # 벽 몰딩
    b += rect(0, 620, W, 280, 'url(#floor)')
    # 의자 뒤판
    for cx in (200, 470, 1130, 1400):
        b += rect(cx, 540, 120, 120, '#3f4a52', 18)
    b += f'<path d="M0 700 L1600 700 L1600 900 L0 900 Z" fill="url(#table)"/>' + rect(0, 694, W, 14, '#b8987a')
    b += rect(260, 650, 90, 54, '#f4f1ea', 3) + rect(1240, 655, 70, 50, '#e9eef2', 3)
    b += f'<ellipse cx="760" cy="694" rx="34" ry="8" fill="#fff"/>' + rect(736, 650, 48, 44, '#ffffff', 6) + rect(780, 660, 16, 22, 'none', 8, 'stroke="#ffffff" stroke-width="6"')
    b += plant(980, 620, 1.1)
    return svg(b, defs)


def video_call():
    defs = lg('bgc', [(0, '#1f2b40'), (1, '#16202f')]) + lg('home', [(0, '#e9dccb'), (1, '#d8c7b0')])
    b = rect(0, 0, W, H, 'url(#bgc)')
    # 메인 화면 (상대 방: 홈오피스)
    b += f'<clipPath id="main"><rect x="40" y="70" width="1520" height="700" rx="18"/></clipPath>'
    b += '<g clip-path="url(#main)">' + rect(40, 70, 1520, 700, 'url(#home)')
    for sx in (120, 1240):  # 책장
        b += rect(sx, 150, 260, 470, '#8b6a4c', 6)
        for sy in range(170, 600, 110):
            b += rect(sx + 14, sy, 232, 92, '#6f5339', 4)
            x = sx + 20
            rnd = random.Random(sx + sy)
            while x < sx + 230:
                bw = rnd.randint(12, 26)
                b += rect(x, sy + 92 - rnd.randint(55, 85), bw, 92, rnd.choice(['#c46a52', '#4f7aa6', '#d9b45a', '#5f8e6a', '#e8e1d4']))
                x += bw + 3
    b += rect(560, 140, 480, 260, '#f3ece1', 6) + rect(600, 180, 400, 180, '#9ec2d9', 4)
    b += '<path d="M600 360 L720 250 L800 320 L880 230 L1000 360 Z" fill="#6f9a7a"/>'
    b += rect(40, 640, 1520, 130, '#cbb79b') + '</g>'
    b += rect(40, 70, 1520, 700, 'none', 18, 'stroke="#3b4a63" stroke-width="3"')
    # 상단 바
    b += rect(0, 0, W, 54, '#111827') + '<circle cx="34" cy="27" r="7" fill="#e5534b"/><circle cx="58" cy="27" r="7" fill="#e3b341"/><circle cx="82" cy="27" r="7" fill="#57ab5a"/>'
    b += rect(680, 17, 240, 20, '#273349', 10)
    b += '<circle cx="1490" cy="27" r="6" fill="#e5534b"/>' + rect(1504, 19, 50, 16, '#273349', 8)
    # 내 화면 (작은 창)
    b += rect(1290, 560, 240, 150, '#2a3a52', 12) + rect(1290, 560, 240, 150, 'none', 12, 'stroke="#7fa3e0" stroke-width="3"')
    b += '<circle cx="1410" cy="625" r="32" fill="#56698a"/><path d="M1350 710 q60 -70 120 0 z" fill="#56698a"/>'
    # 하단 컨트롤
    b += rect(560, 800, 480, 72, '#111827', 36)
    for i, c in enumerate(['#2b3a55', '#2b3a55', '#2b3a55', '#d64545']):
        b += f'<circle cx="{620 + i * 120}" cy="836" r="24" fill="{c}"/>'
    return svg(b, defs)


def mail():
    defs = lg('bgm', [(0, '#22324d'), (1, '#18233a')], 1, 1)
    b = rect(0, 0, W, H, 'url(#bgm)')
    b += rect(30, 30, 1540, 840, '#f4f6f9', 14)
    b += rect(30, 30, 1540, 64, '#2f4b7c', 14) + rect(30, 80, 1540, 14, '#2f4b7c')
    b += rect(560, 46, 480, 32, '#ffffff', 16, 'opacity=".25"')
    b += rect(30, 94, 260, 776, '#e6ebf2')
    b += rect(56, 120, 200, 46, '#2f4b7c', 23)
    for i, w in enumerate([150, 120, 170, 110, 140]):
        b += rect(70, 200 + i * 52, w, 14, '#9aa8bb', 7)
    b += rect(290, 94, 420, 776, '#ffffff') + rect(708, 94, 2, 776, '#dde3ea')
    rnd = random.Random(7)
    for i in range(9):
        y = 110 + i * 84
        if i == 1:
            b += rect(290, y - 6, 420, 80, '#e8f0fb')
        b += f'<circle cx="330" cy="{y + 32}" r="20" fill="{rnd.choice(["#d9644a", "#7fa3e0", "#b8862b", "#6b705c", "#2a7f7a"])}"/>'
        b += rect(366, y + 14, rnd.randint(120, 200), 12, '#55657a', 6) + rect(366, y + 38, rnd.randint(180, 300), 10, '#b4bfcc', 5)
    b += rect(760, 130, 520, 26, '#33435a', 8) + rect(760, 180, 320, 14, '#8b98a8', 7)
    for i in range(12):
        b += rect(760, 250 + i * 40, [740, 700, 760, 520, 0, 720, 690, 740, 600, 0, 380, 300][i], 12, '#c4ccd6', 6)
    b += rect(760, 760, 200, 56, '#eef2f7', 8, 'stroke="#c4ccd6" stroke-width="2"') + rect(780, 778, 30, 20, '#d64545', 3) + rect(824, 782, 110, 12, '#8b98a8', 6)
    return svg(b, defs)


def port():
    defs = lg('sky', [(0, '#7fb2d8'), (.6, '#cfe3ef'), (1, '#e9f1f4')]) + lg('sea', [(0, '#5d8aa6'), (1, '#36597a')])
    b = rect(0, 0, W, H, 'url(#sky)')
    b += '<ellipse cx="1250" cy="170" rx="90" ry="28" fill="#ffffff" opacity=".7"/><ellipse cx="380" cy="120" rx="130" ry="30" fill="#ffffff" opacity=".6"/>'
    b += rect(0, 420, W, 140, 'url(#sea)')
    # 배
    b += '<path d="M150 470 L1150 470 L1100 540 L210 540 Z" fill="#253246"/>' + rect(150, 462, 1000, 12, '#b13f35')
    rnd = random.Random(3)
    cols = ['#c0392b', '#2f6db5', '#2e8b57', '#d68a1c', '#7d8a96', '#8e44ad', '#16a085']
    for row in range(3):
        for i in range(16):
            b += rect(240 + i * 54, 410 - row * 30, 50, 28, rnd.choice(cols), 2)
    b += rect(1020, 330, 90, 140, '#e9edf1', 4) + rect(1030, 345, 70, 14, '#3a4a5c', 3) + rect(1030, 370, 70, 14, '#3a4a5c', 3)
    # 크레인
    for cx in (330, 760, 1300):
        c = '#d9a33a'
        b += rect(cx, 160, 22, 420, c) + rect(cx + 120, 160, 22, 420, c) + rect(cx - 140, 150, 420, 26, c) + rect(cx + 40, 176, 60, 40, '#3c4855')
        b += f'<line x1="{cx + 70}" y1="216" x2="{cx + 70}" y2="330" stroke="#3c4855" stroke-width="4"/>'
    # 부두와 컨테이너 더미
    b += rect(0, 560, W, 340, '#8c9298')
    for yy in range(600, 900, 70):
        b += rect(0, yy, W, 4, '#f2d34f', extra='opacity=".6"')
    for stack in range(6):
        x = 40 + stack * 270
        for lvl in range(rnd.randint(2, 4)):
            b += rect(x, 760 - lvl * 64, 230, 60, rnd.choice(cols), 3)
            for rx in range(x + 12, x + 225, 18):
                b += rect(rx, 766 - lvl * 64, 4, 48, '#000000', extra='opacity=".12"')
    return svg(b, defs)


def bank():
    defs = lg('wall', [(0, '#efe9df'), (1, '#e2dacb')]) + lg('floor', [(0, '#d6cfc2'), (1, '#bcb3a3')])
    b = rect(0, 0, W, H, 'url(#wall)') + rect(0, 0, W, 70, '#f7f3ec')
    for lx in range(80, 1600, 300):
        b += rect(lx, 26, 180, 16, '#ffffff', 6)
    b += rect(560, 100, 480, 90, '#2b4a6f', 10) + '<circle cx="620" cy="145" r="26" fill="#d9b45a"/>' + rect(670, 128, 300, 16, '#e8eef5', 8) + rect(670, 156, 200, 12, '#9fb6cf', 6)
    b += rect(1180, 110, 300, 120, '#1c2633', 10) + rect(1210, 135, 110, 70, '#2f3d4f', 6) + rect(1340, 135, 110, 70, '#2f3d4f', 6)
    b += '<text x="1265" y="186" font-family="monospace" font-size="48" fill="#ff6b5b" text-anchor="middle">032</text><text x="1395" y="186" font-family="monospace" font-size="48" fill="#7cd992" text-anchor="middle">4</text>'
    b += rect(120, 96, 300, 130, '#f9f7f2', 6, 'stroke="#c9bfae" stroke-width="6"') + rect(150, 126, 200, 14, '#b5a58b', 7) + rect(150, 156, 240, 10, '#cfc3b0', 5) + rect(150, 180, 180, 10, '#cfc3b0', 5)
    # 창구 카운터 + 유리 칸막이
    b += rect(0, 470, W, 26, '#7b6a55') + rect(0, 496, W, 200, '#9b8770')
    for gx in range(0, 1600, 400):
        b += rect(gx + 30, 260, 340, 210, '#cfe3ec', 4, 'opacity=".45"') + rect(gx + 26, 256, 348, 6, '#a7b5bd') + rect(gx + 196, 260, 8, 210, '#a7b5bd')
        b += rect(gx + 150, 452, 100, 18, '#5f4f3e', 3)
        b += rect(gx + 300, 300, 50, 160, '#3a4553', 4, 'opacity=".55"')
    b += rect(0, 696, W, 204, 'url(#floor)')
    for gx in range(0, 1600, 160):
        b += rect(gx, 696, 2, 204, '#c2b9aa')
    b += plant(1520, 696, 1.0)
    return svg(b, defs)


def la_terminal():
    defs = lg('sky', [(0, '#f2b880'), (.5, '#f7dcb0'), (1, '#fbeedb')]) + lg('ground', [(0, '#b9ad99'), (1, '#9b8f7c')])
    b = rect(0, 0, W, H, 'url(#sky)') + '<circle cx="1320" cy="230" r="80" fill="#fff3d6" opacity=".9"/>'
    b += '<path d="M0 470 Q300 380 600 450 T1200 430 T1600 450 V560 H0 Z" fill="#c9a98a" opacity=".6"/>'
    # 야자수
    for px, ph in ((120, 360), (1460, 400), (1540, 330)):
        b += f'<path d="M{px} 560 Q{px + 14} {560 - ph / 2} {px + 6} {560 - ph}" stroke="#6b5a45" stroke-width="12" fill="none"/>'
        for ang in (-150, -110, -60, -20, 20):
            b += f'<ellipse cx="{px + 6}" cy="{560 - ph}" rx="70" ry="14" fill="#4f7a4f" transform="rotate({ang} {px + 6} {560 - ph}) translate(55 0)"/>'
    b += rect(0, 540, W, 360, 'url(#ground)')
    rnd = random.Random(11)
    cols = ['#c0392b', '#2f6db5', '#2e8b57', '#d68a1c', '#7d8a96', '#5b6b7c']
    for stack in range(7):
        x = -20 + stack * 240
        for lvl in range(rnd.randint(2, 5)):
            b += rect(x, 640 - lvl * 60, 220, 56, rnd.choice(cols), 3)
            for rx in range(x + 10, x + 215, 16):
                b += rect(rx, 646 - lvl * 60, 4, 44, '#000000', extra='opacity=".12"')
    # 보류 표시가 붙은 컨테이너 (오른쪽 위, 인물과 대사창에 가리지 않게)
    b += rect(1090, 330, 420, 130, '#e3e6e9', 4)
    for rx in range(1102, 1502, 20):
        b += rect(rx, 342, 5, 106, '#000000', extra='opacity=".1"')
    b += rect(1230, 358, 150, 70, '#ffffff', 4, 'stroke="#d64545" stroke-width="6"') + '<text x="1305" y="406" font-family="Arial, sans-serif" font-weight="700" font-size="36" fill="#d64545" text-anchor="middle">HOLD</text>'
    # 철망 울타리
    b += rect(0, 780, W, 6, '#6f6a62')
    for fx in range(100, 1600, 230):
        b += rect(fx, 700, 8, 200, '#6f6a62')
    b += '<pattern id="mesh" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M0 0 L24 24 M24 0 L0 24" stroke="#5d5952" stroke-width="2" opacity=".5"/></pattern>'
    b += rect(0, 700, W, 200, 'url(#mesh)')
    return svg(b, defs)


def customs_warehouse():
    defs = lg('wall', [(0, '#c9ced3'), (1, '#b3b9bf')]) + lg('floor', [(0, '#9da3a8'), (1, '#80868c')])
    b = rect(0, 0, W, H, 'url(#wall)')
    for wx in range(60, 1600, 260):
        b += rect(wx, 50, 180, 90, '#e9f2f7', 4, 'opacity=".9"') + rect(wx + 88, 50, 4, 90, '#9aa4ac')
    b += rect(0, 150, W, 10, '#8a939b')
    # 선반
    for sx in (40, 1080):
        for ly in (250, 420, 590):
            b += rect(sx, ly, 480, 14, '#d27a2c')
            rnd = random.Random(sx + ly)
            x = sx + 10
            while x < sx + 450:
                bw = rnd.randint(70, 110)
                bh = rnd.randint(70, 140)
                b += rect(x, ly - bh, bw, bh, rnd.choice(['#c9a97c', '#bf9d6e', '#d4b88d']), 3) + rect(x, ly - bh + bh * .35, bw, 6, '#a88a60')
                x += bw + 8
        b += rect(sx, 180, 14, 480, '#2f5f9a') + rect(sx + 466, 180, 14, 480, '#2f5f9a')
    b += rect(0, 660, W, 240, 'url(#floor)')
    b += '<path d="M600 900 L700 660 M1000 900 L900 660" stroke="#f2d34f" stroke-width="12"/>'
    # 팔레트 위 우리 화물 + 억류 표지
    b += rect(620, 560, 360, 20, '#a07b4f') + rect(640, 430, 150, 130, '#c9a97c', 3) + rect(800, 430, 160, 130, '#bf9d6e', 3)
    b += rect(640, 340, 150, 90, '#d4b88d', 3)
    b += rect(1150, 170, 260, 110, '#ffffff', 4, 'stroke="#d64545" stroke-width="6"') + '<text x="1280" y="218" font-family="Arial, sans-serif" font-weight="700" font-size="34" fill="#d64545" text-anchor="middle">DETAINED</text><text x="1280" y="254" font-family="Arial, sans-serif" font-size="20" fill="#5a2a2a" text-anchor="middle">FDA · DO NOT MOVE</text>'
    return svg(b, defs)


SCENES = {
    'office': office, 'meeting': meeting, 'video_call': video_call, 'mail': mail,
    'port': port, 'bank': bank, 'la_terminal': la_terminal, 'customs_warehouse': customs_warehouse,
}

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '.'
    for name, fn in SCENES.items():
        path = os.path.join(out, f'bg_{name}.svg')
        with open(path, 'w', encoding='utf-8') as f:
            f.write(fn())
        print(path, round(os.path.getsize(path) / 1024), 'KB')
