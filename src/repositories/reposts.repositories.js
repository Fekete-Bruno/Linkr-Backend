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

async function listUserReposts(userId) {
  return connection.query(
    `
    SELECT
      posts.id AS "postId",
      posts.url,
      posts.description,
      posts."userId" AS "ownerId",
      u1.name AS "ownerName",
      u1.img AS "ownerImg",
      u3.name AS "reposterName",
      COALESCE("repostsData"."repostCount", 0) AS "reposts",
	    COUNT ("likeData"."postId") AS "likes",
      JSON_AGG (
        JSON_BUILD_OBJECT(
          'userId', "likeData"."userId",
          'name', "likeData".username
        )) AS "likeArray"
    FROM posts
    JOIN users AS u1
      ON posts."userId"=u1.id
    LEFT JOIN (
        SELECT "userId", "postId", name AS "username"
        FROM likes
        LEFT JOIN users
          ON likes."userId"=users.id
        GROUP BY likes."postId",likes."userId",users.name
        ) AS "likeData" ON posts.id = "likeData"."postId"
    LEFT JOIN (
        SELECT "userId", "postId", COUNT("postId") AS "repostCount" 
        FROM reposts 
        GROUP BY "postId", "userId"
        ) AS "repostsData"
        ON posts.id = "repostsData"."postId"
    LEFT JOIN users AS u3
      ON "repostsData"."userId"=u3.id
    WHERE posts."userId"=$1 OR "repostsData"."userId"=$1 
    GROUP BY posts.id, u1.name, u1.img, u3.name, "repostCount"`,
    [userId]
  );
}

export { insertRepost, checkRepost, listUserReposts };
