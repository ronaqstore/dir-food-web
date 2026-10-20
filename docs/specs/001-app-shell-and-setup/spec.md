# Spec: [001] App Shell, Baseline Setup & Design System

- **Project:** `dir-food-web` (Customer Storefront)
- **Status:** Pending Review / Approved for Implementation
- **Author:** AI + Usman
- **Date:** 2026-10-19
- **Target Directories:** `src/app/`, `src/components/layout/`, `src/components/ui/`, `src/lib/`, `messages/`

---

## 1. Context & Business Value
- **Who needs this:** Customers and diners in Timergara, Balambat, and Lower Dir, KPK.
- **Problem solved:** Provides the core mobile-first storefront application shell, layout hierarchy, theme switching, 3-language internationalization (`en`, `ur`, `ps` with proper RTL support), global query cache, and header/bottom-nav navigation.
- **User Journey:**
  1. A diner visits `dirfood.pk` (or `localhost:3002`).
  2. The page loads instantly with low data overhead, showing the brand header, current delivery area (default: Timergara), language selector, and navigation bar.
  3. The customer can toggle between English, Urdu, or Pashto, or toggle Dark/Light mode.
  4. The persistent bottom navigation allows seamless 1-tap switching between Home, Browse, and Cart.

---

## 2. Technical Stack & Conventions
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript.
- **Styling:** Tailwind CSS v4 + `@tailwindcss/postcss`.
- **Icons:** `@tabler/icons-react` (centralized in `src/components/icons/index.ts`).
- **Internationalization:** `next-intl` with localized routing (`/[locale]/...`), dictionaries in `messages/{en,ur,ps}.json`.
- **Theme:** `next-themes` with clean dark/light mode and zero hydration flash.
- **State & Server Cache:** TanStack Query v5 (`QueryClientProvider`).
- **Tooling:** `oxlint` (zero warnings tolerance), `oxfmt`, strict `tsc --noEmit`.

---

## 3. UI & Component Contract

### Routes & Layouts:
| Route | Access | Purpose |
|---|---|---|
| `src/app/layout.tsx` | Public | Root HTML, font definitions, base metadata |
| `src/app/[locale]/layout.tsx` | Public | Localization provider, theme provider, query provider, TopLoader |
| `src/app/[locale]/page.tsx` | Public | Initial placeholder homepage (to be expanded in Spec 002) |
| `src/app/[locale]/not-found.tsx` | Public | Localized 404 page with return to home action |
| `src/app/[locale]/error.tsx` | Public | Localized error boundary |

### Core Shell Components:
- `src/components/layout/app-header.tsx`:
  - Brand logo ("Dir Food" / "دیر فوڈ") with location indicator (Timergara).
  - Language switcher dropdown (`en` / `ur` / `ps`).
  - Dark/light mode toggle.
  - Cart button with badge counter (reads from cart store).
- `src/components/layout/mobile-nav.tsx`:
  - Sticky bottom navigation for mobile screens (`sm:hidden`).
  - 3 primary tabs: Explore (`/`), Search (`/restaurants`), Cart (`/cart`).
- `src/components/layout/locale-switcher.tsx`:
  - Accessible dropdown with Urdu/Pashto Nastaliq font readiness and RTL support.

---

## 4. API & Utility Contracts
- `src/lib/api/client.ts`: Typed fetch wrapper communicating with `dir-food-backend` (`NEXT_PUBLIC_API_URL` or `http://localhost:3000`).
- `src/lib/money/index.ts`: Strict integer paisa currency formatting utilities (`formatPkr`, `fromPaisa`, `toPaisa`).
- Unit tests in `src/lib/money/index.test.ts`.

---

## 5. Acceptance Criteria
- [ ] Next.js 16 app initialized with clean package scripts (`dev`, `build`, `typecheck`, `lint`, `format`, `test`).
- [ ] Root layout and localized layout (`/[locale]`) render without hydration errors.
- [ ] Theme toggles between light and dark mode smoothly.
- [ ] Language switching between English (`/en`), Urdu (`/ur`), and Pashto (`/ps`) updates text and flips layout direction (`dir="ltr"` vs `dir="rtl"`).
- [ ] Mobile navigation bar sticks cleanly to bottom on phone viewport.
- [ ] `npm run typecheck` passes (0 errors).
- [ ] `npm run lint` passes with `oxlint` (0 errors, 0 warnings).
- [ ] `npm run test` passes unit tests for money conversion and formatting.

