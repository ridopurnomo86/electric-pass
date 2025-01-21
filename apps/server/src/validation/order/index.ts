import Joi from "joi";

const orderSchema = Joi.object().keys({
  id: Joi.number().required(),
  total_order: Joi.number().required(),
});

const createOrderSchema = Joi.object().keys({
  orders: Joi.array().items(orderSchema),
  payment_method: Joi.string().required(),
  user_id: Joi.number().required(),
});

export default createOrderSchema;
