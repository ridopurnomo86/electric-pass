import { defer, isSession, LoaderFunction, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import { getSession } from "services/booking-session.server";
import db from "@monorepo/database";

const EventBookingLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const bookingSession = await getSession(request.headers.get("Cookie"));

  const event: { has_access: boolean; event_id: string } = bookingSession.get("event");

  if (!isSession(bookingSession) || !event?.has_access) return redirect("/");

  const getEvent = await db.EventModel.getEventDetail({ eventId: Number(event.event_id) });

  return defer({
    event: getEvent,
  });
};

export default EventBookingLoader;
