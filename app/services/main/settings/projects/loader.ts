import { LoaderFunction, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

const ProjectLoader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const url = new URL(request.url);

  if (!url.searchParams.has("type")) {
    url.searchParams.set("type", "ongoing");
    throw redirect(url.toString());
  }

  if (user) return user;

  return null;
};

export default ProjectLoader;
