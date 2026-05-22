# Component Inventory — Snapmaker US Store Clone

This document catalogs every React component in the project, its responsibilities, props, responsive behavior, and interaction hooks.

---

## Layout Components

### `AnnouncementBar`
- **File:** [`src/components/AnnouncementBar.tsx`](../src/components/AnnouncementBar.tsx)
- **Type:** Client component
- **Purpose:** Fixed top notification bar with promotional messages
- **Props:** None (self-contained)
- **Responsive:** Full-width at all breakpoints, text scales down on mobile
- **Interactions:** Optional dismiss button, auto-rotate between messages

---

### `Header`
- **File:** [`src/components/Header.tsx`](../src/components/Header.tsx)
- **Type:** Client component (`'use client'`)
- **Purpose:** Sticky navigation with mega-menu, search, and cart integration
- **Props:** None (consumes `useStore()` context)
- **Responsive:**
  - **Desktop (≥1024px):** Horizontal nav with mega-menu dropdowns, icon row (search, account, cart)
  - **Mobile (<1024px):** Hamburger icon → full-height slide-out drawer
- **Interactions:**
  - Mega-menu on hover (desktop)
  - Search overlay (modal) with live filtering via `StoreContext`
  - Cart icon with live badge count → toggles `CartDrawer`
  - Mobile menu drawer with product grid cards
  - Scroll-aware background transition (transparent → `bg-black/90 backdrop-blur`)
- **State dependencies:** `useStore()` → `isSearchOpen`, `searchQuery`, `searchResults`, `cartCount`, `isCartOpen`, `addToCart`

---

### `Footer`
- **File:** [`src/components/Footer.tsx`](../src/components/Footer.tsx)
- **Type:** Server component
- **Purpose:** Multi-column footer with navigation links, newsletter, social icons
- **Props:** None
- **Responsive:** 4 columns on desktop → stacked on mobile

---

## Hero & Promotional Components

### `HeroSlideshow`
- **File:** [`src/components/HeroSlideshow.tsx`](../src/components/HeroSlideshow.tsx)
- **Type:** Client component
- **Purpose:** Full-viewport hero with auto-advancing background slides, text overlay, and CTA buttons
- **Props:** None (data hardcoded internally)
- **Responsive:** Full-width at all breakpoints; font and padding scale
- **Interactions:**
  - Auto-advance slides with interval timer
  - Manual dot indicators for slide selection
  - Pause on hover (optional)

---

### `PromoHeroProduct`
- **File:** [`src/components/PromoHeroProduct.tsx`](../src/components/PromoHeroProduct.tsx)
- **Type:** Client component (`'use client'`)
- **Purpose:** Split-layout hero promo block — ambient video on one side, quick-add product sidebar on the other
- **Props:**

  | Prop       | Type           | Description                              |
  | ---------- | -------------- | ---------------------------------------- |
  | `title`    | `string`       | Hero section headline                    |
  | `subtitle` | `string?`      | Badge label above the title              |
  | `videoSrc` | `string`       | Path to looping ambient video            |
  | `ctaText`  | `string`       | CTA button label                         |
  | `ctaHref`  | `string`       | CTA button destination                   |
  | `products` | `SubProduct[]` | Array of complementary product cards     |
  | `reverse`  | `boolean?`     | Flip layout order (video/sidebar swap)   |

- **Responsive:** `lg:grid-cols-12` (8:4 split) → single column on mobile
- **Interactions:**
  - Video play/pause toggle button
  - **"Add to Cart"** → calls `addToCart()` from `StoreContext`
  - Visual "Added ✓" confirmation (emerald green, 2-second timeout)
- **State dependencies:** `useStore()` → `addToCart`

---

## Content Sections

### `CollectionCards`
- **File:** [`src/components/CollectionCards.tsx`](../src/components/CollectionCards.tsx)
- **Type:** Server/Client component
- **Purpose:** Grid of category cards linking to product collections (e.g., 3D Printers, Laser & CNC)
- **Props:** None
- **Responsive:** Multi-column grid → 2-column → single-column
- **Interactions:** Hover scale and shadow effects

---

### `CustomerReviews`
- **File:** [`src/components/CustomerReviews.tsx`](../src/components/CustomerReviews.tsx)
- **Type:** Client component
- **Purpose:** Testimonial carousel with customer photos, star ratings, and review text
- **Props:** None (data hardcoded internally)
- **Responsive:** Horizontal scroll/swipe on mobile, grid on desktop
- **Interactions:** Scroll/swipe navigation, hover effects

---

### `AwardsSlider`
- **File:** [`src/components/AwardsSlider.tsx`](../src/components/AwardsSlider.tsx)
- **Type:** Client component
- **Purpose:** Infinite scrolling marquee of award/press logos
- **Props:** None
- **Responsive:** Full-width at all breakpoints
- **Interactions:** CSS-only infinite scroll animation

---

### `MediaGrid`
- **File:** [`src/components/MediaGrid.tsx`](../src/components/MediaGrid.tsx)
- **Type:** Server/Client component
- **Purpose:** "Discover More" section with video and image cards in a grid layout
- **Props:** None
- **Responsive:** Multi-column grid → stacked on mobile
- **Interactions:** Hover overlay effects, external link targets

---

## Overlay / Drawer Components

### `CartDrawer`
- **File:** [`src/components/CartDrawer.tsx`](../src/components/CartDrawer.tsx)
- **Type:** Client component (`'use client'`)
- **Purpose:** Slide-out shopping cart panel from the right edge
- **Props:** None (consumes `useStore()` context)
- **Responsive:** `max-w-md` at all breakpoints (full-width on very small screens)
- **Interactions:**
  - Opens when `isCartOpen` is `true` (set by header cart icon or `addToCart`)
  - Close via backdrop click, × button, or "Continue Shopping"
  - Per-item quantity adjustment (`+` / `−`)
  - Remove individual items (trash icon)
  - "Clear Cart" button to empty all items
  - "Proceed to Checkout" (demo alert simulation)
  - Live subtotal calculation
- **State dependencies:** `useStore()` → `cart`, `isCartOpen`, `setIsCartOpen`, `removeFromCart`, `updateQuantity`, `cartTotal`, `clearCart`

---

### `GeoTip`
- **File:** [`src/components/GeoTip.tsx`](../src/components/GeoTip.tsx)
- **Type:** Client component
- **Purpose:** Floating geo-targeting notification (bottom-left) suggesting the correct regional store
- **Props:** None
- **Responsive:** Hidden on mobile, visible on `md+`
- **Interactions:** Dismiss button, optional auto-hide after timeout

---

## Utility Components

### `icons.tsx`
- **File:** [`src/components/icons.tsx`](../src/components/icons.tsx)
- **Type:** Shared SVG icon library
- **Purpose:** All custom SVG icons as React components
- **Exports:** `Logo`, `SearchIcon`, `CartIcon`, `UserIcon`, `MenuIcon`, `CloseIcon`, `ChevronDown`, `PlayIcon`, etc.
- **Props:** Each icon accepts `size` (number) and `className` (string)

---

## State Management

### `StoreContext`
- **File:** [`src/context/StoreContext.tsx`](../src/context/StoreContext.tsx)
- **Type:** Client context provider (`'use client'`)
- **Purpose:** Global state for cart and search functionality
- **Exports:**
  - `StoreProvider` — wraps the app tree in `layout.tsx`
  - `useStore()` — hook to access cart/search state from any client component

#### Cart State

| Field           | Type             | Description                       |
| --------------- | ---------------- | --------------------------------- |
| `cart`          | `CartItem[]`     | Current cart items                |
| `addToCart()`   | `function`       | Add product (auto-parse price)    |
| `removeFromCart()` | `function`    | Remove by ID                      |
| `updateQuantity()` | `function`   | Set quantity (removes if ≤ 0)     |
| `clearCart()`   | `function`       | Empty the cart                    |
| `isCartOpen`    | `boolean`        | Cart drawer visibility            |
| `setIsCartOpen()` | `function`    | Toggle cart drawer                |
| `cartCount`     | `number`         | Total item quantity               |
| `cartTotal`     | `number`         | Total price                       |

#### Search State

| Field            | Type          | Description                          |
| ---------------- | ------------- | ------------------------------------ |
| `searchQuery`    | `string`      | Current search input                 |
| `setSearchQuery()` | `function` | Update search input                  |
| `searchResults`  | `Product[]`   | Derived results (via `useMemo`)      |
| `isSearchOpen`   | `boolean`     | Search panel visibility              |
| `setIsSearchOpen()` | `function` | Toggle search panel                 |
| `catalog`        | `Product[]`   | Full product catalog (9 items)       |

#### Persistence
- Cart is persisted to `localStorage` under key `snapmaker-cart`
- Loaded via lazy `useState` initializer (SSR-safe with `typeof window` check)
- Synced to storage via `useEffect` on cart changes

---

## Component Tree

```
RootLayout (layout.tsx)
└── StoreProvider
    ├── {children} (page.tsx)
    │   ├── AnnouncementBar
    │   ├── Header
    │   │   ├── Desktop Nav + MegaMenu
    │   │   ├── Search Overlay (conditional)
    │   │   └── Mobile Drawer (conditional)
    │   ├── GeoTip
    │   ├── main
    │   │   ├── HeroSlideshow
    │   │   ├── CollectionCards
    │   │   ├── PromoHeroProduct (×2)
    │   │   ├── CustomerReviews
    │   │   ├── AwardsSlider
    │   │   └── MediaGrid
    │   └── Footer
    └── CartDrawer (conditional)
```
