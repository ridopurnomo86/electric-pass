import { OrderModel } from "@monorepo/database";
import { Request, Response } from "express";

export class OrderController {
  public async getOrder(req: Request, res: Response) {
    const { id: userId } = req.user;

    const getOrder = await OrderModel.getOrders({ userId });

    return res.status(200).json({
      type: "success",
      message: "success",
      data: getOrder || [],
    });
  }
}
