import sharp from 'sharp';
import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const inputPath = join(publicDir, 'og-image.png');

const targetWidth = 1200;
const targetHeight = 630;

async function run() {
  const inputStat = statSync(inputPath);
  console.log(`Original: ${(inputStat.size / 1024).toFixed(1)}KB`);

  // WebP version
  await sharp(inputPath)
    .resize(targetWidth, targetHeight, { fit: 'cover' })
    .webp({ quality: 85, effort: 6 })
    .toFile(join(publicDir, 'og-image.webp'));
  const webpStat = statSync(join(publicDir, 'og-image.webp'));
  console.log(`WebP: ${(webpStat.size / 1024).toFixed(1)}KB`);

  // AVIF version
  await sharp(inputPath)
    .resize(targetWidth, targetHeight, { fit: 'cover' })
    .avif({ quality: 75, effort: 6 })
    .toFile(join(publicDir, 'og-image.avif'));
  const avifStat = statSync(join(publicDir, 'og-image.avif'));
  console.log(`AVIF: ${(avifStat.size / 1024).toFixed(1)}KB`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
