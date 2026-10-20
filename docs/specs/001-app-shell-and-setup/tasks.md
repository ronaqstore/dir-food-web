# Tasks: [001] App Shell, Baseline Setup & Design System

- **Target Spec:** `docs/specs/001-app-shell-and-setup/spec.md`
- **Quality Gates:** `npm run typecheck`, `npm run lint`, `npm test`
- **Status:** Complete (100% Pass)

---

## Batch 1: Project Scaffold & Tooling Configuration
- [x] **Task 1.1: Initialize package.json, tsconfig.json, and next.config.ts**
  - Path: `package.json`, `tsconfig.json`, `next.config.ts`, `.env.local`
  - Dependencies: Next.js 16, React 19, `@tailwindcss/postcss`, `postcss`, `next-intl`, `next-themes`, `@tabler/icons-react`, `@tanstack/react-query`, `clsx`, `tailwind-merge`, `nextjs-toploader`.
  - Done check: `npm install` completes successfully.

- [x] **Task 1.2: Linters & Formatters Setup**
  - Path: `.oxlintrc.json`, `.oxfmtrc.json`, `.gitignore`
  - Done check: `npx oxlint` runs without errors.

---

## Batch 2: Core Utilities, Money Helpers & Unit Tests
- [x] **Task 2.1: Money & Paisa Helpers**
  - Path: `src/lib/money/index.ts`, `src/lib/money/index.test.ts`
  - Logic: `formatPkr(paisa)`, `fromPaisa(paisa)`, `toPaisa(rupees)`.
  - Done check: `npm test` passes all tests.

- [x] **Task 2.2: API Fetch Client & Response Envelope**
  - Path: `src/lib/api/client.ts`, `src/lib/utils.ts`
  - Logic: Fetch helper pointing to `dir-food-backend` with JSON parsing and standardized errors.
  - Done check: `npx tsc --noEmit` passes.

---

## Batch 3: Internationalization (i18n) & Dictionaries
- [x] **Task 3.1: Configure next-intl Routing & Proxy**
  - Path: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/i18n/navigation.ts`, `src/proxy.ts`
  - Locales: `en`, `ur`, `ps` (default: `en`).
  - Done check: Proxy compiles cleanly.

- [x] **Task 3.2: Localized Message Catalogs**
  - Path: `messages/en.json`, `messages/ur.json`, `messages/ps.json`
  - Content: Navigation, header, language, theme, and common button strings in English, Urdu, and Pashto.
  - Done check: JSON files pass validation.

---

## Batch 4: Providers, App Shell & Layout
- [x] **Task 4.1: Root Providers**
  - Path: `src/components/providers/theme-provider.tsx`, `src/components/providers/query-provider.tsx`, `src/components/providers/index.tsx`
  - Done check: Providers render children cleanly without hydration issues.

- [x] **Task 4.2: App Header & Navigation**
  - Path: `src/components/layout/app-header.tsx`, `src/components/layout/locale-switcher.tsx`, `src/components/layout/theme-toggle.tsx`, `src/components/layout/mobile-nav.tsx`
  - Done check: Header renders brand, language switcher, theme toggle, and mobile bottom nav.

- [x] **Task 4.3: Root Layout & Localized App Router Hierarchy**
  - Path: `src/app/layout.tsx`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`, `src/app/[locale]/not-found.tsx`, `src/app/[locale]/error.tsx`, `src/styles/globals.css`
  - Done check: Next.js dev server boots with working routing at `/en`, `/ur`, `/ps`.

---

## Batch 5: Quality Gate Verification
- [x] **Task 5.1: Run all quality gates**
  - Done check:
    - `npm run typecheck` (0 errors)
    - `npm run lint` (0 errors, 0 warnings)
    - `npm test` (3/3 tests pass)
    - `npm run build` (compiled in 3.3s, SSG for /en, /ur, /ps)
