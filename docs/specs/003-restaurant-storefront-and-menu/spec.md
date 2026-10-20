# Spec: [003] Restaurant Storefront & Menu Catalog

- **Project:** `dir-food-web` (Customer Storefront)
- **Status:** Approved for Implementation
- **Author:** AI + Usman
- **Date:** 2026-10-20
- **Target Directories:** `src/features/restaurant/`, `src/features/cart/`, `src/app/[locale]/r/[slug]/`, `messages/`

---

## 1. Context & Business Value
- **Who needs this:** Customers and diners visiting a restaurant's storefront (`/r/[slug]`) directly or from the directory.
- **Problem solved:** Provides full restaurant details (cover photo, logo, address in Lower Dir, live operating hours, delivery fees per area) and an organized categorized menu with instant single-tap adding or variant selection (sizes/portions for fast food and karahi). Displays a sticky bottom cart bar previewing selected items and order subtotal.
- **User Journey:**
  1. A diner clicks a restaurant card or opens `dirfood.pk/r/al-noor`.
  2. The diner sees the restaurant header (cover, logo, name, cuisines, open/closed status, delivery fees info).
  3. The diner navigates categories (*Karahi, BBQ, Fast Food, Pizza, Drinks*) using sticky tab pills.
  4. The diner views dish cards:
     - Simple items: 1-tap **"Add"** button.
     - Variant items (e.g. Pizza Small/Med/Large, Burger Single/Double, Karahi Half/Full): **"Choose Options"** button that opens a bottom sheet/modal to pick a variant and add.
     - Unavailable items: Marked with "Sold Out" badge with add button disabled.
  5. If the diner already has items from another restaurant, a conflict dialog prompts whether to clear the previous cart or cancel.
  6. A sticky cart bar appears at the bottom with item count, subtotal in PKR, and a "View Cart" button leading to `/cart`.

---

## 2. API Contract & Integration
Backend Endpoints Called:
- `GET /public/restaurants/:slug`:
  - Returns `PublicRestaurantProfile` (store details, today's hours, address, delivery areas and fees).
- `GET /public/restaurants/:slug/menu`:
  - Returns `{ categories: PublicMenuCategory[] }`.
  - Category: `{ id, name, items: PublicMenuItem[] }`
  - Item: `{ id, name, description, imageUrl, basePrice, isAvailable, variants: PublicItemVariant[] }`
  - Variant: `{ id, name, price }` (price in integer paisa).

---

## 3. UI & State Architecture
1. **Cart Store & Provider (`src/features/cart/context/cart-context.tsx`):**
   - Single-restaurant cart state persisted in `localStorage` (`dir_food_cart`).
   - Structure:
     - `restaurant`: `{ slug, name, logoUrl }`
     - `items`: `Array<{ itemId, variantId?, name, variantName?, unitPrice, quantity, imageUrl? }>`
     - Computed: `itemCount`, `subtotal` (in paisa).
   - Methods: `addItem(restaurant, item, variant?)`, `removeItem(cartKey)`, `updateQuantity(cartKey, qty)`, `clearCart()`.
   - Conflict detection: If `currentRestaurant.slug !== incomingRestaurant.slug`, show `RestaurantConflictModal`.

2. **Storefront Header (`src/features/restaurant/components/store-header.tsx`):**
   - Cover photo, logo, restaurant name, cuisines, address in Timergara.
   - Operating hours badge (e.g. 🟢 Open • Closes 11:30 PM).
   - "Delivery Fees" dialog trigger showing fees across active Timergara areas.

3. **Menu Category Navigation (`src/features/restaurant/components/category-nav.tsx`):**
   - Sticky horizontal tabs allowing quick scroll-to-section.

4. **Dish Item Card (`src/features/restaurant/components/menu-item-card.tsx`):**
   - Dish image (with clean fallback), title, description, price display (`formatPkr(item.basePrice)` or "From {formatPkr(cheapestVariant)}").
   - Quantity selector (+ / -) if item is already in cart.
   - "Add" or "Select Size" button.

5. **Variant Selection Modal (`src/features/restaurant/components/variant-modal.tsx`):**
   - Clean dialog / bottom sheet showing item name, photo, and radio list of available variants (*Small, Medium, Large*, *Half, Full*, *Single, Double*) with individual prices.

6. **Sticky Cart Bottom Bar (`src/features/cart/components/sticky-cart-bar.tsx`):**
   - Floating pill at the bottom of the viewport when `itemCount > 0`.
   - Shows total items, formatted subtotal, and "View Cart" button.

---

## 4. Acceptance Criteria
- [ ] Storefront loads restaurant profile and categorized menu from backend by slug.
- [ ] Dish cards display prices, descriptions, and images.
- [ ] Items without variants add directly to cart with quantity increment/decrement.
- [ ] Items with variants (fast food sizes, portions) open the variant selector modal.
- [ ] Sold out dishes cannot be added to cart.
- [ ] Adding from a different restaurant triggers single-restaurant conflict modal.
- [ ] Sticky bottom cart bar shows live item count and subtotal in PKR.
- [ ] Multi-language support (English, Urdu, Pashto) with proper RTL layout.
- [ ] Quality gates pass: `npm run typecheck`, `npm run lint` (0 errors), `npm test`, `npm run build`.

