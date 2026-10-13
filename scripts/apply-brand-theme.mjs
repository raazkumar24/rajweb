import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = './src';

// Recursive file scanner
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (/\.(jsx?|css)$/.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

// Hex replacement map (excluding #FFFFFF, #FF5F57)
const replacements = [
  // Primary & Main Accent
  { from: /#FF8A00/gi, to: '#8B5CF6' },
  { from: /#FF7700/gi, to: '#7C3AED' },
  { from: /#FF7A00/gi, to: '#7C3AED' },
  { from: /#FF9500/gi, to: '#8B5CF6' },

  // Deep Shades / Gradient Ends
  { from: /#FF6A00/gi, to: '#6D28D9' },
  { from: /#FF6B00/gi, to: '#6D28D9' },
  { from: /#FF5500/gi, to: '#6D28D9' },
  { from: /#FF5A00/gi, to: '#6D28D9' },
  { from: /#FF4800/gi, to: '#5B21B6' },
  { from: /#E94A00/gi, to: '#5B21B6' },
  { from: /#FF6800/gi, to: '#6D28D9' },

  // Light Highlights / Glow Start Stops
  { from: /#FFAA00/gi, to: '#C084FC' },
  { from: /#FFB52E/gi, to: '#C084FC' },
  { from: /#FFC85A/gi, to: '#C084FC' },
  { from: /#FFD98A/gi, to: '#DDD6FE' },
  { from: /#FFD080/gi, to: '#DDD6FE' },
  { from: /#FFA629/gi, to: '#C084FC' },
  { from: /#FFAE33/gi, to: '#C084FC' },
  { from: /#FFA726/gi, to: '#C084FC' },
  { from: /#FF9A1F/gi, to: '#A855F7' },

  // Shimmer Background Tint
  { from: /#FFF7EC/gi, to: '#FAF5FF' },

  // RGBA variations (with and without space)
  { from: /rgba\(\s*255\s*,\s*138\s*,\s*0\s*,/gi, to: 'rgba(139, 92, 246,' },
  { from: /rgba\(\s*255\s*,\s*149\s*,\s*0\s*,/gi, to: 'rgba(139, 92, 246,' },
  { from: /rgba\(\s*255\s*,\s*119\s*,\s*0\s*,/gi, to: 'rgba(124, 58, 237,' },
  { from: /rgba\(\s*255\s*,\s*170\s*,\s*0\s*,/gi, to: 'rgba(192, 132, 252,' },
];

const allFiles = getFiles(SRC_DIR);
let totalReplacements = 0;
let modifiedFiles = 0;

for (const filePath of allFiles) {
  // Skip theme.js config file
  if (filePath.endsWith('theme.js')) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const { from, to } of replacements) {
    const matches = content.match(from);
    if (matches) {
      totalReplacements += matches.length;
      content = content.replace(from, to);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles++;
    console.log(`Updated: ${filePath}`);
  }
}

console.log(`\nTheme replacement complete!`);
console.log(`Modified files: ${modifiedFiles}`);
console.log(`Total replacements: ${totalReplacements}`);
