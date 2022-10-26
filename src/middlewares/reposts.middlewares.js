import { checkRepost } from "../repositories/reposts.repositories.js";

async function repostMiddleware(req, res, next) {
  try {
    const userId = res.locals.searchToken[0].userId;
    const { id } = req.params;
    const sameRepost = (await checkRepost(userId, id)).rows;
    if (sameRepost.length !== 0) {
      res.status(406).send("You already reposted this post");
      return;
    }

    next();
  } catch (error) {
    res.sendStatus(500);
  }
}
export { repostMiddleware };
