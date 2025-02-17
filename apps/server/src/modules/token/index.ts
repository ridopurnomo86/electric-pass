/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import jwt from "jsonwebtoken";
import type { JsonWebTokenError, Jwt, JwtPayload, VerifyOptions } from "jsonwebtoken";
import authConfig from "../../config/auth";

type verifyParamsType = {
  token: string;
  secret: string;
  options?: VerifyOptions;
};

type ResponseVerifyInfoType = {
  isValid?: boolean;
  isExpired?: boolean;
  payload?: {
    id?: number;
    email?: string;
    name?: string;
    iat?: number;
    exp?: number;
  };
};

export const generateToken = ({
  id,
  data,
}: {
  id: number;
  data: { [key: string]: string | number };
}) =>
  jwt.sign({ id, ...data }, process.env.JWT_TOKENKEY as string, {
    expiresIn: "5h",
  });

export const verify = ({
  token,
  secret,
  options,
}: verifyParamsType): Promise<{
  err?: JsonWebTokenError;
  payload?: string | JwtPayload | Jwt | undefined;
}> =>
  new Promise((resolve) => {
    jwt.verify(token, secret, options, (err, payload) => {
      if (err) return resolve({ err });
      return resolve({ payload });
    });
  });

export const verifyWithInfo = async ({
  token,
  secret,
  options,
}: verifyParamsType): Promise<ResponseVerifyInfoType> => {
  const { err, payload } = await verify({
    token,
    secret,
    options,
  });

  if (!err) return { isValid: true, payload: payload as any };
  if (err.name === "TokenExpiredError") return { isValid: false, isExpired: true };
  return { isValid: false };
};

export const extractToken = (req: Request) => {
  const headerToken = req.headers[authConfig.USER_TOKEN_COOKIE_NAME];
  if (headerToken && headerToken !== "undefined" && headerToken !== "null") return headerToken;

  const cookieToken = req.cookies[authConfig.USER_TOKEN_COOKIE_NAME];
  if (cookieToken) return cookieToken;

  return null;
};
