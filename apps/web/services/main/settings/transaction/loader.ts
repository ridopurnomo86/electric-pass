import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "services/auth.server";

const TransactionLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) =>
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

export default TransactionLoader;
