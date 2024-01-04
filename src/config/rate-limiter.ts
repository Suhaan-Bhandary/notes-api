import rateLimit from 'express-rate-limit';

export const nonAuthLimiter = rateLimit({
  windowMs: (process.env['WINDOW_SIZE_NON_AUTH_MIN'] || 10) * 60 * 1000, // 10 minutes
  limit: process.env['LIMIT_NON_AUTH'] || 50, // Limit each IP to 50 requests per `window` (here, per 10 minutes).
  message: 'Rate Limit Exceeded, Please try in 1min',
});

export const authLimiter = rateLimit({
  windowMs: (process.env['WINDOW_SIZE_AUTH_MIN'] || 10) * 60 * 1000, // 10 minutes
  limit: process.env['LIMIT_AUTH'] || 300, // Limit each IP to 300 requests per `window` (here, per 10 minutes).
  message: 'Rate Limit Exceeded, Please try in 1min',
});
