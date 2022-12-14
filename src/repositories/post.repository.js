import { connection } from "../db/database.js";

async function InsertUrl({ userId, url, description }) {
  return connection.query(
    'INSERT INTO posts ("userId",url,description) VALUES ($1,$2,$3) RETURNING ID;',
    [userId, url, description]
  );
}

async function InsertHashtags(hashtags) {
  const firstPart = `INSERT INTO hashtags (hashtag) VALUES`;
  let values = ` ($1)`;
  for (let i = 1; i < hashtags.length; i++) {
    values += `, ($${i + 1})`;
  }
  const lastPart = ` ON CONFLICT (hashtag) DO UPDATE SET hashtag = EXCLUDED.hashtag RETURNING ID;`;
  return connection.query(firstPart + values + lastPart, hashtags);
}

async function InsertPostsHashtags({ postId, hashtagsIds }) {
  const firstPart = `INSERT INTO "postsHashtags" ("postId", "hashtagId") VALUES`;
  let values = ` ($1, $2)`;
  for (let i = 1; i < hashtagsIds.length; i++) {
    values += `, ($1, $${i + 2})`;
  }
  return connection.query(firstPart + values + `;`, [postId, ...hashtagsIds]);
}

async function DeletePostsHashtags(postId) {
  return connection.query(`DELETE FROM "postsHashtags" WHERE "postId" = $1;`, [
    postId,
  ]);
}

async function GetUrls(followerId, page) {
  return connection.query(
    `SELECT
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
    LEFT JOIN follows 
      ON posts."userId" = follows."followedId"
    WHERE follows."followerId" = $1
    GROUP BY posts.id,u1.name, u1.img, u3.name, "reposts"
    ORDER BY posts."createdAt"
    DESC LIMIT $2;
    `,
    [followerId, page * 10]
  );
}

async function updateDescription(description, id) {
  return connection.query(
    `
    UPDATE posts
    SET description = $1
    WHERE id = $2
    RETURNING ID;
    `,
    [description, id]
  );
}

async function deleteUrl(id) {
  await connection.query(
    `
      DELETE FROM posts
      WHERE id = $1
    `,
    [id]
  );
}

export {
  InsertUrl,
  InsertHashtags,
  InsertPostsHashtags,
  DeletePostsHashtags,
  GetUrls,
  updateDescription,
  deleteUrl,
};
