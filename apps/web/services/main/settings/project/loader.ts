import { defer, LoaderFunction } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import db from "@monorepo/database";

const ProjectLoader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const onGoingEvents = await db.EventModel.getEventsByUser({ userId: user?.id });

  return defer({ onGoingEvents, onFinishedEvents: [] });
};

export default ProjectLoader;
