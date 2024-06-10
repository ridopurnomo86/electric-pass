import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import UserController from "~/services/controllers/user";

const ProfileLoader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const infoUser = await UserController.getUser({
    id: user.id,
    type: user.role,
    response: { isAuthenticated: user.isAuthenticated, role: user.role },
    select: {
      name: true,
      email: true,
      bio: true,
    },
  });

  if (infoUser) return infoUser;

  return null;
};

export default ProfileLoader;
