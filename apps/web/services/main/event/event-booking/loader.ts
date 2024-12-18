import { isSession, LoaderFunction, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import { getSession } from "services/booking-session.server";

const EventBookingLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const bookingSession = await getSession(request.headers.get("Cookie"));

  const event = bookingSession.get("event");

  if (!isSession(bookingSession) || !event?.has_access) return redirect("/");

  return null;
};

export default EventBookingLoader;
