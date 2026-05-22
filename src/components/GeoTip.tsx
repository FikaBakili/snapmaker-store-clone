'use client';

import React, { useState, useEffect } from 'react';
import { CloseIcon, LocationIcon } from '@/components/icons';

export default function GeoTip() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 2 seconds
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('geotip-dismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('geotip-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm w-[calc(100vw-3rem)] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl p-5 transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-5">
      <button 
        onClick={handleDismiss}
        className="absolute top-3 right-3 p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
        aria-label="Dismiss regional notification"
      >
        <CloseIcon size={16} />
      </button>

      <div className="flex gap-3.5">
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mt-0.5">
          <LocationIcon size={20} />
        </div>
        
        <div className="flex-1">
          <h4 className="font-heading text-sm font-semibold text-zinc-900 dark:text-white leading-tight">
            Visiting from outside the US?
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            Switch to your local regional store for faster shipping, local currency pricing, and regional warranties.
          </p>
          
          <div className="flex gap-2.5 mt-4">
            <button
              onClick={handleDismiss}
              className="flex-1 px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all"
            >
              Stay on US Store
            </button>
            <a
              href="https://eu.snapmaker.com"
              className="flex-1 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-center rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              Go to EU Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
