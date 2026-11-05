import connectDB from '../../lib/mongodb';
import Product from '../../models/Product';
import Category from '../../models/Category';
import User from '../../models/User';
import Blog from '../../models/Blog';
import Order from '../../models/Order';

export default async function handler(req, res) {
  try {
    await connectDB();

    // Get counts from each collection
    const productCount = await Product.countDocuments();
    const categoryCount = await Category.countDocuments();
    const userCount = await User.countDocuments();
    const blogCount = await Blog.countDocuments();
    const orderCount = await Order.countDocuments();

    // Get sample data
    const sampleProducts = await Product.find().limit(3).lean();
    const sampleCategories = await Category.find().limit(3).lean();
    const sampleUsers = await User.find().select('-password').limit(3).lean();

    return res.status(200).json({
      success: true,
      message: 'MongoDB Data Summary',
      collections: {
        products: productCount,
        categories: categoryCount,
        users: userCount,
        blogs: blogCount,
        orders: orderCount,
      },
      samples: {
        products: sampleProducts,
        categories: sampleCategories,
        users: sampleUsers,
      }
    });

  } catch (error) {
    console.error('Debug error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking MongoDB',
      error: error.message
    });
  }
}
