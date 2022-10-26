import joi from "joi";

const postCommentSchema = joi.object({
    userId: joi.number().required(),
    postId: joi.number().required(),
    comment: joi.string().empty().min(1).max(255).required()
});

const checkIfFollowsSchema = joi.object({
    followerId: joi.number().required(),
    followedId: joi.number().required()
});

const getCommentsV2Schema = joi.object({
    userId: joi.number().required(),
    postId: joi.number().required()
});

export { postCommentSchema, checkIfFollowsSchema, getCommentsV2Schema };