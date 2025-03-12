import { CSRF } from "remix-utils/csrf/server";
import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const cookie = createCookie("csrf", {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  secrets: [process.env.SESSION_SECRET],
  domain: process.env.NODE_ENV === "production" ? process.env.SUB_DOMAIN_COOKIE : "localhost",
});

export const csrf = new CSRF({
  cookie,
  // what key in FormData objects will be used for the token, defaults to `csrf`
  formDataKey: "csrf",
  // an optional secret used to sign the token, recommended for extra safety
  secret: process.env.SESSION_SECRET,
});
