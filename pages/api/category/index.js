import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        return await getCategories(req, res);
      case 'POST':
        return await createCategory(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('Category API Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error', 
      error: error.message 
    });
  }
}

async function getCategories(req, res) {
  const { status, limit = 100 } = req.query;

  const where = {};
  if (status !== undefined) {
    where.status = status === 'true';
  }

  const categories = await prisma.category.findMany({
    where,
    take: parseInt(limit),
    orderBy: { createdAt: 'desc' }
  });

  return res.status(200).json({
    success: true,
    data: categories
  });
}

async function createCategory(req, res) {
  const category = await prisma.category.create({
    data: req.body
  });

  return res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: category
  });
}
