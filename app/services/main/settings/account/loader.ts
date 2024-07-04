import { LoaderFunction, defer } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import UserController from "~/services/controllers/user";

const AccountProfileLoader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const getUser = await UserController.getUser({
    id: user.id,
    select: {
      address: true,
      dialing_code: true,
      phone_number: true,
      country: true,
      city: true,
      name: true,
    },
  });

  return defer({ user: getUser });
};

export default AccountProfileLoader;
