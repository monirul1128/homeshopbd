# HomeShopBD - Unified Project Migration Guide

## ✅ What's Already Done

1. **Project Structure Created** ✅
   - Next.js 14 unified project
   - PostgreSQL Prisma schema (28+ models)
   - All frontend pages, styles, and assets copied
   - Database connection configured

2. **Database Schema Complete** ✅
   - All MongoDB models converted to Prisma
   - 28+ models including: User, Product, Order, Category, Brand, Coupon, Blog, Payment, Accounting, Expenses
   - All relationships and indexes defined

3. **Frontend Migrated** ✅
   - All pages from homeShopBd-main copied
   - All components, styles, and public assets
   - All lib utilities copied

4. **Example API Routes** ✅
   - `/api/products` - Full CRUD example
   - `/api/products/[id]` - Single product operations
   - Prisma client configured

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd c:\Users\360\Documents\project\homeShopBd-unified
npm install
```

### Step 2: Run Prisma Migration

```bash
npx prisma generate
npx prisma migrate dev --name initial_migration
```

This will create all tables in your Neon PostgreSQL database.

### Step 3: Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## 📋 Remaining Tasks

### Critical Tasks (Must Do)

#### 1. **Create Remaining API Routes**

You need to convert Express routes to Next.js API routes. Here's the pattern:

**Original Express Route** (homeShopBd-server-2/src/Routes/userRoute.js):
```javascript
router.post('/users', userController.create);
router.get('/users', userController.getAll);
```

**New Next.js API Route** (pages/api/users/index.js):
```javascript
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany();
    return res.json({ success: true, data: users });
  }
  
  if (req.method === 'POST') {
    const user = await prisma.user.create({ data: req.body });
    return res.json({ success: true, data: user });
  }
}
```

**Routes to Create:**

- ✅ `/api/products/` - Done (example)
- ⏳ `/api/users/` - User CRUD + authentication
- ⏳ `/api/orders/` - Order management
- ⏳ `/api/categories/` - Category operations
- ⏳ `/api/brands/` - Brand management
- ⏳ `/api/coupons/` - Coupon operations
- ⏳ `/api/blog/` - Blog posts
- ⏳ `/api/auth/` - Login, register, forgot password
- ⏳ `/api/payment/` - Payment processing
- ⏳ `/api/delivery/` - Delivery cost calculation
- ⏳ `/api/accounting/` - Accounting module
- ⏳ `/api/expenses/` - Expense tracking
- ⏳ `/api/meetings/` - Meeting management
- ⏳ `/api/notifications/` - Notifications
- ⏳ `/api/upload/` - File/image uploads

#### 2. **Update Frontend API Calls**

Search for all API calls in frontend and update URLs:

**Before:**
```javascript
fetch('https://your-backend-url.com/api/products')
```

**After:**
```javascript
fetch('/api/products')
```

Files to update (search for `fetch`, `axios.get`, `axios.post`, etc.):
- All files in `lib/` folder
- All files in `components/` folder
- All page components

#### 3. **Authentication & Middleware**

Create authentication middleware:

**File:** `server/middleware/auth.js`
```javascript
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';

export async function authenticateUser(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    throw new Error('No token provided');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  
  return user;
}

export function requireAuth(handler) {
  return async (req, res) => {
    try {
      req.user = await authenticateUser(req);
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}
```

#### 4. **Password Hashing**

Update user registration/login to use bcryptjs:

```javascript
import bcrypt from 'bcryptjs';

// Register
const hashedPassword = await bcrypt.hash(password, 10);
await prisma.user.create({
  data: { ...userData, password: hashedPassword }
});

// Login
const user = await prisma.user.findUnique({ where: { email } });
const isValid = await bcrypt.compare(password, user.password);
```

### Medium Priority Tasks

#### 5. **File Upload Handler**

Replace Multer with Next.js API:

**File:** `pages/api/upload/image.js`
```javascript
import formidable from 'formidable';
import cloudinary from 'cloudinary';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Upload failed' });
    }

    const file = files.file;
    const result = await cloudinary.v2.uploader.upload(file.filepath);
    
    fs.unlinkSync(file.filepath); // Clean up temp file

    return res.json({ success: true, url: result.secure_url });
  });
}
```

#### 6. **Environment Variables**

Update `.env.local` with all required values:
- Cloudinary credentials
- SMTP settings for email
- Payment gateway credentials (bKash, etc.)
- Courier API keys (Pathao, RedX, SteadFast)

#### 7. **Mongoose to Prisma Query Conversion**

Common patterns:

| Mongoose | Prisma |
|----------|---------|
| `Model.find()` | `prisma.model.findMany()` |
| `Model.findOne({ email })` | `prisma.model.findUnique({ where: { email } })` |
| `Model.findById(id)` | `prisma.model.findUnique({ where: { id } })` |
| `Model.create(data)` | `prisma.model.create({ data })` |
| `Model.findByIdAndUpdate(id, data)` | `prisma.model.update({ where: { id }, data })` |
| `Model.findByIdAndDelete(id)` | `prisma.model.delete({ where: { id } })` |
| `Model.countDocuments()` | `prisma.model.count()` |
| `.populate('user')` | `include: { user: true }` |

### Lower Priority Tasks

#### 8. **Database Seeding** (Optional)

Create `prisma/seed.js` to populate initial data:
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create admin user
  await prisma.user.create({
    data: {
      email: 'admin@homeshopbd.com',
      password: '$2a$10$...', // hashed password
      fullName: 'Admin User',
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  });

  // Add more seed data...
}

main();
```

Run with: `npm run prisma:seed`

#### 9. **Testing**

Test each API endpoint:
```bash
# Example
curl http://localhost:3000/api/products
curl -X POST http://localhost:3000/api/products -d '{"name": "Test Product", ...}'
```

#### 10. **Deployment Preparation**

Before deploying to Vercel:
- Run `npm run build` to test production build
- Ensure all environment variables are set in Vercel dashboard
- Test the production build locally: `npm start`

## 📦 File Structure Reference

```
homeShopBd-unified/
├── pages/
│   ├── api/                          ← All backend routes here
│   │   ├── products/
│   │   │   ├── index.js              ✅ Done
│   │   │   └── [id].js               ✅ Done
│   │   ├── users/
│   │   │   ├── index.js              ⏳ To create
│   │   │   ├── [id].js               ⏳ To create
│   │   │   └── register.js           ⏳ To create
│   │   ├── auth/
│   │   │   ├── login.js              ⏳ To create
│   │   │   └── forgot-password.js    ⏳ To create
│   │   ├── orders/
│   │   ├── categories/
│   │   ├── brands/
│   │   ├── coupons/
│   │   ├── blog/
│   │   ├── payment/
│   │   ├── delivery/
│   │   ├── accounting/
│   │   ├── expenses/
│   │   └── upload/
│   ├── index.js                      ✅ Frontend pages (copied)
│   ├── admin/                        ✅ Admin pages (copied)
│   └── ...                           ✅ All other pages (copied)
├── components/                       ✅ UI components (copied)
├── lib/
│   ├── prisma.js                     ✅ Database client
│   └── ...                           ✅ Utilities (copied)
├── server/
│   ├── middleware/
│   │   └── auth.js                   ⏳ To create
│   ├── services/
│   └── utils/
├── prisma/
│   └── schema.prisma                 ✅ Complete schema
├── public/                           ✅ Assets (copied)
├── styles/                           ✅ Styles (copied)
├── .env.local                        ✅ Environment variables
├── package.json                      ✅ Dependencies
└── next.config.js                    ✅ Next.js config
```

## 🔧 Helper Scripts

### Quick API Route Template Generator

Save this as `create-api-route.js`:
```javascript
const fs = require('fs');
const path = require('path');

const template = (model) => `import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const items = await prisma.${model}.findMany();
        return res.json({ success: true, data: items });
      
      case 'POST':
        const item = await prisma.${model}.create({ data: req.body });
        return res.json({ success: true, data: item });
      
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end();
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}`;

// Usage: node create-api-route.js category
const model = process.argv[2];
const dir = path.join(__dirname, 'pages', 'api', model + 's');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index.js'), template(model));
console.log(`Created /api/${model}s/index.js`);
```

## 📚 Reference Documents

- **Original Models**: `c:\Users\360\Documents\project\homeShopBd-server-2\src\Models\`
- **Original Routes**: `c:\Users\360\Documents\project\homeShopBd-server-2\src\Routes\`
- **Original Controllers**: `c:\Users\360\Documents\project\homeShopBd-server-2\src\Controllers\`
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js API Routes**: https://nextjs.org/docs/api-routes/introduction

## 🎯 Next Steps

1. Install dependencies: `npm install`
2. Run Prisma migration: `npx prisma migrate dev`
3. Start creating API routes (use products as reference)
4. Update frontend API calls to use `/api/*`
5. Test each module as you complete it
6. Deploy to Vercel when ready

## 💡 Tips

- Use the example `/api/products` routes as templates
- Test API routes with Postman or curl before connecting frontend
- One module at a time (products → users → orders → etc.)
- Keep original backend running until migration is complete
- Use `prisma studio` to view/edit database: `npx prisma studio`

## 🚨 Common Issues & Solutions

### Issue: Prisma Client not generated
**Solution:** Run `npx prisma generate`

### Issue: Database connection failed
**Solution:** Check DATABASE_URL in `.env.local`

### Issue: Module not found errors
**Solution:** Run `npm install` again

### Issue: API route returns 404
**Solution:** Restart dev server (`npm run dev`)

### Issue: CORS errors
**Solution:** API routes in Next.js don't have CORS issues (same origin)

## 📞 Need Help?

- Check Prisma schema: `prisma/schema.prisma`
- View database: `npx prisma studio`
- Check logs: Console in terminal running `npm run dev`

---

**Status:** Project structure complete, example API routes created. Ready for API route migration!

**Estimated Time:** 4-6 hours to complete all API routes (depending on complexity)

**Priority:** Start with authentication, then products, then orders
