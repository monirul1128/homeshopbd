import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';

/**
 * Authenticate user from JWT token
 * @param {Object} req - Request object
 * @returns {Object} - User object
 */
export async function authenticateUser(req) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        phone: true,
        address: true,
        imageURL: true,
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.status === 'BLOCKED') {
      throw new Error('User is blocked');
    }

    return user;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw error;
  }
}

/**
 * Middleware to require authentication
 * Usage: export default requireAuth(handler);
 */
export function requireAuth(handler) {
  return async (req, res) => {
    try {
      req.user = await authenticateUser(req);
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message || 'Unauthorized'
      });
    }
  };
}

/**
 * Middleware to require specific role
 * Usage: export default requireRole(['ADMIN'])(handler);
 */
export function requireRole(allowedRoles = []) {
  return (handler) => {
    return async (req, res) => {
      try {
        req.user = await authenticateUser(req);
        
        if (!allowedRoles.includes(req.user.role)) {
          return res.status(403).json({
            success: false,
            message: 'Forbidden: Insufficient permissions'
          });
        }

        return handler(req, res);
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: error.message || 'Unauthorized'
        });
      }
    };
  };
}

/**
 * Middleware for admin-only routes
 * Usage: export default requireAdmin(handler);
 */
export function requireAdmin(handler) {
  return requireRole(['ADMIN'])(handler);
}

/**
 * Optional authentication (doesn't fail if no token)
 * Usage: export default optionalAuth(handler);
 */
export function optionalAuth(handler) {
  return async (req, res) => {
    try {
      req.user = await authenticateUser(req);
    } catch (error) {
      req.user = null;
    }
    return handler(req, res);
  };
}
