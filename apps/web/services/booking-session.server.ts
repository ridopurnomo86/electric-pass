import { createCookieSessionStorage } from "@remix-run/node";

export const bookingSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_booking_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.BOOKING_SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
    maxAge: 1800,
  },
});

export const { getSession, commitSession, destroySession } = bookingSessionStorage;
