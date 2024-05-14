import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

const SecurityLoader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (user) return user;

  return null;
};

export default SecurityLoader;
