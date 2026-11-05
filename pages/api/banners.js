import connectDB from '../../lib/mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Check siteapisettings collection for banner data
    const SiteApiSettings = mongoose.models.SiteApiSettings || mongoose.model('SiteApiSettings', new mongoose.Schema({}, { strict: false }), 'siteapisettings');
    
    const settings = await SiteApiSettings.findOne().lean();
    
    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Error fetching banners:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch banners',
    });
  }
}
