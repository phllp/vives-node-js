import Joi from "joi";

export const createHelpRequestSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  category: Joi.string()
    .required()
    .valid("food", "clothing", "health", "other"),
});

export const updateHelpRequestSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().max(500),
  category: Joi.string(),
}).min(1); // At least one field must be present for update
