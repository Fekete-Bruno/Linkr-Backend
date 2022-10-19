import Joi from "joi";

async function SignUpSchema(req, res, next) {
    const signUpSchema = Joi.object({
        name: Joi.string().empty().max(255).required(),
        email: Joi.string().empty().email().max(255).required(),
        img: Joi.string().pattern(new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')).allow(null).required(),
        password: Joi.string().empty().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });

    const validation = await signUpSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(error => error.message);
        res.status(422).send({ message: errors });
        return;
    }

    res.locals.body = req.body;
    next();
}

async function SignInSchema(req, res, next) {
    const signInSchema = Joi.object({
        email: Joi.string().empty().email().max(200).required(),
        password: Joi.string().empty().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });

    const validation = await signInSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(error => error.message);
        res.status(422).send({ message: errors });
        return;
    }

    res.locals.body = req.body;
    next();
}

export { SignUpSchema, SignInSchema };