import { RateLimiterMemory } from 'rate-limiter-flexible';

// 5 tentatives par IP, lockout 15 minutes
export const loginLimiter = new RateLimiterMemory({
  points: 5,
  duration: 15 * 60,
  blockDuration: 15 * 60,
});
