import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const PREVIEW_DIR = new URL('../public/preview', import.meta.url).pathname;
const ORIGINALS_DIR = path.join(PREVIEW_DIR, '_originals');

async function compressImage(filename) {
  const inputPath = path.join(PREVIEW_DIR, filename);
  const baseName = path.basename(filename, '.png');

  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // Determine target width: keep reasonable size for web display
  const targetWidth = Math.min(metadata.width || 1200, 800);

  const resized = image.resize(targetWidth, null, {
    withoutEnlargement: true,
    fit: 'inside',
  });

  // WebP with good quality
  await resized
    .clone()
    .webp({ quality: 85, effort: 6 })
    .toFile(path.join(PREVIEW_DIR, `${baseName}.webp`));

  // AVIF for modern browsers
  await resized
    .clone()
    .avif({ quality: 75, effort: 6 })
    .toFile(path.join(PREVIEW_DIR, `${baseName}.avif`));

  // Optimized PNG fallback: reduce color depth if possible
  const tmpPng = path.join(PREVIEW_DIR, `${baseName}.tmp.png`);
  await resized
    .clone()
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
    .toFile(tmpPng);
  await fs.rename(tmpPng, path.join(PREVIEW_DIR, filename));
}

async function main() {
  // Ensure originals backup exists
  await fs.mkdir(ORIGINALS_DIR, { recursive: true });

  const files = (await fs.readdir(PREVIEW_DIR))
    .filter((f) => f.endsWith('.png') && f.startsWith('Screenshot'))
    .filter((f) => !f.includes('_originals'));

  for (const file of files) {
    const originalPath = path.join(ORIGINALS_DIR, file);
    const currentPath = path.join(PREVIEW_DIR, file);
    try {
      await fs.access(originalPath);
    } catch {
      // Backup current PNG if not already backed up
      await fs.copyFile(currentPath, originalPath);
    }

    console.log(`Compressing: ${file}`);
    await compressImage(file);
  }

  console.log('\nDone. Sizes:');
  for (const file of files) {
    const baseName = path.basename(file, '.png');
    const pngStat = await fs.stat(path.join(PREVIEW_DIR, file));
    const webpStat = await fs.stat(path.join(PREVIEW_DIR, `${baseName}.webp`));
    const avifStat = await fs.stat(path.join(PREVIEW_DIR, `${baseName}.avif`));
    console.log(
      `${baseName}: PNG ${(pngStat.size / 1024).toFixed(1)}KB | WebP ${(webpStat.size / 1024).toFixed(1)}KB | AVIF ${(avifStat.size / 1024).toFixed(1)}KB`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
