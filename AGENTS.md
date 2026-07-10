# AGENTS.md — Ayesha Fashion

## Quick start

```powershell
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (includes full TS check)
npm run lint     # ESLint (Next.js core-web-vitals + TS config)
```

No separate typecheck, test, or format commands exist.

## Architecture

- **Next.js 16.2** (App Router, Turbopack in dev, server-side build)
- **Tailwind CSS 4** (CSS-based config via `@theme inline` in `globals.css` — no `tailwind.config.*` file)
- **State**: Zustand with `persist` middleware (localStorage keys: `ayesha-cart`, `ayesha-wishlist`)
- **Animations**: Framer Motion (`useScroll`/`useTransform` for parallax, `AnimatePresence`, `whileInView`, variants)
- **Icons**: lucide-react (package version 1.x; some old icon names may not exist)
- **Forms**: react-hook-form + zod, Radix UI primitives throughout
- **Routing**: All pages in `src/app/` — shop (`/shop`), product detail (`/product/[slug]`), cart, checkout, admin dashboard, etc.

## Critical conventions (deviate from defaults)

- **All colors only from CSS variables** in `@theme inline` block (`globals.css:26-61`). Allowed: `white`, `off-white`, `gold`/`gold-light`/`gold-dark`, `dark`/`dark-gray`, `medium-gray`/`light-gray`/`lighter-gray`, `success`/`warning`/`error`. **No arbitrary colors** (no `text-[#...]`, `bg-blue-500`, etc.).
- **Fonts**: `font-heading` → Playfair Display (headings), `font-sans` → Inter (body). Always use `font-heading` for titles ≥2xl, `font-sans` for body.
- **Path alias**: `@/` maps to `src/`. All imports use `@/` (no relative `../../`).
- **Images**: Only from `images.unsplash.com` (configured in `next.config.ts` remotePatterns). Avoid `photo-1515562141589*` (broken Unsplash ID — use `photo-1605100804763*` or `photo-1602173574767*` instead).
- **Every component** must have `"use client"` if it uses hooks, state, events, or framer-motion viewport triggers. Layout files (`layout.tsx`) can remain server components.
- **Zustand persist + hydration**: Cart/wishlist stores read from localStorage on client. Wrap UI that depends on persisted state with `useState(false)` + `useEffect(() => setMounted(true), [])` to avoid SSR hydration mismatch.

## Directory layout (`src/`)

```
src/
  app/           # Next.js App Router pages
  components/
    common/      # ProductCard, Providers, PageTransition
    home/        # Homepage sections (HeroSlider, FeaturedCategories, etc.)
    layout/      # Navbar, Footer, CartDrawer, SearchDrawer, MobileBottomNav
    shop/        # ShopFilters, ShopHeader
    product/     # ProductGallery, ProductInfo, ProductReviews, RelatedProducts
    ui/          # button, badge, card, input, slider, checkbox, select, skeleton
    forms/       # CheckoutForm
  data/          # Mock data: products, testimonials, reviews, blog, orders, faq, customers
  hooks/         # use-cart, use-wishlist, use-ui, use-intersection, use-media-query
  lib/           # utils.ts (cn, formatPrice, etc.)
  types/         # index.ts (Product, Category, Brand, CartItem, Order, etc.)
  constants/     # index.ts (SITE_NAME, CATEGORIES, NAV_LINKS, SORT_OPTIONS, PRICE_RANGES)
```

## Data patterns

- **Products** are static mock data in `data/products.ts`. Helper functions: `getAllProducts()`, `getProductBySlug()`, `getFeaturedProducts()`, `getNewArrivals()`, `getBestSellers()`, `getProductsByCategory()`, `getProductsByBrand()`.
- **Categories** defined in `constants/index.ts` (array of `{name, slug, image}`).
- **Prices** in PKR, formatted via `formatPrice()` → PKR locale with 0 decimals.

## Docker & GitHub setup

- No Dockerfile exists yet. To containerize: create a multi-stage Dockerfile at repo root that runs `npm ci --omit=dev` for production deps, copies `public/` and `.next/`, and starts with `npm start`.
- No GitHub Actions workflows yet. Add `.github/workflows/` for CI (lint + build on push/PR).
- No issue/PR templates exist. Standard templates live at `.github/ISSUE_TEMPLATE/` and `.github/PULL_REQUEST_TEMPLATE/`.

## Common pitfalls

- **Hydration errors** from Zustand persist stores — always use the `mounted` guard pattern on any component showing cart count or wishlist state.
- **Tailwind v4** uses `@theme inline` not `tailwind.config.ts`. Custom values (radius, font, animations) all live in `globals.css`.
- **ESLint** config is in `eslint.config.mjs` (flat config format, v9).
- **Build must pass** before any review — `npm run build` compiles and type-checks in one step.
- No test framework is configured; no test files exist.
