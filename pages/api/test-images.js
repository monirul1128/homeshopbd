import connectDB from '../../lib/mongodb';
import Product from '../../models/Product';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Get 10 products with their image info
    const products = await Product.find({ status: true })
      .select('name imageURLs imageURLs2 _id')
      .limit(10)
      .lean();

    const imageTest = products.map(p => ({
      name: p.name?.substring(0, 50),
      hasImageURLs: !!p.imageURLs,
      imageURLsCount: p.imageURLs?.length || 0,
      firstImage: p.imageURLs?.[0],
      hasImageURLs2: !!p.imageURLs2,
    }));

    return res.status(200).json({
      success: true,
      count: products.length,
      images: imageTest,
    });
  } catch (error) {
    console.error('Error testing images:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
