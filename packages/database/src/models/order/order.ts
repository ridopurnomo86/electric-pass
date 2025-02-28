import { Decimal } from "@prisma/client/runtime/library";
import { db } from "../..";

type CreateOrderParamsType = {
  userId: number;
  orders: Array<{ total_order: number; id: number }>;
  paymentMethod: string;
  status: "INCOMPLETE" | "SUCCEEDED";
  totalPrice: number;
  stripeId: string;
  eventId: number;
};

type GetOrdersParamsType = {
  userId: number;
};

type PlansDataType = {
  EventPlan: {
    name: string;
    id: number;
    created_at: Date | null;
    updated_at: Date | null;
    description: string;
    ended_date: Date;
    event_id: number;
    amount: number;
    price: Decimal;
  };
  quantity: number;
};

const OrderModel = {
  createOrder: async ({
    userId,
    orders,
    paymentMethod = "Card",
    status: defaultStatus = "INCOMPLETE",
    totalPrice,
    stripeId,
    eventId,
  }: CreateOrderParamsType) => {
    try {
      const createOrder = await db.order.create({
        data: {
          user_id: Number(userId),
          total_price: totalPrice,
          OrderEventPlan: {
            create: orders.map((order: { total_order: number; id: number }) => ({
              user_id: Number(userId),
              quantity: order.total_order,
              EventPlan: {
                connect: {
                  id: order.id,
                },
              },
            })),
          },
          event_id: eventId,
          Transaction: {
            create: {
              payment_method: paymentMethod,
              user_id: Number(userId),
              status: defaultStatus as "INCOMPLETE",
              stripe_id: stripeId,
            },
          },
        },
      });

      if (!createOrder)
        return {
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        };

      return {
        status: "success",
        type: "success",
      };
    } catch (err) {
      if (err)
        return {
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        };
      throw err;
    }
  },
  getOrders: async ({ userId }: GetOrdersParamsType) => {
    const orders = await db.order.findMany({
      where: {
        user_id: userId,
      },
      include: {
        OrderEventPlan: {
          select: {
            EventPlan: true,
            quantity: true,
          },
        },
        Transaction: true,
        Event: {
          select: {
            name: true,
            start_date: true,
            city: true,
            country: true,
          },
        },
      },
    });

    const plansOrder = (plans: PlansDataType[]) =>
      plans.map(({ EventPlan, quantity }) => ({
        id: EventPlan.id,
        event_id: EventPlan.event_id,
        name: EventPlan.name,
        description: EventPlan.description,
        amount: quantity,
        ended_date: EventPlan.ended_date,
        price: Number(EventPlan.price),
      }));

    const transactionOrder = (transaction: any) => ({
      id: transaction.id,
      order_id: transaction.order_id,
      payment_method: transaction.payment_method,
      status: transaction.status,
      stripe_id: transaction.stripe_id,
      order_date: transaction.created_at,
    });

    const data = orders.map((order) => ({
      id: order.id,
      totalPrice: order.total_price,
      created_at: order.created_at,
      updated_at: order.updated_at,
      plans: plansOrder(order.OrderEventPlan),
      transaction: transactionOrder(order.Transaction[0]),
      event: order.Event,
    }));

    return data;
  },
};

export default OrderModel;
