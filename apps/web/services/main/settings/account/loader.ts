import { LoaderFunction, defer } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import db from "@monorepo/database";

const SettingsAccountLoader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const [getUser, getUserImage] = await Promise.all([
    db.UserModel.getUser({
      id: user.id,
      select: {
        address: true,
        dialing_code: true,
        phone_number: true,
        country: true,
        city: true,
        name: true,
      },
    }),
    db.UserModel.getUserImage({
      id: user.id,
    }),
  ]);

  return defer({
    user: {
      ...getUser,
      ...(getUserImage && {
        image: {
          ...getUserImage,
        },
      }),
    },
  });
};

export default SettingsAccountLoader;
