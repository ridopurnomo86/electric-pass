import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import UserModel from "services/models/user";
import Redis from "services/modules/redis";

const USER_CATEGORY_CACHE = (userId: number) => `user-info-${userId}`;

const SettingsBasicInfoLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const cacheUser = await Redis.getItem(USER_CATEGORY_CACHE(user.id));

  if (!cacheUser) {
    const getUser = await UserModel.getUser({
      id: user.id,
      select: {
        name: true,
        email: true,
        bio: true,
      },
    });
    Redis.setItem(USER_CATEGORY_CACHE(user.id), JSON.stringify(getUser));

    return { user: getUser };
  }

  return { user: JSON.parse(cacheUser!) };
};

export default SettingsBasicInfoLoader;
