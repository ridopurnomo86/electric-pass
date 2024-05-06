import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

const SecurityLoader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (user) return user;

  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export default SecurityLoader;
