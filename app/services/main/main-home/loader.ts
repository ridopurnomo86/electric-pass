import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { db } from "~/services/prisma.server";

const MainHomeLoader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request);

  const category = await db.eventType.findMany();

  return { category };
};

export default MainHomeLoader;
