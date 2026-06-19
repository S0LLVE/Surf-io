#!/usr/bin/env python3
"""Backward-compatible CLI for single sprite conversion."""

from __future__ import annotations

import sys
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS_DIR))

from sprite_utils import export_sprite, validate_alpha


def main() -> int:
    if len(sys.argv) != 4:
        print('Usage: make-transparent.py <source> <destination> <width>x<height>')
        return 1

    source = Path(sys.argv[1])
    destination = Path(sys.argv[2])
    width, height = map(int, sys.argv[3].split('x'))

    image = export_sprite(source, destination, (width, height))
    validate_alpha(image, destination.name)

    print(
        f'Wrote {destination} ({image.size[0]}x{image.size[1]}, RGBA, alpha validated)',
    )
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
