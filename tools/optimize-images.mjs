#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { globby } from 'globby';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(process.cwd(), 'public/images/portfolio');
const OUT_DIR = path.resolve(process.cwd(), 'public/images/portfolio-optimized');

// Balanced strategy: generate WebP + JPEG fallback only
const MAX_WIDTHS = [1600, 1200]; // two sizes: lightbox + tiles
const QUALITY = { jpeg: 75, webp: 75 };

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function outPath(baseOut, rel, suffix = '') {
  const dir = path.dirname(rel);
  const name = path.basename(rel, path.extname(rel));
  return path.join(baseOut, dir, `${name}${suffix}`);
}

async function optimizeOne(file) {
  const rel = path.relative(SRC_DIR, file);
  // Always attempt both target widths; withoutEnlargement prevents upscaling
  const targets = MAX_WIDTHS;

  // Detect source characteristics
  const meta = await sharp(file, { failOn: 'none' }).metadata();
  const srcExt = path.extname(file).toLowerCase();
  const hasAlpha = !!meta.hasAlpha || srcExt === '.png';

  for (const w of targets) {
    const base = outPath(OUT_DIR, rel, `-${w}`);
    await ensureDir(path.dirname(base));

    // Fallback: PNG for images with alpha (logos, UI with transparency), else JPEG
    if (hasAlpha) {
      await sharp(file)
        .resize({ width: w, withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true })
        .toFile(`${base}.png`);
    } else {
      await sharp(file)
        .resize({ width: w, withoutEnlargement: true })
        .jpeg({ quality: QUALITY.jpeg, progressive: true })
        .toFile(`${base}.jpg`);
    }

    // WebP
    await sharp(file)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY.webp })
      .toFile(`${base}.webp`);
  }
}

async function main() {
  console.log(`Scanning ${SRC_DIR} ...`);
  const files = await globby(['**/*.{png,jpg,jpeg}'], { cwd: SRC_DIR, absolute: true, dot: false });
  console.log(`Found ${files.length} images`);
  await ensureDir(OUT_DIR);

  // Clean up old AVIF outputs from prior runs (moving to balanced strategy)
  const oldAvifs = await globby(['**/*.avif'], { cwd: OUT_DIR, absolute: true });
  if (oldAvifs.length) {
    console.log(`Removing ${oldAvifs.length} legacy AVIF files ...`);
    for (const f of oldAvifs) {
      try { await fs.unlink(f); } catch {}
    }
  }

  let ok = 0, fail = 0;
  for (const file of files) {
    try {
      await optimizeOne(file);
      ok++;
      process.stdout.write('.');
    } catch (e) {
      console.error(`\nFailed: ${file}`, e.message);
      fail++;
    }
  }
  console.log(`\nDone. Success: ${ok}, Failed: ${fail}`);
}

main().catch(err => { console.error(err); process.exit(1); });
