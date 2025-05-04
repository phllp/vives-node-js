import Joi from "joi";
import mongoose from "mongoose";

export const createDonationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  category: Joi.string().required(),
});

export const updateDonationSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(""),
  category: Joi.string(),
  status: Joi.string().valid("available", "claimed", "completed"),
  recipient: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("Invalid recipient ID");
    }
    return value;
  }),
});
