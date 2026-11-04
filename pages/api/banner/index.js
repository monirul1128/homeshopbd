import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // TODO: Create Banner model and implement full functionality
    // For now, return empty array to prevent errors
    return res.status(200).json({
      success: true,
      data: [],
      message: 'Banner API - Coming soon. Create /api/banner route following product example.'
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}
