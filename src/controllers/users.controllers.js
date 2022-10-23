import * as usersRepository from "../repositories/users.repositories.js";
import { getSplittedDescription } from '../services/hashtags.services.js';

async function listUsers(req, res) {
  const { keyword } = req.query;

  try {
    if (keyword) {
      const users = await usersRepository.listUsersbyName(keyword);

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

async function listUserPosts(req, res) {
  const { id } = req.params;

  try {
    const user = await usersRepository.listUserbyId(id);

    if (user.rowCount === 0) {
      return res.sendStatus(404);
    }

    const userInfos = await usersRepository.listUserPosts(id);

    if (userInfos.rowCount > 0) {
      const response = {
        ...userInfos.rows[0],
        userPosts: userInfos.rows[0].userPosts.map(post => ({
          ...post,
          description: getSplittedDescription({ description: post.description })
        }))
      };
      res.status(200).send(response);
    } else {
      res.status(200).send(user.rows[0]);
    }
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

export { listUsers, listUserPosts };
