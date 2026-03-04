# pmec.dev — Portfolio & CV

Personal portfolio and CV site for **Pedro Eduardo Cardoso**, built with [Astro](https://astro.build), [Svelte](https://svelte.dev), and [Tailwind CSS](https://tailwindcss.com).

- **Live site:** [pmec.dev](https://pmec.dev)
- **Stack:** Astro 4, Svelte 4, Tailwind CSS 3, MDX

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Scripts

| Command        | Description                |
|----------------|----------------------------|
| `npm run dev`  | Start dev server           |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build  |

## Project structure

- `src/pages/` — Astro pages (`index.astro`, `portfolio.astro`, `404.astro`)
- `src/layouts/` — Main layout and global meta
- `src/components/` — Astro and Svelte components (navbar, footer, theme toggle, project grid, etc.)
- `src/content/projects/` — MDX project entries (add or edit here for portfolio items)
- `src/styles/` — Global CSS and Tailwind
- `public/` — Static assets (images, CNAME for GitHub Pages)

## Adding a project

Create a new `.mdx` file in `src/content/projects/` with frontmatter:

```yaml
---
title: "Project name"
description: "Short description"
longDescription: "Longer case study text (optional)"
tags: ["React", "Node.js"]
type: "Full Stack"   # or "Web App", etc.
link: "https://..."
github: "https://github.com/..."
featured: true
order: 5
---
```

## Deployment

The site is deployed to **GitHub Pages** via GitHub Actions on every push to `main`:

1. Workflow runs `npm ci` and `npm run build`.
2. Contents of `dist/` are published to the `gh-pages` branch.
3. Custom domain `pmec.dev` is set via the workflow and `public/CNAME`.

Ensure **GitHub Pages** is enabled for this repo (Settings → Pages → Source: GitHub Actions).

## License

Private / personal use.
