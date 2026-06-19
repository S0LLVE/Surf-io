#!/usr/bin/env python3
"""Generate Surf.io sprites with full alpha transparency."""

from __future__ import annotations

import shutil
import sys
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS_DIR))

from sprite_utils import export_sprite, validate_alpha

ROOT = Path(__file__).resolve().parent.parent
SOURCES_DIR = ROOT / 'assets' / 'sources'
OUTPUT_DIR = ROOT / 'public' / 'assets' / 'sprites'

SPRITE_DEFINITIONS = (
    {
        'source': 'surfer.png',
        'output': 'surfer.png',
        'size': (120, 180),
    },
    {
        'source': 'wave-blue.png',
        'output': 'wave-blue.png',
        'size': (120, 120),
    },
    {
        'source': 'wave-gold.png',
        'output': 'wave-gold.png',
        'size': (120, 120),
    },
    {
        'source': 'wave-danger.png',
        'output': 'wave-danger.png',
        'size': (120, 120),
    },
)


def ensure_sources() -> None:
    SOURCES_DIR.mkdir(parents=True, exist_ok=True)

    cursor_assets = Path.home() / '.cursor' / 'projects' / 'Users-sebastiensoave-surf-io' / 'assets'

    for definition in SPRITE_DEFINITIONS:
        destination = SOURCES_DIR / definition['source']

        if destination.exists():
            continue

        cursor_source = cursor_assets / definition['source']

        if cursor_source.exists():
            shutil.copy2(cursor_source, destination)
            continue

        output_fallback = OUTPUT_DIR / definition['output']

        if output_fallback.exists():
            shutil.copy2(output_fallback, destination)
            continue

        raise FileNotFoundError(
            f"Missing source sprite '{definition['source']}' in {SOURCES_DIR}",
        )


def generate_all() -> None:
    ensure_sources()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for definition in SPRITE_DEFINITIONS:
        source = SOURCES_DIR / definition['source']
        destination = OUTPUT_DIR / definition['output']
        size = definition['size']

        if not source.exists():
            raise FileNotFoundError(f'Source not found: {source}')

        image = export_sprite(source, destination, size)
        validate_alpha(image, definition['output'])

        print(
            f"✓ {definition['output']} "
            f"({size[0]}x{size[1]}, RGBA, transparent corners)",
        )


def main() -> int:
    try:
        generate_all()
    except Exception as error:  # noqa: BLE001 - CLI entrypoint
        print(f'Error: {error}', file=sys.stderr)
        return 1

    print(f'\nSprites generated in {OUTPUT_DIR}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
