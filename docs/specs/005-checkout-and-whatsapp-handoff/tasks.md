# Tasks: Spec 005 — Customer Checkout & WhatsApp Order Handoff

- [x] Task 1: Order Intent Types & TanStack Query Hooks
  - Defined `CreateOrderIntentPayload`, `OrderIntentResponse`, `OrderIntentLine` in `src/features/checkout/types.ts`.
  - Implemented `useCreateOrderIntent`, `useOrderIntent`, `useRecordWhatsAppOpened` in `src/features/checkout/api/order-intent-query.ts`.

- [x] Task 2: Checkout Form & Components
  - Implemented `CheckoutContactForm` (`src/features/checkout/components/checkout-contact-form.tsx`) for name, phone, area, landmark, and directions.
  - Implemented `CheckoutOrderSummary` (`src/features/checkout/components/checkout-order-summary.tsx`).

- [x] Task 3: Checkout Page Route (`/[locale]/checkout`)
  - Created `src/app/[locale]/checkout/page.tsx`.
  - Wired submission to `useCreateOrderIntent`, generated clientRequestId UUID, emptied cart upon success, and navigated to `/[locale]/order/[ref]`.

- [x] Task 4: Order Confirmation & WhatsApp Screen (`/[locale]/order/[ref]`)
  - Created `src/app/[locale]/order/[ref]/page.tsx`.
  - Displayed big reference code (`TM-XXXXXX`), WhatsApp 1-tap launcher, fallback copy message button, and full order summary.
  - Called `recordWhatsAppOpened` mutation when WhatsApp link is clicked.

- [x] Task 5: Translations (English, Urdu, Pashto)
  - Added comprehensive checkout & order confirmation translations to `messages/en.json`, `messages/ur.json`, and `messages/ps.json`.

- [x] Task 6: Quality Verification & Status Log
  - Ran `npm run typecheck` (0 errors), `npm run lint` (0 warnings, 0 errors), `npm test` (3/3 passing), and `npm run build` (all 14 static pages generated cleanly in 4.2s).
  - Updated `docs/status.md` and completed tasks.

