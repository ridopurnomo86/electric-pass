import { LoaderFunction, defer } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { db } from "~/services/prisma.server";
import { userAccess } from "~/services/utils/cookies";

const MainHomeLoader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  const category = await db.eventType.findMany();

  return defer(
    { category },
    {
      ...(user && {
        headers: {
          "Set-Cookie": await userAccess.serialize({}),
        },
      }),
    }
  );
};

export default MainHomeLoader;
