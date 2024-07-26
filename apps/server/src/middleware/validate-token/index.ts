import { NextFunction, Request, Response } from "express";
import CryptoJS from "crypto-js";
import createHttpError from "http-errors";

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const decryptToken = CryptoJS.AES.decrypt(
      token as string,
      process.env.SECRET_KEY_API as string
    ).toString(CryptoJS.enc.Utf8);

    if (!token || decryptToken !== process.env.API_KEY)
      return res.status(401).json({
        type: "error",
        message: "Unauthorized",
      });
    return next();
  } catch (err) {
    next(createHttpError(401));
  }
};
