import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

const ForgotPasswordLoader: LoaderFunction = async ({ request }) =>
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

export default ForgotPasswordLoader;
