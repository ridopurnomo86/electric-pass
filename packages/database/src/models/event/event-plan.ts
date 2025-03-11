import { db } from "../..";

const EventPlanModel = {
  getAllEventPlan: async () => {
    const plans = await db.eventPlan.findMany();

    return plans;
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

    const checkingAmount = eventPlans.find((event) => event.amount === 0);

    if (checkingAmount)
      throw new Error(
        JSON.stringify({
          message: "insufficient amount",
          type: "error",
          status: "Error",
        })
      );

    return eventPlans;
  },
  updateEventPlanAmount: async ({
    orders,
  }: {
    orders: Array<{ id: number; total_order: number }>;
  }) => {
    const updateOrderAmount = orders.map((order: { id: number; total_order: number }) =>
      db.eventPlan.update({
        where: {
          id: order.id,
        },
        data: {
          amount: {
            decrement: Number(order.total_order),
          },
        },
      })
    );

    return await db.$transaction(updateOrderAmount);
  },
};

export default EventPlanModel;
