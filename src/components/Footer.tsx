'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo, ArrowRightIcon } from '@/components/icons';

const FOOTER_COLUMNS = [
  {
    title: 'Products',
    links: [
      { label: 'Snapmaker U1', href: '#' },
      { label: 'Snapmaker Artisan 3-in-1', href: '#' },
      { label: 'Snapmaker 2.0 3-in-1', href: '#' },
      { label: 'Laser & CNC Modules', href: '#' },
      { label: 'Materials & Filaments', href: '#' },
      { label: 'Replacement Parts', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Product Downloads', href: '#' },
      { label: 'Submit a Ticket', href: '#' },
      { label: 'Warranty Policy', href: '#' },
      { label: 'Return & Refund', href: '#' },
      { label: 'Snapmaker Care', href: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Snapmaker Forum', href: '#' },
      { label: 'Facebook Group', href: '#' },
      { label: 'User Gallery', href: '#' },
      { label: 'Affiliate Program', href: '#' },
      { label: 'Referral Program', href: '#' },
      { label: 'Co-creation', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Snapmaker', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Newsroom', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Logo and Brand Info */}
          <div className="col-span-2 flex flex-col space-y-6">
            <Link href="/" aria-label="Snapmaker Homepage">
              <Logo size={150} className="text-white hover:text-primary transition-colors cursor-pointer" />
            </Link>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Make something wonderful. Snapmaker creates high-quality 3-in-1 desktop 3D printers, laser cutters, and CNC carvers for enthusiasts and makers worldwide.
            </p>
          </div>

          {/* Links columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col space-y-4">
              <h4 className="font-heading text-xs font-bold text-white uppercase tracking-widest">
                {column.title}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors duration-250"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-zinc-900 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h4 className="font-heading text-sm font-semibold text-white tracking-wide">
              Subscribe and get $20 Off your first order!
            </h4>
            <p className="text-xs text-zinc-500 mt-1 leading-normal">
              Stay updated with product launches, tutorials, exclusive community events, and special store sales.
            </p>
          </div>
          
          <form onSubmit={handleSubscribe} className="relative w-full max-w-md flex">
            {subscribed ? (
              <div className="bg-primary/10 border border-primary/20 text-primary text-xs rounded-xl px-4 py-3 w-full text-center">
                Thank you! Check your inbox for your discount coupon.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-primary transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary hover:bg-primary/95 text-white flex items-center justify-center rounded-lg w-10 transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRightIcon size={16} />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Social Links & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-[11px] text-zinc-600">
            <span>&copy; {new Date().getFullYear()} Snapmaker. All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <span className="hidden sm:inline">|</span>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider mr-2">Secured Payments</span>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-850 rounded text-[9px] font-bold text-white/70">VISA</span>
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-850 rounded text-[9px] font-bold text-white/70">MC</span>
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-850 rounded text-[9px] font-bold text-white/70">PAYPAL</span>
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-850 rounded text-[9px] font-bold text-white/70">KLARNA</span>
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-850 rounded text-[9px] font-bold text-white/70">AFFIRM</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
