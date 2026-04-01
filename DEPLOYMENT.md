# Deployment Guide

## Quick Deployment to Vercel

Vercel is the recommended platform for deploying this Vite + React project. Deployment is automatic and free!

### Steps to Deploy to Vercel

1. **Prepare your code**
   ```bash
   # Install dependencies locally first
   npm install
   npm run build
   ```

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial finance dashboard commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/finance-dashboard.git
   git push -u origin main
   ```

3. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select "Import Git Repository"
   - Paste your GitHub repository URL
   - Click "Import"

4. **Configure Project (Optional)**
   - Framework: Automatically detected as "Vite"
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 30-60 seconds)
   - Visit your live URL (e.g., `finance-dashboard-xyz.vercel.app`)

### Automatic Deployments
Every push to the `main` branch automatically triggers a new deployment on Vercel!

---

## Alternative Deployment Methods

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect GitHub account
   - Select repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   # Select your project
   # What do you want to use as your public directory? dist
   # Configure as single-page app? Yes
   # Set up automatic builds? No
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### GitHub Pages

1. **Update package.json**
   ```json
   {
     "homepage": "https://YOUR-USERNAME.github.io/finance-dashboard",
     ...
   }
   ```

2. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/finance-dashboard/',
     ...
   })
   ```

3. **Deploy**
   ```bash
   npm run build
   npm install gh-pages --save-dev
   npx gh-pages -d dist
   ```

### Docker Deployment

1. **Create Dockerfile at project root**
   ```dockerfile
   # Build stage
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   # Production stage
   FROM node:18-alpine
   WORKDIR /app
   RUN npm install -g serve
   COPY --from=build /app/dist ./dist
   EXPOSE 3000
   CMD ["serve", "-s", "dist", "-l", "3000"]
   ```

2. **Build and run**
   ```bash
   docker build -t finance-dashboard .
   docker run -p 3000:3000 finance-dashboard
   ```

### Manual Self-Hosted

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder to your server**
   - Using FTP, SCP, or your hosting control panel
   - Or use Vercel's free tier (recommended)

---

## Environment Variables

If you need to add environment variables:

1. **Create `.env` file**
   ```
   VITE_API_URL=https://api.example.com
   VITE_GA_ID=UA-XXXXXXXXX-X
   ```

2. **In Vercel**
   - Project Settings → Environment Variables
   - Add your variables
   - Redeploy

3. **In code**
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

---

## Performance Tips

1. **Build Size**
   - Current build is ~200KB gzipped
   - Run `npm run build` and check console for size details

2. **Caching**
   - Vercel handles caching automatically
   - Files with hashes are cached forever

3. **CDN**
   - Vercel uses global CDN by default
   - Content delivered from edge locations

---

## Troubleshooting

### Build Fails on Vercel
- Check Node version: Should be 16+ (set in vercel.json if needed)
- Verify all dependencies are in package.json
- Check for any build errors locally first

### Blank Page After Deployment
- Check browser console for errors
- Verify `build` script runs successfully locally
- Check that `vite.config.ts` is correct

### Routes Not Working
- Enable "Automatically rewrite for single page apps" in vercel.json:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

---

## Domain Setup

### Connect Custom Domain to Vercel

1. **In Vercel Dashboard**
   - Project Settings → Domains
   - Add domain

2. **Update DNS Records**
   ```
   Type: A
   Name: @
   Value: 76.76.19.21
   ```

3. **Or use CNAME** (easier for subdomains)
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel.com
   ```

---

## SSL/HTTPS

- **Vercel**: Automatic SSL certificate (free)
- **Firebase**: Automatic SSL certificate (free)
- **Netlify**: Automatic SSL certificate (free)
- **Custom**: Use Let's Encrypt (free)

All major platforms provide free HTTPS - no additional steps needed!

---

## Monitoring

### Vercel Analytics
- Built-in performance monitoring
- Web Vitals tracking
- Deployment history

### Enable in package.json
```json
{
  "dependencies": {
    "@vercel/analytics": "^1.1.0",
    "@vercel/web-vitals": "^0.2.0"
  }
}
```

### Use in App.tsx
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

---

## Summary

**Recommended:** Vercel (fastest, easiest, free)
1. Push to GitHub
2. Connect Vercel
3. Done! 🚀

All platforms provide:
- Free hosting
- Automatic HTTPS
- Global CDN
- Good performance

Choose based on your preference or any existing services you use!
