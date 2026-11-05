import connectDB from '../../../lib/mongodb';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const categories = await Category.find({ status: true }).lean();
    
    // Transform to category and subcategory structure
    const result = categories.map(cat => ({
      _id: cat._id,
      parentCategory: cat.parentCategory,
      childCategory: cat.childCategory || [],
      imageURLs: cat.imageURLs || [],
      imageURLs2: cat.imageURLs2,
      status: cat.status,
    }));

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error fetching categories and subcategories:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
    });
  }
}
