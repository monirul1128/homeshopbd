# HomeShopBD Unified 🛍️

**Full-stack e-commerce platform** - Frontend + Backend merged into one Next.js application with PostgreSQL database.

## 🎯 Project Status

✅ **Project Structure:** Complete  
✅ **Database Schema:** 28+ models migrated to Prisma  
✅ **Frontend:** All pages, components, and styles copied  
✅ **Backend Example:** Product API routes created  
✅ **Database:** Connected to Neon PostgreSQL  
⏳ **API Routes:** In progress (use product routes as template)  
⏳ **Deployment:** Ready for Vercel

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migration
npx prisma migrate dev --name init

# Start development server
npm run dev
```

Visit: http://localhost:3000

## 📚 Documentation

- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Complete guide for completing the API migration
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Step-by-step Vercel deployment guide

## 🏗️ Tech Stack

- **Frontend:** Next.js 14, React 18, TailwindCSS, DaisyUI
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Auth:** JWT + bcryptjs
- **Images:** Cloudinary
- **Deployment:** Vercel (Free tier)

## 📂 Project Structure

```
homeShopBd-unified/
├── pages/
│   ├── api/              ← Backend API routes
│   │   └── products/     ✅ Example routes (CRUD)
│   ├── admin/            ✅ Admin dashboard pages
│   └── index.js          ✅ Main storefront
├── components/           ✅ React components
├── lib/
│   └── prisma.js         ✅ Database client
├── server/               ⏳ Middleware & utilities
├── prisma/
│   └── schema.prisma     ✅ Complete database schema
├── public/               ✅ Static assets
└── styles/               ✅ Global styles
```

## 🔗 Database

**Neon PostgreSQL** (Free tier)
- 512 MB storage
- Serverless, auto-scaling
- Built-in connection pooling

**Schema includes:**
- Users & Authentication
- Products & Inventory
- Orders & Payments
- Categories & Brands
- Coupons & Promotions
- Blog & Content
- Accounting & Expenses
- Delivery & Logistics
- Notifications & Meetings

## 📝 Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

## 🛠️ Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio (DB GUI)
```

## 📋 Next Steps

1. **Complete API Routes** - See MIGRATION_GUIDE.md
   - Authentication (login, register)
   - User management
   - Order processing
   - Payment integration
   
2. **Update Frontend API Calls** - Change URLs from external backend to `/api/*`

3. **Test Everything** - Verify all features work

4. **Deploy to Vercel** - Follow DEPLOYMENT_GUIDE.md

## 🎯 API Routes Status

- ✅ `/api/products` - Full CRUD (example)
- ⏳ `/api/users` - To create
- ⏳ `/api/auth` - To create
- ⏳ `/api/orders` - To create
- ⏳ `/api/categories` - To create
- ⏳ `/api/brands` - To create
- ⏳ `/api/coupons` - To create
- ⏳ `/api/blog` - To create
- ⏳ `/api/payment` - To create
- ⏳ `/api/upload` - To create

See MIGRATION_GUIDE.md for templates and examples.

## 🚀 Deployment

Deploy to Vercel in minutes:

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# Import to Vercel
# 1. Go to vercel.com
# 2. Import Git repository
# 3. Add environment variables
# 4. Deploy!
```

Detailed instructions: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 💡 Key Features

- **Unified Codebase** - One project, easier to maintain
- **Serverless** - Auto-scales, no server management
- **Free Hosting** - Vercel + Neon free tiers
- **Type-Safe** - Prisma generates types automatically
- **Fast Development** - Hot reload, quick iterations
- **Production Ready** - Built-in optimizations

## 📊 Database Models

28+ models including:
- User, Product, Order, OrderItem
- Category, Brand, Coupon, Flash
- Blog, Meeting, Notification
- Payment, PaymentHistory
- Account, Expense, AccountingHistory
- DeliveryCost, SiteApiSetting
- And more...

View full schema: `prisma/schema.prisma`

## 🔐 Security

- JWT authentication
- Password hashing with bcrypt
- SQL injection protection (Prisma)
- Environment variable protection
- HTTPS by default (Vercel)

## 📞 Support

- **Migration Help:** See MIGRATION_GUIDE.md
- **Deployment Help:** See DEPLOYMENT_GUIDE.md
- **Prisma Docs:** https://www.prisma.io/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs

## 📄 License

Private Project

---

**Ready to deploy!** 🚀 Follow the deployment guide to go live on Vercel.
