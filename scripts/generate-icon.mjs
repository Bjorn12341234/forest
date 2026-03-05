import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// App icon SVG — tree stump + crown on millimeter paper, no text, no alpha
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="0" fill="#F0F0F0"/>
  <!-- Grid lines (millimeterpapper) -->
  <line x1="256" y1="0" x2="256" y2="1024" stroke="#D8D8D8" stroke-width="1.5"/>
  <line x1="512" y1="0" x2="512" y2="1024" stroke="#D8D8D8" stroke-width="1.5"/>
  <line x1="768" y1="0" x2="768" y2="1024" stroke="#D8D8D8" stroke-width="1.5"/>
  <line x1="0" y1="256" x2="1024" y2="256" stroke="#D8D8D8" stroke-width="1.5"/>
  <line x1="0" y1="512" x2="1024" y2="512" stroke="#D8D8D8" stroke-width="1.5"/>
  <line x1="0" y1="768" x2="1024" y2="768" stroke="#D8D8D8" stroke-width="1.5"/>
  <!-- Crown (triangular, stylized, layered) -->
  <polygon points="512,100 300,520 724,520" fill="#D4730C" opacity="0.25"/>
  <polygon points="512,180 350,520 674,520" fill="#D4730C" opacity="0.45"/>
  <polygon points="512,260 400,520 624,520" fill="#D4730C" opacity="0.7"/>
  <!-- Tree stump -->
  <rect x="422" y="520" width="180" height="280" rx="8" fill="#D4730C"/>
  <!-- Growth rings -->
  <ellipse cx="512" cy="520" rx="90" ry="26" fill="none" stroke="#B05E0A" stroke-width="3.5"/>
  <ellipse cx="512" cy="520" rx="56" ry="16" fill="none" stroke="#B05E0A" stroke-width="2.5"/>
  <ellipse cx="512" cy="520" rx="24" ry="7" fill="none" stroke="#B05E0A" stroke-width="2"/>
  <!-- Axe marks -->
  <line x1="430" y1="580" x2="490" y2="598" stroke="#B05E0A" stroke-width="5" stroke-linecap="round"/>
  <line x1="534" y1="640" x2="594" y2="658" stroke="#B05E0A" stroke-width="5" stroke-linecap="round"/>
  <line x1="440" y1="700" x2="496" y2="716" stroke="#B05E0A" stroke-width="4" stroke-linecap="round"/>
</svg>`;

// Splash SVG — dark background with subtle tree silhouette
const splashSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732">
  <rect width="2732" height="2732" fill="#1a1a1a"/>
  <!-- Subtle tree silhouette -->
  <polygon points="1366,800 1100,1500 1632,1500" fill="#2a2a2a" opacity="0.5"/>
  <polygon points="1366,900 1150,1500 1582,1500" fill="#2a2a2a" opacity="0.7"/>
  <rect x="1306" y="1500" width="120" height="200" rx="4" fill="#2a2a2a" opacity="0.6"/>
</svg>`;

async function generate() {
  // 1. App icon 1024x1024 (no alpha for iOS)
  const iconBuffer = Buffer.from(iconSvg);
  await sharp(iconBuffer)
    .resize(1024, 1024)
    .flatten({ background: '#F0F0F0' })
    .png()
    .toFile(path.join(root, 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png'));
  console.log('Generated AppIcon-512@2x.png (1024x1024)');

  // 2. Splash screen 2732x2732
  const splashBuffer = Buffer.from(splashSvg);
  const splashOut = await sharp(splashBuffer)
    .resize(2732, 2732)
    .flatten({ background: '#1a1a1a' })
    .png()
    .toBuffer();

  const splashDir = path.join(root, 'ios/App/App/Assets.xcassets/Splash.imageset');
  for (const name of ['splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png']) {
    await sharp(splashOut).toFile(path.join(splashDir, name));
  }
  console.log('Generated splash screens (2732x2732)');

  // 3. Also update the web icon-512.png (without SM text, matching new design)
  await sharp(iconBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(root, 'public/icon-512.png'));
  console.log('Updated public/icon-512.png');

  // 4. Generate icon-192.png for web manifest
  await sharp(iconBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(root, 'public/icon-192.png'));
  console.log('Updated public/icon-192.png');
}

generate().catch(console.error);
