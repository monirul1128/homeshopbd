import { requireAuth } from '../../../server/middleware/auth';

/**
 * GET /api/auth/me
 * Get current authenticated user's profile
 * Requires: Bearer token in Authorization header
 */
async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // req.user is populated by requireAuth middleware
  return res.status(200).json({
    success: true,
    data: req.user
  });
}

export default requireAuth(handler);

