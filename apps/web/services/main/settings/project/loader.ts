import { defer, LoaderFunction } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import EventModel from "services/models/event";

const ProjectLoader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const onGoingEvents = await EventModel.getEventsByUser({ userId: user?.id });

  return defer({ onGoingEvents, onFinishedEvents: [] });
};

export default ProjectLoader;
