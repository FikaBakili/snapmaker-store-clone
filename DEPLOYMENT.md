# Deployment Guide — Snapmaker US Store Clone

This guide covers deploying the Next.js application to production using Vercel (recommended) or Docker.

---

## Prerequisites

- **Node.js** ≥ 24 (see `.nvmrc`)
- **npm** (bundled with Node)
- A **GitHub**, **GitLab**, or **Bitbucket** repository with the project code

---

## Option 1: Vercel (Recommended)

Vercel is the native platform for Next.js and provides zero-configuration deployment.

### Via Vercel Dashboard

1. **Sign up** at [vercel.com](https://vercel.com) using your GitHub account
2. Click **"New Project"**
3. **Import** your Git repository
4. Vercel auto-detects the Next.js framework — confirm the settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. (Optional) Add environment variables from `.env.example`
6. Click **"Deploy"**

### Via Vercel CLI

```bash
# Install the CLI globally
npm install -g vercel

# Navigate to your project root
cd ai-website-cloner-template

# Deploy (follow the interactive prompts)
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

If your project uses environment variables (e.g., analytics keys), add them in:
- **Vercel Dashboard** → Project → Settings → Environment Variables
- Or in `.env.local` for local development (never commit this file)

### Custom Domain

1. Go to **Project Settings → Domains**
2. Add your domain (e.g., `store.example.com`)
3. Update your DNS records to point to Vercel:
   - **CNAME**: `cname.vercel-dns.com`
   - Or use Vercel nameservers for automatic SSL

---

## Option 2: Docker

A production-ready `Dockerfile` and `docker-compose.yml` are included.

### Build & Run

```bash
# Build the Docker image
docker build -t snapmaker-clone .

# Run the container
docker run -p 3000:3000 snapmaker-clone
```

### Docker Compose

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Development with Docker

```bash
# Use the dev Dockerfile for hot-reload
docker build -f Dockerfile.dev -t snapmaker-clone-dev .
docker run -p 3000:3000 -v $(pwd):/app snapmaker-clone-dev
```

---

## Option 3: Static Export

If you don't need server-side features, you can export the site as static HTML:

1. Update `next.config.ts`:
   ```ts
   const nextConfig = {
     output: 'export',
   };
   ```
2. Run:
   ```bash
   npm run build
   ```
3. The static site will be in the `out/` directory
4. Deploy `out/` to any static host (Netlify, GitHub Pages, Cloudflare Pages, etc.)

---

## Build Verification

Before deploying, always verify the build locally:

```bash
# Type-check
npm run typecheck

# Full build
npm run build

# Combined check (lint + typecheck + build)
npm run check

# Preview the production build locally
npm run start
```

---

## Performance Notes

| Metric              | Value                     |
| -------------------- | ------------------------- |
| First Load JS (Home) | ~132 kB                   |
| Static pages         | 5 (prerendered at build)  |
| Shared JS chunks     | ~105 kB                   |
| Images               | WebP/PNG optimized        |

> [!TIP]
> All pages are statically generated at build time. No server-side rendering or API routes are required for the current feature set.

---

## Monitoring & Analytics

To add analytics, populate the environment variables in `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Then integrate in `layout.tsx` or via a dedicated analytics component.
