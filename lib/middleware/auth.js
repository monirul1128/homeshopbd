import jwt from 'jsonwebtoken';

/**
 * Authentication middleware for Next.js API routes
 * Extracts JWT from Authorization header and verifies it
 * 
 * @param {Object} req - Next.js API request object
 * @returns {Promise<Object>} Decoded user data from JWT
 * @throws {Error} If token is missing or invalid
 * 
 * Usage in API route:
 * try {
 *   const user = await authMiddleware(req);
 *   // user contains decoded JWT payload
 * } catch (error) {
 *   return res.status(401).json({ status: 'fail', error: error.message });
 * }
 */
export async function authMiddleware(req) {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers?.authorization;
    
    if (!authHeader) {
      throw new Error('You are not logged in');
    }

    const token = authHeader.split(' ')?.[1];
    
    if (!token) {
      throw new Error('You are not logged in');
    }

    // Verify token
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(new Error('Invalid token'));
        } else {
          resolve(decoded);
        }
      });
    });

    return decoded;
  } catch (error) {
    throw error;
  }
}

/**
 * Wrapper middleware that checks authentication and role
 * 
 * @param {Object} req - Next.js API request object
 * @param {string|string[]} allowedRoles - Role(s) that are allowed (e.g., 'ADMIN' or ['ADMIN', 'RESALLER'])
 * @returns {Promise<Object>} Decoded user data from JWT
 * @throws {Error} If token is missing, invalid, or user doesn't have required role
 */
export async function requireAuth(req, allowedRoles = null) {
  const user = await authMiddleware(req);
  
  if (allowedRoles) {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    if (!roles.includes(user.role)) {
      throw new Error('You do not have permission to perform this action');
    }
  }
  
  return user;
}

/**
 * Admin-only middleware
 * 
 * @param {Object} req - Next.js API request object
 * @returns {Promise<Object>} Decoded user data from JWT
 * @throws {Error} If not admin
 */
export async function requireAdmin(req) {
  return requireAuth(req, 'ADMIN');
}
