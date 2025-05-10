import { defer, LoaderFunction } from "@remix-run/node";
import db from "@monorepo/database";
import { cacheHeaders } from "~/utils/cache.server";

const MainEventLoader: LoaderFunction = async () => {
  const type = await db.EventTypeModel.getAllEventType();
  const events = await db.EventModel.getAllEvent();

  return defer(
    { type, events },
    {
      headers: cacheHeaders.dynamic(), // Cache for 5 minutes with 1-minute stale-while-revalidate
    }
  );
};

export default MainEventLoader;
