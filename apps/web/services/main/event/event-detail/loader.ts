import { LoaderFunction } from "@remix-run/node";
import db from "@monorepo/database";
import Redis from "services/modules/redis";

const EVENT_DETAIL_CACHE = "event-detail";

const EventDetailLoader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const hostname = url.hostname;

  if (!params.slug)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });

  const cacheEventDetail = await Redis.getItem(`${EVENT_DETAIL_CACHE}:${params.slug}`);

  if (!cacheEventDetail) {
    const eventDetail = await db.EventModel.getEventDetail({ slug: String(params.slug) });

    if (!eventDetail)
      throw new Response(null, {
        status: 404,
        statusText: "Not Found",
      });

    Redis.setItem(`${EVENT_DETAIL_CACHE}:${params.slug}`, JSON.stringify(eventDetail));

    return { eventDetail, hostname };
  }

  return { eventDetail: JSON.parse(cacheEventDetail), hostname };
};

export default EventDetailLoader;
