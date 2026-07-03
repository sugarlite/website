import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const TARGETS = [
  { file: 'hero-phone.png', maxWidth: 700 },
];

async function compressImage(filename, maxWidth) {
  const inputPath = path.join(PUBLIC_DIR, filename);
  const baseName = path.basename(filename, path.extname(filename));

  const image = sharp(inputPath);
  const metadata = await image.metadata();

  console.log(`Original: ${filename} (${metadata.width}×${metadata.height})`);

  const resized = image.resize(maxWidth, null, {
    withoutEnlargement: true,
    fit: 'inside',
  });

  // WebP
  const webpPath = path.join(PUBLIC_DIR, `${baseName}.webp`);
  await resized.clone().webp({ quality: 85, effort: 6 }).toFile(webpPath);
  const webpStat = await fs.stat(webpPath);
  console.log(`  → ${baseName}.webp: ${(webpStat.size / 1024).toFixed(1)}KB`);

  // AVIF
  const avifPath = path.join(PUBLIC_DIR, `${baseName}.avif`);
  await resized.clone().avif({ quality: 75, effort: 6 }).toFile(avifPath);
  const avifStat = await fs.stat(avifPath);
  console.log(`  → ${baseName}.avif: ${(avifStat.size / 1024).toFixed(1)}KB`);

  // Optimized PNG
  const tmpPng = path.join(PUBLIC_DIR, `${baseName}.tmp.png`);
  await resized
    .clone()
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
    .toFile(tmpPng);
  await fs.rename(tmpPng, inputPath);
  const pngStat = await fs.stat(inputPath);
  console.log(`  → ${filename} (optimized): ${(pngStat.size / 1024).toFixed(1)}KB`);
}

async function main() {
  for (const { file, maxWidth } of TARGETS) {
    console.log(`\nCompressing: ${file}`);
    await compressImage(file, maxWidth);
  }
  console.log('\nDone!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
