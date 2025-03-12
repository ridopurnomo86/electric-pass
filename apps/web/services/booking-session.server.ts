import { createCookieSessionStorage } from "@remix-run/node";

export const bookingSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_booking_session",
    sameSite: "strict",
    path: "/",
    httpOnly: true,
    secrets: [process.env.BOOKING_SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
    maxAge: 1800,
    domain: process.env.NODE_ENV === "production" ? process.env.SUB_DOMAIN_COOKIE : "localhost",
  },
});

export const { getSession, commitSession, destroySession } = bookingSessionStorage;
