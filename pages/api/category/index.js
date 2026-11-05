import connectDB from '../../../lib/mongodb';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { status } = req.query;
      const filter = status ? { status: status === 'true' } : {};
      
      const categories = await Category.find(filter).lean();
      
      return res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch categories',
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
