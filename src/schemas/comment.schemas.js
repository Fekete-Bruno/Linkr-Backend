import joi from "joi";

const postCommentSchema = joi.object({
    userId: joi.number().required(),
    postId: joi.number().required(),
    comment: joi.string().empty().min(1).max(255).required()
});

export { postCommentSchema };