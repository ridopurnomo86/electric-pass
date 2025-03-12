import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "strict",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
    maxAge: 18000,
    domain: process.env.NODE_ENV === "production" ? process.env.SUB_DOMAIN_COOKIE : "localhost",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
