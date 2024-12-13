import { defer, LoaderFunction, redirect } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import EventModel from "services/models/event";

const PROJECT_TYPE = ["ongoing", "finished"];

const ProjectLoader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const events = await EventModel.getEventsByUser({ userId: user?.id });

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

  return defer({ type: url.searchParams.get("type"), events });
};

export default ProjectLoader;
