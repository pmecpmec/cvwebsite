# About Section Image – Implementation Spec

Reference for AI assistants (e.g. Claude) working on this codebase.

## Overview

The About section (`#about`) displays a hero/profile image with scroll-based parallax and an optional decorative border (StarBorder) when easter-egg "makeover mode" is active.

## DOM Structure

```
section#about
└── div.section-container
    └── motion.div (scroll reveal wrapper)
        └── motion.div (imgRef, group, max-w-3xl mx-auto mb-14 z-10)
            ├── [CONDITIONAL] div (StarBorder overlay, only when isMakeover)
            │   └── StarBorder
            └── div.relative.aspect-[21/9].rounded-2xl.overflow-hidden
                └── motion.img (background.jpg)
```

## Key Elements

### 1. Image container

- **Element**: `div` with `relative aspect-[21/9] rounded-2xl overflow-hidden`
- **Role**: Crops the image to 21:9, rounds corners, hides overflow
- **Important**: No gradient overlay or extra decorative boxes; only the image

### 2. Image (`motion.img`)

- **Source**: `/image/background.jpg`
- **Alt**: `Pedro Eduardo Cardoso`
- **Classes**: `w-full h-[130%] object-cover scale-105 group-hover:scale-100 transition-transform duration-700`
- **Behavior**:
  - `h-[130%]` + `object-cover` for a slight zoom effect
  - `scale-105` → `scale-100` on hover
  - `style={{ y: imgY }}` for scroll parallax (Framer Motion `useTransform`)

### 3. Parallax

- **Target**: `imgRef` (the parent `motion.div` of the image)
- **Scroll range**: `['start end', 'end start']`
- **Transform**: `[40, -40]` (vertical movement in px)

### 4. StarBorder overlay (makeover mode only)

- **Condition**: Rendered only when `isMakeover === true`
- **Wrapper**: `absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-visible animate-fade-in`
- **Component**: `StarBorder` with `className="w-full h-full"`
- **Role**: Decorative border glow around the image; does not cover or dim the image
- **Animation**: Shimmer gradient via `StarBorder.css` (`border-shimmer` keyframes)

## Design decisions (do not change)

1. **Image always in DOM** – The image is never conditionally unmounted. Only the StarBorder overlay is conditional. This avoids the image disappearing when toggling makeover mode.
2. **No full-image overlays** – No gradient overlays (e.g. `from-black/30`) on the image.
3. **No offset boxes** – No decorative `-bottom-3 -right-3` border boxes behind the image.
4. **StarBorder = border only** – StarBorder is a border-style glow, not a full overlay.

## Files

- **Component**: `src/components/About.tsx`
- **StarBorder**: `src/components/ui/StarBorder.tsx`, `src/components/ui/StarBorder.css`
- **Context**: `src/context/MakeoverContext.tsx` (`isMakeover`, `toggleMakeover`)

## Easter egg trigger

The text "front-end development" in the About copy is a `<button>` that calls `toggleMakeover()`. This is the only way to discover the easter egg; the indicator becomes clickable only after discovery.
