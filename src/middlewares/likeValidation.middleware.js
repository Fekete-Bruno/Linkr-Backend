import likeSchema from "../schemas/like.schema.js";

function validateLike(req,res,next){
    let { userId, postId } = req.body;
    const validation = likeSchema.validate(
    { userId, postId },
    { abortEarly: false }
    );
    if (validation.error) {
        const errors = validation.error.details.map((error) => error.message);
        return res.status(422).send({ message: errors });
    }
    res.locals.userId = userId;
    res.locals.postId = postId;
    next();
}

export default validateLike;