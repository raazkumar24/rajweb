import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function optimize() {
  const rootDir = process.cwd();
  const images = [
    { input: 'public/profile.png', output: 'public/profile.webp', maxW: 1000 },
    { input: 'src/assets/images/genz/genz1.png', output: 'src/assets/images/genz/genz1.webp', maxW: 1400 },
    { input: 'src/assets/images/genz/genz2.png', output: 'src/assets/images/genz/genz2.webp', maxW: 1400 },
    { input: 'src/assets/images/genz/zenz3.png', output: 'src/assets/images/genz/zenz3.webp', maxW: 1400 },
    { input: 'src/assets/images/udupi/udupi1.png', output: 'src/assets/images/udupi/udupi1.webp', maxW: 1400 },
    { input: 'src/assets/images/udupi/udupi2.png', output: 'src/assets/images/udupi/udupi2.webp', maxW: 1400 },
    { input: 'src/assets/images/udupi/udupi3.png', output: 'src/assets/images/udupi/udupi3.webp', maxW: 1400 },
    { input: 'src/assets/images/portfolio_website_mockup_1791209132467.jpg', output: 'src/assets/images/portfolio_mockup.webp', maxW: 1400 },
    { input: 'src/assets/images/task_manager_mockup_1791209296957.jpg', output: 'src/assets/images/task_manager_mockup.webp', maxW: 1400 },
  ];

  let totalBefore = 0;
  let totalAfter = 0;
  const results = [];

  for (const item of images) {
    const inputPath = path.join(rootDir, item.input);
    const outputPath = path.join(rootDir, item.output);

    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${item.input}`);
      continue;
    }

    const beforeStat = fs.statSync(inputPath);
    totalBefore += beforeStat.size;

    await sharp(inputPath)
      .resize({ width: item.maxW, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);

    const afterStat = fs.statSync(outputPath);
    totalAfter += afterStat.size;

    results.push({
      file: item.input,
      output: item.output,
      beforeKb: (beforeStat.size / 1024).toFixed(1),
      afterKb: (afterStat.size / 1024).toFixed(1),
      savedPct: (((beforeStat.size - afterStat.size) / beforeStat.size) * 100).toFixed(1) + '%',
    });
  }

  // Hero purple-profile optimization (800w, 1400w in AVIF & WebP + og-image JPG)
  const purpleInput = path.join(rootDir, 'public/images/purple-profile.png');
  if (fs.existsSync(purpleInput)) {
    const pStat = fs.statSync(purpleInput);
    totalBefore += pStat.size;

    const heroVariants = [
      { file: 'public/images/purple-profile-800.avif', w: 800, fmt: 'avif', opts: { quality: 80 } },
      { file: 'public/images/purple-profile-1400.avif', w: 1400, fmt: 'avif', opts: { quality: 80 } },
      { file: 'public/images/purple-profile-800.webp', w: 800, fmt: 'webp', opts: { quality: 82 } },
      { file: 'public/images/purple-profile-1400.webp', w: 1400, fmt: 'webp', opts: { quality: 82 } },
      { file: 'public/images/og-image.jpg', w: 1200, fmt: 'jpeg', opts: { quality: 85 } },
    ];

    for (const v of heroVariants) {
      const outPath = path.join(rootDir, v.file);
      let s = sharp(purpleInput).resize({ width: v.w, withoutEnlargement: true });
      if (v.fmt === 'avif') s = s.avif(v.opts);
      else if (v.fmt === 'webp') s = s.webp(v.opts);
      else if (v.fmt === 'jpeg') s = s.flatten({ background: '#FAF8F5' }).jpeg(v.opts);
      await s.toFile(outPath);
      const vStat = fs.statSync(outPath);
      results.push({
        file: 'purple-profile.png',
        output: v.file,
        beforeKb: (pStat.size / 1024).toFixed(1),
        afterKb: (vStat.size / 1024).toFixed(1),
        savedPct: (((pStat.size - vStat.size) / pStat.size) * 100).toFixed(1) + '%',
      });
    }

    // Optimize purple-profile.png fallback in-place
    const optPngBuffer = await sharp(purpleInput)
      .resize({ width: 1400, withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync(purpleInput, optPngBuffer);
    const newStat = fs.statSync(purpleInput);
    totalAfter += newStat.size;
  }

  // Profile 1 and Profile 2 optimizations
  for (const name of ['profile', 'profile2']) {
    const pngPath = path.join(rootDir, `public/images/${name}.png`);
    if (!fs.existsSync(pngPath)) continue;

    const stat = fs.statSync(pngPath);
    totalBefore += stat.size;

    const variants = [
      { file: `public/images/${name}-800.avif`, w: 800, fmt: 'avif', opts: { quality: 80 } },
      { file: `public/images/${name}-1400.avif`, w: 1400, fmt: 'avif', opts: { quality: 80 } },
      { file: `public/images/${name}-800.webp`, w: 800, fmt: 'webp', opts: { quality: 82 } },
      { file: `public/images/${name}-1400.webp`, w: 1400, fmt: 'webp', opts: { quality: 82 } },
      { file: `public/images/${name}.webp`, w: 1400, fmt: 'webp', opts: { quality: 82 } },
      { file: `public/images/${name}.avif`, w: 1400, fmt: 'avif', opts: { quality: 80 } },
    ];

    for (const v of variants) {
      const outPath = path.join(rootDir, v.file);
      let s = sharp(pngPath).resize({ width: v.w, withoutEnlargement: true });
      if (v.fmt === 'avif') s = s.avif(v.opts);
      else if (v.fmt === 'webp') s = s.webp(v.opts);
      await s.toFile(outPath);
      const vStat = fs.statSync(outPath);
      results.push({
        file: `${name}.png`,
        output: v.file,
        beforeKb: (stat.size / 1024).toFixed(1),
        afterKb: (vStat.size / 1024).toFixed(1),
        savedPct: (((stat.size - vStat.size) / stat.size) * 100).toFixed(1) + '%',
      });
    }
  }

  console.log('--- IMAGE OPTIMIZATION SUMMARY ---');
  console.table(results);
  console.log(`TOTAL BEFORE: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`TOTAL AFTER:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`SAVED:        ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`);
}

optimize().catch(err => {
  console.error(err);
  process.exit(1);
});
