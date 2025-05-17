import db from "@monorepo/database";
import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import { cacheHeaders } from "~/utils/cache.server";

const TransactionLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (user.role === "organizer") {
    const transactions = await db.TransactionModel.getTransaction({ organizerId: user.id });

    return json(
      { transactions },
      {
        headers: cacheHeaders.dynamic(), // Cache for 5 minutes with 1-minute stale-while-revalidate
      }
    );
  }

  const orders = await db.OrderModel.getOrders({ userId: user.id });

  return json(
    { orders },
    {
      headers: cacheHeaders.dynamic(), // Cache for 5 minutes with 1-minute stale-while-revalidate
    }
  );
};

export default TransactionLoader;
