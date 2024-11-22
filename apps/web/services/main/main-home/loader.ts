import { LoaderFunction } from "@remix-run/node";
import Redis from "services/modules/redis";
import { db } from "services/prisma.server";

const EVENT_CATEGORY_CACHE = "event-category";
const EVENTS_CACHE = "events";

const MainHomeLoader: LoaderFunction = async () => {
  const cacheCategory = await Redis.getItem(EVENT_CATEGORY_CACHE);
  const cacheEvents = await Redis.getItem(EVENTS_CACHE);

  if (!cacheCategory || !cacheEvents) {
    const category = await db.eventType.findMany();
    const events = await db.event.findMany({
      include: {
        EventCategory: {
          select: {
            name: true,
          },
        },
        EventType: {
          select: {
            name: true,
          },
        },
        Plan: true,
      },
    });

    Redis.setItem(EVENT_CATEGORY_CACHE, JSON.stringify(category));
    Redis.setItem(EVENTS_CACHE, JSON.stringify(events));

    return { category, events };
  }

  return { category: JSON.parse(cacheCategory!), events: JSON.parse(cacheEvents!) };
};

export default MainHomeLoader;
