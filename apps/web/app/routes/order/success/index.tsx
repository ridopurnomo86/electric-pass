import { MetaFunction } from "@remix-run/node";
import OrderSuccessPage from "~/pages/order/Success";

export const meta: MetaFunction = () => [{ title: "Order" }];

const OrderSuccess = () => <OrderSuccessPage />;

export default OrderSuccess;
