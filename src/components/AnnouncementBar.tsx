'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '@/components/icons';

const ANNOUNCEMENTS = [
  'Free Shipping on Orders Over $150 (Contiguous US only)',
  'Subscribe to Newsletter & Get $20 Off Your First Order',
  'Snapmaker U1 3D Printer: Order Now — Ships Free',
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  return (
    <div className="relative z-50 h-9 bg-black text-white flex items-center justify-center px-8 text-xs font-medium tracking-wide">
      <button 
        onClick={handlePrev}
        className="absolute left-4 p-1 hover:text-white/70 transition-colors"
        aria-label="Previous announcement"
      >
        <ChevronLeft size={14} className="stroke-white" />
      </button>

      <div className="overflow-hidden text-center max-w-[280px] sm:max-w-md md:max-w-xl lg:max-w-4xl">
        <div 
          className="transition-all duration-500 ease-in-out transform"
          style={{ opacity: 1 }}
        >
          {ANNOUNCEMENTS[currentIndex]}
        </div>
      </div>

      <button 
        onClick={handleNext}
        className="absolute right-4 p-1 hover:text-white/70 transition-colors"
        aria-label="Next announcement"
      >
        <ChevronRight size={14} className="stroke-white" />
      </button>
    </div>
  );
}
