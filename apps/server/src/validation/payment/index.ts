import Joi from "joi";

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

export default generatePaymentIntentSchema;
