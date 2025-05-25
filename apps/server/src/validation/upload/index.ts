import Joi from "joi";

const settingsAccountUploadSchema = Joi.object().keys({
  user_id: Joi.number().required(),
  name: Joi.string().required(),
});

export default settingsAccountUploadSchema;
