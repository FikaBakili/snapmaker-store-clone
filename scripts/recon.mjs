import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const TARGET_URL = 'https://us.snapmaker.com';
const HOSTNAME = 'us.snapmaker.com';
const RESEARCH_DIR = path.join(process.cwd(), 'docs', 'research', HOSTNAME);
const DESIGN_DIR = path.join(process.cwd(), 'docs', 'design-references', HOSTNAME);
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Ensure directories exist
fs.mkdirSync(RESEARCH_DIR, { recursive: true });
fs.mkdirSync(DESIGN_DIR, { recursive: true });
fs.mkdirSync(path.join(PUBLIC_DIR, 'images'), { recursive: true });
fs.mkdirSync(path.join(PUBLIC_DIR, 'videos'), { recursive: true });
fs.mkdirSync(path.join(PUBLIC_DIR, 'seo'), { recursive: true });

async function run() {
  console.log(`Launching browser for ${TARGET_URL}...`);
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  // 1. Capture Desktop Viewport (1440px)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  
  const desktopPage = await desktopContext.newPage();
  console.log('Navigating to target on Desktop...');
  try {
    await desktopPage.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    console.log('Navigation successful. Waiting 5s for dynamic content...');
    await desktopPage.waitForTimeout(5000);
  } catch (err) {
    console.warn('Navigation encountered a timeout/error, trying to proceed anyway:', err.message);
  }
  
  // Scroll slowly to trigger lazy loading
  console.log('Scrolling page slowly to load all assets...');
  await scrollPage(desktopPage);
  
  // Wait a bit after scrolling
  await desktopPage.waitForTimeout(5000);
  
  console.log('Taking full page screenshot (Desktop)...');
  const desktopScreenshotPath = path.join(DESIGN_DIR, 'homepage_desktop.png');
  await desktopPage.screenshot({ path: desktopScreenshotPath, fullPage: true });
  console.log(`Saved desktop screenshot to ${desktopScreenshotPath}`);

  // Extract page metadata, colors, typography, assets, and layout structures
  console.log('Extracting global tokens and structural components...');
  const extractionResult = await desktopPage.evaluate(() => {
    // Helper to get computed styles of elements
    const getStyles = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        color: cs.color,
        backgroundColor: cs.backgroundColor
      };
    };

    // Find all colors in stylesheet / computed elements
    const colors = new Set();
    const allElements = document.querySelectorAll('*');
    // Limit loop to avoid overload
    const sampleSize = Math.min(allElements.length, 1200);
    for (let i = 0; i < sampleSize; i++) {
      const el = allElements[i];
      const cs = getComputedStyle(el);
      if (cs.color && cs.color !== 'rgba(0, 0, 0, 0)') colors.add(cs.color);
      if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(cs.backgroundColor);
      if (cs.borderColor && cs.borderColor !== 'rgba(0, 0, 0, 0)') colors.add(cs.borderColor);
    }

    // Extract typography font families
    const fonts = new Set();
    for (let i = 0; i < sampleSize; i++) {
      const el = allElements[i];
      const cs = getComputedStyle(el);
      if (cs.fontFamily) fonts.add(cs.fontFamily);
    }

    // Identify structural sections
    const sections = [];
    const pageContainer = document.querySelector('main') || document.body;
    const directChildren = [...pageContainer.children];
    
    directChildren.forEach((child, index) => {
      const rect = child.getBoundingClientRect();
      const id = child.id || '';
      const classes = child.className || '';
      const tagName = child.tagName.toLowerCase();
      // Only include elements that have some content or size
      if (rect.height > 20 || child.querySelector('img, h1, h2, h3, h4, p, a, button, video, svg')) {
        sections.push({
          index,
          tag: tagName,
          id,
          classes: typeof classes === 'string' ? classes.split(' ').slice(0, 5).join(' ') : '',
          height: rect.height,
          textHeader: child.querySelector('h1, h2, h3')?.textContent?.trim().slice(0, 100) || '',
          childCount: child.children.length
        });
      }
    });

    // Enumerate assets
    const images = [...document.querySelectorAll('img')].map(img => ({
      src: img.src || img.currentSrc,
      alt: img.alt || '',
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
      parentClasses: img.parentElement?.className || '',
      position: getComputedStyle(img).position,
      zIndex: getComputedStyle(img).zIndex
    }));

    const videos = [...document.querySelectorAll('video')].map(v => ({
      src: v.src || v.querySelector('source')?.src || '',
      poster: v.poster || '',
      autoplay: v.autoplay,
      loop: v.loop,
      muted: v.muted
    }));

    const backgroundImages = [...document.querySelectorAll('*')].filter(el => {
      const bg = getComputedStyle(el).backgroundImage;
      return bg && bg !== 'none';
    }).map(el => ({
      url: getComputedStyle(el).backgroundImage,
      tag: el.tagName.toLowerCase(),
      classes: typeof el.className === 'string' ? el.className.split(' ').slice(0, 3).join(' ') : ''
    }));

    const svgCount = document.querySelectorAll('svg').length;
    
    const favicons = [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ 
      href: l.href, 
      rel: l.rel, 
      sizes: l.sizes?.toString() 
    }));

    return {
      colors: [...colors].slice(0, 50), // cap to top 50 colors
      fonts: [...fonts],
      sections,
      images,
      videos,
      backgroundImages,
      svgCount,
      favicons,
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.content || ''
    };
  });

  // Write extracted metadata
  fs.writeFileSync(
    path.join(RESEARCH_DIR, 'raw_extraction.json'),
    JSON.stringify(extractionResult, null, 2)
  );
  console.log('Saved raw extraction JSON');

  await desktopContext.close();

  // 2. Capture Mobile Viewport (390px)
  console.log('Opening mobile context (390px)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true
  });
  
  const mobilePage = await mobileContext.newPage();
  console.log('Navigating to target on Mobile...');
  try {
    await mobilePage.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    console.log('Mobile Navigation successful. Waiting 5s for dynamic content...');
    await mobilePage.waitForTimeout(5000);
  } catch (err) {
    console.warn('Mobile Navigation encountered a timeout/error, trying to proceed anyway:', err.message);
  }
  
  await scrollPage(mobilePage);
  await mobilePage.waitForTimeout(5000);
  
  const mobileScreenshotPath = path.join(DESIGN_DIR, 'homepage_mobile.png');
  await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: true });
  console.log(`Saved mobile screenshot to ${mobileScreenshotPath}`);
  
  await mobileContext.close();
  await browser.close();
  console.log('Browser closed. Recon completed successfully!');
}

async function scrollPage(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 250;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight || totalHeight > 15000) {
          clearInterval(timer);
          resolve();
        }
      }, 150);
    });
  });
}

run().catch(err => {
  console.error('Error running recon:', err);
  process.exit(1);
});
