# Portfolio Website — Easter Egg Specification

**Purpose:** This document describes the website structure, styling, and easter egg behavior so that a prompt can be generated for implementing/fixing the easter egg and adding an "easter egg not found" / "easter egg found" indicator.

---

## 1. Project Overview

- **Type:** Personal portfolio / CV website
- **Stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Path:** `c:\Users\pmec\Documents\Projects\Personal\cvwebsite`

---

## 2. Site Structure & Sections

The site has a single-page layout with these sections (in order):

| Section | ID | Component | Description |
|--------|-----|------------|-------------|
| Hero | — | `Hero.tsx` | Full-height intro with "I build things for the web", particles background |
| About | `#about` | `About.tsx` | Photo, bio text, "front-end development" trigger, stats grid |
| Projects | `#projects` | `Projects.tsx` | Project cards with modal |
| Experience | `#experience` | `Experience.tsx` | Work/education timeline |
| Skills | `#skills` | `Skills.tsx` | Tiered tech stack (CORE, COMFORTABLE, EXPERIENCE) + side panel |
| Contact | `#contact` | `Contact.tsx` | "Let's work together" + email/LinkedIn buttons |
| Footer | — | `Footer.tsx` | Copyright, social icons (GitHub, LinkedIn, Email, Discord), back-to-top rocket |

---

## 3. Styling System

### Colors (Tailwind)
- **Cream:** 50–500 (backgrounds, light surfaces)
- **Warm:** 600–950 (text, borders)
- **Accent:** `#C4723A` (orange-brown, primary accent)
- **Fonts:** Instrument Serif (headings), Inter (body), JetBrains Mono (code/labels)

### Layout
- `.section-container`: `max-w-5xl mx-auto px-6 sm:px-8`
- `.card`: cream-50, rounded-2xl, border, shadow
- Site uses `cursor-none` and a custom `TargetCursor` component

---

## 4. Current Easter Egg Implementation

### Trigger
- **Location:** About section, inline in the second paragraph
- **Text:** "front-end development" (styled as a button with underline hover)
- **File:** `src/components/About.tsx` (lines 66–72)
- **Behavior:** `onClick={toggleMakeover}` — toggles makeover mode on/off

### State Management
- **Context:** `MakeoverContext` (`src/context/MakeoverContext.tsx`)
- **Values:** `isMakeover` (boolean), `toggleMakeover` (function)
- **Provider:** Wraps entire app in `App.tsx`

### When Makeover Mode Is ON
1. **Body/HTML:** `makeover-mode` class added to `document.documentElement` and `document.body`
2. **Background:** Dark base `#0a0806`; ColorBends component as full-page animated gradient (fixed, z-0)
3. **ColorBends:** Three.js shader, warm colors, mouse-reactive, transparent
4. **Hero Image:** Wrapped in StarBorder component (animated gradient border around the photo)
5. **Dark Mode CSS:** `globals.css` overrides for `.makeover-mode` — dark backgrounds, light text, brighter accent (#e8956a)

### Key Files
- `src/App.tsx` — ColorBends mount, makeover-mode class toggle
- `src/components/About.tsx` — Trigger button, StarBorder around image, gradient overlay
- `src/context/MakeoverContext.tsx` — State
- `src/components/ui/ColorBends.tsx` — Full-page background
- `src/components/ui/StarBorder.tsx` + `StarBorder.css` — Image border effect
- `src/styles/globals.css` — `.makeover-mode` overrides

---

## 5. Desired Easter Egg Behavior (Summary)

- **Trigger:** Click "front-end development" in About section
- **Toggle:** Click again to revert
- **Effects:** Dark theme, ColorBends full-page background, StarBorder around hero image
- **Aesthetic:** Dark mode with brighter orange accents

---

## 6. New Feature Request: Easter Egg Status Indicator

**Requirement:** Add a visible element that shows:
- **Default:** "easter egg not found"
- **After trigger is clicked:** "easter egg found"

**Behavior:**
- When pressed/clicked, it should change from "easter egg not found" to "easter egg found"
- Placement and styling should match the site’s design language

**Open questions for implementation:**
- Where should this indicator live? (Footer, navbar, floating, etc.)
- Should it be a separate toggle, or should it reflect the makeover state?
- Should it persist (e.g. localStorage) or reset on refresh?

---

## 7. Technical Constraints

- Do NOT change global layout, animations, or typography
- Reuse existing components and styling
- Keep ColorBends, StarBorder, and makeover-mode behavior intact
- Site uses custom cursor (`cursor-none`), so click targets must work with that
- Framer Motion used for animations; keep patterns consistent

---

## 8. Prompt Request for Claude

**Task:** Using this specification, produce a clear, step-by-step prompt that can be given to a coding assistant (e.g. Cursor) to:

1. Verify and fix the easter egg (makeover mode) so it works as described
2. Add the "easter egg not found" / "easter egg found" indicator with appropriate placement and behavior
3. Ensure the About section image stays visible in makeover mode
4. Preserve existing design, animations, and structure

The prompt should be self-contained, reference file paths, and include any decisions needed (e.g. placement of the indicator, persistence).
