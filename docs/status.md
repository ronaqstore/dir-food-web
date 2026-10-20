# Dir Food Web — Project Status & Changelog

## 2026-10-20 — Spec 001: App Shell, Baseline Setup & Design System
- **Spec:** `docs/specs/001-app-shell-and-setup/` (Status: Done)
- **Features Implemented:**
  - Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 customer storefront shell.
  - Multi-language localization with `next-intl` supporting English (`/en`), Urdu (`/ur`), and Pashto (`/ps`) with proper RTL layout direction.
  - Root layout, error boundary (`error.tsx`), and not-found pages (`not-found.tsx`).
  - Next 16 request routing and proxy (`src/proxy.ts`).
  - Global providers: `ThemeProvider` (`next-themes`), `QueryProvider` (TanStack Query v5), and `NextTopLoader`.
  - App Header (`AppHeader`) with brand logo, delivery area indicator (Timergara), language dropdown (`LocaleSwitcher`), dark/light theme toggle (`ThemeToggle`), and cart action button.
  - Sticky mobile bottom navigation (`MobileNav`) with Home, Restaurants, and Cart tabs.
  - Money & integer paisa conversion utilities (`formatPkr`, `fromPaisa`, `toPaisa`) with unit tests.
  - Type-safe backend API fetch client (`src/lib/api/client.ts`).
- **Quality Gates:**
  - `npm run typecheck`: Passed (0 errors)
  - `npm run lint`: Passed (0 warnings, 0 errors across 24 files with 190 rules)
  - `npm run test`: Passed (3/3 unit tests passing)
  - `npm run build`: Production build succeeded in 3.3s with SSG for `/en`, `/ur`, `/ps`

## 2026-10-20 — Spec 002: Public Directory, Area Discovery & Restaurant Listing
- **Spec:** `docs/specs/002-public-directory-and-discovery/` (Status: Done)
- **Features Implemented:**
  - Directory API layer connecting to `dir-food-backend` (`GET /public/areas` & `GET /public/restaurants`).
  - Delivery Area context (`AreaProvider`) with persistent `localStorage` selection and active area pill in the header.
  - Area selector modal (`AreaModal`) showing all active Lower Dir neighborhoods (Timergara Bazar, Balambat, etc.) and "All Lower Dir".
  - Restaurant cards (`RestaurantCard`) showing logo, name, cuisine badges, live status pill (🟢 Open Now / ⚪ Closed with weekly hours countdown), and minimum order in Rs.
  - Filter controls (`DirectoryFilters`) with debounced search input, horizontal scrolling cuisine chips, and "Open Now" quick toggle.
  - Responsive restaurant grid (`RestaurantGrid`) with skeleton loading cards and empty states.
  - Dedicated searchable restaurant directory page at `/restaurants` (`/[locale]/restaurants`).
  - Homepage (`/[locale]`) integrated with hero banner and popular restaurants section.
  - Complete translations for English, Urdu, and Pashto.
- **Quality Gates:**
  - `npm run typecheck`: Passed (0 errors)
  - `npm run lint`: Passed (0 warnings, 0 errors across 34 files with 190 rules)
  - `npm run test`: Passed (3/3 unit tests passing)
  - `npm run build`: Production build succeeded in 1.5s with SSG for `/en`, `/ur`, `/ps`, `/en/restaurants`, `/ur/restaurants`, `/ps/restaurants`

## 2026-10-20 — Spec 003: Restaurant Storefront & Menu Catalog
- **Spec:** `docs/specs/003-restaurant-storefront-and-menu/` (Status: Done)
- **Features Implemented:**
  - Full restaurant storefront route at `/r/[slug]` (`src/app/[locale]/r/[slug]/page.tsx`).
  - Single-restaurant Cart state manager (`CartProvider`) with `localStorage` persistence and automatic subtotal/count calculation.
  - Cross-restaurant conflict modal (`RestaurantConflictModal`) preventing accidental multi-restaurant mixing and asking user confirmation.
  - Storefront header (`StoreHeader`) with cover image, logo, status badge (🟢 Open Now / ⚪ Closed), operating hours, address, and delivery areas fee modal (`DeliveryFeesModal`).
  - Sticky category tabs (`CategoryNav`) with smooth scrolling to sections.
  - Food dish cards (`MenuItemCard`) showing dish image, title, description, price, inline quantity stepper (+ / -), and "Sold Out" badge for unavailable items.
  - Dynamic variant selector modal (`VariantModal`) supporting any size or portion options (Fast Food: Small/Med/Large, Burgers: Single/Double, Karahi: Half/Full, Drinks: 500ml/1.5L).
  - Floating sticky bottom cart bar (`StickyCartBar`) showing live item count, subtotal in PKR, and direct link to cart review.
  - Full translations for English, Urdu, and Pashto.
- **Quality Gates:**
  - `npm run typecheck`: Passed (0 errors)
  - `npm run lint`: Passed (0 warnings, 0 errors across 48 files with 190 rules)
  - `npm run test`: Passed (3/3 unit tests passing)
  - `npm run build`: Production build succeeded in 3.6s with dynamic route `/[locale]/r/[slug]`


## 2026-10-20 — Spec 004: Cart Review & Area-Aware Order Validation
- **Spec:** `docs/specs/004-cart-review-and-validation/` (Status: Done)
- **Features Implemented:**
  - Dedicated cart review route at `/cart` (`src/app/[locale]/cart/page.tsx`).
  - Integration with backend `POST /public/cart/validate` via `useValidateCart` hook.
  - Delivery neighborhood card (`CartAreaCard`) displaying chosen Lower Dir neighborhood, delivery fees, and direct trigger to switch areas via `AreaModal`.
  - Area-specific minimum order alert (`CartMinOrderAlert`) computing the exact deficit (e.g. *"Add Rs 200 more to deliver to Balambat"*) with live progress bar.
  - Validation banner (`CartValidationBanner`) alerting customers if a restaurant is closed or items are out of stock.
  - Cart item list (`CartItemList`) with dish image, variant/portion badge, unit price, inline quantity steppers (+ / -), line item totals, and clear cart confirmation.
  - Order summary card (`CartSummary`) with subtotal, area delivery fee, grand total, Cash-on-Delivery badge, and guarded "Proceed to Checkout" CTA button.
  - Empty cart state (`CartEmptyState`) with direct link to browse restaurants.
  - Full translations for English, Urdu, and Pashto with RTL support.
- **Quality Gates:**
  - `npm run typecheck`: Passed (0 errors)
  - `npm run lint`: Passed (0 warnings, 0 errors across 56 files with 190 rules)
  - `npm run test`: Passed (3/3 unit tests passing)
  - `npm run build`: Production build succeeded in 3.2s with SSG for `/en/cart`, `/ur/cart`, `/ps/cart`


## 2026-10-20 — Spec 005: Customer Checkout & WhatsApp Order Handoff
- **Spec:** `docs/specs/005-checkout-and-whatsapp-handoff/` (Status: Done)
- **Features Implemented:**
  - Dedicated checkout route at `/checkout` (`src/app/[locale]/checkout/page.tsx`).
  - Delivery details form (`CheckoutContactForm`) collecting Delivery Area (with modal trigger), Landmark / street (required, 3-150 chars), optional directions, name, and Pakistani mobile number.
  - Persistent customer detail auto-fill via `localStorage` (`dir_food_customer_info`) so repeat customers in Timergara do not have to re-enter contact info.
  - Order intent creation mutation connecting to backend `POST /public/order-intents`.
  - Automatic cart clearing upon order submission to prevent duplicate orders.
  - Dedicated order confirmation & WhatsApp launcher screen at `/order/[ref]` (`src/app/[locale]/order/[ref]/page.tsx`).
  - Big 1-tap WhatsApp action button (`https://wa.me/...`) with pre-filled readable order message in Urdu/English.
  - Integration with `POST /public/order-intents/:ref/whatsapp-opened` to record customer handoff analytics.
  - Fallback 1-tap "Copy Order Message" and "Copy Reference Code" buttons for devices with restricted app linking.
  - Complete translations for English, Urdu, and Pashto.
- **Quality Gates:**
  - `npm run typecheck`: Passed (0 errors)
  - `npm run lint`: Passed (0 warnings, 0 errors across 62 files with 190 rules)
  - `npm run test`: Passed (3/3 unit tests passing)
  - `npm run build`: Production build succeeded in 4.2s with SSG for `/en/checkout`, `/ur/checkout`, `/ps/checkout`, `/order/[ref]`
