import connectDB from '../../lib/mongodb';
import Product from '../../models/Product';
import Category from '../../models/Category';
import Banner from '../../models/Banner';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Clear existing data (optional - comment out to keep existing data)
    // await Product.deleteMany({});
    // await Category.deleteMany({});
    // await Banner.deleteMany({});

    // Create Categories
    const categories = await Category.insertMany([
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        status: true,
        slug: 'electronics'
      },
      {
        name: 'Clothing',
        description: 'Men, women, and kids clothing',
        status: true,
        slug: 'clothing'
      },
      {
        name: 'Home & Kitchen',
        description: 'Kitchen and home appliances',
        status: true,
        slug: 'home-kitchen'
      },
    ], { ordered: false }).catch(() => null);

    // Create Products
    const sampleProducts = [
      {
        name: 'Smartphone X1',
        description: 'Latest smartphone with 5G capability',
        price: 50000,
        discount: 10,
        stock: 50,
        categoryName: 'Electronics',
        image: 'https://via.placeholder.com/300x300?text=Smartphone+X1',
        status: true,
        sku: 'PHONE-001',
        rating: 4.5,
      },
      {
        name: 'Wireless Headphones',
        description: 'Premium wireless headphones with noise cancellation',
        price: 15000,
        discount: 15,
        stock: 100,
        categoryName: 'Electronics',
        image: 'https://via.placeholder.com/300x300?text=Headphones',
        status: true,
        sku: 'AUDIO-001',
        rating: 4.2,
      },
      {
        name: 'Men\'s T-Shirt',
        description: 'Comfortable cotton t-shirt for men',
        price: 500,
        discount: 20,
        stock: 200,
        categoryName: 'Clothing',
        image: 'https://via.placeholder.com/300x300?text=T-Shirt',
        status: true,
        sku: 'CLOTH-001',
        rating: 4.0,
      },
      {
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with timer',
        price: 3500,
        discount: 5,
        stock: 30,
        categoryName: 'Home & Kitchen',
        image: 'https://via.placeholder.com/300x300?text=Coffee+Maker',
        status: true,
        sku: 'KITCHEN-001',
        rating: 4.7,
      },
      {
        name: 'Laptop Pro',
        description: 'High-performance laptop for professionals',
        price: 150000,
        discount: 12,
        stock: 20,
        categoryName: 'Electronics',
        image: 'https://via.placeholder.com/300x300?text=Laptop',
        status: true,
        sku: 'LAPTOP-001',
        rating: 4.8,
      },
      {
        name: 'Women\'s Jeans',
        description: 'Stylish blue denim jeans for women',
        price: 1500,
        discount: 25,
        stock: 150,
        categoryName: 'Clothing',
        image: 'https://via.placeholder.com/300x300?text=Jeans',
        status: true,
        sku: 'CLOTH-002',
        rating: 4.3,
      },
    ];

    const products = await Product.insertMany(sampleProducts, { ordered: false }).catch(() => null);

    // Create Banners
    const banners = await Banner.insertMany([
      {
        title: 'Summer Sale',
        description: 'Get up to 50% off on selected items',
        image: 'https://via.placeholder.com/1200x300?text=Summer+Sale',
        link: '/shop',
        status: 'ACTIVE',
        order: 1
      },
      {
        title: 'New Arrivals',
        description: 'Check out our latest products',
        image: 'https://via.placeholder.com/1200x300?text=New+Arrivals',
        link: '/shop?sort=new',
        status: 'ACTIVE',
        order: 2
      },
      {
        title: 'Electronics Deal',
        description: 'Amazing deals on electronics',
        image: 'https://via.placeholder.com/1200x300?text=Electronics',
        link: '/shop?category=electronics',
        status: 'ACTIVE',
        order: 3
      },
    ], { ordered: false }).catch(() => null);

    return res.status(201).json({
      success: true,
      message: 'Sample data created successfully!',
      data: {
        categories: categories?.length || 0,
        products: products?.length || 0,
        banners: banners?.length || 0,
      }
    });

  } catch (error) {
    console.error('Seed error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error seeding data',
      error: error.message
    });
  }
}
