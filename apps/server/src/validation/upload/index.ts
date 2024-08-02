import Joi from "joi";

const settingsAccountUploadSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  name: Joi.string().required(),
});

export default settingsAccountUploadSchema;
