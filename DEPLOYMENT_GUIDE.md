# HomeShopBD - Vercel Deployment Guide

## 🚀 Deploy to Vercel (Free)

This guide will help you deploy your unified Next.js + PostgreSQL application to Vercel for FREE.

## Prerequisites

- ✅ Neon PostgreSQL database (Already set up)
- ✅ GitHub account
- ✅ Vercel account (free)

## Step 1: Prepare the Project

### 1.1 Create `.gitignore`

Make sure these are in your `.gitignore`:

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# prisma
prisma/migrations
```

### 1.2 Verify `package.json` scripts

Your `package.json` should have:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

✅ These are already configured!

## Step 2: Push to GitHub

### 2.1 Initialize Git Repository

```bash
cd c:\Users\360\Documents\project\homeShopBd-unified

git init
git add .
git commit -m "Initial commit - Unified HomeShopBD project"
```

### 2.2 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `homeshopbd-unified`
3. Make it **Private** (recommended)
4. Don't initialize with README (you already have one)
5. Click "Create repository"

### 2.3 Push to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/homeshopbd-unified.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Import Project

1. Go to https://vercel.com
2. Click **"Add New"** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your `homeshopbd-unified` repository
5. Click **"Import"**

### 3.2 Configure Project

Vercel will auto-detect Next.js:

- **Framework Preset:** Next.js ✅ (Auto-detected)
- **Root Directory:** `./` ✅
- **Build Command:** `npm run build` ✅ (Will run Prisma generate automatically)
- **Output Directory:** `.next` ✅
- **Install Command:** `npm install` ✅

### 3.3 Add Environment Variables

**CRITICAL STEP:** Click **"Environment Variables"** and add ALL these:

#### Database
```
DATABASE_URL=postgresql://neondb_owner:npg_yUAXu0Kd6aJc@ep-ancient-hall-bd1ka4ik-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

#### JWT & Security
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-use-long-random-string
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

#### Cloudinary (Image Uploads)
```
CLOUDINARY_CLOUD_NAME=dciadhpoj
CLOUDINARY_API_KEY=156686838932624
CLOUDINARY_API_SECRET=Awf0uzOMhPeuz4ilJLTOKs0pQlQ
```

#### Email (if using)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

#### Site Configuration
```
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
NEXT_PUBLIC_SITE_NAME=HomeShopBD
```

#### Payment & Courier APIs (Add when you have the credentials)
```
BKASH_APP_KEY=
BKASH_APP_SECRET=
PATHAO_CLIENT_ID=
PATHAO_CLIENT_SECRET=
REDX_API_ACCESS_TOKEN=
STEADFAST_API_KEY=
```

**Note:** For environment variables with `NEXT_PUBLIC_` prefix, they will be available in the browser. Others are server-side only.

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. ✅ Your site will be live at: `https://your-project-name.vercel.app`

## Step 4: Run Database Migration

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
cd c:\Users\360\Documents\project\homeShopBd-unified
vercel link

# Run migration in production
vercel env pull .env.production
npx prisma migrate deploy
```

### Option B: Using Prisma Data Platform (Alternative)

1. Go to https://cloud.prisma.io
2. Create account and connect your Neon database
3. Run migrations from Prisma Cloud

### Option C: Manual (If above don't work)

1. Install PostgreSQL client locally
2. Connect to your Neon database
3. Run the migration SQL manually

**Get Migration SQL:**
```bash
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > migration.sql
```

Then run this SQL in your Neon database console.

## Step 5: Verify Deployment

### 5.1 Check if Site is Live

Visit: `https://your-project-name.vercel.app`

### 5.2 Test API Routes

```bash
# Test products endpoint
curl https://your-project-name.vercel.app/api/products

# Should return: {"success": true, "data": []}
```

### 5.3 Check Vercel Logs

1. Go to Vercel dashboard
2. Click on your project
3. Go to **"Deployments"**
4. Click on the latest deployment
5. Check **"Functions"** tab for API logs

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain

1. In Vercel dashboard, go to **"Settings"** → **"Domains"**
2. Enter your domain (e.g., `homeshopbd.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-30 minutes)

### 6.2 Update Environment Variable

```
NEXT_PUBLIC_SITE_URL=https://homeshopbd.com
```

Redeploy after changing environment variables.

## 🔄 Continuous Deployment

Every time you push to GitHub, Vercel automatically:

1. Pulls latest code
2. Runs `npm install`
3. Runs `prisma generate`
4. Runs `next build`
5. Deploys to production

**Workflow:**
```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push

# Vercel automatically deploys
# Check: https://vercel.com/your-username/your-project
```

## 📊 Monitoring & Analytics

### View Logs

1. Vercel Dashboard → Your Project
2. Click **"Functions"**
3. See all API route executions and errors

### View Database

```bash
# Open Prisma Studio for your production database
DATABASE_URL="your-production-url" npx prisma studio
```

Or use Neon's web console: https://console.neon.tech

## 🛠️ Troubleshooting

### Issue: Build fails with "Prisma Client not generated"

**Solution:** 
- Make sure `postinstall` script is in package.json
- Check build logs in Vercel
- Manually add build command: `prisma generate && next build`

### Issue: Database connection timeout

**Solution:**
- Verify DATABASE_URL is correct in Vercel env variables
- Check Neon database is active (free tier pauses after inactivity)
- Add `?connection_limit=1` to DATABASE_URL for serverless

**Updated DATABASE_URL for Vercel:**
```
postgresql://neondb_owner:npg_yUAXu0Kd6aJc@ep-ancient-hall-bd1ka4ik-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&connection_limit=1&pool_timeout=0
```

### Issue: API routes return 500 error

**Solution:**
- Check Function logs in Vercel dashboard
- Verify all environment variables are set
- Test locally first: `npm run build && npm start`

### Issue: Images not loading

**Solution:**
- Check Cloudinary credentials in environment variables
- Verify `next.config.js` has correct image domains
- Check browser console for CORS errors

### Issue: Slow cold starts

**Solution:**
- This is normal for Vercel's free tier
- Upgrade to Pro for faster cold starts
- Or use Edge Functions for instant responses

## 🎯 Production Checklist

Before going live:

- [ ] All API routes tested and working
- [ ] Environment variables set in Vercel
- [ ] Database migration completed
- [ ] Authentication working
- [ ] Payment gateway tested (test mode)
- [ ] Email notifications working
- [ ] Images uploading correctly
- [ ] Admin panel accessible
- [ ] Customer facing pages working
- [ ] Mobile responsive verified
- [ ] SSL certificate active (automatic on Vercel)
- [ ] Custom domain configured
- [ ] Analytics/tracking added
- [ ] Error monitoring set up
- [ ] Backup strategy for database

## 📈 Performance Optimization

### Enable Image Optimization

Your `next.config.js` already has image domains configured ✅

### Enable Caching

Add to API routes:
```javascript
res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
```

### Use Edge Functions

For frequently accessed routes, convert to Edge Functions:
```javascript
export const config = {
  runtime: 'edge',
};
```

## 💰 Cost Breakdown

### Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL
- ✅ Serverless Functions
- ✅ Edge Network
- ✅ Preview deployments

### Neon Free Tier:
- ✅ 512 MB storage
- ✅ 1 project
- ✅ Unlimited queries

**Total Cost: $0/month** 🎉

### When to Upgrade:

**Vercel Pro ($20/month):**
- More bandwidth (1TB)
- Better performance
- Password protected deployments
- Advanced analytics

**Neon Pro ($19/month):**
- More storage (10GB)
- More concurrent connections
- Point-in-time restore
- Better performance

## 🔐 Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] .env.local not committed to Git
- [ ] Database has strong password
- [ ] API routes have authentication where needed
- [ ] SQL injection prevention (Prisma handles this ✅)
- [ ] XSS prevention
- [ ] CSRF protection for forms
- [ ] Rate limiting on API routes
- [ ] Input validation
- [ ] Error messages don't leak sensitive info

## 🎉 You're Live!

Your site is now deployed at: `https://your-project-name.vercel.app`

### Share Your Site:
- Frontend: `https://your-project-name.vercel.app`
- Admin: `https://your-project-name.vercel.app/admin`
- API: `https://your-project-name.vercel.app/api/*`

### Next Steps:
1. Complete remaining API routes
2. Test all features in production
3. Monitor logs for errors
4. Set up custom domain
5. Launch! 🚀

---

**Questions?** Check:
- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs
- Neon Docs: https://neon.tech/docs

**Deployment Date:** Ready to deploy anytime!
**Status:** ✅ Configuration complete, ready for deployment
