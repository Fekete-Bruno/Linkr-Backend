import {
  checkRepost,
  checkPostOwner,
} from "../repositories/reposts.repositories.js";

async function repostMiddleware(req, res, next) {
  try {
    const userId = res.locals.searchToken[0].userId;
    const { id } = req.params;
    const sameRepost = (await checkRepost(userId, id)).rows;
    const postOwner = (await checkPostOwner(userId, id)).rows;

    if (sameRepost.length !== 0) {
      res.status(406).send("You already reposted this post");
      return;
    }

    if (postOwner.length !== 0) {
      res.status(406).send("You can't repost your own post");
      return;
    }

    next();
  } catch (error) {
    res.sendStatus(500);
  }
}
export { repostMiddleware };
