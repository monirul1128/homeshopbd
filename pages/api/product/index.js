import connectDB from '../../../lib/mongodb';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { status, search, category, limit = 100 } = req.query;
      
      let filter = {};
      if (status) filter.status = status === 'true';
      if (search) filter.name = { $regex: search, $options: 'i' };
      if (category) filter.category = category;
      
      const products = await Product.find(filter)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 })
        .lean();
      
      return res.status(200).json({
        success: true,
        data: {
          products,
          total: products.length,
        },
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch products',
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
