import { commentRepository } from '../repositories/comments.repository.js';

async function GetComments(req, res) {
    try {
        const comments = (await commentRepository.GetComments(req.params.postId)).rows;
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

export { GetComments, PostComment };