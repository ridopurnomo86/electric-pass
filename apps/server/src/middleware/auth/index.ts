/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from "express";
import { extractToken, verifyWithInfo } from "../../modules/token";

const AuthMiddleware = {
  requireAuth: async (req: any, res: Response, next: NextFunction) => {
    const token = extractToken(req);

    const data = await verifyWithInfo({ token, secret: process.env.JWT_TOKENKEY as string });

    if (!data.isValid)
      return res.status(401).json({
        type: "error",
        code: "Unauthorized",
        message: "Unauthorized",
      });

    req.user = {
      isValid: data.isValid,
      id: data.payload?.id,
      name: data.payload?.name,
      email: data.payload?.email,
    };

    return next();
  },
};

export default AuthMiddleware;
