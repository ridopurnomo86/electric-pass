import db from "@monorepo/database";
import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "services/auth.server";

const TransactionLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const orders = await db.OrderModel.getOrders({ userId: user.id });

  return json({ orders });
};

export default TransactionLoader;
