import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import EventTypeModel from "services/models/event/event-type";
import Redis from "services/modules/redis";

const EVENT_TYPE_CACHE = "event-type";

const CreateProjectLoader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const cacheType = await Redis.getItem(EVENT_TYPE_CACHE);

  if (!cacheType) {
    const type = await EventTypeModel.getAllEventType();
    Redis.setItem(EVENT_TYPE_CACHE, JSON.stringify(type));

    return { type };
  }

  return { type: JSON.parse(cacheType!) };
};

export default CreateProjectLoader;
