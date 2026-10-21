# CLAUDE.md — Dir Food Web (`dir-food-web`)

Next.js 16 + React 19 Public Discovery & WhatsApp Ordering Web App for Timergara and Lower Dir, KPK.

## Key References
- **[`../AGENTS.md`](../AGENTS.md)** — Project Single Source of Truth for architecture and domain rules.
- **[`../docs/01_Requirements_and_Scope.md`](../docs/01_Requirements_and_Scope.md)** — Product requirements & honesty rules.
- **[`../docs/04_API_and_Architecture.md`](../docs/04_API_and_Architecture.md)** — Backend API & Next.js structure.

## Critical Conventions (Non-Negotiable)

1. **Hydration & SSR Safety:**
   - Never initialize `useState` directly with `localStorage`, `window.*`, or client-varying APIs (e.g., `useState(getStoredArea)`).
   - Initialize state with deterministic server defaults (`null`, empty arrays/objects) and sync client-persisted storage inside `React.useEffect` after mount.
   - Use `suppressHydrationWarning` on elements displaying user-locale or client-persisted values where applicable.
2. **Feature API Layer & React Query:**
   - Organize domain features under `src/features/<module>/` with `api/`, `components/`, and `context/`.
   - Query keys must follow the structured array pattern (`['public', '<entity>', ...]`).
3. **Money Representation:**
   - Backend prices are integer **paisa** (`1 PKR = 100 paisa`).
   - Use `formatPkr()`, `toPaisa()`, and `fromPaisa()` in `@/lib/money`. Never do float arithmetic with currency.
4. **Honesty & Copy Terminology:**
   - The web app never claims an order is placed; all references are "WhatsApp request" / "Order Intent".
5. **Quality & Verification Commands:**
   - Typecheck: `npm run typecheck` (`tsc --noEmit`)
   - Lint: `npm run lint` (`oxlint`)
   - Format: `npm run format:check` (`oxfmt`)
   - Tests: `npm test` (`node --experimental-strip-types --test`)
