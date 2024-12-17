import { ActionFunction, ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import { cookie as userEventBook } from "services/event-booking.server";

const EventDetailAction: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) return redirect("/login");

  const formData = await request.formData();

  const values = Object.fromEntries(formData);

  const event = values.data ? JSON.parse(values?.data as string) : {};

  return redirect(`/event/${params.slug}/book`, {
    headers: {
      "Set-Cookie": await userEventBook.serialize({
        event_id: event?.event_id,
      }),
    },
  });
};

export default EventDetailAction;
