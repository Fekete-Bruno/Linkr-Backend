import { commentRepository } from '../repositories/comments.repository.js';

async function GetComments(req, res) {
    try {
        const comments = (await commentRepository.GetComments(req.params.postId)).rows;
        console.log(comments);
        res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function PostComment(req, res) {
    try {
        //res.send(res.locals.body);
        await commentRepository.PostComment(res.locals.body.userId, res.locals.body.postId, res.locals.body.comment);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function CheckIfFollows(req, res) {
    try {
        const checkIfFollows = (await commentRepository.CheckIfFollows(res.locals.body.followerId, res.locals.body.followedId)).rows;
        if (checkIfFollows.length > 0) {
            res.status(200).send(true);
            return;
        } else {
            res.status(200).send(false)
            return;
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export { GetComments, PostComment, CheckIfFollows };