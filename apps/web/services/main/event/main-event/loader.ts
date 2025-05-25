import { defer, LoaderFunction } from "@remix-run/node";
import db from "@monorepo/database";
import { cacheHeaders } from "~/utils/cache.server";

const MainEventLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const sortBy = url.searchParams.get("sortBy");

  const [type, events] = await Promise.all([
    db.EventTypeModel.getAllEventType(),
    db.EventModel.getAllEvent({
      sortBy: sortBy as "asc",
    }),
  ]);

  return defer(
    { type, events },
    {
      headers: cacheHeaders.dynamic(), // Cache for 5 minutes with 1-minute stale-while-revalidate
    }
  );
};

export default MainEventLoader;
