import { defer, LoaderFunction } from "@remix-run/node";
import { db } from "services/prisma.server";

const EventDetailLoader: LoaderFunction = async ({ params }) => {
  const eventDetail = await db.event.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      EventCategory: {
        select: {
          name: true,
        },
      },
      EventType: {
        select: {
          name: true,
        },
      },
      Plan: true,
      User: {
        select: {
          name: true,
          image_profile: true,
        },
      },
    },
  });

  if (!eventDetail)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });

  return defer({ eventDetail });
};

export default EventDetailLoader;
