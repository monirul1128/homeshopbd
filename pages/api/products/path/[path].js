import connectDB from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

export default async function handler(req, res) {
  const { path } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const product = await Product.findOne({ path, status: true }).lean();

    if (!product) {
      return res.status(404).json({ 
        success: false,
        error: 'Product not found' 
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product by path:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch product',
    });
  }
}
