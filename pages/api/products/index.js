import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        return await getProducts(req, res);
      case 'POST':
        return await createProduct(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// GET /api/products - Get all products with pagination and filters
async function getProducts(req, res) {
  const {
    page = 1,
    limit = 20,
    category,
    brand,
    status,
    search,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  // Build where clause
  const where = {};
  
  if (category) where.category = category;
  if (brand) where.brand = brand;
  if (status !== undefined) where.status = status === 'true';
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { sku: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: order },
    }),
    prisma.product.count({ where })
  ]);

  return res.status(200).json({
    success: true,
    data: products,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / take),
      totalItems: total,
      itemsPerPage: take
    }
  });
}

// POST /api/products - Create a new product
async function createProduct(req, res) {
  const productData = req.body;

  // Validate required fields
  const required = ['name', 'sku', 'path', 'category', 'quantity', 'buyingPrice', 'productPrice', 'salePrice', 'discount'];
  const missing = required.filter(field => !productData[field]);
  
  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missing.join(', ')}`
    });
  }

  const product = await prisma.product.create({
    data: {
      ...productData,
      subCategory: productData.subCategory || [],
      productColor: productData.productColor || [],
      tags: productData.tags || [],
      imageURLs: productData.imageURLs || [],
      imageURLs2: productData.imageURLs2 || [],
      size: productData.size || [],
    }
  });

  return res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product
  });
}

