/**
 * Captura móvil de vilalancis.com → public/assets/projects/vila-lancis-mobile.webp
 * Uso puntual: node scripts/capture-vila-lancis-mobile.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { chromium, devices } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPng = path.join(__dirname, '../public/assets/projects/vila-lancis-mobile.png');
const outWebp = path.join(__dirname, '../public/assets/projects/vila-lancis-mobile.webp');

const cookieSelectors = [
  'button:has-text("Aceptar")',
  'button:has-text("Aceptar todas")',
  'button:has-text("Aceptar todo")',
  'button:has-text("Acepto")',
  'button:has-text("Accept")',
  'button:has-text("Accept all")',
  '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
  '#onetrust-accept-btn-handler',
  '.cmplz-accept',
  '[data-cookie-accept]',
  '.cky-btn-accept',
];

async function dismissCookies(page) {
  for (const selector of cookieSelectors) {
    const btn = page.locator(selector).first();
    if (await btn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await btn.click();
      await page.waitForTimeout(800);
      return true;
    }
  }
  return false;
}

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices['iPhone 14'],
  locale: 'es-ES',
});
const page = await context.newPage();

await page.goto('https://vilalancis.com/', { waitUntil: 'networkidle', timeout: 60000 });
await dismissCookies(page);
await page.waitForTimeout(1200);

await page.screenshot({ path: outPng, type: 'png', fullPage: false });

await browser.close();

await sharp(outPng)
  .webp({ quality: 85, effort: 4 })
  .toFile(outWebp);

await fs.unlink(outPng);

const meta = await sharp(outWebp).metadata();
console.log('OK', path.relative(process.cwd(), outWebp), `${meta.width}x${meta.height}`);
