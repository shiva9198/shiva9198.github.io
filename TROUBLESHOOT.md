# 🔧 GitHub Pages Troubleshooting Guide

## Current Issue: README showing instead of website

This usually happens when GitHub Pages is configured incorrectly. Follow these steps:

## ✅ **Step 1: Check GitHub Pages Source Configuration**

1. Go to your repository: https://github.com/shiva9198/shiva-portfolio
2. Click on **Settings** (top right of repository)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, make sure you select **"GitHub Actions"** (NOT "Deploy from a branch")

## ✅ **Step 2: Check if GitHub Actions is running**

1. Go to the **Actions** tab in your repository
2. Look for the workflow "Deploy Next.js Portfolio to GitHub Pages"
3. If it failed, click on it to see the error
4. If it hasn't run, try pushing a small change to trigger it

## ✅ **Step 3: Force trigger the workflow**

You can manually trigger the deployment:

1. Go to **Actions** tab
2. Click on "Deploy Next.js Portfolio to GitHub Pages"
3. Click **"Run workflow"** button
4. Select the main branch and click **"Run workflow"**

## ✅ **Step 4: Check the workflow status**

The workflow should:
1. ✅ Build your Next.js app
2. ✅ Generate static files in `out/` folder
3. ✅ Deploy to GitHub Pages

## 🚨 **Quick Fix Commands**

If you want to try again, run these commands:

```bash
# Make a small change to trigger deployment
echo "# Updated $(date)" >> README.md
git add README.md
git commit -m "Trigger GitHub Pages deployment"
git push
```

## 🔍 **Check Your Site URL**

After fixing the source configuration, your site should be available at:
- https://shiva9198.github.io/shiva-portfolio/

## 🆘 **Still Not Working?**

If it's still showing the README, try these additional steps:

### Option A: Create a new repository named `shiva9198.github.io`
This gives you the cleanest URL and often works better.

### Option B: Check for case sensitivity
Make sure your repository name matches exactly in the URL.

### Option C: Clear GitHub Pages cache
Sometimes GitHub caches the old content. Wait 10-15 minutes after making changes.

---

**Most common cause:** GitHub Pages source is set to "Deploy from a branch" instead of "GitHub Actions". Make sure to change this in Settings → Pages → Source.