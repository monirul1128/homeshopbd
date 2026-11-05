import connectDB from '../../lib/mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Check flashes collection
    const Flash = mongoose.models.Flash || mongoose.model('Flash', new mongoose.Schema({}, { strict: false }), 'flashes');
    
    const flashes = await Flash.find({ status: true }).lean();
    
    return res.status(200).json({
      success: true,
      data: flashes,
    });
  } catch (error) {
    console.error('Error fetching flashes:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch flashes',
    });
  }
}
