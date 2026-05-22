'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PlayIcon } from '@/components/icons';
import { useStore } from '@/context/StoreContext';

interface SubProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  href: string;
  tag?: string;
}

interface PromoHeroProductProps {
  title: string;
  subtitle?: string;
  videoSrc: string;
  ctaText: string;
  ctaHref: string;
  products: SubProduct[];
  reverse?: boolean;
}

export default function PromoHeroProduct({
  title,
  subtitle,
  videoSrc,
  ctaText,
  ctaHref,
  products,
  reverse = false,
}: PromoHeroProductProps) {
  const { addToCart } = useStore();
  const [isPlaying, setIsPlaying] = useState(true);
  const [addedCartId, setAddedCartId] = useState<string | null>(null);

  const toggleVideo = (videoEl: HTMLVideoElement | null) => {
    if (!videoEl) return;
    if (isPlaying) {
      videoEl.pause();
      setIsPlaying(false);
    } else {
      videoEl.play();
      setIsPlaying(true);
    }
  };

  const handleAddToCart = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      setAddedCartId(id);
      setTimeout(() => setAddedCartId(null), 2000);
    }
  };

  return (
    <section className="py-16 bg-[#f5f7f8] dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch`}>
          
          {/* Main Ambient Media Block */}
          <div 
            className={`lg:col-span-8 relative rounded-3xl overflow-hidden min-h-[420px] lg:min-h-[520px] flex flex-col justify-end p-8 sm:p-12 shadow-md ${
              reverse ? 'lg:order-2' : ''
            }`}
          >
            {/* Background looping video or fallback image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20 z-10" />
            
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
              src={videoSrc}
              onClick={(e) => toggleVideo(e.currentTarget)}
            />

            {/* Play/Pause indicator */}
            <button 
              onClick={(e) => {
                const videoEl = e.currentTarget.parentElement?.querySelector('video') as HTMLVideoElement;
                toggleVideo(videoEl);
              }}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-xs transition-all border border-white/10"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <span className="text-[10px] font-bold tracking-wider">II</span>
              ) : (
                <PlayIcon size={14} className="ml-0.5" />
              )}
            </button>

            {/* Overlaid Typography & CTA */}
            <div className="relative z-20 text-white max-w-xl">
              {subtitle && (
                <span className="text-primary text-[10px] font-extrabold uppercase tracking-widest bg-primary/10 border border-primary/20 rounded-md px-2.5 py-1">
                  {subtitle}
                </span>
              )}
              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase tracking-tight mt-4 leading-tight">
                {title}
              </h2>
              
              <div className="mt-8">
                <a
                  href={ctaHref}
                  className="inline-flex px-8 py-3.5 bg-primary hover:bg-primary/95 text-white font-heading font-semibold text-xs tracking-wider uppercase rounded-lg shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-0.5 duration-200"
                >
                  {ctaText}
                </a>
              </div>
            </div>
          </div>

          {/* Quick-add complementary product sidebar */}
          <div className={`lg:col-span-4 flex flex-col gap-6 ${reverse ? 'lg:order-1' : ''}`}>
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="font-heading text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Complementary Gear
              </h3>
              <a href="#" className="text-xs font-semibold text-primary hover:underline">
                View All
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 flex-1">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="group flex flex-col sm:flex-row lg:flex-col bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
                >
                  {prod.tag && (
                    <span className="absolute top-3 left-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider z-20 shadow-sm">
                      {prod.tag}
                    </span>
                  )}
                  
                  {/* Product Image */}
                  <div className="flex-shrink-0 aspect-square w-full sm:w-28 lg:w-full rounded-xl bg-zinc-50 dark:bg-zinc-900/60 p-2 flex items-center justify-center overflow-hidden mb-4 sm:mb-0 lg:mb-4">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      width={300}
                      height={300}
                      className="max-h-24 sm:max-h-20 lg:max-h-36 object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details & Quick Add */}
                  <div className="flex-1 flex flex-col justify-between sm:pl-4 lg:pl-0">
                    <div>
                      <h4 className="font-heading text-xs font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {prod.name}
                      </h4>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1.5">
                        {prod.price}
                      </p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleAddToCart(prod.id)}
                        className={`flex-1 text-center py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border ${
                          addedCartId === prod.id
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-200 hover:bg-zinc-800 text-white border-transparent'
                        }`}
                      >
                        {addedCartId === prod.id ? 'Added ✓' : 'Add to Cart'}
                      </button>
                      <a
                        href={prod.href}
                        className="px-3 py-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-500 hover:text-zinc-800 dark:hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider text-center"
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
