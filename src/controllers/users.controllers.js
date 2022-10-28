import * as usersRepository from "../repositories/users.repositories.js";
import { getSplittedDescription } from "../services/hashtags.services.js";
import { listUserReposts } from "../repositories/reposts.repositories.js";

async function listUsers(req, res) {
  const { keyword } = req.query;
  const followerId = res.locals.searchToken[0].userId;

  try {
    if (keyword) {
      const users = await usersRepository.listUsersbyName(keyword, followerId);

      if (users.rowCount > 0) {
        return res.status(200).send(users.rows);
      } else {
        return res.sendStatus(404);
      }
    }
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

async function listUserbyId(req, res) {
  const { id } = req.params;

  try {
    const user = await usersRepository.listUserbyId(id);

    if (user.rowCount === 0) {
      return res.sendStatus(404);
    } else {
      return res.status(200).send(user.rows[0]);
    }
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

async function listUserPosts(req, res) {
  const { id } = req.params;

  try {
    const user = await usersRepository.listUserbyId(id);

    if (user.rowCount === 0) {
      return res.sendStatus(404);
    }

    const userPosts = await listUserReposts(id);

    if (userPosts.rowCount > 0) {
      const selection = userPosts.rows;
      const response = selection.map((post) => ({
        ...post,
        description: getSplittedDescription({ description: post.description }),
      }));

      res.status(200).send(response);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

export { listUsers, listUserbyId, listUserPosts };
