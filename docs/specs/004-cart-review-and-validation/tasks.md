# Tasks: Spec 004 — Cart Review & Area-Aware Order Validation

- [x] Task 1: Validation Types & TanStack Query Hook
  - Defined `ValidateCartRequest`, `ValidateCartResponse`, `ValidatedCartLine`, `DeliveryFeeStatus` in `src/features/cart/types.ts`.
  - Implemented `useValidateCart` hook in `src/features/cart/api/cart-query.ts` using `apiClient.post('/public/cart/validate')`.

- [x] Task 2: Cart UI Components
  - Implemented `CartEmptyState` (`src/features/cart/components/cart-empty-state.tsx`).
  - Implemented `CartItemList` (`src/features/cart/components/cart-item-list.tsx`) with image, variant pill, quantity stepper, and delete button.
  - Implemented `CartAreaCard` (`src/features/cart/components/cart-area-card.tsx`) showing selected neighborhood, delivery fee, and change area trigger.
  - Implemented `CartMinOrderAlert` (`src/features/cart/components/cart-min-order-alert.tsx`) with deficit calculator and progress bar.
  - Implemented `CartValidationBanner` (`src/features/cart/components/cart-validation-banner.tsx`) for restaurant hours/availability warnings.
  - Implemented `CartSummary` (`src/features/cart/components/cart-summary.tsx`) displaying subtotal, delivery fee, and grand total.

- [x] Task 3: Cart Page Route (`/[locale]/cart`)
  - Created `src/app/[locale]/cart/page.tsx`.
  - Assembled components into clean responsive grid with live validation states and clear cart modal/button.
  - Guarded "Proceed to Checkout" button when cart has validation errors or is below minimum.

- [x] Task 4: Translations (English, Urdu, Pashto)
  - Added comprehensive cart review strings to `messages/en.json`, `messages/ur.json`, and `messages/ps.json`.

- [x] Task 5: Quality Verification & Status Log
  - Ran `npm run typecheck` (0 errors), `npm run lint` (0 warnings, 0 errors), `npm test` (3/3 passing), and `npm run build` (SSG routes generated in 3.2s).
  - Updated `docs/status.md` and completed tasks.

