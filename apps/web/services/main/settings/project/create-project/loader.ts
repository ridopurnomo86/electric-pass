import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import db from "@monorepo/database";
import Redis from "services/modules/redis";

const EVENT_TYPE_CACHE = "event-type";
const CATEGORY_TYPE_CACHE = "category-type";

const CreateProjectLoader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const cacheType = await Redis.getItem(EVENT_TYPE_CACHE);
  const cacheCategory = await Redis.getItem(CATEGORY_TYPE_CACHE);

  if (!cacheType || !cacheCategory) {
    const [category, type] = await Promise.all([
      db.EventCategoryModel.getAllEventCategory(),
      db.EventTypeModel.getAllEventType(),
    ]);

    Redis.setItem(CATEGORY_TYPE_CACHE, JSON.stringify(category));
    Redis.setItem(EVENT_TYPE_CACHE, JSON.stringify(type));

    return { type, category };
  }

  return { type: JSON.parse(cacheType!), category: JSON.parse(cacheCategory!) };
};

export default CreateProjectLoader;
