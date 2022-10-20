import searchSchema from "../schemas/search.schema.js";

const searchSchemaValidate = async (req, res, next) => {

    const validation = searchSchema.validate(req.query, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail => detail.message));
        return res.status(422).send(errors);
    };

    next();

};

export default searchSchemaValidate;