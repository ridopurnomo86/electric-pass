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

    const checkingPlans = await EventPlanModel.getEventOrder({ plans: orders });

    if (!checkingPlans)
      return res.json({
        status: "error",
        type: "error",
        message: "plan does not exist",
      });

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
  }

  public async paymentOrder(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { payment_method: paymentMethod, orders } = req.body;

    const { error } = paymentOrderSchema.validate({
      orders,
      payment_method: paymentMethod,
      user_id: userId,
    });

    await OrderModel.createOrder({
      orders,
      paymentMethod,
      userId,
    });

    if (error)
      return res.status(422).json({
        type: "error",
        message: error?.details,
      });

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
