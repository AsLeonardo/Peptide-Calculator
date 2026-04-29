from PIL import Image, ImageDraw, ImageFont
import os

WIDTH = 1600
HEIGHT = 240

BIG_TICK_LEN = 120
SMALL_TICK_LEN = 60
TICK_WIDTH_BIG = 10
TICK_WIDTH_SMALL = 5

#colors
RULER = (0, 0, 0, 0)
EDGE = (0, 0, 0, 255)
TICK = (0, 0, 0, 255)
TEXT = (0, 0, 0, 255)

def get_font(size):
    candidates = [
        "C:/Program Files/Adobe/Adobe Photoshop 2026/Required/PDFL/Resource/Fonts/MyriadPro-Regular.otf",
    ]
    for p in candidates:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

font = get_font(59)

def make_ruler(max_value, label_every, out_path):
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, WIDTH - 1, HEIGHT - 1],
                   fill=RULER, outline=EDGE, width=2)

    spacing = (WIDTH - 1) / max_value

    for i in range(max_value + 1):
        x = i * spacing
        is_big = (i % 5 == 0)
        tick_len = BIG_TICK_LEN if is_big else SMALL_TICK_LEN
        tick_w = TICK_WIDTH_BIG if is_big else TICK_WIDTH_SMALL

        if i == 0:
            x_draw = tick_w / 2
        elif i == max_value:
            x_draw = WIDTH - 1 - tick_w / 2
        else:
            x_draw = x

        draw.line([(x_draw, 0), (x_draw, tick_len)],
                  fill=TICK, width=tick_w)

        if is_big and (i % label_every == 0):
            label = str(i)
            bbox = draw.textbbox((0, 0), label, font=font)
            tw = bbox[2] - bbox[0]
            tx = x - tw / 2
            ty = tick_len + 25

            if i == 0:
                tx = max(tx, 8)
            elif i == max_value:
                tx = min(tx, WIDTH - tw - 8)

            draw.text((tx, ty), label, fill=TEXT, font=font)

    img.save(out_path, "PNG")
    print(f"Saved {out_path} ({WIDTH}x{HEIGHT}, max={max_value}, labels every {label_every})")

os.makedirs("C:/Java/Code/Peptide", exist_ok=True)
make_ruler(30,  label_every=5,  out_path="C:/Java/Code/Peptide/ruler_30.png")
make_ruler(50,  label_every=5,  out_path="C:/Java/Code/Peptide/ruler_50.png")
make_ruler(100, label_every=10, out_path="C:/Java/Code/Peptide/ruler_100.png")
