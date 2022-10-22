import {
  GetUrls,
  InsertUrl,
  InsertHashtags,
  InsertPostsHashtags,
  DeletePostsHashtags,
  updateDescription,
  deleteUrl,
} from "../repositories/post.repository.js";

const hashtagRegEx = /#[a-zA-ZÀ-ÿ0-9_-]+/g;

function getCleanHashtags({ description }) {
  const hashtagsList = description.match(hashtagRegEx);
  const cleanHashtagsList = hashtagsList
    .map(hashtag => hashtag
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .slice(1)
    );
  return cleanHashtagsList;
}



async function postUrl(req, res) {
  const userId = res.locals.searchToken[0].userId;
  const url = res.locals.url;
  const description = res.locals.description;
  const hashtags = getCleanHashtags({ description });

  try {
    const postInsertion = await InsertUrl({ userId, url, description });
    if(hashtags.length > 0) {
      const { id: postId } = postInsertion.rows;
      const hashtagsInsertion = await InsertHashtags(hashtags);
      const hashtagsIds = hashtagsInsertion.rows.map(hashtagId => hashtagId.id);
      await InsertPostsHashtags({ postId, hashtagsIds });
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
  return res.sendStatus(201);
}

async function getTimeline(req, res) {
  try {
    const selection = (await GetUrls()).rows;

    

    return res.send();
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

async function editPost(req, res) {
  const { id } = req.params;
  const { description } = req.body;
  const userId = res.locals.searchToken[0].userId;
  const hashtags = getCleanHashtags({ description });

  try {
    const descriptionUpdation = await updateDescription(description, id, userId);
    const { id: postId } = descriptionUpdation.rows;
    await DeletePostsHashtags(postId);
    const hashtagsInsertion = await InsertHashtags(hashtags);    
    const hashtagsIds = hashtagsInsertion.rows.map(hashtagId => hashtagId.id);
    await InsertPostsHashtags({ postId, hashtagsIds });

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
    await DeletePostsHashtags(id);
    await deleteUrl(id, userId);
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
    return;
  }
}

export { postUrl, getTimeline, editPost, deletePost };
