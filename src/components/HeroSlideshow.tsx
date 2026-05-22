'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from '@/components/icons';

const SLIDES = [
  {
    title: 'Snapmaker U1 3D Printer',
    subtitle: 'The Most-funded Multi-color 3D Printer. High-speed precision.',
    image: '/images/hero_slide_1.webp',
    buttonText: 'Order Now — Ships Free',
    href: '#',
    align: 'left',
  },
  {
    title: 'New Filaments. For What’s Next.',
    subtitle: 'Premium Materials for Perfect Prints. RFID enabled for smart printing.',
    image: '/images/hero_slide_2.webp',
    buttonText: 'Buy Now',
    href: '#',
    align: 'center',
  },
  {
    title: 'Snapmaker Artisan 3-in-1',
    subtitle: 'The Ultimate 3-in-1 3D Printer with Dual Extrusion, CNC, and Laser.',
    image: '/images/promo_artisan_desktop.png',
    buttonText: 'Buy Now',
    href: '#',
    align: 'right',
  },
  {
    title: 'Snapmaker Filament Bulk Sale',
    subtitle: 'Buy more, save more. Stock up on PLA, PETG, and ABS materials.',
    image: '/images/promo_u1_desktop.png',
    buttonText: 'Shop Now',
    href: '#',
    align: 'left',
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, [isTransitioning]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] max-h-[900px] overflow-hidden bg-black">
      {/* Slides wrapper */}
      <div className="relative w-full h-full">
        {SLIDES.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background Image with dark overlay */}
              <div className="absolute inset-0 bg-black/45 z-10" />
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="w-full h-full object-cover object-center"
              />

              {/* Text Content */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div
                    className={`max-w-xl transition-all duration-700 ease-out transform ${
                      isActive 
                        ? 'translate-y-0 opacity-100 delay-200' 
                        : 'translate-y-6 opacity-0'
                    } ${
                      slide.align === 'center' 
                        ? 'mx-auto text-center' 
                        : slide.align === 'right' 
                        ? 'ml-auto text-right' 
                        : 'text-left'
                    }`}
                  >
                    <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight uppercase tracking-tight">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-lg text-white/90 mt-4 font-sans font-light leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <div className="mt-8 flex gap-4 justify-start inline-flex">
                      <a
                        href={slide.href}
                        className="px-8 py-3.5 bg-primary hover:bg-primary/95 text-white font-heading font-semibold text-xs tracking-wider uppercase rounded-lg shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        {slide.buttonText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setCurrent(index);
            }}
            className={`w-3.5 h-3.5 rounded-full border-2 border-white transition-all duration-300 ${
              index === current ? 'bg-primary border-primary scale-120' : 'bg-transparent hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/40 hover:bg-primary hover:scale-105 rounded-full flex items-center justify-center text-white backdrop-blur-xs border border-white/10 hover:border-primary transition-all shadow-md cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} className="stroke-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/40 hover:bg-primary hover:scale-105 rounded-full flex items-center justify-center text-white backdrop-blur-xs border border-white/10 hover:border-primary transition-all shadow-md cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight size={22} className="stroke-white" />
      </button>
    </section>
  );
}
