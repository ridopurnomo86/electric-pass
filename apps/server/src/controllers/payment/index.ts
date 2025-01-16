import { Request, Response } from "express";
import stripe from "~/config/stripe";

export class PaymentController {
  public async generatePayment(req: Request, res: Response) {
    const products = await stripe.products.list({
      limit: 3,
    });

    // const paymentLink = await stripe.paymentLinks.create({
    //   line_items: [{ price: "price_1QhjaGDSKgkT3N38gyddtwON", quantity: 1 }],
    //   after_completion: {
    //     type: "redirect",
    //     redirect: {
    //       url: "https://example.com",
    //     },
    //   },
    // });

    return res.json({
      message: "success",
      type: "success",
      data: products,
    });
  }
}
