"""Photo -> halftone dot portrait SVG, Cleo-style.

Luminance drives dot radius on a fixed grid; a share of mid-tone cells
render as plus glyphs for the stippled texture; near-background cells are
dropped so the figure floats on the tile. Ink is the Yunaki brand navy.
Rerun on the founders' real photos when they arrive.
"""
import sys
from PIL import Image, ImageOps, ImageFilter, ImageEnhance

INK = "#27354b"
W, H = 480, 600          # 4:5 output canvas (rendered at 240x300 css px)
CELL = 9                # grid pitch
RMAX = 4.4
GAMMA = 1.15
PLUS_LO, PLUS_HI = 0.22, 0.42
DROP = 0.12              # density below this -> nothing


def cell_hash(x, y):
    return ((x * 73856093) ^ (y * 19349663)) & 0xFFFF


def dither(src, dst, focus_top=0.08):
    im = Image.open(src).convert("L")
    im = ImageOps.exif_transpose(im)
    # center-crop to 4:5, biased a touch toward the top so shoulders stay in
    w, h = im.size
    target = w / (W / H)
    if target <= h:
        top = int((h - target) * focus_top)
        im = im.crop((0, top, w, top + int(target)))
    else:
        tw = int(h * (W / H))
        left = (w - tw) // 2
        im = im.crop((left, 0, left + tw, h))
    # inset the figure on a light stage so it floats with headroom
    scale = 0.8
    fig = im.resize((int(W * scale), int(H * scale)), Image.LANCZOS)
    fig = ImageOps.autocontrast(fig, cutoff=3)
    fig = ImageEnhance.Contrast(fig).enhance(1.75)
    stage = Image.new("L", (W, H), 245)
    stage.paste(fig, ((W - fig.width) // 2, H - fig.height))
    im = stage
    im = im.filter(ImageFilter.GaussianBlur(0.8))

    # background estimate from the top corners
    px = im.load()
    corners = [px[x, y] for y in range(0, 40, 8) for x in list(range(0, 40, 8)) + list(range(W - 40, W, 8))]
    bg = sum(corners) / len(corners)
    bg_is_light = bg > 128

    parts = []
    for gy in range(CELL // 2, H, CELL):
        for gx in range(CELL // 2, W, CELL):
            lum = px[gx, gy] / 255.0
            # density: darker than background = more ink
            dens = (1.0 - lum) if bg_is_light else lum
            # suppress anything close to background luminance
            if abs(px[gx, gy] - bg) < 26:
                dens *= 0.25
            # oval falloff so the figure fades into the tile, no frame noise
            ex = (gx / W - 0.5) / 0.44
            ey = (gy / H - 0.62) / 0.58
            e = ex * ex + ey * ey
            if e > 1.35:
                continue
            if e > 0.75:
                dens *= max(0.0, (1.35 - e) / 0.6)
            # floor remap: skin thins to pinpricks, shadows keep the weight
            dens = max(0.0, (dens - 0.2) / 0.8)
            dens = max(0.0, min(1.0, dens)) ** GAMMA
            if dens < DROP:
                continue
            r = dens * RMAX
            hsh = cell_hash(gx, gy)
            if PLUS_LO < dens < PLUS_HI and hsh % 7 == 0:
                s = max(1.6, r * 1.25)
                parts.append(
                    f'<path d="M{gx - s:.1f},{gy} H{gx + s:.1f} M{gx},{gy - s:.1f} V{gy + s:.1f}" stroke="{INK}" stroke-width="1.2"/>'
                )
            else:
                parts.append(f'<circle cx="{gx}" cy="{gy}" r="{r:.2f}" fill="{INK}"/>')

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">'
        + "".join(parts)
        + "</svg>"
    )
    with open(dst, "w") as f:
        f.write(svg)
    print(dst, len(parts), "marks,", len(svg) // 1024, "KB")


if __name__ == "__main__":
    dither(sys.argv[1], sys.argv[2])
