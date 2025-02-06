import { rateLimit } from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

export default apiLimiter;
