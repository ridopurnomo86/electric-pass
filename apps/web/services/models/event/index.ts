import convertSlug from "services/modules/convert-slug";
import { ValuesType } from "services/main/settings/project/create-project/types";
import { db } from "services/prisma.server";

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
            id: 1,
          },
        },
        EventType: {
          connect: {
            id: Number(data.event_type),
          },
        },
        Plan: {
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
        Plan: true,
      },
    });

    return events;
  },
  getEventDetail: async ({ slug }: { slug: string }) => {
    const eventDetail = await db.event.findFirst({
      where: {
        slug,
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

    return eventDetail;
  },
};

export default EventModel;
