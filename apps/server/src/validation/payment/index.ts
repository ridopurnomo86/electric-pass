import Joi from "joi";

const orderSchema = Joi.object().keys({
  id: Joi.number().required(),
  total_order: Joi.number().required(),
});

const generatePaymentIntentSchema = Joi.object().keys({
  amount: Joi.number().required(),
  costumer: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email(),
    dialing_code: Joi.string().required(),
    phone_number: Joi.string().required(),
  }),
});

const paymentAmountSchema = Joi.object().keys({
  orders: Joi.array().items(orderSchema).required(),
});

const paymentOrderSchema = Joi.object().keys({
  orders: Joi.array().items(orderSchema).required(),
  payment_method: Joi.string().required(),
  user_id: Joi.number().required(),
  total_price: Joi.number().required(),
  status: Joi.string().required(),
  stripe_id: Joi.string().required(),
});

export { generatePaymentIntentSchema, paymentAmountSchema, paymentOrderSchema };
