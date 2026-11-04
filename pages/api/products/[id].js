import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  try {
    switch (method) {
      case 'GET':
        return await getProduct(id, res);
      case 'PUT':
      case 'PATCH':
        return await updateProduct(id, req.body, res);
      case 'DELETE':
        return await deleteProduct(id, res);
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
        return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// GET /api/products/[id] - Get single product
async function getProduct(id, res) {
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  return res.status(200).json({
    success: true,
    data: product
  });
}

// PUT/PATCH /api/products/[id] - Update product
async function updateProduct(id, data, res) {
  const product = await prisma.product.update({
    where: { id },
    data
  });

  return res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: product
  });
}

// DELETE /api/products/[id] - Delete product
async function deleteProduct(id, res) {
  await prisma.product.delete({
    where: { id }
  });

  return res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
}
