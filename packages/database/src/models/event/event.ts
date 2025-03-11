import convertSlug from "../../modules/convert-slug";
import { db } from "../..";

type ValuesType = {
  event_name: string;
  topic_type: string;
  event_type: number;
  start_date: Date;
  ended_date: Date;
  duration: string;
  country: string;
  city: string;
  time: string;
  description: string;
  image: File;
  plans: {
    pricing_name: string;
    description: string;
    price: string;
  }[];
};

const EventModel = {
  addEvent: async ({
    data,
    userId,
    imageUrl,
    plans,
  }: {
    data: ValuesType;
    userId: number;
    imageUrl: string;
    plans: ValuesType["plans"];
  }) => {
    const createEvent = await db.event.create({
      data: {
        name: data.event_name,
        city: data.city,
        country: data.country,
        description: data.description,
        slug: convertSlug(data.event_name),
        start_date: data.start_date,
        ended_date: data.ended_date,
        image_url: imageUrl,
        User: {
          connect: {
            id: userId,
          },
        },
        EventCategory: {
          connect: {
            // TODO: Create by choosing event-category profile/event/create
            id: 1,
          },
        },
        EventType: {
          connect: {
            id: Number(data.event_type),
          },
        },
        EventPlan: {
          createMany: {
            data: plans.map((plan) => ({
              name: plan.pricing_name,
              description: plan.description,
              price: Number(plan.price),
              amount: 100,
              ended_date: data.ended_date,
            })),
          },
        },
      },
    });

    return createEvent;
  },
  getEventsByUser: async ({ userId }: { userId: number }) => {
    const events = await db.event.findMany({
      where: {
        user_id: userId,
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
        EventPlan: true,
      },
    });

    return events;
  },
  getEventDetail: async ({ slug, eventId }: { slug?: string; eventId?: number }) => {
    const eventDetail = await db.event.findFirst({
      where: {
        ...(eventId && { id: eventId }),
        ...(slug && { slug }),
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
        EventPlan: true,
        User: {
          select: {
            name: true,
            image_profile: true,
          },
        },
      },
    });

    return eventDetail;
  },
  getAllEvent: async () => {
    const events = await db.event.findMany({
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
        EventPlan: true,
      },
    });

    return events;
  },
};

export default EventModel;
