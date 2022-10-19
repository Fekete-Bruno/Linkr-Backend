import { signInSchema, signUpSchema } from "../schemas/sign.schema.js";

async function SignUpSchema(req, res, next) {
  const validation = await signUpSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(422).send({ message: errors });
    return;
  }

  res.locals.body = req.body;
  next();
}

async function SignInSchema(req, res, next) {
  const validation = await signInSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(422).send({ message: errors });
    return;
  }

  res.locals.body = req.body;
  next();
}

export { SignUpSchema, SignInSchema };
