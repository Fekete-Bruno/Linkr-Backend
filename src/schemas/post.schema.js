import joi from 'joi';

const postSchema = joi.object({
    url: joi.string().pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/).required(),
    description: joi.string().max(255)
})

export default postSchema;