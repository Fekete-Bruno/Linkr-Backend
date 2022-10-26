import { commentRepository } from "../repositories/comments.repository.js";

async function GetComments(req, res) {
  try {
    const comments = (await commentRepository.GetComments(req.params.postId))
      .rows;
    res.send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function GetCommentsV2(req, res) {
  try {
    const comments = (await commentRepository.GetCommentsV2(res.locals.body.userId, res.locals.body.postId)).rows;

    /* for (let i = 0; i < comments.length; i++) {
      const checkIfFollows = (await commentRepository.CheckIfFollows(res.locals.body.userId, comments[i].userId)).rows;
      if (comments[i].userId === res.locals.body.userId) {
        comments[i].follows = `• post's author`;
        comments[i].nathalia = `• post's author`;
        //comments[i].following = true;
      } else if (checkIfFollows.length > 0) {
        comments[i].follows = '• following';
        comments[i].nathalia = `• post's author`;
        //comments[i].following = false;
      } else {
        comments[i].follows = '';
        comments[i].nathalia = `• post's author`;
        //comments[i].following = 'aaaa';
      }
    } */

    res.send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function PostComment(req, res) {
  try {
    //res.send(res.locals.body);
    await commentRepository.PostComment(
      res.locals.body.userId,
      res.locals.body.postId,
      res.locals.body.comment
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function CheckIfFollows(req, res) {
  try {
    const checkIfFollows = (
      await commentRepository.CheckIfFollows(
        res.locals.body.followerId,
        res.locals.body.followedId
      )
    ).rows;
    if (checkIfFollows.length > 0) {
      res.status(200).send(true);
      return;
    } else {
      res.status(200).send(false);
      return;
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export { GetComments, PostComment, CheckIfFollows, GetCommentsV2 };
