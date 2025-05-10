import Joi from "joi";

const EventsUploadSchema = Joi.object().keys({
  user_id: Joi.number().required(),
  event_name: Joi.string().required(),
});

export default EventsUploadSchema;
