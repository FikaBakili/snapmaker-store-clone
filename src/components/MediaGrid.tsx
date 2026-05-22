'use client';

import React from 'react';
import Image from 'next/image';

const MEDIA_BLOCKS = [
  {
    title: 'The Snappy Club',
    description: 'Join our loyalty program to earn Snappy Points and redeem them for discount codes and free accessories.',
    bgClass: 'from-orange-600 to-amber-500',
    image: '/snapmaker-store-clone/images/product_u1_petg.png',
    linkText: 'Join Now',
  },
  {
    title: 'Snapmaker Care',
    description: 'Get peace of mind with our extended warranty program, offering fast repairs and replacement parts.',
    bgClass: 'from-blue-600 to-indigo-700',
    image: '/snapmaker-store-clone/images/product_u1_hotend.png',
    linkText: 'Learn More',
  },
  {
    title: 'Order Tracking',
    description: 'Want to know where your shipment is? Enter your order details and track delivery in real time.',
    bgClass: 'from-zinc-800 to-zinc-950',
    image: '/snapmaker-store-clone/images/product_artisan_cnc.png',
    linkText: 'Track Order',
  },
  {
    title: 'Referral Program',
    description: 'Invite your friends to buy. Give them $20 off their first order, and get $20 in cash rewards for yourself.',
    bgClass: 'from-emerald-600 to-teal-500',
    image: '/snapmaker-store-clone/images/product_artisan_extrusion.png',
    linkText: 'Refer Friends',
  },
];

export default function MediaGrid() {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-900 dark:text-white">
            Discover More
          </h2>
          <div className="w-12 h-1 bg-primary mt-3 rounded-full" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEDIA_BLOCKS.map((block) => (
            <div
              key={block.title}
              className="group flex flex-col justify-between bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden relative min-h-[340px]"
            >
              {/* Top Details */}
              <div className="relative z-10 flex flex-col">
                <h3 className="font-heading text-base font-bold text-zinc-950 dark:text-white group-hover:text-primary transition-colors tracking-wide">
                  {block.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2.5 leading-relaxed font-sans font-light">
                  {block.description}
                </p>
              </div>

              {/* Centered Product Silhouette Image (Decorative floating background) */}
              <div className="absolute right-0 bottom-4 w-40 h-40 opacity-15 group-hover:opacity-30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 pointer-events-none z-0">
                <Image
                  src={block.image}
                  alt=""
                  width={160}
                  height={160}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Bottom CTA Action Button */}
              <div className="relative z-10 mt-6">
                <a
                  href="#"
                  className="inline-flex px-5 py-2.5 bg-zinc-900 hover:bg-primary dark:bg-zinc-800 dark:hover:bg-primary text-white font-heading font-semibold text-[10px] tracking-wider uppercase rounded-lg shadow-sm transition-all duration-200"
                >
                  {block.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
