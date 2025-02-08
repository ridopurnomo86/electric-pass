import { defer, LoaderFunction } from "@remix-run/node";
import db from "@monorepo/database";

const EventDetailLoader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const hostname = url.hostname;

  if (!params.slug)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });

  const eventDetail = await db.EventModel.getEventDetail({ slug: String(params.slug) });

  if (!eventDetail)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });

  return defer(
    { eventDetail, hostname },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600",
      },
    }
  );
};

export default EventDetailLoader;
