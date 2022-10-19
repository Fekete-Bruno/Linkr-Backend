import joi from 'joi';

const searchSchema = joi.object({
    word: joi.string().min(3).required().empty(' ')
});

export default searchSchema;