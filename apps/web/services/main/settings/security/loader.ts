import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "services/auth.server";

const SecurityLoader: LoaderFunction = async ({ request }) =>
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

export default SecurityLoader;
