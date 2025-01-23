import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import Redis from "services/modules/redis";
import { jsonHash } from "remix-utils/json-hash";
import EventModel from "services/models/event";
import EventTypeModel from "services/models/event/event-type";

const EVENT_TYPE_CACHE = "event-type";
const EVENTS_CACHE = "events";

const MainHomeLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const hostname = url.hostname;

  const cacheCategory = await Redis.getItem(EVENT_TYPE_CACHE);
  const cacheEvents = await Redis.getItem(EVENTS_CACHE);

  if (!cacheCategory || !cacheEvents) {
    const type = await EventTypeModel.getAllEventType();
    const events = await EventModel.getAllEvent();

    Redis.setItem(EVENT_TYPE_CACHE, JSON.stringify(type));
    Redis.setItem(EVENTS_CACHE, JSON.stringify(events));

    return jsonHash({
      type,
      events,
    });
  }

  return jsonHash({ type: JSON.parse(cacheCategory!), events: JSON.parse(cacheEvents!), hostname });
};

export default MainHomeLoader;
