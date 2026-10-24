import fs from 'node:fs';
import path from 'node:path';
import { THEME_PALETTES } from '../src/config/theme.js';

const themeArg = (process.argv[2] || '').toLowerCase().trim();

if (!themeArg || !THEME_PALETTES[themeArg]) {
  console.log('Usage: node scripts/switch-theme.mjs <theme-name>');
  console.log('Available theme presets:');
  Object.keys(THEME_PALETTES).forEach((key) => {
    console.log(`  - ${key.padEnd(10)} (${THEME_PALETTES[key].name})`);
  });
  process.exit(1);
}

const theme = THEME_PALETTES[themeArg];
const cssPath = path.resolve('./src/index.css');

let css = fs.readFileSync(cssPath, 'utf8');

const newRoot = `:root {
  /* ═══════════════════════════════════════════════════════════════════
     ACTIVE THEME: ${theme.name.toUpperCase()}
     To change colors manually, edit these CSS variables.
     Or run: node scripts/switch-theme.mjs <theme-name>
     ═══════════════════════════════════════════════════════════════════ */
  --brand-primary: ${theme.primary};
  --brand-primary-dark: ${theme.primaryDark};
  --brand-primary-light: ${theme.primaryLight};
  --brand-primary-deep: ${theme.primaryDeep};
  --brand-stop-0: ${theme.stop0};
  --brand-stop-1: ${theme.stop1};
  --brand-stop-2: ${theme.stop2};
  --brand-stop-3: ${theme.stop3};
  --brand-rgb: ${theme.rgb};
  --brand-rgb-dark: ${theme.rgbDark};

  /* Surfaces */
  --color-surface: #FAF8F5;
  --color-ink: #111111;
  --color-muted: #666666;
  --color-subtle: #888888;
  --color-border: rgba(17, 17, 17, 0.1);
  --color-border-hover: rgba(var(--brand-rgb), 0.45);

  /* Typography Fonts */
  --font-display: "Bricolage Grotesque", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-body: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  /* Base Radius & Shadcn UI Tokens */
  --radius: 0.625rem;
  --background: #FAF8F5;
  --foreground: #111111;
  --card: #FFFFFF;
  --card-foreground: #111111;
  --popover: #FFFFFF;
  --popover-foreground: #111111;
  --primary: ${theme.primary};
  --primary-foreground: #FFFFFF;
  --secondary: #F3F0EA;
  --secondary-foreground: #111111;
  --muted: #666666;
  --muted-foreground: #888888;
  --accent: #F3F0EA;
  --accent-foreground: #111111;
  --destructive: #EF4444;
  --border: rgba(17, 17, 17, 0.1);
  --input: rgba(17, 17, 17, 0.15);
  --ring: ${theme.primary};
}`;

css = css.replace(/:root\s*\{[\s\S]*?\n\}/, newRoot);
fs.writeFileSync(cssPath, css, 'utf8');

const themeConfigPath = path.resolve('./src/config/theme.js');
let themeConfig = fs.readFileSync(themeConfigPath, 'utf8');
themeConfig = themeConfig.replace(
  /export const CURRENT_THEME = THEME_PALETTES\.[a-zA-Z0-9_]+;/,
  `export const CURRENT_THEME = THEME_PALETTES.${themeArg};`
);
fs.writeFileSync(themeConfigPath, themeConfig, 'utf8');

console.log(`Successfully switched theme to: ${theme.name}!`);
console.log(`Updated CSS variables in src/index.css and src/config/theme.js.`);
