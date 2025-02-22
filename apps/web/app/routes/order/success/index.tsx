import { json, LoaderFunction, LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { getSession } from "services/booking-session.server";
import OrderSuccessPage from "~/pages/order/Success";

export const meta: MetaFunction = () => [{ title: "Order" }];

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const SESSION_FLASH_KEY = "order-transaction";

  const session = await getSession(request.headers.get("Cookie"));

  const orderSessionMessage = session.get(SESSION_FLASH_KEY) || null;

  if (orderSessionMessage) return json({ message: orderSessionMessage });

  return redirect("/");
};

const OrderSuccess = () => <OrderSuccessPage />;

export default OrderSuccess;
