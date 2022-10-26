import { postCommentSchema, checkIfFollowsSchema, getCommentsV2Schema } from "../schemas/comment.schemas.js";

async function PostCommentSchema(req, res, next) {
    const validation = await postCommentSchema.validate(req.body, {
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

async function CheckIfFollowsSchema(req, res, next) {
    const validation = await checkIfFollowsSchema.validate(req.body, {
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

async function GetCommentsV2Schema(req, res, next) {
    const validation = await getCommentsV2Schema.validate(req.body, {
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

export { PostCommentSchema, CheckIfFollowsSchema, GetCommentsV2Schema };