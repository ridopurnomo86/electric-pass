import { defer, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import db from "@monorepo/database";
import { cacheHeaders } from "~/utils/cache.server";

const MainHomeLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const hostname = url.hostname;

  const type = await db.EventTypeModel.getAllEventType();
  const events = await db.EventModel.getAllEvent({});

  return defer(
    { type, events, hostname },
    {
      headers: cacheHeaders.dynamic(),
    }
  );
};

export default MainHomeLoader;
