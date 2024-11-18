import { defer, LoaderFunction } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import { db } from "services/prisma.server";

const CreateProjectLoader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const eventType = await db.eventType.findMany();

  return defer({ eventType });
};

export default CreateProjectLoader;
