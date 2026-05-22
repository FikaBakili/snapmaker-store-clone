import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const VIDEOS_DIR = path.join(PUBLIC_DIR, 'videos');
const SEO_DIR = path.join(PUBLIC_DIR, 'seo');

// Create folders if they don't exist
fs.mkdirSync(IMAGES_DIR, { recursive: true });
fs.mkdirSync(VIDEOS_DIR, { recursive: true });
fs.mkdirSync(SEO_DIR, { recursive: true });

const ASSETS_TO_DOWNLOAD = [
  // Global & Logo
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/LOGO.svg?v=1738306041',
    dest: path.join(IMAGES_DIR, 'logo.svg')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Profile_Image.jpg?crop=center&height=48&v=1689667701&width=48',
    dest: path.join(SEO_DIR, 'favicon.jpg')
  },
  // Hero Slideshow Banners
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/20260514-143351.webp?v=1778740513',
    dest: path.join(IMAGES_DIR, 'hero_slide_1.webp')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Frame_427324372_2.webp?v=1778741067',
    dest: path.join(IMAGES_DIR, 'hero_slide_2.webp')
  },
  // Promo U1 Section
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/PC_1200_400_U1_1.png?v=1776668229',
    dest: path.join(IMAGES_DIR, 'promo_u1_desktop.png')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Mob__1080X1440_U1_9a9158fd-9bd1-4a9f-afe7-fd43bcc1d091.png?v=1776668136',
    dest: path.join(IMAGES_DIR, 'promo_u1_mobile.png')
  },
  // Promo Artisan Section
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/PC_1200_400_Artisan_9deb05f0-4a66-4e56-8a37-90b1ef065477.png?v=1775200477',
    dest: path.join(IMAGES_DIR, 'promo_artisan_desktop.png')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Mob__1080X1440_Artisan.png?v=1775200492',
    dest: path.join(IMAGES_DIR, 'promo_artisan_mobile.png')
  },
  // Product cards (U1 side)
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/20260411-111325.png?v=1775877725',
    dest: path.join(IMAGES_DIR, 'product_u1_hotend.png')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/ArtisanPremium0317.png?v=1775877373',
    dest: path.join(IMAGES_DIR, 'product_u1_petg.png')
  },
  // Product cards (Artisan side)
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/ArtisanPremium0317.png?v=1775877373',
    dest: path.join(IMAGES_DIR, 'product_artisan_extrusion.png')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Artisan0317_2c175805-819b-4854-8d52-2ef226039065.png?v=1775877373',
    dest: path.join(IMAGES_DIR, 'product_artisan_cnc.png')
  },
  // Star rating yellow image
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Shape.png?v=1775200823',
    dest: path.join(IMAGES_DIR, 'star_rating.png')
  },
  // Review KOL screenshots
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Frame_427324436.webp?v=1775822244',
    dest: path.join(IMAGES_DIR, 'review_kol_1.webp')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Frame_427324440.webp?v=1775822244',
    dest: path.join(IMAGES_DIR, 'review_kol_2.webp')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Frame_427324433.webp?v=1775822244',
    dest: path.join(IMAGES_DIR, 'review_kol_3.webp')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Frame_427324441.webp?v=1775822244',
    dest: path.join(IMAGES_DIR, 'review_kol_4.webp')
  },
  // Awards Slider
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Frame_1162.webp?v=1777281034',
    dest: path.join(IMAGES_DIR, 'award_logo_1.webp')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Frame_1157.webp?v=1777281856',
    dest: path.join(IMAGES_DIR, 'award_logo_2.webp')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Frame_1155.webp?v=1777281856',
    dest: path.join(IMAGES_DIR, 'award_logo_3.webp')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Frame_1161.webp?v=1777281855',
    dest: path.join(IMAGES_DIR, 'award_logo_4.webp')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Frame_1156.webp?v=1777281856',
    dest: path.join(IMAGES_DIR, 'award_logo_5.webp')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Frame_1158.webp?v=1777281856',
    dest: path.join(IMAGES_DIR, 'award_logo_6.webp')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/files/Frame_1160.webp?v=1777281856',
    dest: path.join(IMAGES_DIR, 'award_logo_7.webp')
  },
  // Play Video files
  {
    url: 'https://us.snapmaker.com/cdn/shop/videos/c/vp/d850b4ee34c0494bb3c31716b799f684/d850b4ee34c0494bb3c31716b799f684.HD-1080p-7.2Mbps-80184980.mp4',
    dest: path.join(VIDEOS_DIR, 'promo_u1_video_1.mp4')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/videos/c/vp/57c198245e40463e95ac8a412fd87a00/57c198245e40463e95ac8a412fd87a00.HD-1080p-4.8Mbps-80184979.mp4',
    dest: path.join(VIDEOS_DIR, 'promo_u1_video_2.mp4')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/videos/c/vp/525ea55a6fbd45f896901d1107787bfb/525ea55a6fbd45f896901d1107787bfb.SD-480p-1.5Mbps-80184982.mp4',
    dest: path.join(VIDEOS_DIR, 'promo_artisan_video_1.mp4')
  },
  {
    url: 'https://us.snapmaker.com/cdn/shop/videos/c/vp/6cbcefe3c879472997324655d26b78d9/6cbcefe3c879472997324655d26b78d9.HD-1080p-7.2Mbps-80184981.mp4',
    dest: path.join(VIDEOS_DIR, 'promo_artisan_video_2.mp4')
  }
];

async function downloadFile(url, dest) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`status: ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(dest, buffer);
    console.log(`Successfully downloaded: ${path.basename(dest)}`);
    return true;
  } catch (error) {
    console.error(`Failed to download ${url}:`, error.message);
    return false;
  }
}

async function run() {
  console.log(`Starting downloading of ${ASSETS_TO_DOWNLOAD.length} assets...`);
  let successCount = 0;
  
  // Download in chunks of 4 parallel streams
  const chunkSize = 4;
  for (let i = 0; i < ASSETS_TO_DOWNLOAD.length; i += chunkSize) {
    const chunk = ASSETS_TO_DOWNLOAD.slice(i, i + chunkSize);
    const promises = chunk.map(item => downloadFile(item.url, item.dest));
    const results = await Promise.all(promises);
    successCount += results.filter(Boolean).length;
  }
  
  console.log(`Finished downloading. Successful: ${successCount}/${ASSETS_TO_DOWNLOAD.length}`);
}

run();
