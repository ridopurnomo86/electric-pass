import { Request, Response } from "express";
import generatePaymentIntentSchema from "../../validation/payment";
import stripe from "../../config/stripe";

export class PaymentController {
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
