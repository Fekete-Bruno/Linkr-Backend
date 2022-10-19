import Joi from "joi";

function SignUpSchema(req, res, next) {
    const signUpSchema = Joi.object({
        name: Joi.string().empty().max(255).required(),
        email: Joi.string().empty().email().max(255).required(),
        img: Joi.string().pattern(new RegExp('/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/')).allow(null).required(),
        password: Joi.string().empty().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });

    const validation = signUpSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(error => error.message);
        res.status(422).send({ message: errors });
        return;
    }

    res.locals.body = req.body;
    next();
}

function SignInSchema(req, res, next) {
    const signInSchema = Joi.object({
        email: Joi.string().empty().email().max(200).required(),
        password: Joi.string().empty().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
}

export default SignUpSchema;