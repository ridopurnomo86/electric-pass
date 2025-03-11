import { LoaderFunction, LoaderFunctionArgs, defer } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import db from "@monorepo/database";

const SettingsBasicInfoLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const getUser = await db.UserModel.getUser({
    id: user.id,
    select: {
      name: true,
      email: true,
      bio: true,
    },
  });

  if (getUser) return defer({ user: getUser });

  return null;
};

export default SettingsBasicInfoLoader;
