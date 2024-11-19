import { LoaderFunction } from "@remix-run/node";
import Redis from "services/modules/redis";
import { db } from "services/prisma.server";

const EVENT_CATEGORY_CACHE = "event-category";

const MainHomeLoader: LoaderFunction = async () => {
  const cacheCategory = await Redis.getItem(EVENT_CATEGORY_CACHE);

  if (!cacheCategory) {
    const category = await db.eventType.findMany();
    Redis.setItem(EVENT_CATEGORY_CACHE, JSON.stringify(category));

    return { category };
  }

  return { category: JSON.parse(cacheCategory!) };
};

export default MainHomeLoader;
