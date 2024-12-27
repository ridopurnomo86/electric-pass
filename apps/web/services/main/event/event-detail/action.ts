import { ActionFunction, ActionFunctionArgs, redirect, redirectDocument } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import { commitSession, getSession } from "services/booking-session.server";

const EventDetailAction: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) return redirect("/login");

  const bookingSession = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();

  const event = formData.get("data") ? JSON.parse(formData.get("data") as string) : {};

  bookingSession.set("event", { event_id: event?.event_id, has_access: true });

  return redirectDocument(`/event/${params.slug}/book`, {
    headers: {
      "Set-Cookie": await commitSession(bookingSession),
    },
  });
};

export default EventDetailAction;
