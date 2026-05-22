'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: { id: string; name: string; price: number | string; image: string }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartTotal: number;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  catalog: Product[];
}

const PRODUCT_CATALOG: Product[] = [
  {
    id: 'snapmaker-u1',
    name: 'Snapmaker U1 3D Printer',
    price: 1899.00,
    image: '/images/promo_u1_desktop.png',
    category: '3D Printers',
  },
  {
    id: 'snapmaker-artisan',
    name: 'Snapmaker Artisan 3-in-1 3D Printer',
    price: 2999.00,
    image: '/images/promo_artisan_desktop.png',
    category: '3D Printers',
  },
  {
    id: 'snapmaker-2.0',
    name: 'Snapmaker 2.0 3-in-1 3D Printer',
    price: 1499.00,
    image: '/images/product_artisan_cnc.png',
    category: '3D Printers',
  },
  {
    id: 'u1-hotend',
    name: 'Hot End for Snapmaker U1',
    price: 49.99,
    image: '/images/product_u1_hotend.png',
    category: 'Accessories',
  },
  {
    id: 'u1-petg',
    name: 'PETG HF Filament (RFID) - 1kg',
    price: 29.99,
    image: '/images/product_u1_petg.png',
    category: 'Filaments',
  },
  {
    id: 'artisan-hotend',
    name: 'Hot End for Dual Extrusion Module',
    price: 39.99,
    image: '/images/product_artisan_extrusion.png',
    category: 'Accessories',
  },
  {
    id: 'artisan-cnc',
    name: 'CNC Bits (5 Bits)',
    price: 19.99,
    image: '/images/product_artisan_cnc.png',
    category: 'Accessories',
  },
  {
    id: 'artisan-cnc-module',
    name: 'Snapmaker Artisan CNC Module',
    price: 599.00,
    image: '/images/product_artisan_cnc.png',
    category: 'Modules',
  },
  {
    id: 'rotary-module',
    name: 'Rotary Module (4-Axis)',
    price: 649.00,
    image: '/images/product_u1_hotend.png',
    category: 'Modules',
  },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const savedCart = localStorage.getItem('snapmaker-cart');
  if (savedCart) {
    try {
      return JSON.parse(savedCart) as CartItem[];
    } catch (e) {
      console.error('Failed to parse saved cart data', e);
    }
  }
  return [];
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync cart to localStorage (external system) on changes
  useEffect(() => {
    localStorage.setItem('snapmaker-cart', JSON.stringify(cart));
  }, [cart]);

  // Derive search results from query — no effect needed
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return PRODUCT_CATALOG.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const addToCart = (product: { id: string; name: string; price: number | string; image: string }) => {
    // Parse numeric price from possible string "$49.99"
    let numericPrice = 0;
    if (typeof product.price === 'number') {
      numericPrice = product.price;
    } else {
      numericPrice = parseFloat(product.price.replace(/[^\d.]/g, '')) || 0;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: numericPrice,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    // Open the cart automatically to show feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartTotal,
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearchOpen,
        setIsSearchOpen,
        catalog: PRODUCT_CATALOG,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
