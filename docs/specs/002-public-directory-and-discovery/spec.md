# Spec: [002] Public Directory, Area Discovery & Restaurant Listing

- **Project:** `dir-food-web` (Customer Storefront)
- **Status:** Approved for Implementation
- **Author:** AI + Usman
- **Date:** 2026-10-20
- **Target Directories:** `src/features/directory/`, `src/app/[locale]/`, `src/components/ui/`, `messages/`

---

## 1. Context & Business Value
- **Who needs this:** Diners and hungry customers in Timergara, Balambat, and Lower Dir, KPK.
- **Problem solved:** Allows diners to select their local delivery neighborhood, see which restaurants deliver to them, search by name, filter by cuisines, check who is currently open, and tap a restaurant to view its full menu.
- **User Journey:**
  1. A diner lands on the homepage (`/`) or directory page (`/restaurants`).
  2. The diner can select their neighborhood (e.g. Timergara Bazar, Balambat) via an Area Selector dialog or dropdown.
  3. The directory presents restaurants sorted with "Open Now" spots first, showing logo, name, cuisine badges, opening hours status (e.g. "Open until 11:00 PM"), and minimum order amount in PKR.
  4. The diner can type a search query ("Karahi", "Pizza", "Al-Noor") or click a cuisine filter chip.
  5. The diner can toggle the "Open Now" switch to hide closed restaurants.
  6. Clicking any restaurant card navigates to its storefront menu (`/r/:slug`).

---

## 2. API Contract & Integration
Backend Endpoints Called:
- `GET /public/areas`:
  - Returns `PublicAreaItem[]`: `[{ id, name, slug }]`
- `GET /public/restaurants`:
  - Query parameters: `areaId`, `cuisine`, `q`, `openNow`, `page`, `limit`
  - Returns: `{ data: PublicRestaurantCard[], meta: { page, limit, total } }`
  - Item shape:
    - `slug`: string (unique identifier for navigation)
    - `name`: string
    - `cuisines`: string[]
    - `logoUrl`: string | null
    - `minOrderAmount`: number | null (paisa integer, e.g. `30000` = Rs 300)
    - `isOpenNow`: boolean
    - `availabilityText`: string (e.g. "Open until 11:00 PM", "Closed • Opens at 12:00 PM")
    - `nextOpenAt`: string | null

---

## 3. UI Components to Implement
1. **Area Context & State (`src/features/directory/context/area-context.tsx`):**
   - Stores selected area (`selectedAreaId`, `selectedAreaName`) in `localStorage` so it persists across visits.
   - Provides `useArea()` hook.
2. **Area Selector Modal / Sheet (`src/features/directory/components/area-modal.tsx`):**
   - Modal dialog showing active delivery areas with quick 1-tap selection.
   - Updates header indicator and triggers directory re-fetch.
3. **Restaurant Card (`src/features/directory/components/restaurant-card.tsx`):**
   - Clean card with logo, placeholder fallback, name, cuisine badges, live status pill (🟢 Open / ⚪ Closed), availability text, and minimum order amount.
4. **Restaurant Grid & Empty States (`src/features/directory/components/restaurant-list.tsx`):**
   - Responsive grid (1 column on mobile, 2 on tablet, 3 on desktop).
   - Skeleton loading cards.
   - Empty state when no restaurants deliver to selected area or match the search.
5. **Filters & Search Bar (`src/features/directory/components/directory-filters.tsx`):**
   - Search input with debounce.
   - Horizontal scrolling cuisine chips with active indicator.
   - "Open Now" toggle pill.
6. **Homepage Discovery Section (`src/app/[locale]/page.tsx`):**
   - Hero banner with quick area picker and featured restaurants grid.
7. **Directory Page (`src/app/[locale]/restaurants/page.tsx`):**
   - Dedicated searchable catalog with full filtering and pagination/infinite list.

---

## 4. Internationalization & RTL
- Dictionary keys in `messages/{en,ur,ps}.json` for:
  - `directory.searchPlaceholder`: "Search restaurants..."
  - `directory.allCuisines`: "All"
  - `directory.openNow`: "Open Now"
  - `directory.minOrder`: "Min Order: {amount}"
  - `directory.noRestaurants`: "No restaurants found"
  - `directory.noRestaurantsDesc`: "Try changing your search or delivery area."
  - `directory.selectAreaTitle`: "Choose Delivery Area"
  - `directory.deliveringTo`: "Delivering to:"

---

## 5. Acceptance Criteria
- [ ] Areas are fetched from backend `GET /public/areas` and can be switched.
- [ ] Area selection persists in `localStorage` and updates the header badge.
- [ ] Restaurants are fetched from `GET /public/restaurants` with area and search filters applied.
- [ ] Restaurant cards display logo, name, cuisines, status badge (Open / Closed), and minimum order in Rs.
- [ ] "Open Now" toggle filters only restaurants currently accepting orders.
- [ ] Urdu and Pashto localizations render text accurately with correct RTL alignment.
- [ ] Quality gates pass: `npm run typecheck`, `npm run lint` (0 errors), `npm test`, `npm run build`.

