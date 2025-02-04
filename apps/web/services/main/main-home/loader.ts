import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { jsonHash } from "remix-utils/json-hash";
import db from "@monorepo/database";

const MainHomeLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const hostname = url.hostname;

  const type = await db.EventTypeModel.getAllEventType();
  const events = await db.EventModel.getAllEvent();

  return jsonHash(
    { type, events, hostname },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600",
      },
    }
  );
};

export default MainHomeLoader;
