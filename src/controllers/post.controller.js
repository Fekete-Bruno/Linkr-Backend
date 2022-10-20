import * as postRepository from "../repositories/post.repository.js";

async function postUrl(req, res) {
  const userId = res.locals.searchToken[0].userId;
  const url = res.locals.url;
  const description = res.locals.description;
  try {
    await postRepository.InsertUrl({ userId, url, description });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
  res.sendStatus(201);
}

async function deletePost(req, res) {
  try {
    const userId = res.locals.searchToken[0].userId;
    const postId = parseInt(req.params.id);

    const result = await postRepository.deletePost(postId, userId);
    console.log(userId, postId, result.rows);
    if (result.rows.length === 0) {
      res.status(400).send("Something went wrong");
    } else {
      res.status(204).send("Post deleted");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function editPost(req, res) {
  const userId = res.locals.searchToken[0].userId;
  const postId = parseInt(req.params.id);
  const description = req.body.description;

  try {
    const result = await postRepository.editPost(description, postId, userId);
    console.log(userId, postId, description, result.rows);
    if (result.rows.length === 0) {
      res.status(400).send("Something went wrong");
      return;
    } else {
      res.status(204).send("Post edited");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export { postUrl, deletePost, editPost };
