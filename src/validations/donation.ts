import Joi from "joi";
import mongoose from "mongoose";

export const createDonationSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string()
    .required()
    .valid("food", "clothing", "health", "other"),
  message: Joi.string().max(500).optional(),
  helpRequest: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "ObjectId validation"),
});

export const updateDonationSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(""),
  category: Joi.string()
    .required()
    .valid("food", "clothing", "health", "other"),
});
