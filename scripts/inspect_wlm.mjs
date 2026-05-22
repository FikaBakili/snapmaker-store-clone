import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const TARGET_URL = 'https://us.snapmaker.com';
const HOSTNAME = 'us.snapmaker.com';
const RESEARCH_DIR = path.join(process.cwd(), 'docs', 'research', HOSTNAME);

async function run() {
  console.log(`Launching browser for structural inspection...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000);

  const structure = await page.evaluate(() => {
    const wlmContent = document.querySelector('.wlm-content') || document.querySelector('main') || document.body;
    if (!wlmContent) return { error: 'wlm-content not found' };

    // Let's get header, main wrapper, footer
    // Actually, let's look at all elements inside wlm-content.
    const sections = [];
    const children = [...wlmContent.children];
    
    children.forEach((child, index) => {
      const rect = child.getBoundingClientRect();
      const id = child.id || '';
      const classes = child.className || '';
      const tagName = child.tagName.toLowerCase();

      // Find sub-headings or descriptive text in this section to help identify it
      const headers = [];
      child.querySelectorAll('h1, h2, h3, h4').forEach(h => {
        const text = h.textContent?.trim().replace(/\s+/g, ' ');
        if (text) headers.push(`${h.tagName.toLowerCase()}: "${text.slice(0, 80)}"`);
      });

      // Find buttons/links
      const buttons = [];
      child.querySelectorAll('a, button').forEach(b => {
        const text = b.textContent?.trim().replace(/\s+/g, ' ');
        if (text) buttons.push(`${b.tagName}: "${text.slice(0, 40)}"`);
      });

      // Check if it has visual structures like slider, grid, list
      const hasCarousel = !!child.querySelector('.swiper, .slider, .carousel, [class*="slider"], [class*="carousel"], [class*="swiper"]');
      const imageSources = [...child.querySelectorAll('img')].map(img => img.src || img.currentSrc).filter(Boolean).slice(0, 5);
      const videoSources = [...child.querySelectorAll('video')].map(v => v.src || v.querySelector('source')?.src).filter(Boolean);

      sections.push({
        index,
        tag: tagName,
        id,
        classes: typeof classes === 'string' ? classes.split(' ').join('.') : '',
        height: rect.height,
        top: rect.top + window.scrollY,
        headers,
        buttons: buttons.slice(0, 10),
        hasCarousel,
        imagesCount: child.querySelectorAll('img').length,
        videoCount: child.querySelectorAll('video').length,
        imagesSample: imageSources,
        videosSample: videoSources,
        htmlSummary: child.outerHTML.slice(0, 400) // snippet of HTML
      });
    });

    // Also get the sticky elements or floating elements
    const bodyChildren = [...document.body.children].map(c => ({
      tag: c.tagName.toLowerCase(),
      id: c.id,
      classes: typeof c.className === 'string' ? c.className.split(' ').join('.') : ''
    }));

    return {
      sections,
      bodyChildren,
      title: document.title
    };
  });

  fs.writeFileSync(
    path.join(RESEARCH_DIR, 'sections_topology.json'),
    JSON.stringify(structure, null, 2)
  );
  console.log(`Saved topology details to ${path.join(RESEARCH_DIR, 'sections_topology.json')}`);

  await browser.close();
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
