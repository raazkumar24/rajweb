import fs from 'node:fs';
import path from 'node:path';

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(getFiles(full));
    else if (/\.(jsx?|css)$/.test(file)) results.push(full);
  }
  return results;
}

const files = getFiles('./src');

const classReplacements = [
  // 1. Hover & Group Hover with opacity
  { regex: /group-hover:text-\[#8B5CF6\]/g, to: 'group-hover:text-brand' },
  { regex: /group-hover:text-\[#7C3AED\]/g, to: 'group-hover:text-brand-dark' },
  { regex: /group-hover:bg-\[#8B5CF6\]\/(\d+)/g, to: 'group-hover:bg-brand/$1' },
  { regex: /group-hover:border-\[#8B5CF6\]\/(\d+)/g, to: 'group-hover:border-brand/$1' },
  { regex: /hover:text-\[#8B5CF6\]/g, to: 'hover:text-brand' },
  { regex: /hover:text-\[#7C3AED\]/g, to: 'hover:text-brand-dark' },
  { regex: /hover:bg-\[#8B5CF6\]\/(\d+)/g, to: 'hover:bg-brand/$1' },
  { regex: /hover:bg-\[#8B5CF6\]/g, to: 'hover:bg-brand' },
  { regex: /hover:border-\[#8B5CF6\]\/(\d+)/g, to: 'hover:border-brand/$1' },
  { regex: /hover:border-\[#8B5CF6\]/g, to: 'hover:border-brand' },

  // 2. Classes with Opacity
  { regex: /bg-\[#8B5CF6\]\/(\d+)/g, to: 'bg-brand/$1' },
  { regex: /border-\[#8B5CF6\]\/(\d+)/g, to: 'border-brand/$1' },
  { regex: /ring-\[#8B5CF6\]\/(\d+)/g, to: 'ring-brand/$1' },
  { regex: /from-\[#8B5CF6\]\/(\d+)/g, to: 'from-brand/$1' },
  { regex: /via-\[#8B5CF6\]\/(\d+)/g, to: 'via-brand/$1' },
  { regex: /to-\[#8B5CF6\]\/(\d+)/g, to: 'to-brand/$1' },
  { regex: /bg-\[#7C3AED\]\/(\d+)/g, to: 'bg-brand-dark/$1' },
  { regex: /border-\[#7C3AED\]\/(\d+)/g, to: 'border-brand-dark/$1' },
  { regex: /from-\[#C084FC\]\/(\d+)/g, to: 'from-brand-light/$1' },
  { regex: /via-\[#C084FC\]\/(\d+)/g, to: 'via-brand-light/$1' },
  { regex: /to-\[#C084FC\]\/(\d+)/g, to: 'to-brand-light/$1' },

  // 3. Classes without Opacity
  { regex: /text-\[#8B5CF6\]/g, to: 'text-brand' },
  { regex: /bg-\[#8B5CF6\]/g, to: 'bg-brand' },
  { regex: /border-\[#8B5CF6\]/g, to: 'border-brand' },
  { regex: /ring-\[#8B5CF6\]/g, to: 'ring-brand' },
  { regex: /text-\[#7C3AED\]/g, to: 'text-brand-dark' },
  { regex: /bg-\[#7C3AED\]/g, to: 'bg-brand-dark' },
  { regex: /border-\[#7C3AED\]/g, to: 'border-brand-dark' },
  { regex: /from-\[#8B5CF6\]/g, to: 'from-brand' },
  { regex: /via-\[#8B5CF6\]/g, to: 'via-brand' },
  { regex: /to-\[#8B5CF6\]/g, to: 'to-brand' },
  { regex: /from-\[#6D28D9\]/g, to: 'from-brand-deep' },
  { regex: /to-\[#6D28D9\]/g, to: 'to-brand-deep' },
  { regex: /via-\[#6D28D9\]/g, to: 'via-brand-deep' },
  { regex: /from-\[#C084FC\]/g, to: 'from-brand-light' },
  { regex: /via-\[#C084FC\]/g, to: 'via-brand-light' },
  { regex: /to-\[#C084FC\]/g, to: 'to-brand-light' },

  // 4. RGBA in shadows / borders
  { regex: /rgba\(\s*139\s*,\s*92\s*,\s*246\s*,/g, to: 'rgba(var(--brand-rgb),' },
  { regex: /rgba\(\s*124\s*,\s*58\s*,\s*237\s*,/g, to: 'rgba(var(--brand-rgb-dark),' },
  { regex: /rgba\(\s*192\s*,\s*132\s*,\s*252\s*,/g, to: 'rgba(var(--brand-rgb),' },

  // 5. SVG / JSX props
  { regex: /color\s*=\s*"#8B5CF6"/g, to: 'color="var(--brand-primary)"' },
  { regex: /color\s*=\s*"#7C3AED"/g, to: 'color="var(--brand-primary-dark)"' },
  { regex: /fill\s*=\s*"#8B5CF6"/g, to: 'fill="var(--brand-primary)"' },
  { regex: /stroke\s*=\s*"#8B5CF6"/g, to: 'stroke="var(--brand-primary)"' },
  { regex: /stroke\s*=\s*"#7C3AED"/g, to: 'stroke="var(--brand-primary-dark)"' },
  { regex: /stopColor="#8B5CF6"/g, to: 'stopColor="var(--brand-primary)"' },
  { regex: /stopColor="#7C3AED"/g, to: 'stopColor="var(--brand-primary-dark)"' },
  { regex: /stopColor="#6D28D9"/g, to: 'stopColor="var(--brand-primary-deep)"' },
  { regex: /stopColor="#C084FC"/g, to: 'stopColor="var(--brand-stop-0)"' },
  { regex: /stopColor="#DDD6FE"/g, to: 'stopColor="var(--brand-stop-0)"' },

  // 6. Accent props in data
  { regex: /accent:\s*"#8B5CF6"/g, to: 'accent: "var(--brand-primary)"' },
  { regex: /accent:\s*"#6D28D9"/g, to: 'accent: "var(--brand-primary-deep)"' },
];

let totalMods = 0;

for (const f of files) {
  // Skip config/theme.js
  if (f.endsWith('theme.js')) continue;

  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  for (const { regex, to } of classReplacements) {
    content = content.replace(regex, to);
  }

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    totalMods++;
    console.log(`Converted: ${f}`);
  }
}

console.log(`\nConversion complete! ${totalMods} files converted to dynamic brand tokens.`);
