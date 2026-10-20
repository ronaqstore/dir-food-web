# Spec 004: Cart Review & Area-Aware Order Validation

## Overview
Provides a dedicated customer cart review screen (`/[locale]/cart`) for `dir-food-web`. The cart enforces single-restaurant ordering, displays selected item lines with variants (portions/sizes), allows live quantity updates, integrates customer delivery area selection (with per-area minimum order and delivery fee rules), and performs live price & availability verification against `dir-food-backend` via `POST /public/cart/validate`.

## User Stories
1. **As a customer**, I want to see all the food items and chosen sizes/portions in my cart, so that I can verify what I'm ordering.
2. **As a customer**, I want to increase, decrease, or remove items directly in the cart, so that I can adjust my meal before ordering.
3. **As a customer in Lower Dir**, I want to see if my order meets the minimum order amount for my specific area (e.g. Timergara Bazar, Balambat, Gorgorai), so that I know if the restaurant can deliver to me.
4. **As a customer**, I want live verification so that I am warned if an item is out of stock, prices have changed, or the restaurant is currently closed.
5. **As a customer**, I want a clear "Proceed to Checkout" button that takes me to the final handoff screen once my order is valid.

## Architecture & Data Flow
- **Client State**: `CartContext` (`dir_food_cart` in `localStorage`) provides `restaurant`, `items`, `subtotal`, and mutation actions.
- **Delivery Context**: `AreaContext` (`dir_food_selected_area`) provides active area. Can also be changed right inside the cart.
- **Backend Validation**: `POST /public/cart/validate` called with `{ restaurantSlug, items, deliveryAreaId }`.
  - Backend verifies:
    - Restaurant status (Open / Closed / Available)
    - Live prices & variants
    - Out of stock dishes
    - Delivery area coverage
    - Area-specific minimum order amount (`deliveryArea.minOrderAmount ?? restaurant.minOrderAmount`)
    - Known delivery fee or WhatsApp-confirmed fee
- **I18n**: Full support for English (`/en/cart`), Urdu (`/ur/cart`), and Pashto (`/ps/cart`) with RTL.

## Key Screens & Components
- `/cart` route:
  - `CartItemList`: Item cards with dish image, name, variant pill, unit price, quantity stepper, remove button.
  - `CartAreaCard`: Current delivery area, change button, delivery fee badge (e.g. "Rs 150" or "Confirm via WhatsApp").
  - `CartMinOrderAlert`: Interactive alert & progress bar showing how much more to add to meet the area's minimum requirement.
  - `CartValidationBanner`: Out-of-stock or closed restaurant notices.
  - `CartSummary`: Subtotal, delivery fee, total, and "Proceed to Checkout" action button.
  - `CartEmptyState`: Shown when cart is empty with "Browse Restaurants" button.

