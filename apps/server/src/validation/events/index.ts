import Joi from "joi";

const CreateEventSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  event_name: Joi.string().required(),
  topic_type: Joi.string().required(),
  category_type: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  start_date: Joi.date().iso().required(),
  ended_date: Joi.date().iso().required(),
  duration: Joi.number().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  event_image: Joi.any(),
});

export default CreateEventSchema;
