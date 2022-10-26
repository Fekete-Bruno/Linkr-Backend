import { connection } from "../db/database.js";

async function insertRepost(userId, postId) {
  return connection.query(
    `
    INSERT INTO reposts ("userId", "postId")
    VALUES ($1, $2);`,
    [userId, postId]
  );
}

async function checkRepost(userId, postId) {
  return connection.query(
    `SELECT *
    FROM reposts
    WHERE "userId"=$1 AND "postId"=$2`,
    [userId, postId]
  );
}

export { insertRepost, checkRepost };
