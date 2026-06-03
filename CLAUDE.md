@AGENTS.md
# ShareGratitude — Claude Code Instructions

This file is the source of truth for how to build and maintain this codebase. Read it fully at the start of every session. When in doubt, follow the rules here over your training defaults.

---

## 1. Project Overview

ShareGratitude is a marketing website for a healthcare appreciation platform. Patients scan QR codes in hospitals to send thank-you messages directly to staff. The site is informational + lightly interactive — no auth, no database (yet).

**Pages:**
- `/` — Community Messages (home, message feed)
- `/where-we-are` — Interactive world map of supported hospitals
- `/how-it-works` — 3-step explainer
- `/charities` — Partner charity grid
- `/about` — Founders' story
- `/contact` — Contact form
- `/say-thank-you` — Thank-you submission flow

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15+ (App Router) | Server components, file routing, image optimization |
| Language | TypeScript (strict mode) | Type safety, better AI context |
| Styling | Tailwind CSS v4 | Design-token friendly, Figma MCP maps cleanly |
| UI Primitives | shadcn/ui | Accessible, owned components in our repo |
| Map | react-simple-maps | Lightweight SVG choropleth |
| Forms | react-hook-form + zod | Type-safe validation |
| Dates | date-fns | Tree-shakeable, no moment.js bloat |
| Icons | lucide-react | Matches shadcn ecosystem |

**Do NOT add any package not listed here without asking first.**

---

## 3. Design Tokens

Pull these from Figma via the Dev Mode MCP. Update this section whenever the design changes — never hardcode values that should be tokens.

### Colors
```css
--color-brand-teal: #0FBFB8;        /* Primary CTA, accents */
--color-brand-teal-dark: #0AA59E;   /* Hover state */
--color-brand-teal-light: #B8E8E5;  /* Coming-soon, subtle backgrounds */
--color-navy: #0E2A47;              /* Headings, body text */
--color-navy-soft: #1F3A5C;         /* Secondary text */
--color-text-muted: #6B7280;        /* Tertiary text, timestamps */
--color-bg: #FFFFFF;
--color-bg-soft: #F5F6F7;           /* Footer, alt sections */
--color-bg-hero: #E8F4F3;           /* Hero band gradient base */
--color-border: #E5E7EB;
```

### Typography
- **Display/Headings:** Inter, weights 600/700
- **Body:** Inter, weights 400/500
- **Scale (fluid via clamp):**
  - `h1`: `clamp(2rem, 4vw, 3rem)` — page hero titles
  - `h2`: `clamp(1.5rem, 3vw, 2.25rem)` — section titles
  - `h3`: `clamp(1.125rem, 2vw, 1.375rem)` — card titles
  - `body`: `1rem` (16px) base
  - `small`: `0.875rem`

### Spacing & Layout
- Container max-width: `1200px`
- Section vertical padding: `clamp(3rem, 6vw, 5rem)`
- Card border-radius: `0.75rem` (12px)
- Button border-radius: `0.5rem` (8px)
- Hero band height: `clamp(160px, 22vw, 220px)`

### Breakpoints (mobile-first, Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 4. Folder Structure

```
app/
  (marketing)/                  # Route group, shared layout
    layout.tsx                  # Header + Footer wrapper
    page.tsx                    # Home (messages)
    where-we-are/page.tsx
    how-it-works/page.tsx
    charities/page.tsx
    about/page.tsx
    contact/page.tsx
    say-thank-you/page.tsx
  api/
    messages/route.ts
    contact/route.ts
  layout.tsx                    # Root layout (html, body, fonts)
  globals.css
components/
  layout/
    Header.tsx
    Footer.tsx
    MobileNav.tsx
  sections/
    PageHero.tsx                # Reused on every page
    MessageFeed.tsx
    MessageCard.tsx
    StatsBar.tsx
    WorldMap.tsx
    HowItWorksSteps.tsx
    CharityGrid.tsx
    ThankYouCallout.tsx         # The teal banner
  ui/                           # shadcn components live here
    button.tsx
    card.tsx
    input.tsx
    sheet.tsx
data/
  messages.json
  locations.json
  charities.json
  partners.json
lib/
  types.ts                      # Shared TypeScript types
  utils.ts                      # cn() helper, formatters
  api.ts                        # Fetch helpers
public/
  images/
  partners/
  charities/
  maps/
    world-110m.json
```

---

## 5. Coding Conventions

### Components
- **Server components by default.** Add `"use client"` only when you need state, effects, or browser APIs.
- **One component per file.** Filename matches the export (PascalCase).
- **Props are typed inline** for simple components, in a `Props` type for complex ones.
- **No prop drilling beyond 2 levels** — lift to a context or restructure.
- **Default exports for pages**, named exports for everything else.

### Styling
- **Tailwind utilities first.** Use `@apply` only inside `globals.css` for genuinely repeated patterns.
- **Use design tokens via Tailwind theme**, not hardcoded hex values.
- **Flexbox and Grid only.** No floats. No absolute positioning for layout (only for overlays/badges).
- **Mobile-first:** write base styles for mobile, then add `sm:` `md:` `lg:` modifiers.
- **Use modern CSS:**
  - `clamp()` for fluid sizing
  - Container queries (`@container`) for component-level responsiveness
  - `:has()` for parent-state styling where useful
  - `color-mix()` for hover/active states derived from brand colors
  - `aspect-ratio` over padding-top hacks
- **Always handle `prefers-reduced-motion`** for any animation.

### TypeScript
- **Strict mode is on.** No `any` without a `// eslint-disable` comment explaining why.
- **Types live in `lib/types.ts`** if shared across files.
- **Prefer `type` over `interface`** unless you need declaration merging.
- **Discriminated unions for state machines** (loading | error | success).

### Data Fetching
- **Server components fetch directly** with `fetch()` and Next.js cache options.
- **No client-side data fetching** unless it's for an interaction (search, filter).
- **Always type the response.** Use the types in `lib/types.ts`.
- **Use `revalidate` for ISR** — `{ next: { revalidate: 60 } }` for messages.

### Accessibility (non-negotiable)
- Semantic HTML: `<header>`, `<main>`, `<nav>`, `<article>`, `<section>`.
- Every `<img>` has meaningful `alt` text (or `alt=""` if decorative).
- Every icon-only button has `aria-label`.
- Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text.
- Focus states are visible and use `:focus-visible`.
- Keyboard navigation works on every interactive element.
- Form inputs have associated `<label>` elements.
- Dynamic content uses `aria-live` regions where appropriate.

---

## 6. Data Contracts

### Message
```ts
// lib/types.ts
export type Message = {
  id: string;
  recipientRole: "Nurse" | "Doctor" | "Healthcare Assistant" | "Porter" | "Cleaner" | "Receptionist" | "Pharmacist";
  hospitalName: string;
  city: string;
  body: string;
  fromLabel: string;          // "From a Patient", "From a Family Member"
  createdAt: string;          // ISO 8601
};
```

### Location
```ts
export type CountryStatus = "available" | "coming-soon";

export type LocationData = {
  countries: Record<string, { status: CountryStatus }>;  // ISO 3166-1 alpha-2 keys
  stats: {
    hospitals: number;
    practices: number;
    staff: number;
    populationReach: number;
  };
  partners: Array<{
    name: string;
    logo: string;             // path under /public
  }>;
};
```

### Charity
```ts
export type Charity = {
  id: string;
  name: string;
  logo: string;
  bgColor?: string;           // optional brand background
  url?: string;
};
```

---

## 7. API Routes

All routes return JSON. Always validate query params with zod.

### `GET /api/messages`
- Query: `?limit=number` (default 50, max 50)
- Returns: `{ messages: Message[] }`
- Reads from `data/messages.json`
- Cached at the route level with `revalidate: 60`

### `POST /api/contact`
- Body: validated with zod (name, email, message)
- For now: log + return success. Wire to email later.

**When migrating to a real backend:** the API contract above must not change. Swap the data source inside the route handler only.

---

## 8. The Figma MCP Workflow

The Figma Dev Mode MCP server is configured. Use it for every UI component.

### Standard component-build prompt
1. User selects the relevant frame in Figma desktop.
2. Claude Code calls the MCP to read the frame's structure, tokens, and assets.
3. Map Figma styles to design tokens in this file — **do not invent new colors or sizes**.
4. Build the component following all conventions above.
5. Verify against the Figma frame visually if a screenshot tool is available.

### When Figma and CLAUDE.md disagree
- For **colors, typography, spacing**: CLAUDE.md wins (it's the canonical token list). If Figma shows a value not in tokens, ask before adding.
- For **layout, copy, structure**: Figma wins.

---

## 9. The Interactive Map

**Library:** `react-simple-maps`
**Data source:** `public/maps/world-110m.json` (TopoJSON from `world-atlas` package)
**Component:** `components/sections/WorldMap.tsx` — must be a client component.

### Behavior
- Countries default to `--color-navy`.
- Countries with `status: "available"` → `--color-brand-teal`.
- Countries with `status: "coming-soon"` → `--color-brand-teal-light`.
- Hover: subtle brightness increase + tooltip showing country name and status.
- Click on an "available" country: scroll to or filter the partners section below.
- Legend below the map with two swatches.

### Performance
- Memoize the geography rendering with `useMemo`.
- Don't re-render on hover state — use CSS `:hover` where possible, only React state for the tooltip content.

### Accessibility
- Each country path has `role="img"` and `aria-label="<Country name>, <status>"`.
- Keyboard users can tab through countries with visible focus rings.
- Provide a textual list of available countries below the map for screen readers.

---

## 10. Component Patterns

### `PageHero` (used on every non-home page)
```tsx
<PageHero
  title="How it works"
  subtitle="Safe and Secure. No account needed. No registration required."
/>
```
Renders the gradient band with the hospital photo overlay. Background image is decorative (`alt=""`).

### `ThankYouCallout` (the teal CTA banner)
```tsx
<ThankYouCallout
  title="Have someone to thank?"
  description="No account needed. It takes less than 2 minutes."
  buttonText="Say thank you now"
  href="/say-thank-you"
/>
```

### `MessageCard`
- Icon (hospital icon in a soft circle) — left
- Recipient + city — top
- Timestamp — top right (relative, e.g. "2 days ago")
- Body — middle
- From label — bottom right
- Card has `border` + `hover:shadow-sm` transition.

---

## 11. Git Hygiene

- **Commit after every working component.** Atomic commits.
- **Branch per feature** if working with others. Solo: commit straight to `main` is fine but commit often.
- **Commit message format:** `feat(scope): description` / `fix(scope): description` / `chore: description`
  - `feat(home): add message feed component`
  - `fix(map): correct GB country code`
  - `chore: update CLAUDE.md tokens`

---

## 12. Performance Budget

Target Lighthouse scores on the deployed site:
- Performance: ≥ 95
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Specific budgets:
- LCP < 2.0s on 4G
- CLS < 0.05
- Total JS shipped to home page < 100KB gzipped
- All images use `next/image` with explicit `width`/`height` and `priority` only on above-the-fold.

---

## 13. SEO

- Every page exports a `metadata` object.
- Page titles follow: `<Page name> | ShareGratitude`.
- Every page has a unique meta description.
- `app/sitemap.ts` and `app/robots.ts` are generated.
- Open Graph image at `app/opengraph-image.tsx` (use Next.js generated OG).
- Use semantic headings — only one `<h1>` per page.

---

## 14. Things to Always Do

- ✅ Read this file at the start of every session.
- ✅ Run `npm run lint` and `npm run build` before committing.
- ✅ Test mobile viewport (375px) and desktop (1280px+) for every change.
- ✅ Verify keyboard navigation on any new interactive component.
- ✅ Use `next/image` for all images.
- ✅ Use `next/link` for all internal navigation.
- ✅ Update this file when you discover a new convention worth keeping.

## 15. Things to Never Do

- ❌ Don't install packages not in section 2 without asking.
- ❌ Don't hardcode colors, fonts, or spacing — use tokens.
- ❌ Don't use `any` in TypeScript without a written justification.
- ❌ Don't add client components when a server component will do.
- ❌ Don't use `<img>` — always `next/image`.
- ❌ Don't use `<a href>` for internal links — always `next/link`.
- ❌ Don't fetch data in `useEffect` if it can be fetched on the server.
- ❌ Don't create components in `app/` — they live in `components/`.
- ❌ Don't ship console.logs to production code.
- ❌ Don't disable ESLint rules without a comment explaining why.

---

## 16. When You're Unsure

Ask. The user prefers one clarifying question over an hour of work in the wrong direction. Specifically ask before:
- Adding a new dependency
- Creating a new top-level folder
- Changing the data contract for messages or locations
- Replacing a component pattern with a different one
- Making a design decision not specified in Figma or this file
