import { ActionFunction, ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import { destroySession, getSession } from "services/booking-session.server";

const EventBookingAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  await authenticator.isAuthenticated(request);

  const bookingSession = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();

  const dialog = formData.get("dialog");

  const transactionType = formData.get("transaction_type");

  if (transactionType === "SUCCEEDED") {
    return redirect("/order/success", {
      headers: {
        "Set-Cookie": await destroySession(bookingSession),
      },
    });
  }

  if (transactionType === "INCOMPLETE") {
    return redirect("/order/incomplete", {
      headers: {
        "Set-Cookie": await destroySession(bookingSession),
      },
    });
  }

  if (dialog === "reset")
    return redirect("/", {
      headers: {
        "Set-Cookie": await destroySession(bookingSession),
      },
    });

  return null;
};

export default EventBookingAction;
