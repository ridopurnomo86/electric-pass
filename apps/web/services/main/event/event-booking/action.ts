import { ActionFunction, ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import {
  destroySession,
  getSession as getBookingSession,
  commitSession,
} from "services/booking-session.server";

const EventBookingAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  await authenticator.isAuthenticated(request);

  const bookingSession = await getBookingSession(request.headers.get("Cookie"));

  const formData = await request.formData();

  const dialog = formData.get("dialog");

  const transactionType = formData.get("transaction_type");

  const message = String(formData.get("message"));

  const data = {
    transactionId: JSON.parse(message).transaction_id,
    transactionDate: JSON.parse(message).transaction_date,
    paymentMethod: JSON.parse(message).payment_method,
    totalPrice: JSON.parse(message).total_price,
    orders: JSON.parse(message).orders,
    event: JSON.parse(message).event,
    fees: 0,
    type: "success",
  };

  if (transactionType === "SUCCEEDED") {
    bookingSession.flash("order-transaction", data);

    json(data);

    return redirect("/order/success", {
      headers: {
        "Set-Cookie": await commitSession(bookingSession),
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
