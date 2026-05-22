'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const COLLECTIONS = [
  {
    title: '3D Printers',
    description: 'Engineered for Every Maker',
    image: '/snapmaker-store-clone/images/product_artisan_cnc.png',
    href: '#',
  },
  {
    title: 'Filaments',
    description: 'Premium Materials for Perfect Prints',
    image: '/snapmaker-store-clone/images/product_u1_petg.png',
    href: '#',
  },
  {
    title: 'Accessories',
    description: 'Essential Parts for Reliable Printing',
    image: '/snapmaker-store-clone/images/product_u1_hotend.png',
    href: '#',
  },
  {
    title: 'Modules',
    description: "Enhance Your Machine's Capabilities",
    image: '/snapmaker-store-clone/images/product_artisan_extrusion.png',
    href: '#',
  },
];

export default function CollectionCards() {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className="group relative h-[360px] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 shadow-sm flex flex-col justify-end p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/20"
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <Image
                src={col.image}
                alt={col.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />

              {/* Text content overlay */}
              <div className="relative z-10 text-white flex flex-col space-y-2">
                <h3 className="font-heading text-lg font-bold tracking-wide group-hover:text-primary transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-white/70 leading-normal line-clamp-2">
                  {col.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary tracking-wider uppercase group-hover:translate-x-1.5 transition-transform duration-250">
                  Shop Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
