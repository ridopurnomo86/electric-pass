import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../config/prisma";
import createOrderSchema from "../../validation/order";

export class OrderController {
  public async createOrder(req: Request, res: Response) {
    const { orders, user_id: userId, payment_method: paymentMethod } = req.body;

    const { error } = createOrderSchema.validate({
      orders,
      user_id: userId,
      payment_method: paymentMethod,
    });

    if (error)
      return res.status(422).json({
        type: "error",
        message: error?.details,
      });

    let totalPrice = 0;

    const plans = await db.eventPlan.findMany({
      where: {
        id: {
          in: orders.map((order: { id: number; total_order: number }) => order.id),
        },
      },
      select: {
        amount: true,
        price: true,
        id: true,
      },
    });

    if (!plans)
      return res.json({
        status: "error",
        type: "error",
      });

    plans.map((plan, idx) => {
      totalPrice = totalPrice + Number(plan.price) * orders[idx].total_order;
    });

    await db.order.create({
      data: {
        order_transaction_id: uuidv4(),
        total_price: totalPrice,
        User: {
          connect: {
            id: userId,
          },
        },
        OrderEventPlan: {
          create: orders.map((order: { id: number; total_order: number }) => ({
            EventPlan: {
              connect: {
                id: order.id,
              },
            },
            quantity: order.total_order,
            user_id: userId,
          })),
        },
        Transaction: {
          create: {
            payment_method: paymentMethod,
            user_id: userId,
          },
        },
      },
    });

    return res.json({
      status: "success",
      type: "success",
      data: {
        total_price: totalPrice,
      },
    });
  }
}
