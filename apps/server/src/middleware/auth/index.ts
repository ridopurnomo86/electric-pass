import { NextFunction, Request, Response } from "express";
import { verifyWithInfo } from "../../modules/token";

const AuthMiddleware = {
  requireAuth: async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ");

    if (token === null) return res.sendStatus(401);

    const data = await verifyWithInfo({
      token: String(token),
      secret: process.env.JWT_TOKENKEY as string,
    });

    if (!data.isValid)
      return res.status(401).json({
        type: "error",
        code: "Unauthorized",
        message: "Unauthorized",
      });

    req.user = {
      isValid: data.isValid,
      id: Number(data.payload?.id),
      name: String(data.payload?.name),
      email: String(data.payload?.email),
    };

    return next();
  },
};

export default AuthMiddleware;
