import { connection } from "../db/database.js";

async function InsertUrl({ userId, url, description }) {
  return connection.query(
    'INSERT INTO posts ("userId",url,description) VALUES ($1,$2,$3)',
    [userId, url, description]
  );
}

async function GetUrls() {
  return connection.query(`
    SELECT posts.id AS "postId", url,description,posts."userId",name,img,COUNT ("likeData"."postId") AS "likes",
	  JSON_AGG (
                JSON_BUILD_OBJECT(
                    'userId', "likeData"."userId",
                  	'name', "likeData".username
                )
            )
            AS "likeArray"
    FROM posts
    JOIN users ON posts."userId"=users.id
    LEFT JOIN (
      SELECT "userId", "postId", name AS "username"
		FROM likes
		LEFT JOIN users
		ON likes."userId"=users.id
		GROUP BY likes."postId",likes."userId",users.name
    ) AS "likeData" ON posts.id = "likeData"."postId"
    GROUP BY posts.id,name,img
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
    AND "userId" = $3;
    `,
    [description, id, userId]
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

export { InsertUrl, GetUrls, updateDescription, deleteUrl };
