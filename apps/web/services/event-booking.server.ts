import { createCookie } from "@remix-run/node";

export const cookie = createCookie("event-booking", {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  expires: new Date(Date.now() + 60_000),
  maxAge: 3600,
  secrets: [process.env.BOOKING_SESSION_SECRET],
});
