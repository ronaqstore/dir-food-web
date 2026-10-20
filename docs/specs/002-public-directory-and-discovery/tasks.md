# Tasks: [002] Public Directory, Area Discovery & Restaurant Listing

- **Target Spec:** `docs/specs/002-public-directory-and-discovery/spec.md`
- **Quality Gates:** `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`
- **Status:** Complete (100% Pass)

---

## Batch 1: API Services & Type Definitions
- [x] **Task 1.1: Directory Types & API Client Service**
  - Path: `src/features/directory/api/types.ts`, `src/features/directory/api/directory.service.ts`
  - Logic: `getPublicAreas()`, `getPublicRestaurants(params)`.
  - Done check: `npx tsc --noEmit` passes.

- [x] **Task 1.2: TanStack Query Hooks & Key Factories**
  - Path: `src/features/directory/api/queries.ts`
  - Logic: `usePublicAreasQuery()`, `usePublicRestaurantsQuery(params)`.
  - Done check: `npx tsc --noEmit` passes.

---

## Batch 2: Delivery Area Context & Selector Modal
- [x] **Task 2.1: Area Context & Persistence Hook**
  - Path: `src/features/directory/context/area-context.tsx`
  - Logic: Stores `selectedAreaId` in `localStorage`, falls back to first active area or null ("All Areas").
  - Done check: Component renders without errors.

- [x] **Task 2.2: Area Selector Modal & Header Integration**
  - Path: `src/features/directory/components/area-modal.tsx`, update `src/components/layout/app-header.tsx`
  - Logic: Modal to select neighborhood in Timergara, clickable location pill in header.
  - Done check: Clicking pill opens modal and selecting area updates state.

---

## Batch 3: Restaurant Card, Grid & Filters
- [x] **Task 3.1: Restaurant Card Component**
  - Path: `src/features/directory/components/restaurant-card.tsx`
  - Logic: Shows logo, name, cuisines, status badge (Open / Closed), availability text, minimum order in PKR.
  - Done check: Card renders accurately with responsive styling.

- [x] **Task 3.2: Filter Controls & Cuisine Chips**
  - Path: `src/features/directory/components/directory-filters.tsx`
  - Logic: Search bar, cuisine horizontal chips, "Open Now" switch.
  - Done check: Filter changes trigger query updates.

- [x] **Task 3.3: Restaurant Grid & Empty States**
  - Path: `src/features/directory/components/restaurant-grid.tsx`
  - Logic: Loading skeleton cards, empty state with clear action, responsive grid.
  - Done check: Grid renders loaded restaurants and handles loading/empty.

---

## Batch 4: Pages Integration & Localization
- [x] **Task 4.1: Message Catalog Translations**
  - Path: `messages/en.json`, `messages/ur.json`, `messages/ps.json`
  - Content: Add directory strings in English, Urdu, and Pashto.
  - Done check: JSON files pass validation.

- [x] **Task 4.2: Update Homepage & Restaurants Listing Page**
  - Path: `src/app/[locale]/page.tsx`, `src/app/[locale]/restaurants/page.tsx`
  - Done check: Both pages render live directory data with full filter capabilities.

---

## Batch 5: Quality Gate Verification
- [x] **Task 5.1: Run all quality gates**
  - Done check:
    - `npm run typecheck` (0 errors)
    - `npm run lint` (0 errors, 0 warnings across 34 files)
    - `npm test` (3/3 tests pass)
    - `npm run build` (compiled in 1.5s, SSG for /en, /ur, /ps, /restaurants)

