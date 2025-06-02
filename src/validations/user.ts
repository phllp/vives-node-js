import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(250).required(),
  role: Joi.string().valid("recipient", "donor").required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
});
