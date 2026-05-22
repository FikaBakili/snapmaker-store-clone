'use client';

import React from 'react';
import Image from 'next/image';

const AWARDS = [
  { name: 'Red Dot Award', image: '/images/award_logo_1.webp' },
  { name: 'iF Design Award', image: '/images/award_logo_2.webp' },
  { name: 'CES Innovation Award', image: '/images/award_logo_3.webp' },
  { name: '3D Printing Industry Award', image: '/images/award_logo_4.webp' },
  { name: 'Make: Magazine Best Overall', image: '/images/award_logo_5.webp' },
  { name: 'All3DP Best 3-in-1', image: '/images/award_logo_6.webp' },
  { name: 'Tom\'s Hardware Editor Choice', image: '/images/award_logo_7.webp' },
];

export default function AwardsSlider() {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950 overflow-hidden border-b border-zinc-200/50 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-900 dark:text-white">
          Awards & Recognition
        </h2>
        <p className="text-xs text-zinc-500 mt-2">
          Recognized by leading design institutions and industry publications globally.
        </p>
      </div>

      {/* Infinite scrolling slider */}
      <div className="relative w-full flex items-center overflow-hidden">
        {/* CSS Keyframes via styled JSX / style block */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-infinite {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
          .animate-marquee-infinite:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="animate-marquee-infinite gap-12 sm:gap-20 px-8">
          {/* Double list render for continuous scroll */}
          {[...AWARDS, ...AWARDS].map((award, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-[120px] sm:w-[150px] aspect-video flex-shrink-0 grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-350"
            >
              <Image
                src={award.image}
                alt={award.name}
                width={150}
                height={60}
                className="max-w-full max-h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
