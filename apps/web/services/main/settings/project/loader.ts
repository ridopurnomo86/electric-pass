import { LoaderFunction, redirect } from "@remix-run/node";
import { authenticator } from "services/auth.server";

const PROJECT_TYPE = ["ongoing", "finished"];

const ProjectLoader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const url = new URL(request.url);
  const type = url.searchParams.get("type");

  if (!url.searchParams.has("type")) {
    url.searchParams.set("type", "ongoing");
    throw redirect(url.toString());
  }

  if (!PROJECT_TYPE.includes(`${type}`))
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });

  return { type: url.searchParams.get("type") };
};

export default ProjectLoader;
