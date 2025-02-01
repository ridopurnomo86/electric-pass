import { Request } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

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

export const verifyToken = ({ token }: { token: string }) => {
  let response;
  if (token !== "undefined") {
    jwt.verify(token, process.env.JWT_TOKENKEY as string, (err, payload) => {
      if (err) throw Error("Invalid token");
      return (response = payload);
    });
  }

  return response;
};

export const extractToken = (req: Request) => {
  const headerToken = req.headers[authConfig.USER_TOKEN_COOKIE_NAME];
  if (headerToken && headerToken !== "undefined" && headerToken !== "null") return headerToken;

  const cookieToken = req.cookies[authConfig.USER_TOKEN_COOKIE_NAME];
  if (cookieToken) return cookieToken;

  return null;
};
