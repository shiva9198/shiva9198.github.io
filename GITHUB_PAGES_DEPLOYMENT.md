# 🚀 GitHub Pages Deployment Guide

Your Next.js TypeScript portfolio is now configured for GitHub Pages deployment! Here's what has been set up and what you need to do next.

## ✅ What's Been Configured

### 1. **Next.js Static Export Configuration**
- Added `output: 'export'` to `next.config.ts`
- Configured `images.unoptimized: true` for static hosting
- Added `trailingSlash: true` for proper routing
- Removed headers and redirects (not compatible with static export)

### 2. **Build Scripts**
- `npm run build:production` - Builds and exports your site to the `out/` folder
- `npm run clean` - Cleans build artifacts

### 3. **GitHub Actions Workflow**
- Automated deployment on every push to `main` branch
- Builds your TypeScript/Next.js app and deploys to GitHub Pages
- Located at `.github/workflows/deploy.yml`

### 4. **GitHub Pages Optimization**
- Added `.nojekyll` file to prevent Jekyll processing
- Updated `.gitignore` to include the `out/` directory in commits

## 🎯 Next Steps to Deploy

### Option A: Use Your Current Repository (Custom Domain)

1. **Enable GitHub Pages:**
   - Go to your repository settings: https://github.com/shiva9198/shiva-portfolio/settings/pages
   - Under "Source", select "GitHub Actions"
   - Your site will be available at: `https://shiva9198.github.io/shiva-portfolio/`

### Option B: Create a User Pages Repository (Recommended)

For the cleanest URL (`https://shiva9198.github.io/`), create a new repository:

1. **Create New Repository:**
   ```bash
   # Create a new repository named: shiva9198.github.io
   ```

2. **Move Your Code:**
   ```bash
   git remote set-url origin https://github.com/shiva9198/shiva9198.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to: https://github.com/shiva9198/shiva9198.github.io/settings/pages
   - Under "Source", select "GitHub Actions"
   - Your site will be available at: `https://shiva9198.github.io/`

## 🔧 How It Works

1. **Push to main** → GitHub Actions triggers
2. **Build Process:**
   - Install Node.js and dependencies
   - Run `npm run build:production`
   - Generate static files in `out/` folder
3. **Deploy:** Upload to GitHub Pages
4. **Live Site:** Available at your GitHub Pages URL

## ⚠️ Important Notes

### API Routes Limitation
Your API routes (`/api/*`) won't work on GitHub Pages since it's static hosting only. You have a few options:

1. **Deploy APIs separately** (Vercel, Netlify, Railway)
2. **Use serverless functions** on platforms that support them
3. **Convert to client-side only** features

### Backend Services
Your backend folder with Python services will need separate deployment to a platform like:
- Railway
- Render
- Fly.io
- Digital Ocean

## 🌟 Testing Locally

Test your static export locally:
```bash
npm run build:production
npx serve out/
```

## 🎉 You're All Set!

Your Next.js TypeScript portfolio will automatically deploy to GitHub Pages whenever you push to the main branch. The first deployment may take a few minutes to set up.

---

**Need help?** Check the Actions tab in your repository to see the deployment status and any potential errors.