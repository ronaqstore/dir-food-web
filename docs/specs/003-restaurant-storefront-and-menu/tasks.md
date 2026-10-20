# Tasks: [003] Restaurant Storefront & Menu Catalog

- **Target Spec:** `docs/specs/003-restaurant-storefront-and-menu/spec.md`
- **Quality Gates:** `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`
- **Status:** Complete (100% Pass)

---

## Batch 1: Cart Context, Local Storage & Conflict Handler
- [x] **Task 1.1: Cart State Types & Context Provider**
  - Path: `src/features/cart/types.ts`, `src/features/cart/context/cart-context.tsx`
  - Logic: Single-restaurant cart store with `localStorage` persistence, unique cart item key generator (`${itemId}:${variantId || 'base'}`).
  - Done check: `npx tsc --noEmit` passes.

- [x] **Task 1.2: Restaurant Conflict Modal**
  - Path: `src/features/cart/components/restaurant-conflict-modal.tsx`
  - Logic: Warns user before clearing previous restaurant cart.
  - Done check: `npx tsc --noEmit` passes.

---

## Batch 2: Restaurant API Layer & Storefront Queries
- [x] **Task 2.1: Restaurant Types & API Service**
  - Path: `src/features/restaurant/api/types.ts`, `src/features/restaurant/api/restaurant.service.ts`
  - Logic: `getRestaurantBySlug(slug)`, `getRestaurantMenu(slug)`.
  - Done check: `npx tsc --noEmit` passes.

- [x] **Task 2.2: TanStack Query Hooks**
  - Path: `src/features/restaurant/api/queries.ts`
  - Logic: `useRestaurantProfileQuery(slug)`, `useRestaurantMenuQuery(slug)`.
  - Done check: `npx tsc --noEmit` passes.

---

## Batch 3: Menu UI Components & Variant Selector
- [x] **Task 3.1: Variant Selection Modal (Fast food sizes & portions)**
  - Path: `src/features/restaurant/components/variant-modal.tsx`
  - Logic: Accessible modal showing variant radio options with individual prices.
  - Done check: Component renders without errors.

- [x] **Task 3.2: Menu Item Card with Direct Quantity Adjuster**
  - Path: `src/features/restaurant/components/menu-item-card.tsx`
  - Logic: Image, name, description, price, "Add" / "Options" button, quantity increment/decrement.
  - Done check: Item card integrates with cart state.

- [x] **Task 3.3: Storefront Header & Delivery Fee Dialog**
  - Path: `src/features/restaurant/components/store-header.tsx`, `src/features/restaurant/components/delivery-fees-modal.tsx`
  - Logic: Cover banner, logo, hours status badge, contact/address, delivery fees dialog.
  - Done check: Header displays store details accurately.

- [x] **Task 3.4: Sticky Category Navigation & Floating Cart Bar**
  - Path: `src/features/restaurant/components/category-nav.tsx`, `src/features/cart/components/sticky-cart-bar.tsx`
  - Logic: Category scroll links, floating bottom cart bar.
  - Done check: Sticky elements function smoothly.

---

## Batch 4: Storefront Page (`/r/[slug]`) & Localization
- [x] **Task 4.1: Message Catalog Translations**
  - Path: `messages/en.json`, `messages/ur.json`, `messages/ps.json`
  - Content: Add storefront, menu, variant selection, and cart bar strings in English, Urdu, and Pashto.
  - Done check: JSON files pass validation.

- [x] **Task 4.2: Restaurant Page Implementation**
  - Path: `src/app/[locale]/r/[slug]/page.tsx`
  - Logic: Server-side data fetch, renders store header, category nav, and menu sections.
  - Done check: Page compiles and loads restaurant data cleanly.

---

## Batch 5: Quality Gate Verification
- [x] **Task 5.1: Run all quality gates**
  - Done check:
    - `npm run typecheck` (0 errors)
    - `npm run lint` (0 errors, 0 warnings across 48 files)
    - `npm test` (3/3 tests pass)
    - `npm run build` (compiled in 3.6s, SSG + dynamic /[locale]/r/[slug])

