// Fase 0 — Optimización de assets pesados de TUBOC.
// Convierte el video de intro (31MB) y la imagen del CTA (10MB) a formatos
// modernos y livianos. Herramientas locales: sharp (imágenes) + ffmpeg-static (video).
//
// Uso: node scripts/optimize-assets.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';

const root = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const assets = path.join(root, 'src', 'assets');
const out = path.join(assets, 'optimized');
mkdirSync(out, { recursive: true });

const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(2) + ' MB';
const kb = (p) => (statSync(p).size / 1024).toFixed(0) + ' KB';

async function optimizeImage(srcName, base, maxWidth = 1400) {
  const src = path.join(assets, srcName);
  if (!existsSync(src)) { console.log(`  ⚠ no existe: ${srcName}`); return; }
  const pipeline = sharp(src).rotate().resize({ width: maxWidth, withoutEnlargement: true });

  const avif = path.join(out, `${base}.avif`);
  const webp = path.join(out, `${base}.webp`);
  const jpg = path.join(out, `${base}.jpg`);

  await pipeline.clone().avif({ quality: 50 }).toFile(avif);
  await pipeline.clone().webp({ quality: 72 }).toFile(webp);
  await pipeline.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(jpg);

  console.log(`  ${srcName}  (${mb(src)})`);
  console.log(`    → ${base}.avif  ${kb(avif)}`);
  console.log(`    → ${base}.webp  ${kb(webp)}`);
  console.log(`    → ${base}.jpg   ${kb(jpg)}  (fallback)`);
}

function ff(args) {
  execFileSync(ffmpegPath, ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' });
}

function optimizeVideo(srcName, base, { width = 1280 } = {}) {
  const src = path.join(assets, srcName);
  if (!existsSync(src)) { console.log(`  ⚠ no existe: ${srcName}`); return; }
  const mp4 = path.join(out, `${base}.mp4`);
  const webm = path.join(out, `${base}.webm`);
  const poster = path.join(out, `${base}-poster.jpg`);

  const scale = `scale=${width}:-2:flags=lanczos`;

  // MP4 H.264 — máxima compatibilidad. Sin audio (el video va muted).
  ff(['-i', src, '-an', '-vf', scale, '-c:v', 'libx264', '-profile:v', 'high',
      '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4]);

  // WebM VP9 — mejor compresión para navegadores modernos.
  ff(['-i', src, '-an', '-vf', scale, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36',
      '-row-mt', '1', webm]);

  // Poster (primer frame) para preload="none" sin pantalla negra.
  ff(['-i', src, '-vf', `${scale},select=eq(n\\,0)`, '-frames:v', '1', poster]);

  console.log(`  ${srcName}  (${mb(src)})`);
  console.log(`    → ${base}.mp4   ${kb(mp4)}`);
  console.log(`    → ${base}.webm  ${kb(webm)}`);
  console.log(`    → ${base}-poster.jpg  ${kb(poster)}`);
}

console.log('— Imágenes —');
await optimizeImage('TUBOC + Carcasa.JPG', 'tuboc-carcasa', 1400);
await optimizeImage('Pipa POC TUBOC vertical Nivel de agua.png', 'poc-nivel-agua', 700);
await optimizeImage('Pipa POC TUBOC inclinada.png', 'poc-inclinada', 700);

console.log('— Video —');
optimizeVideo('Tuboc Horizontal 2.mp4', 'tuboc-intro', { width: 1280 });

console.log('\n✓ Listo. Assets en src/assets/optimized/');
