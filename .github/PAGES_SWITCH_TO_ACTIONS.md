# Stop the Jekyll error — use GitHub Actions for Pages

The **"GitHub Pages: jekyll v3.10.0"** message appears because the site is still set to build with **Jekyll** instead of this repo’s **Astro** workflow.

## Fix (one-time)

1. Open your repo on GitHub: **https://github.com/pmecpmec/cvwebsite**
2. Go to **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source:** change from **"Deploy from a branch"** to **"GitHub Actions"**.
4. Save. You don’t need to pick a workflow; the **"Deploy to GitHub Pages"** workflow will run on the next push to `main`.

After that, each push to `main` will:
- Build the site with Astro (`npm run build`)
- Deploy the contents of `dist/` to the `gh-pages` branch
- Serve the site (and your custom domain) from that branch

The Jekyll build will no longer run.
