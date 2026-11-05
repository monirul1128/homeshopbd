import connectDB from '../../../lib/mongodb';
import mongoose from 'mongoose';

const Order = mongoose.models.Order || mongoose.model('Order', new mongoose.Schema({}, { strict: false }), 'orders');

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const orders = await Order.find().sort({ createdAt: -1 }).limit(100).lean();
      
      return res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch orders',
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const orderData = req.body;
      const newOrder = new Order(orderData);
      await newOrder.save();
      
      return res.status(201).json({
        success: true,
        data: newOrder,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to create order',
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
