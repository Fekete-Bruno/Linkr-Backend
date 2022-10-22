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
  for(let i = 1; i < hashtags.length; i++) {
    values += `, ($${i+1})`;
  }
  const lastPart = ` ON CONFLICT (hashtag) DO UPDATE SET hashtag = EXCLUDED.hashtag RETURNING ID;`;
  return connection.query(firstPart + values + lastPart, hashtags);
}

async function InsertPostsHashtags({ postId, hashtagsIds }) {
  const firstPart = `INSERT INTO "postsHashtags" ("postId", "hashtagId") VALUES`;
  let values = ` ($1, $2)`;
  for(let i = 1; i < hashtagsIds.length; i++) {
    values += `, ($1, $${i+2})`;
  }
  return connection.query(firstPart + values + `;`, [postId, ...hashtagsIds]);
}

async function DeletePostsHashtags(postId) {
  return connection.query(
    `DELETE FROM "postsHashtags" WHERE "postId" = $1;`,
    [postId]
  );
}

async function GetUrls() {
  return connection.query(`
    SELECT posts.id AS "postId", url,description,posts."userId",name,img
    FROM posts
    JOIN users ON posts."userId"=users.id
    ORDER BY posts.id
    DESC LIMIT 20;
`);
}

async function updateDescription(description, id, userId) {
  await connection.query(
    `
    UPDATE posts
    SET description = $1
    WHERE id = $2
    AND "userId" = $3
    RETURNING ID;
    `,
    [description, id, userId]
  );
}

async function deleteUrl(id, userId) {
  await connection.query(
    `
      DELETE FROM posts
      WHERE id = $1
      AND "userId" = $2;
    `,
    [id, userId]
  );
}

export {
  InsertUrl,
  InsertHashtags,
  InsertPostsHashtags,
  DeletePostsHashtags,
  GetUrls,
  updateDescription,
  deleteUrl
};
