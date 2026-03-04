import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pmec.dev',
  integrations: [
    svelte(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
  ],
  prefetch: {
    prefetchAll: true,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
