#!/usr/bin/env python3
"""
Generate optimized, responsive versions of the dish photos.

For every photo in images/ this writes two smaller, recompressed copies into
images/optimized/:
    <name>-960.jpg   (for phones and standard desktops)
    <name>-1440.jpg  (for high-DPI / Retina desktops)

Originals are never modified. Re-run this after adding new photos:
    python optimize-images.py
"""

from pathlib import Path
from PIL import Image, ImageOps

SRC_DIR = Path(__file__).parent / "images"
OUT_DIR = SRC_DIR / "optimized"
WIDTHS = [960, 1440]
QUALITY = 82
EXTS = {".jpg", ".jpeg", ".png"}


def main():
    OUT_DIR.mkdir(exist_ok=True)
    photos = [
        p for p in SRC_DIR.iterdir()
        if p.is_file() and p.suffix.lower() in EXTS
    ]
    if not photos:
        print("No source images found in", SRC_DIR)
        return

    total_src = total_out = 0
    for path in sorted(photos):
        with Image.open(path) as im:
            # Bake in any EXIF rotation before we strip metadata, otherwise
            # phone photos can display sideways.
            im = ImageOps.exif_transpose(im)
            im = im.convert("RGB")
            src_w = im.width
            total_src += path.stat().st_size

            for width in WIDTHS:
                out_path = OUT_DIR / f"{path.stem}-{width}.jpg"
                variant = im if src_w <= width else im.resize(
                    (width, round(im.height * width / src_w)),
                    Image.LANCZOS,
                )
                variant.save(
                    out_path,
                    "JPEG",
                    quality=QUALITY,
                    optimize=True,
                    progressive=True,
                )
                total_out += out_path.stat().st_size

        print(f"  {path.name}")

    print(f"\n{len(photos)} photos -> {len(photos) * len(WIDTHS)} files in {OUT_DIR}")
    print(f"Source total:    {total_src / 1_048_576:.1f} MB")
    print(f"Optimized total: {total_out / 1_048_576:.1f} MB")


if __name__ == "__main__":
    main()
