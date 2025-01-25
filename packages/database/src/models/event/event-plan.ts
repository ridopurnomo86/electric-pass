import { db } from "../..";

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
  getEventOrder: async ({ plans }: { plans: { id: number; total_order: number }[] }) => {
    const eventPlans = await db.eventPlan.findMany({
      where: {
        id: {
          in: plans.map((order: { id: number; total_order: number }) => order.id),
        },
      },
      select: {
        amount: true,
        price: true,
        id: true,
      },
    });

    if (!plans) throw new Error("Plan not found");

    return eventPlans;
  },
};

export default EventPlanModel;
