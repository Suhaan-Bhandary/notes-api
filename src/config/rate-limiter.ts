import rateLimit from 'express-rate-limit';

export const nonAuthLimiter = rateLimit({
  windowMs: (process.env['WINDOW_SIZE_NON_AUTH_MIN'] || 1) * 60 * 1000, // 1 minutes
  limit: process.env['LIMIT_NON_AUTH'] || 10, // Limit each IP to 10 requests per `window` (here, per 1 minutes).
  message: 'Rate Limit Exceeded, Please try in 1min',
});

export const authLimiter = rateLimit({
  windowMs: (process.env['WINDOW_SIZE_AUTH_MIN'] || 1) * 60 * 1000, // 1 minutes
  limit: process.env['LIMIT_AUTH'] || 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
  message: 'Rate Limit Exceeded, Please try in 1min',
});
