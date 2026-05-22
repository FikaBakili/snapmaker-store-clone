'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Logo, SearchIcon, CartIcon, UserIcon, MenuIcon, CloseIcon, ChevronDown } from '@/components/icons';
import { useStore } from '@/context/StoreContext';

interface ProductNavCard {
  name: string;
  image: string;
  tag?: string;
  href: string;
}

const MENU_ITEMS = [
  {
    label: '3D Printers',
    href: '#',
    hasMegamenu: true,
    products: [
      {
        name: 'Snapmaker U1',
        image: '/images/promo_u1_desktop.png',
        tag: 'New Launch',
        href: '#',
      },
      {
        name: 'Snapmaker Artisan 3-in-1',
        image: '/images/promo_artisan_desktop.png',
        tag: 'Flagship',
        href: '#',
      },
      {
        name: 'Snapmaker 2.0 3-in-1',
        image: '/images/product_artisan_cnc.png',
        tag: 'Classic',
        href: '#',
      },
    ] as ProductNavCard[],
  },
  {
    label: 'Laser & CNC',
    href: '#',
    hasMegamenu: true,
    products: [
      {
        name: 'Snapmaker Artisan CNC module',
        image: '/images/product_artisan_cnc.png',
        tag: 'Powerful CNC',
        href: '#',
      },
      {
        name: 'Rotary Module',
        image: '/images/product_u1_hotend.png',
        tag: '4-Axis carving',
        href: '#',
      },
    ] as ProductNavCard[],
  },
  {
    label: 'Materials',
    href: '#',
    hasMegamenu: false,
    links: [
      { name: 'Filaments', href: '#' },
      { name: 'Laser Sheets', href: '#' },
      { name: 'CNC Carving Blanks', href: '#' },
    ],
  },
  {
    label: 'Accessories',
    href: '#',
    hasMegamenu: false,
    links: [
      { name: 'Replacement Parts', href: '#' },
      { name: 'Upgrade Kits', href: '#' },
      { name: 'Enclosures', href: '#' },
    ],
  },
  {
    label: 'Support',
    href: '#',
    hasMegamenu: false,
  },
];

export default function Header() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    addToCart,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-9 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3' 
            : 'bg-gradient-to-b from-black/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Snapmaker Homepage">
              <Logo size={140} className="text-white hover:text-primary transition-colors cursor-pointer" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 items-center">
            {MENU_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHoveredMenu(item.label)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  href={item.href}
                  className="text-white hover:text-primary text-[14px] font-medium tracking-wide flex items-center gap-1.5 py-2 transition-colors"
                >
                  {item.label}
                  {item.hasMegamenu && (
                    <ChevronDown size={14} className="stroke-white/80 group-hover:stroke-primary transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown / Megamenu */}
                {hoveredMenu === item.label && item.hasMegamenu && item.products && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-black/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl p-6 grid grid-cols-3 gap-4 mt-2 transition-all duration-300 animate-in fade-in slide-in-from-top-3">
                    {item.products.map((prod) => (
                      <Link
                        key={prod.name}
                        href={prod.href}
                        className="group flex flex-col bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/5 hover:border-primary/30 rounded-lg p-3 transition-all"
                      >
                        <div className="relative aspect-video rounded-md overflow-hidden bg-zinc-800 mb-2.5">
                          <Image
                            src={prod.image}
                            alt={prod.name}
                            fill
                            sizes="200px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {prod.tag && (
                            <span className="absolute top-1.5 left-1.5 bg-primary text-[9px] font-bold text-white uppercase tracking-wider px-2 py-0.5 rounded">
                              {prod.tag}
                            </span>
                          )}
                        </div>
                        <h4 className="font-heading text-xs font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
                          {prod.name}
                        </h4>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-primary transition-colors cursor-pointer"
              aria-label="Search products"
            >
              <SearchIcon size={20} />
            </button>
            <Link href="#" className="text-white hover:text-primary transition-colors" aria-label="Customer account">
              <UserIcon size={20} />
            </Link>
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="text-white hover:text-primary transition-colors relative cursor-pointer" 
              aria-label="Shopping Cart"
            >
              <CartIcon size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border border-black animate-in zoom-in duration-200">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-primary transition-colors"
              aria-label="Search"
            >
              <SearchIcon size={20} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Search Panel */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-center pt-24 px-4 transition-all duration-300">
          <div className="bg-zinc-950 border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl p-6 h-fit animate-in fade-in slide-in-from-top-6">
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
              <h3 className="font-heading text-lg font-semibold text-white">Search our Store</h3>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="text-white/60 hover:text-white p-1 cursor-pointer"
                aria-label="Close search"
              >
                <CloseIcon size={20} />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for printers, modules, materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 text-white rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-all"
                autoFocus
              />
              <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
            </div>

            {/* Real Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {searchResults.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between bg-zinc-900/40 border border-white/5 hover:border-primary/20 rounded-xl p-3 hover:bg-zinc-900 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded bg-white flex items-center justify-center p-0.5 overflow-hidden flex-shrink-0">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          width={38}
                          height={38}
                          className="object-contain max-h-full max-w-full"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs font-semibold text-white line-clamp-1">{prod.name}</h4>
                        <p className="text-[9px] text-zinc-400 mt-0.5 uppercase tracking-wider">{prod.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-primary">${prod.price.toFixed(2)}</span>
                      <button
                        onClick={() => {
                          addToCart(prod);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="px-2.5 py-1.5 bg-primary hover:bg-primary/95 text-white rounded-md text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {searchQuery.trim() !== '' && searchResults.length === 0 && (
              <p className="text-xs text-zinc-500 mt-4 text-center">No products found for &ldquo;{searchQuery}&rdquo;</p>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-full max-w-sm bg-black border-l border-white/10 h-full flex flex-col p-6 shadow-2xl z-10 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Logo size={120} className="text-white" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-primary p-1"
                aria-label="Close menu"
              >
                <CloseIcon size={24} />
              </button>
            </div>

            <nav className="flex-1 py-8 flex flex-col space-y-6 overflow-y-auto">
              {MENU_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-white/5 pb-4">
                  <div className="flex items-center justify-between text-white font-medium hover:text-primary transition-colors cursor-pointer text-base">
                    <span>{item.label}</span>
                    {item.hasMegamenu && <ChevronDown size={16} />}
                  </div>
                  
                  {item.hasMegamenu && item.products && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {item.products.map((prod) => (
                        <Link
                          key={prod.name}
                          href={prod.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="bg-zinc-900 border border-white/5 p-2 rounded-lg"
                        >
                          <div className="relative aspect-video w-full rounded mb-1.5 overflow-hidden">
                            <Image
                              src={prod.image}
                              alt={prod.name}
                              fill
                              sizes="150px"
                              className="object-cover"
                            />
                          </div>
                          <p className="text-[10px] font-medium text-white line-clamp-1">{prod.name}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="border-t border-white/10 pt-6 flex items-center justify-around text-white">
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex flex-col items-center gap-1">
                <UserIcon size={22} />
                <span className="text-[10px] tracking-wider">Account</span>
              </Link>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }} 
                className="hover:text-primary transition-colors relative flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0"
              >
                <CartIcon size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-1 bg-primary text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="text-[10px] tracking-wider">Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
