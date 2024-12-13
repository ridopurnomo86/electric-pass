import { defer, LoaderFunction } from "@remix-run/node";
import EventModel from "services/models/event";

const EventDetailLoader: LoaderFunction = async ({ params }) => {
  const eventDetail = await EventModel.getEventDetail({ slug: String(params.slug) });

  if (!eventDetail)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });

  return defer({ eventDetail });
};

export default EventDetailLoader;
