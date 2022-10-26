import { insertRepost } from "../repositories/reposts.repositories.js";

async function repost(req, res) {
  const userId = res.locals.searchToken[0].userId;
  const { id } = req.params;

  try {
    await insertRepost(userId, id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
    return;
  }
}

export { repost };
