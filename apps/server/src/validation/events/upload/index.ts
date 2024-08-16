import Joi from "joi";

const EventsUploadSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  event_name: Joi.string().required(),
});

export default EventsUploadSchema;
