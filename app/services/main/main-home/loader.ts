import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

const MainHomeLoader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (user) return user;

  return null;
};

export default MainHomeLoader;
