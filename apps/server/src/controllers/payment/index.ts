import { Request, Response } from "express";
import { EventPlanModel, OrderModel } from "@monorepo/database";
import {
  generatePaymentIntentSchema,
  paymentAmountSchema,
  paymentOrderSchema,
} from "../../validation/payment";
import stripe from "../../config/stripe";

export class PaymentController {
  public async paymentAmount(req: Request, res: Response) {
    const { orders } = req.body;

    const { error } = paymentAmountSchema.validate({
      orders,
    });

    if (error)
      return res.status(422).json({
        type: "error",
        message: error?.details,
      });

    let totalPrice = 0;

    try {
      const checkingPlans = await EventPlanModel.getEventOrder({ plans: orders });

      checkingPlans.map((plan, idx) => {
        totalPrice = totalPrice + Number(plan.price) * orders[idx].total_order;
      });

      return res.json({
        status: "success",
        type: "success",
        data: {
          total_price: totalPrice,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { message, type, status } = JSON.parse(err.message);
      return res.status(500).json({
        type,
        message,
        status,
      });
    }
  }

  public async paymentOrder(req: Request, res: Response) {
    const { id: userId } = req.user;
    const {
      payment_method: paymentMethod,
      orders,
      total_price: totalPrice,
      status,
      stripe_id: stripeId,
    } = req.body;

    const { error } = paymentOrderSchema.validate({
      orders,
      payment_method: paymentMethod,
      user_id: userId,
      total_price: totalPrice,
      status,
      stripe_id: stripeId,
    });

    if (error)
      return res.status(422).json({
        type: "error",
        message: error?.details,
      });

    try {
      await EventPlanModel.getEventOrder({ plans: orders });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { message, type, status } = JSON.parse(err.message);
      return res.status(500).json({
        type,
        message,
        status,
      });
    }

    await OrderModel.createOrder({
      orders,
      paymentMethod,
      userId,
      status,
      totalPrice,
      stripeId,
    });

    await EventPlanModel.updateEventPlanAmount({ orders });

    return res.status(200).json({
      type: "success",
      message: "success",
    });
  }

  public async generatePaymentIntent(req: Request, res: Response) {
    const { amount, costumer } = req.body;

    const { error } = generatePaymentIntentSchema.validate({
      amount: amount,
      costumer: {
        first_name: costumer?.first_name,
        last_name: costumer?.last_name,
        email: costumer?.email,
        dialing_code: costumer?.dialing_code,
        phone_number: costumer?.phone_number,
      },
    });

    if (error)
      return res.status(422).json({
        type: "error",
        message: error?.details,
      });

    const customer = await stripe.customers.create({
      name: `${costumer.first_name} ${costumer.last_name}`,
      email: costumer.email,
      phone: `${costumer.dialing_code}${costumer.phone_number}`,
    });

    const paymentIntents = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      customer: customer.id,
    });

    if (!paymentIntents || !customer)
      return res.json({ status: "error", type: "error", message: "Something gone wrong" });

    return res.json({
      status: "success",
      type: "success",
      data: paymentIntents,
    });
  }
}
