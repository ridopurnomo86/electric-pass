import { UserModel } from "@monorepo/database";
import { Request, Response } from "express";
import loginSchema from "../../validation/auth";
import { extractToken, generateToken } from "../../modules/token";
import authConfig from "../../config/auth";

export class AuthController {
  public async loginWithEmail(req: Request, res: Response) {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({
      email,
      password,
    });

    if (error)
      return res.status(422).json({
        type: "error",
        message: error?.details,
      });

    try {
      const userData = await UserModel.authorizeUser({ email, password });

      const token = generateToken({
        id: userData.id,
        data: {
          id: userData.id,
          email: userData.email,
          name: userData.name,
        },
      });

      return res
        .status(200)
        .cookie(authConfig.USER_TOKEN_COOKIE_NAME, token, authConfig.cookieConfig)
        .json({
          type: "success",
          message: "success",
          data: {
            name: userData.name,
            email: userData.email,
            id: userData.id,
            role: userData.role,
          },
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { message, type, status } = JSON.parse(err.message);
      return res.status(401).json({
        type,
        message,
        status,
      });
    }
  }
  public async requestLogout(req: Request, res: Response) {
    const token = extractToken(req);
    if (!token) return res.status(401).json({ message: "Invalid token", type: "error" });

    res.clearCookie(authConfig.USER_TOKEN_COOKIE_NAME);
    return res.status(200).cookie(authConfig.USER_TOKEN_COOKIE_NAME, "", { maxAge: 0 }).json({
      message: "Success Logout",
      type: "success",
    });
  }
}
