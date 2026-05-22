import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import GeoTip from '@/components/GeoTip';
import HeroSlideshow from '@/components/HeroSlideshow';
import CollectionCards from '@/components/CollectionCards';
import PromoHeroProduct from '@/components/PromoHeroProduct';
import CustomerReviews from '@/components/CustomerReviews';
import AwardsSlider from '@/components/AwardsSlider';
import MediaGrid from '@/components/MediaGrid';
import Footer from '@/components/Footer';

const U1_PRODUCTS = [
  {
    id: 'u1-hotend',
    name: 'Hot End for Snapmaker U1',
    price: '$49.99',
    image: '/snapmaker-store-clone/images/product_u1_hotend.png',
    href: '#',
    tag: 'New',
  },
  {
    id: 'u1-petg',
    name: 'PETG HF Filament (RFID) - 1kg',
    price: '$29.99',
    image: '/snapmaker-store-clone/images/product_u1_petg.png',
    href: '#',
  },
];

const ARTISAN_PRODUCTS = [
  {
    id: 'artisan-hotend',
    name: 'Hot End for Dual Extrusion Module',
    price: '$39.99',
    image: '/snapmaker-store-clone/images/product_artisan_extrusion.png',
    href: '#',
    tag: 'Compatible',
  },
  {
    id: 'artisan-cnc',
    name: 'CNC Bits (5 Bits)',
    price: '$19.99',
    image: '/snapmaker-store-clone/images/product_artisan_cnc.png',
    href: '#',
  },
];

export default function Home() {
  return (
    <>
      {/* Announcement Bar — fixed to top */}
      <AnnouncementBar />

      {/* Sticky Header with MegaMenu */}
      <Header />

      {/* Geo-targeting tooltip (floating bottom-left) */}
      <GeoTip />

      <main>
        {/* 1. Full-viewport Hero Slideshow */}
        <HeroSlideshow />

        {/* 2. Category Collection Cards Grid */}
        <CollectionCards />

        {/* 3. Snapmaker U1 Promo Block */}
        <PromoHeroProduct
          title="Snapmaker U1: The Most-funded Multi-color 3D Printer"
          subtitle="New Launch"
          videoSrc="/snapmaker-store-clone/videos/promo_u1_video_1.mp4"
          ctaText="Order Now — Ships Free"
          ctaHref="#"
          products={U1_PRODUCTS}
          reverse={false}
        />

        {/* 4. Snapmaker Artisan Promo Block */}
        <PromoHeroProduct
          title="Snapmaker Artisan: The Ultimate 3-in-1 3D Printer"
          subtitle="Flagship"
          videoSrc="/snapmaker-store-clone/videos/promo_artisan_video_1.mp4"
          ctaText="Buy Now"
          ctaHref="#"
          products={ARTISAN_PRODUCTS}
          reverse={true}
        />

        {/* 5. Customer Reviews Carousel */}
        <CustomerReviews />

        {/* 6. Awards Infinite Marquee */}
        <AwardsSlider />

        {/* 7. Discover More Media Grid */}
        <MediaGrid />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
