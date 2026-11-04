# 🚀 Quick Start Guide

Get your unified HomeShopBD project running in 5 minutes!

## ✅ What's Already Done

The heavy lifting is complete:

1. ✅ **Project merged** - Frontend + Backend in one Next.js app
2. ✅ **Database migrated** - MongoDB → PostgreSQL (Prisma)
3. ✅ **Schema complete** - All 28+ models converted
4. ✅ **Frontend copied** - All pages, components, styles
5. ✅ **Database connected** - Neon PostgreSQL ready
6. ✅ **Examples created** - Product API + Auth API

## 🏃 3-Step Setup

### Step 1: Install (2 minutes)

```bash
cd c:\Users\360\Documents\project\homeShopBd-unified
npm install
```

### Step 2: Database (1 minute)

```bash
npx prisma generate
npx prisma migrate dev --name init
```

This creates all tables in your Neon database.

### Step 3: Run (10 seconds)

```bash
npm run dev
```

Open: http://localhost:3000

## 🎯 What Works Right Now

### Frontend ✅
- All pages from original project
- All components and styles
- Public assets
- Homepage, admin pages, etc.

### Backend ✅
- **Products API** - Full CRUD
  - GET `/api/products` - List products
  - POST `/api/products` - Create product
  - GET `/api/products/[id]` - Get one
  - PUT `/api/products/[id]` - Update
  - DELETE `/api/products/[id]` - Delete

- **Auth API** - Complete
  - POST `/api/auth/register` - Register user
  - POST `/api/auth/login` - Login
  - GET `/api/auth/me` - Get profile (protected)

### Database ✅
- PostgreSQL (Neon) connected
- All tables created
- Prisma Client generated

## 🧪 Test It Now

### Test Products API

```bash
# Get all products
curl http://localhost:3000/api/products

# Create a product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "sku": "TEST-001",
    "path": "test-product",
    "category": "Electronics",
    "quantity": 10,
    "buyingPrice": 100,
    "productPrice": 150,
    "salePrice": 130,
    "discount": 13
  }'
```

### Test Auth API

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "fullName": "Test User"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get profile (use token from login)
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📋 What's Next

### Complete Remaining API Routes (4-6 hours)

Use the product and auth routes as templates. See **MIGRATION_GUIDE.md** for:
- Route-by-route templates
- Mongoose → Prisma conversion guide
- File upload handling
- Payment integration

Priority order:
1. ✅ Auth (Done)
2. ✅ Products (Done)
3. ⏳ Users management
4. ⏳ Orders
5. ⏳ Categories & Brands
6. ⏳ Coupons
7. ⏳ Blog
8. ⏳ Upload/Images
9. ⏳ Payment
10. ⏳ Accounting/Expenses

### Update Frontend API Calls (2-3 hours)

Search and replace in all files:
- Old: `https://your-backend-url.com/api/products`
- New: `/api/products`

Files to check:
- `lib/*.js`
- `components/**/*.jsx`
- All page files

## 🛠️ Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Test production build
npm start                      # Run production build

# Database
npx prisma studio              # Visual database editor (GUI)
npx prisma generate            # Regenerate Prisma Client
npx prisma migrate dev         # Create new migration
npx prisma migrate reset       # Reset database (careful!)

# Debugging
npx prisma db push             # Push schema without migration
npx prisma format              # Format schema file
npx prisma validate            # Validate schema
```

## 📊 View Your Database

Open Prisma Studio (visual database editor):

```bash
npx prisma studio
```

Opens at: http://localhost:5555

You can:
- View all tables
- Add/edit/delete records
- Query data
- Great for testing!

## 🐛 Troubleshooting

### "Prisma Client not generated"
```bash
npx prisma generate
```

### "Database connection failed"
Check `.env.local` has correct DATABASE_URL

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### API route returns 404
Restart dev server: `Ctrl+C` then `npm run dev`

### Changes not reflecting
- Hard refresh: `Ctrl+Shift+R`
- Clear `.next` folder: `rm -rf .next`

## 📚 Full Documentation

- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Complete API migration guide
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Deploy to Vercel
- **[README.md](./README.md)** - Project overview

## 🎯 Project Structure

```
homeShopBd-unified/
├── pages/
│   ├── api/                      Backend API
│   │   ├── products/             ✅ CRUD example
│   │   └── auth/                 ✅ Auth example
│   ├── admin/                    ✅ Admin pages
│   └── index.js                  ✅ Homepage
├── components/                   ✅ React components
├── lib/
│   └── prisma.js                 ✅ DB client
├── server/
│   └── middleware/auth.js        ✅ Auth middleware
├── prisma/
│   └── schema.prisma             ✅ Database schema
└── public/                       ✅ Assets
```

## 💡 Pro Tips

1. **Use Prisma Studio** for debugging - it's amazing!
2. **Copy product routes** as template for other models
3. **Test API first** before connecting frontend
4. **One module at a time** - don't rush
5. **Commit often** to Git
6. **Read MIGRATION_GUIDE** for detailed help

## 🚀 Deploy When Ready

Follow **DEPLOYMENT_GUIDE.md** to deploy to Vercel (free):

```bash
git push origin main
# Then import to Vercel
```

## ✨ You're Ready!

Everything is set up. Just:
1. ✅ Run `npm run dev`
2. ✅ Test the example APIs
3. ⏳ Create remaining routes (use examples as templates)
4. ⏳ Update frontend API calls
5. 🚀 Deploy!

---

**Need Help?**
- Check MIGRATION_GUIDE.md for templates
- Use Prisma Studio to inspect database
- Test APIs with curl or Postman
- Read console logs for errors

**Happy coding!** 🎉
