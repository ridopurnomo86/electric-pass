import { NextFunction, Request, Response } from "express";
import { extractToken, verifyWithInfo } from "../../modules/token";

const AuthMiddleware = {
  requireAuth: async (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);

    const data = await verifyWithInfo({ token, secret: process.env.JWT_TOKENKEY as string });

    if (!data.isValid)
      return res.status(401).json({
        type: "error",
        code: "Unauthorized",
        message: "Unauthorized",
      });

    return next();
  },
};

export default AuthMiddleware;
