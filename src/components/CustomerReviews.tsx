'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, StarIcon } from '@/components/icons';

const REVIEWS = [
  {
    id: 1,
    title: 'Fantastic Printer GET ONE!!',
    rating: 5,
    text: 'The print quality is absolutely exceptional. Being able to switch to laser engraving and CNC carving in less than a minute makes it a complete game-changer.',
    author: 'James H.',
    verified: true,
    image: '/snapmaker-store-clone/images/review_kol_1.webp',
  },
  {
    id: 2,
    title: 'A new chapter of making',
    rating: 5,
    text: 'Snapmaker has truly redefined what a workshop tool can do. The U1 behaves beautifully under high speeds, and the multicolor print is stellar.',
    author: 'Sarah M.',
    verified: true,
    image: '/snapmaker-store-clone/images/review_kol_2.webp',
  },
  {
    id: 3,
    title: 'It’s the everything system',
    rating: 5,
    text: 'As an architect, I need rapid prototyping. Having 3D printing, laser, and CNC in one robust unit saves massive space and overhead costs.',
    author: 'Robert L.',
    verified: true,
    image: '/snapmaker-store-clone/images/review_kol_3.webp',
  },
  {
    id: 4,
    title: 'Beyond our expectations!',
    rating: 5,
    text: 'Setup was simple, manuals are super clear, and Luban software integrates perfectly. We are printing custom enclosures non-stop now.',
    author: 'Emily K.',
    verified: true,
    image: '/snapmaker-store-clone/images/review_kol_4.webp',
  },
  {
    id: 5,
    title: 'An amazing machine',
    rating: 5,
    text: 'Built like a tank. Solid linear rails, linear motors on U1, zero wobble. The accuracy is stunning even on fine 0.05mm layer heights.',
    author: 'Michael T.',
    verified: true,
    image: '/snapmaker-store-clone/images/review_kol_1.webp',
  },
];

export default function CustomerReviews() {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? REVIEWS.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= REVIEWS.length - 3 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-[#f4f4f4] dark:bg-zinc-950/70 border-y border-zinc-200/50 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-900 dark:text-white">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={15} />
                ))}
              </div>
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                4.9 out of 5 stars (based on 2,450+ reviews)
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 bg-white dark:bg-zinc-900 hover:bg-primary dark:hover:bg-primary hover:text-white rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-800 transition-all cursor-pointer"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 bg-white dark:bg-zinc-900 hover:bg-primary dark:hover:bg-primary hover:text-white rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-800 transition-all cursor-pointer"
              aria-label="Next reviews"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{ transform: `translateX(-${startIndex * 33.333}%)` }}
          >
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-850 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
              >
                <div>
                  {/* Rating & Verification */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <StarIcon key={i} size={14} />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500 flex items-center gap-1 bg-emerald-500/5 px-2 py-0.5 rounded">
                        ✓ Verified Buyer
                      </span>
                    )}
                  </div>

                  {/* Review text */}
                  <h4 className="font-heading text-sm font-bold text-zinc-900 dark:text-white mt-4 leading-snug">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed font-sans font-light">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                {/* Reviewer / KOL Image info */}
                <div className="mt-6 border-t border-zinc-100 dark:border-zinc-800/80 pt-4 flex items-center gap-4">
                  <Image
                    src={rev.image}
                    alt={rev.author}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-zinc-900 dark:text-white">{rev.author}</h5>
                    <p className="text-[10px] text-zinc-500">Verified Snapmaker User</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
