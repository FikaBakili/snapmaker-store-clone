# Design Tokens — Snapmaker US Store Clone

This document catalogs every design token used across the site. All tokens are defined in [`globals.css`](../src/app/globals.css) using CSS custom properties and consumed via Tailwind CSS v4's `@theme` directive.

---

## Color Palette

### Brand Colors

| Token               | Light Value | Dark Value  | Usage                                |
| -------------------- | ----------- | ----------- | ------------------------------------ |
| `--primary`          | `#e75136`   | `#e75136`   | CTAs, badges, links, active accents  |
| `--primary-foreground` | `#ffffff` | `#ffffff`   | Text on primary backgrounds          |
| `--destructive`      | `#dc2626`   | `#ef4444`   | Error states, delete actions         |

### Neutral / Surface Colors

| Token                    | Light Value | Dark Value  | Usage                              |
| ------------------------ | ----------- | ----------- | ---------------------------------- |
| `--background`           | `#ffffff`   | `#121212`   | Page background                    |
| `--foreground`           | `#242424`   | `#e5e5e5`   | Primary text color                 |
| `--card`                 | `#ffffff`   | `#1e1e1e`   | Card surfaces                      |
| `--card-foreground`      | `#242424`   | `#e5e5e5`   | Text on cards                      |
| `--secondary`            | `#f5f7f8`   | `#2a2a2a`   | Section backgrounds, alt surfaces  |
| `--secondary-foreground` | `#242424`   | `#e5e5e5`   | Text on secondary backgrounds      |
| `--muted`                | `#f5f7f8`   | `#2a2a2a`   | Disabled/muted surfaces            |
| `--muted-foreground`     | `#6f6f6f`   | `#a0a0a0`   | Subdued/helper text                |
| `--accent`               | `#f5f7f8`   | `#2a2a2a`   | Hover highlights                   |
| `--accent-foreground`    | `#e75136`   | `#e75136`   | Accent text (primary color)        |
| `--border`               | `#e5e5e5`   | `#2a2a2a`   | Borders, dividers                  |
| `--input`                | `#e5e5e5`   | `#2a2a2a`   | Input field borders                |
| `--ring`                 | `#e75136`   | `#e75136`   | Focus ring color                   |
| `--bg-light`             | `#f5f7f8`   | `#181818`   | Alternate section backgrounds      |

### Semantic Surface Colors

| Token                         | Light Value | Dark Value  | Usage                    |
| ----------------------------- | ----------- | ----------- | ------------------------ |
| `--popover`                   | `#ffffff`   | `#1e1e1e`   | Popover/dropdown surface |
| `--popover-foreground`        | `#242424`   | `#e5e5e5`   | Popover text             |

### Utility Colors (in-component)

| Color           | Hex        | Usage                                    |
| --------------- | ---------- | ---------------------------------------- |
| Emerald 500     | `#10b981`  | "Added ✓" cart confirmation              |
| Zinc 950        | `#09090b`  | Dark mode card backgrounds               |
| Black/75        | `rgba(0,0,0,0.75)` | Search overlay backdrop         |
| White/10        | `rgba(255,255,255,0.1)` | Subtle light borders on dark |

---

## Typography

### Font Families

| Token            | CSS Variable        | Font Stack                                          | Usage         |
| ---------------- | -------------------- | --------------------------------------------------- | ------------- |
| `font-heading`   | `--font-montserrat`  | `Montserrat, ui-sans-serif, system-ui, sans-serif`  | Headings, nav |
| `font-sans`      | `--font-roboto`      | `Roboto, ui-sans-serif, system-ui, sans-serif`      | Body text     |

### Font Weights

| Weight | Tailwind Class   | Usage                     |
| ------ | ---------------- | ------------------------- |
| 300    | `font-light`     | Subtle body text          |
| 400    | `font-normal`    | Default body text         |
| 500    | `font-medium`    | Nav links                 |
| 600    | `font-semibold`  | Subheadings, CTAs         |
| 700    | `font-bold`      | Prices, section titles    |
| 800    | `font-extrabold` | Hero headings, tags       |

### Type Scale (commonly used)

| Class          | Size     | Usage                                 |
| -------------- | -------- | ------------------------------------- |
| `text-[8px]`   | 8px      | Micro-tags, smallest labels           |
| `text-[9px]`   | 9px      | Badge text, button labels             |
| `text-[10px]`  | 10px     | Product action buttons, fine print    |
| `text-xs`      | 12px     | Product names, search results         |
| `text-sm`      | 14px     | Nav items, prices                     |
| `text-base`    | 16px     | Mobile menu items                     |
| `text-lg`      | 18px     | Cart/search drawer titles             |
| `text-2xl`     | 24px     | Hero heading (mobile)                 |
| `text-4xl`     | 36px     | Hero heading (desktop)                |

---

## Spacing & Layout

### Border Radius

| Token          | Value                       | Usage                  |
| -------------- | --------------------------- | ---------------------- |
| `--radius`     | `0.5rem` (8px)              | Base radius            |
| `rounded-md`   | `calc(0.5rem * 0.8)` ~6.4px | Tags, small badges     |
| `rounded-lg`   | `0.5rem` (8px)              | Buttons, inputs        |
| `rounded-xl`   | `calc(0.5rem * 1.4)` ~11px  | Cards, dropdowns       |
| `rounded-2xl`  | `calc(0.5rem * 1.8)` ~14px  | Product cards          |
| `rounded-3xl`  | `calc(0.5rem * 2.2)` ~18px  | Hero media blocks      |
| `rounded-full` | `9999px`                    | Cart count badge       |

### Max Widths

| Class            | Width   | Usage                       |
| ---------------- | ------- | --------------------------- |
| `max-w-7xl`      | 1280px  | Main content container      |
| `max-w-2xl`      | 672px   | Search modal panel          |
| `max-w-md`       | 448px   | Cart drawer panel           |
| `max-w-sm`       | 384px   | Mobile nav drawer           |

### Breakpoints (Tailwind defaults)

| Prefix | Min Width | Usage                        |
| ------ | --------- | ---------------------------- |
| `sm`   | 640px     | Small tablets                |
| `md`   | 768px     | Tablets                      |
| `lg`   | 1024px    | Desktop navigation threshold |
| `xl`   | 1280px    | Wide desktop                 |

---

## Shadows & Effects

| Effect                    | Tailwind Class               | Usage                   |
| ------------------------- | ---------------------------- | ----------------------- |
| Soft card shadow          | `shadow-sm`                  | Product sidebar cards   |
| Elevated hover            | `shadow-md`                  | Card hover state        |
| Modal shadow              | `shadow-2xl`                 | Drawers, overlays       |
| CTA glow                  | `shadow-lg` + `hover:shadow-primary/25` | Primary buttons |
| Backdrop blur             | `backdrop-blur-md`           | Sticky header           |
| Subtle backdrop           | `backdrop-blur-xs`           | Overlay backdrops       |

---

## Animations

| Class                               | Duration | Usage                     |
| ----------------------------------- | -------- | ------------------------- |
| `animate-in fade-in`                | 300ms    | Overlay fade-in           |
| `animate-in slide-in-from-right`    | 300ms    | Cart/mobile drawer slide  |
| `animate-in slide-in-from-top-3`    | 300ms    | Megamenu dropdown         |
| `animate-in slide-in-from-top-6`    | 300ms    | Search panel drop         |
| `animate-in zoom-in`                | 200ms    | Cart count badge pop-in   |
| `transition-transform duration-500` | 500ms    | Image hover scale         |
| `transition-all duration-200`       | 200ms    | Button hover states       |
| `transition-colors`                 | 150ms    | Color transitions         |
| `hover:-translate-y-0.5`            | —        | CTA lift effect           |
| `group-hover:scale-105`             | —        | Product image zoom        |

---

## Z-Index Layers

| Layer           | Z-Index | Elements                        |
| --------------- | ------- | ------------------------------- |
| Base content    | `auto`  | Page sections                   |
| Video overlay   | `10`    | Gradient overlay on promo video |
| Video controls  | `20`    | Play/pause button, hero text    |
| Sticky header   | `40`    | Header navigation               |
| Modal overlays  | `50`    | Cart drawer, search panel, mobile menu |
