import { LoaderFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import OrderSuccessPage from "~/pages/order/Success";

export const meta: MetaFunction = () => [{ title: "Order" }];

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) =>
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

const OrderSuccess = () => <OrderSuccessPage />;

export default OrderSuccess;
