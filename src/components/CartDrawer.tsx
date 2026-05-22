'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { CloseIcon } from '@/components/icons';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useStore();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    alert('Thank you for your order! This is a demo checkout simulation.');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-900">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
            Shopping Cart
          </h3>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-zinc-500 hover:text-primary dark:text-zinc-400 dark:hover:text-primary p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Close cart"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Scrollable Items list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                  />
                </svg>
              </div>
              <h4 className="font-heading text-sm font-semibold text-zinc-900 dark:text-white">
                Your cart is empty
              </h4>
              <p className="text-xs text-zinc-500 max-w-[240px]">
                Add some 3D printers, upgrade modules or materials to start making.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-zinc-900 hover:bg-primary text-white dark:bg-zinc-800 dark:hover:bg-primary rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-5"
              >
                {/* Item Image */}
                <div className="relative w-16 h-16 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 p-1 flex items-center justify-center border border-zinc-100 dark:border-zinc-900 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Item Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-xs font-semibold text-primary mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                  
                  {/* Quantity control */}
                  <div className="flex items-center gap-2.5 mt-2.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 border border-zinc-200 dark:border-zinc-800 rounded-md flex items-center justify-center text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-zinc-950 dark:text-white min-w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 border border-zinc-200 dark:border-zinc-800 rounded-md flex items-center justify-center text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-zinc-400 hover:text-primary p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex-shrink-0"
                  aria-label="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/40">
            <div className="flex items-center justify-between text-sm font-semibold mb-6">
              <span className="text-zinc-600 dark:text-zinc-400">Subtotal</span>
              <span className="text-zinc-900 dark:text-white font-heading text-lg font-bold">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-primary hover:bg-primary/95 text-white font-heading font-semibold text-xs tracking-wider uppercase rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-200 text-center"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full py-2.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors text-center"
              >
                Clear Cart
              </button>
            </div>
            
            <p className="text-[10px] text-zinc-500 text-center mt-4">
              Shipping & taxes calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
