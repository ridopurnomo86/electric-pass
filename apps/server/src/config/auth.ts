import { CookieOptions } from "express";

const authConfig: { cookieConfig: CookieOptions; USER_TOKEN_COOKIE_NAME: string } = {
  USER_TOKEN_COOKIE_NAME: "ep-tkn",
  cookieConfig: {
    maxAge: 18000000,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.NODE_ENV === "production" ? process.env.SUB_DOMAIN_COOKIE : "",
    sameSite: "strict",
  },
};

export default authConfig;
