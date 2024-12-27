import { db } from "services/prisma.server";

const EventPlanModel = {
  getAllEventPlan: async () => {
    const plans = await db.eventPlan.findMany();

    return plans;
  },
  getEventPlan: async ({ eventId }: { eventId: number }) => {
    const plan = await db.eventPlan.findMany({
      where: {
        event_id: eventId,
      },
    });

    return plan;
  },
};

export default EventPlanModel;
