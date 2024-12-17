import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "services/auth.server";

const EventBookingLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return null;
};

export default EventBookingLoader;
