import { fail } from '../utils/response.js';

export const notFound = (req, res) => fail(res, 404, `Route not found: ${req.originalUrl}`);

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  return fail(res, err.status || 500, err.message || 'Internal server error');
};
