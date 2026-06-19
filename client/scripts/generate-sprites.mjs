/**
 * Generate Surf.io sprites with full alpha transparency.
 * Requires: client/.venv-sprites (python3 -m venv .venv-sprites && pip install Pillow)
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientRoot = path.resolve(__dirname, '..');
const venvPython = path.join(clientRoot, '.venv-sprites', 'bin', 'python');
const python = existsSync(venvPython) ? venvPython : 'python3';
const scriptPath = path.join(__dirname, 'generate-sprites.py');

const result = spawnSync(python, [scriptPath], {
  cwd: clientRoot,
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
