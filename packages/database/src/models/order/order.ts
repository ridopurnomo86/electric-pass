import { db } from "../..";

type CreateOrderParamsType = {
  userId: number;
  orders: Array<{ total_order: number; id: number }>;
  paymentMethod: string;
  status?: "INCOMPLETE" | "SUCCEEDED";
  totalPrice?: number;
};

const OrderModel = {
  createOrder: async ({
    userId,
    orders,
    paymentMethod = "card",
    status: defaultStatus = "INCOMPLETE",
    totalPrice = 100,
  }: CreateOrderParamsType) => {
    try {
      const createOrder = await db.order.create({
        data: {
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
          Transaction: {
            create: {
              payment_method: paymentMethod,
              user_id: Number(userId),
              status: defaultStatus as "INCOMPLETE",
            },
          },
          user_id: Number(userId),
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
};

export default OrderModel;
