# Fix the Jekyll error and get the site live

**You're seeing the Jekyll error because GitHub Pages is still set to "Deploy from a branch".**

Do this once:

1. Open **https://github.com/pmecpmec/cvwebsite/settings/pages**
2. Under **Build and deployment** → **Source**, choose **"GitHub Actions"** (not "Deploy from a branch").
3. Leave the rest as is and save.

After that, only the **Deploy to GitHub Pages** workflow runs (it builds the Astro site and deploys it). The Jekyll build will stop, and pmec.dev will serve the new site.
