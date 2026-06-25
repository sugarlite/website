/**
 * Image compression script for SugarLite
 * Compresses icon.png and og-image.png to SEO-friendly sizes.
 * Run: node scripts/compress-images.js
 */

import sharp from 'sharp';
import { existsSync, mkdirSync, statSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const backupDir = join(__dirname, '..', 'public', '_originals');

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function backup(filePath) {
  if (!existsSync(backupDir)) {
    mkdirSync(backupDir, { recursive: true });
  }
  const dest = join(backupDir, filePath.replace(publicDir + '/', ''));
  if (!existsSync(dest)) {
    const destDir = dirname(dest);
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }
    copyFileSync(filePath, dest);
    console.log(`  📦 Backed up to _originals/`);
  }
}

async function compressIcon() {
  const inputPath = join(publicDir, 'icon.png');
  if (!existsSync(inputPath)) {
    console.log('  ⚠️  icon.png not found, skipping');
    return;
  }

  const originalSize = statSync(inputPath).size;
  console.log(`\n🖼️  Compressing icon.png (original: ${formatSize(originalSize)})`);

  // Backup original
  await backup(inputPath);

  // Resize to 192x192, compress as PNG with reduced quality
  await sharp(inputPath)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 85, palette: true, compressionLevel: 9 })
    .toFile(inputPath + '.tmp');

  const newSize = statSync(inputPath + '.tmp').size;

  // Replace original
  const { renameSync, unlinkSync } = await import('fs');
  unlinkSync(inputPath);
  renameSync(inputPath + '.tmp', inputPath);

  console.log(`  ✅ icon.png compressed: ${formatSize(originalSize)} → ${formatSize(newSize)} (${((1 - newSize / originalSize) * 100).toFixed(1)}% reduction)`);

  // Also compress icon-512.png
  const icon512Path = join(publicDir, 'icon-512.png');
  if (existsSync(icon512Path)) {
    const orig512Size = statSync(icon512Path).size;
    await backup(icon512Path);

    await sharp(icon512Path)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 85, palette: true, compressionLevel: 9 })
      .toFile(icon512Path + '.tmp');

    const new512Size = statSync(icon512Path + '.tmp').size;
    unlinkSync(icon512Path);
    renameSync(icon512Path + '.tmp', icon512Path);
    console.log(`  ✅ icon-512.png compressed: ${formatSize(orig512Size)} → ${formatSize(new512Size)}`);
  }
}

async function compressOgImage() {
  const inputPath = join(publicDir, 'og-image.png');
  if (!existsSync(inputPath)) {
    console.log('  ⚠️  og-image.png not found, skipping');
    return;
  }

  const originalSize = statSync(inputPath).size;
  console.log(`\n🖼️  Compressing og-image.png (original: ${formatSize(originalSize)})`);

  // Backup original
  await backup(inputPath);

  // Keep 1200x630, compress aggressively
  await sharp(inputPath)
    .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
    .png({ quality: 80, palette: true, compressionLevel: 9, colours: 256 })
    .toFile(inputPath + '.tmp');

  const newSize = statSync(inputPath + '.tmp').size;

  // If still too large, try even more compression
  if (newSize > 300 * 1024) {
    console.log(`  ⚠️  Still ${formatSize(newSize)}, trying more aggressive compression...`);
    await sharp(inputPath)
      .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 60, palette: true, compressionLevel: 9, colours: 128 })
      .toFile(inputPath + '.tmp2');

    const newSize2 = statSync(inputPath + '.tmp2').size;
    const { unlinkSync, renameSync } = await import('fs');
    unlinkSync(inputPath + '.tmp');
    renameSync(inputPath + '.tmp2', inputPath + '.tmp');
  }

  const finalSize = statSync(inputPath + '.tmp').size;

  // Replace original
  const { renameSync, unlinkSync } = await import('fs');
  unlinkSync(inputPath);
  renameSync(inputPath + '.tmp', inputPath);

  console.log(`  ✅ og-image.png compressed: ${formatSize(originalSize)} → ${formatSize(finalSize)} (${((1 - finalSize / originalSize) * 100).toFixed(1)}% reduction)`);
}

async function compressHeroPhone() {
  const inputPath = join(publicDir, 'hero-phone.png');
  if (!existsSync(inputPath)) {
    console.log('  ⚠️  hero-phone.png not found, skipping');
    return;
  }

  const originalSize = statSync(inputPath).size;
  console.log(`\n🖼️  Compressing hero-phone.png (original: ${formatSize(originalSize)})`);

  await backup(inputPath);

  await sharp(inputPath)
    .png({ quality: 85, palette: true, compressionLevel: 9 })
    .toFile(inputPath + '.tmp');

  const newSize = statSync(inputPath + '.tmp').size;
  const { renameSync, unlinkSync } = await import('fs');
  unlinkSync(inputPath);
  renameSync(inputPath + '.tmp', inputPath);

  console.log(`  ✅ hero-phone.png compressed: ${formatSize(originalSize)} → ${formatSize(newSize)} (${((1 - newSize / originalSize) * 100).toFixed(1)}% reduction)`);
}

async function main() {
  console.log('🔧 SugarLite Image Compression\n');

  await compressIcon();
  await compressOgImage();
  await compressHeroPhone();

  console.log('\n✨ Image compression complete!');
}

main().catch(console.error);
