import joi from 'joi';

const searchSchema = joi.object({
    keyword: joi.string().min(3).empty(' ')
});

export default searchSchema;