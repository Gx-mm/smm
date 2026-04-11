import jwt from 'jsonwebtoken';
import { fail } from '../utils/response.js';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return fail(res, 401, 'Unauthorized');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    return fail(res, 401, 'Invalid or expired token');
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return fail(res, 403, 'Access denied');
  }
  return next();
};
