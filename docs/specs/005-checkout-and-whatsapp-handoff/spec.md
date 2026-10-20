# Spec 005: Customer Checkout & WhatsApp Order Handoff

## Overview
Completes the core Dir Food ordering lifecycle for customers in Lower Dir (`dir-food-web`). Allows customers to review delivery address and contact details on `/checkout`, creates an immutable snapshot Order Intent via `POST /public/order-intents`, clears the client-side cart, and presents the order completion screen at `/order/[ref]` with a prominent 1-tap WhatsApp launcher and full order breakdown.

## User Stories
1. **As a customer in Lower Dir**, I want to enter my name, mobile number, delivery neighborhood, and landmark (e.g. *Near College Chowk, Balambat*), so the delivery rider knows where to bring my food.
2. **As a customer**, I want to tap "Confirm Order & Open WhatsApp", so my order is registered and WhatsApp opens with a pre-filled, readable message to the restaurant.
3. **As a customer**, I want to see my unique Reference Code (e.g., `TM-123456`) and order status so that I can quote it to the restaurant on WhatsApp or phone call.
4. **As a customer**, I want my cart to be cleanly emptied once the order is placed, so I don't accidentally order twice.

## Key Screens & Endpoints
- **`/checkout` Route (`src/app/[locale]/checkout/page.tsx`)**:
  - Contact inputs: Customer Name, Phone number (`03XX XXXXXXX`).
  - Delivery location: Area Selector (`AreaModal`), Landmark / Address, Optional directions.
  - Optional instructions: Cooking / chef notes.
  - Payment method: Cash on Delivery (COD) badge.
  - Order mini-summary with Subtotal, Delivery Fee, Total.
  - "Confirm Order & Open WhatsApp" button.
- **Backend Endpoints**:
  - `POST /public/order-intents`: Creates snapshot, returns `reference`, `whatsappUrl`, `expiresAt`.
  - `GET /public/order-intents/:ref`: Fetches status, snapshot lines, delivery info, and rebuilt WhatsApp URL.
  - `POST /public/order-intents/:ref/whatsapp-opened`: Analytics webhook when user taps "Open WhatsApp".
- **`/order/[ref]` Route (`src/app/[locale]/order/[ref]/page.tsx`)**:
  - Success banner with large reference code (e.g. `TM-104928`).
  - Direct "Open WhatsApp" CTA (with `whatsapp-opened` tracking).
  - Copy reference code button.
  - Copy WhatsApp message button fallback.
  - Order breakdown (dishes, portions, prices, address, landmark).
  - "Order Again / Home" link.

