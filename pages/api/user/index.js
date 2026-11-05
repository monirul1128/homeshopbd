import connectDB from '../../../lib/mongodb';
import mongoose from 'mongoose';

const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({}, { strict: false }), 'users');

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { email } = req.query;
      
      if (email) {
        const user = await User.findOne({ email }).lean();
        return res.status(200).json({
          success: true,
          data: user,
        });
      }
      
      const users = await User.find().limit(100).lean();
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch users',
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
