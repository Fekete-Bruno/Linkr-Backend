import { connection } from "../db/database.js";

async function InsertUrl({ userId, url, description }) {
  return connection.query(
    'INSERT INTO posts ("userId",url,description) VALUES ($1,$2,$3)',
    [userId, url, description]
  );
}

async function deletePost(postId, userId) {
  const result = await connection.query(
    `
    DELETE FROM posts 
    WHERE "id"=$1 AND "userId"=$2;`,
    [postId, userId]
  );

  return result;
}

async function editPost(description, postId, userId) {
  console.log(description, postId, userId);
  const result = await connection.query(
    `
    UPDATE posts
    SET description=$1
    WHERE id=$2 AND "userId"=$3;`,
    [description, postId, userId]
  );

  return result;
}

export { InsertUrl, deletePost, editPost };
