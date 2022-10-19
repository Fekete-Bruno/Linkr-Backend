import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string().empty().max(255).required(),
  email: Joi.string().empty().email().max(255).required(),
  img: Joi.string()
    .pattern(
      new RegExp(
        "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
      )
    )
    .allow(null)
    .required(),
  password: Joi.string()
    .empty()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const signInSchema = Joi.object({
  email: Joi.string().empty().email().max(200).required(),
  password: Joi.string()
    .empty()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

export { signUpSchema, signInSchema };
