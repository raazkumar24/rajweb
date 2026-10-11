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

  // Also optimize public/profile.png itself as webp-optimized PNG so fallback works
  const profilePng = path.join(rootDir, 'public/profile.png');
  await sharp(profilePng)
    .resize({ width: 1000, withoutEnlargement: true })
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer()
    .then(data => fs.writeFileSync(profilePng, data));

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
