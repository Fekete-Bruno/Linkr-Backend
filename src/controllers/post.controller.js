import {
  GetUrls,
  InsertUrl,
  updateDescription,
  deleteUrl,
} from "../repositories/post.repository.js";

async function postUrl(req, res) {
  const userId = res.locals.searchToken[0].userId;
  const url = res.locals.url;
  const description = res.locals.description;
  try {
    await InsertUrl({ userId, url, description });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
  return res.sendStatus(201);
}

async function getTimeline(req, res) {
  try {
    const query = await GetUrls();
    return res.send(query.rows);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

async function editPost(req, res) {
  const { id } = req.params;
  const { description } = req.body;
  const userId = res.locals.searchToken[0].userId;

  try {
    await updateDescription(description, id, userId);

    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
    return;
  }
}

async function deletePost(req, res) {
  const { id } = req.params;
  const userId = res.locals.searchToken[0].userId;

  try {
    await deleteUrl(id, userId);
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
    return;
  }
}

export { postUrl, getTimeline, editPost, deletePost };
