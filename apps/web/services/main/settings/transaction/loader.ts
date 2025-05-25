import db from "@monorepo/database";
import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "services/auth.server";

const TransactionLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (user.role === "organizer") {
    const transactions = await db.TransactionModel.getTransaction({ organizerId: user.id });

    return json({ transactions });
  }

  const orders = await db.OrderModel.getOrders({ userId: user.id });

  return json({ orders });
};

export default TransactionLoader;
