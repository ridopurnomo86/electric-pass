import { defer, LoaderFunction } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import { db } from "services/prisma.server";

const CreateProjectLoader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const category = await db.eventType.findMany();

  return defer({ category });
};

export default CreateProjectLoader;
