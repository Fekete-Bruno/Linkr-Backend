import Joi from "joi";
import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().empty().max(255).required(),
  email: joi.string().empty().email().max(255).required(),
  img: joi.string()
    .pattern(
      new RegExp(
        "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
      )
    )
    .allow(null)
    .required(),
  password: joi.string()
    .empty()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const signInSchema = joi.object({
  email: joi.string().empty().email().max(200).required(),
  password: joi.string()
    .empty()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

export { signUpSchema, signInSchema };
