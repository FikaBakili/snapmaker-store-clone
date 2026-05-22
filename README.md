# Snapmaker Store Clone

A **high‑fidelity prototype** of the Snapmaker US Store built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **shadcn/ui**, and **Tailwind CSS v4**.

## ✨ What you get
- Fully functional product catalog, cart drawer and live search (implemented with React Context).
- Modern UI built with Tailwind‑CSS v4 using **oklch** design tokens.
- Responsive layout that works on mobile, tablet and desktop.
- Production‑ready static export (`next export`) ready for GitHub Pages.

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **UI:** shadcn/ui (Radix primitives) + Tailwind CSS v4
- **Icons:** Lucide React (SVGs extracted from the original site)
- **State management:** React Context (cart + search)
- **Deployment:** GitHub Pages (static export)

## 🚀 Quick start (local development)
```bash
# Clone the repository
git clone https://github.com/FikaBakili/snapmaker-store-clone.git
cd snapmaker-store-clone

# Install dependencies
npm install

# Run the dev server
npm run dev
```
Open **http://localhost:3000** in your browser.

## 📦 Build & export (static site)
```bash
npm run build   # creates .next and generates static files in /out
npm run export   # alias, already part of the build step
```
The output lives in the `out/` directory and can be served by any static host.

## 🌐 Live demo (GitHub Pages)
Your site is publicly available at:

[https://FikaBakili.github.io/snapmaker-store-clone](https://FikaBakili.github.io/snapmaker-store-clone)

## 📚 Documentation
- **Design tokens & UI guide** – `docs/DESIGN_TOKENS.md`
- **Component inventory** – `docs/COMPONENT_INVENTORY.md`
- **Deployment guide** – `DEPLOYMENT.md`
- **Project overview** – `README.md` (this file)

## 📜 License
MIT – see `LICENSE`.
