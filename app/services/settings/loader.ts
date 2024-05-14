import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "../auth.server";

const ProfileLoader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (user) return user;

  return null;
};

export default ProfileLoader;
