"""Shared utilities for Surf.io sprite generation with alpha transparency."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image


def is_background_pixel(red: int, green: int, blue: int, alpha: int = 255) -> bool:
    if alpha < 16:
        return True

    if min(red, green, blue) > 232:
        return True

    if red > 218 and green > 218 and blue > 205:
        return True

    if abs(red - green) < 20 and abs(green - blue) < 20 and abs(red - blue) < 20 and red > 135:
        return True

    return False


def remove_background(image: Image.Image) -> Image.Image:
    rgba = image.convert('RGBA')
    pixels = rgba.load()
    width, height = rgba.size
    visited: set[tuple[int, int]] = set()
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))

    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()

        if (x, y) in visited:
            continue

        visited.add((x, y))
        red, green, blue, alpha = pixels[x, y]

        if not is_background_pixel(red, green, blue, alpha):
            continue

        pixels[x, y] = (red, green, blue, 0)

        if x > 0:
            queue.append((x - 1, y))
        if x < width - 1:
            queue.append((x + 1, y))
        if y > 0:
            queue.append((x, y - 1))
        if y < height - 1:
            queue.append((x, y + 1))

    return rgba


def remove_fringe(image: Image.Image, passes: int = 2) -> Image.Image:
    rgba = image.convert('RGBA')
    pixels = rgba.load()
    width, height = rgba.size

    for _ in range(passes):
        to_clear: list[tuple[int, int]] = []

        for y in range(height):
            for x in range(width):
                red, green, blue, alpha = pixels[x, y]

                if alpha == 0:
                    continue

                if not is_background_pixel(red, green, blue, alpha):
                    continue

                touches_transparent = False

                for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                    if nx < 0 or ny < 0 or nx >= width or ny >= height:
                        touches_transparent = True
                        break

                    if pixels[nx, ny][3] == 0:
                        touches_transparent = True
                        break

                if touches_transparent:
                    to_clear.append((x, y))

        for x, y in to_clear:
            red, green, blue, _alpha = pixels[x, y]
            pixels[x, y] = (red, green, blue, 0)

    return rgba


def export_sprite(source: Path, destination: Path, size: tuple[int, int]) -> Image.Image:
    image = Image.open(source)
    transparent = remove_background(image)
    transparent = remove_fringe(transparent)
    resized = transparent.resize(size, Image.Resampling.LANCZOS)
    resized = remove_fringe(resized, passes=1)

    destination.parent.mkdir(parents=True, exist_ok=True)
    resized.save(destination, format='PNG', optimize=True)

    return resized


def validate_alpha(image: Image.Image, label: str) -> None:
    if image.mode != 'RGBA':
        raise ValueError(f'{label}: expected RGBA mode, got {image.mode}')

    pixels = image.load()
    width, height = image.size
    corners = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]

    for corner in corners:
        if pixels[corner][3] != 0:
            raise ValueError(f'{label}: corner {corner} is not transparent')

    transparent_count = sum(
        1 for y in range(height) for x in range(width) if pixels[x, y][3] == 0
    )

    if transparent_count == 0:
        raise ValueError(f'{label}: image has no transparent pixels')
