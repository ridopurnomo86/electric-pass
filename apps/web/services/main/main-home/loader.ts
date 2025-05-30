import { defer, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import db from "@monorepo/database";
import { cacheHeaders } from "~/utils/cache.server";

const MainHomeLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const hostname = url.hostname;

  const type = db.EventTypeModel.getAllEventType();
  const events = db.EventModel.getAllEvent({});
  const organizers = await db.UserModel.getOrganizers();

  return defer(
    { type, events, hostname, organizers },
    {
      headers: cacheHeaders.dynamic(),
    }
  );
};

export default MainHomeLoader;
