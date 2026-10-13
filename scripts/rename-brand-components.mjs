import fs from 'node:fs';

// 1. Read existing OrangeShapes.jsx and create BrandShapes.jsx
const orangeShapesPath = './src/components/decorative/OrangeShapes.jsx';
const brandShapesPath = './src/components/decorative/BrandShapes.jsx';

let shapesContent = fs.readFileSync(orangeShapesPath, 'utf8');

// Replace component names
shapesContent = shapesContent
  .replace(/ORANGE BACKGROUND SHAPES/g, 'BRAND BACKGROUND SHAPES')
  .replace(/export function OrangeTopLeftShape/g, 'export function BrandTopLeftShape')
  .replace(/export function OrangeSectionSideWave/g, 'export function BrandSectionSideWave')
  .replace(/export function OrangeSectionRightWave/g, 'export function BrandSectionRightWave')
  .replace(/export function OrangeBottomHeroWave/g, 'export function BrandBottomHeroWave')
  .replace(/export function OrangeLeftAccentShape/g, 'export function BrandLeftAccentShape')
  .replace(/export function OrangeRightAccentShape/g, 'export function BrandRightAccentShape')
  .replace(/export function OrangeBottomRightShape/g, 'export function BrandBottomRightShape')
  .replace(/export function OrangeJourneyCardBlob/g, 'export function BrandJourneyCardBlob')
  .replace(/export function OrangeCtaBottomWave/g, 'export function BrandCtaBottomWave')
  .replace(/export default function OrangeBackgroundShapes/g, 'export default function BrandBackgroundShapes');

// Append alias exports at the end
shapesContent += `
// ── Backward-compatibility aliases ──
export {
  BrandTopLeftShape as OrangeTopLeftShape,
  BrandSectionSideWave as OrangeSectionSideWave,
  BrandSectionRightWave as OrangeSectionRightWave,
  BrandBottomHeroWave as OrangeBottomHeroWave,
  BrandLeftAccentShape as OrangeLeftAccentShape,
  BrandRightAccentShape as OrangeRightAccentShape,
  BrandBottomRightShape as OrangeBottomRightShape,
  BrandJourneyCardBlob as OrangeJourneyCardBlob,
  BrandCtaBottomWave as OrangeCtaBottomWave,
  BrandBackgroundShapes as OrangeBackgroundShapes,
};
`;

fs.writeFileSync(brandShapesPath, shapesContent, 'utf8');
console.log('Created: src/components/decorative/BrandShapes.jsx');

// Update OrangeShapes.jsx to forward exports to BrandShapes.jsx
const orangeShapesForward = `// Backward compatibility forwarder
export * from "./BrandShapes.jsx";
export { default } from "./BrandShapes.jsx";
`;
fs.writeFileSync(orangeShapesPath, orangeShapesForward, 'utf8');
console.log('Updated: src/components/decorative/OrangeShapes.jsx (forwarder)');

// 2. Update decorative/index.js
const decIndexPath = './src/components/decorative/index.js';
let decIndex = fs.readFileSync(decIndexPath, 'utf8');
decIndex = `export {
  default as BrandBackgroundShapes,
  BrandTopLeftShape,
  BrandBottomHeroWave,
  BrandRightAccentShape,
  BrandBottomRightShape,
  BrandSectionSideWave,
  BrandSectionRightWave,
  BrandJourneyCardBlob,
  BrandCtaBottomWave,
  // Backward compatibility
  BrandBackgroundShapes as OrangeBackgroundShapes,
  BrandTopLeftShape as OrangeTopLeftShape,
  BrandBottomHeroWave as OrangeBottomHeroWave,
  BrandRightAccentShape as OrangeRightAccentShape,
  BrandBottomRightShape as OrangeBottomRightShape,
  BrandSectionSideWave as OrangeSectionSideWave,
  BrandSectionRightWave as OrangeSectionRightWave,
  BrandJourneyCardBlob as OrangeJourneyCardBlob,
} from "./BrandShapes.jsx";

export {
  default as SectionWaveDivider,
} from "./SectionWaveDivider.jsx";

export {
  default as DoodleCard,
  LeftDoodle,
  HandwrittenBadge,
} from "./DoodleCard.jsx";

export {
  default as SunburstRays,
  AccentRays,
} from "./SunburstRays.jsx";

export { default as HandDrawnUnderline } from "./HandDrawnUnderline.jsx";
`;
fs.writeFileSync(decIndexPath, decIndex, 'utf8');
console.log('Updated: src/components/decorative/index.js');

// 3. Update Buttons.jsx and ui/index.js
const buttonsPath = './src/components/ui/Buttons.jsx';
let buttonsContent = fs.readFileSync(buttonsPath, 'utf8');
buttonsContent = buttonsContent.replace(
  'export function OrangeButton({ href, children, className = "", ...rest }) {',
  `export function BrandButton({ href, children, className = "", ...rest }) {`
);
if (!buttonsContent.includes('export const OrangeButton')) {
  buttonsContent += `\n// Backward-compatibility alias\nexport const OrangeButton = BrandButton;\n`;
}
fs.writeFileSync(buttonsPath, buttonsContent, 'utf8');
console.log('Updated: src/components/ui/Buttons.jsx');

const uiIndexPath = './src/components/ui/index.js';
fs.writeFileSync(
  uiIndexPath,
  `export { BrandButton, OrangeButton, GhostButton } from "./Buttons.jsx";\n`,
  'utf8'
);
console.log('Updated: src/components/ui/index.js');

// 4. Update pages and components to import BrandShapes & Brand... names
const filesToUpdate = [
  './src/pages/Hero.jsx',
  './src/pages/About.jsx',
  './src/pages/Works.jsx',
  './src/pages/Services.jsx',
  './src/pages/FAQ.jsx',
  './src/components/features/WhatDrivesMePinned.jsx',
  './src/components/layout/Marquee.jsx',
  './src/index.css',
];

for (const file of filesToUpdate) {
  let c = fs.readFileSync(file, 'utf8');
  
  // Replace imports
  c = c.replace(/OrangeShapes/g, 'BrandShapes');
  
  // Replace Component names
  c = c.replace(/OrangeTopLeftShape/g, 'BrandTopLeftShape');
  c = c.replace(/OrangeBottomHeroWave/g, 'BrandBottomHeroWave');
  c = c.replace(/OrangeSectionSideWave/g, 'BrandSectionSideWave');
  c = c.replace(/OrangeSectionRightWave/g, 'BrandSectionRightWave');
  c = c.replace(/OrangeRightAccentShape/g, 'BrandRightAccentShape');
  c = c.replace(/OrangeBottomRightShape/g, 'BrandBottomRightShape');
  c = c.replace(/OrangeJourneyCardBlob/g, 'BrandJourneyCardBlob');
  c = c.replace(/OrangeCtaBottomWave/g, 'BrandCtaBottomWave');
  c = c.replace(/OrangeBackgroundShapes/g, 'BrandBackgroundShapes');
  c = c.replace(/OrangeButton/g, 'BrandButton');
  c = c.replace(/journeyOrangeGradDesktop/g, 'journeyBrandGradDesktop');

  // Clean comments mentioning orange
  c = c.replace(/ORANGE BACKGROUND SHAPES/gi, 'BRAND BACKGROUND SHAPES');
  c = c.replace(/Orange Accent Shape/gi, 'Brand Accent Shape');
  c = c.replace(/orange gradient/gi, 'brand gradient');
  c = c.replace(/Orange Wave Accent/gi, 'Brand Wave Accent');
  c = c.replace(/Orange accent/gi, 'Brand accent');
  c = c.replace(/Orange Zigzag Line/gi, 'Brand Zigzag Line');

  // In Marquee.jsx
  if (file.includes('Marquee.jsx')) {
    c = c.replace(/color:\s*"orange"/g, 'color: "brand"');
    c = c.replace(/item\.color === "orange"/g, 'item.color === "brand"');
    c = c.replace(/Orange plus/g, 'Brand accent plus');
  }

  // In index.css
  if (file.includes('index.css')) {
    c = c.replace(/OrangeShapes:/g, 'BrandShapes:');
  }

  fs.writeFileSync(file, c, 'utf8');
  console.log(`Updated: ${file}`);
}

console.log('\nAll component & file names successfully updated to Brand / neutral naming!');
