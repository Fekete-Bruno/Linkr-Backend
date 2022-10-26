import { connection } from "../db/database.js";

async function GetComments(postId) {
    return connection.query(`SELECT comments.id, users.id AS "userId", users.name, users.img, comments.comment FROM comments JOIN users ON comments."userId" = users.id WHERE comments."postId" = $1;`, [postId]);
}

async function PostComment(userId, postId, comment) {
    return connection.query(`INSERT INTO comments ("userId", "postId", comment) values($1, $2, $3);`, [userId, postId, comment]);
}

async function CheckIfFollows(followerId, followedId) {
    return connection.query(`SELECT * FROM follows WHERE "followerId" = $1 AND "followedId" = $2`, [followerId, followedId]);
}

async function GetCommentsV2(loggedId, postId) {
    /* return connection.query(`SELECT
         comments.id, 
         u1.id AS "userId", 
         u1.name, u1.img, 
         comments.comment,
         posts."userId" AS "postAuthor",
         CASE 
         WHEN COUNT(follows.id) = 1 THEN true
         WHEN COUNT(follows.id) = 0 THEN false 
         END follows

         FROM comments JOIN users u1 ON comments."userId" = u1.id
         JOIN posts ON comments."postId" = posts.id
         LEFT JOIN follows ON  u1.id = follows."followerId"
         JOIN users u2 ON u2.id = follows."followedId"

         WHERE comments."postId" = 68
         AND u2.id = 16
         GROUP BY comments.id, u1.id, posts."userId";`, [postId, userId]); */

    return connection.query(`SELECT t1.*,
         CASE
         WHEN follows."followerId" = $1
         AND follows."followedId" = t1."userId" THEN TRUE
         ELSE FALSE
         END follow

         FROM (SELECT
         comments.id, 
         u1.id AS "userId", 
         u1.name, u1.img, 
         comments.comment,
         posts."userId" AS "postAuthor"

         FROM comments JOIN users u1 ON comments."userId" = u1.id
         JOIN posts ON comments."postId" = posts.id

         WHERE comments."postId" = $2) AS t1
         
         JOIN follows ON follows."followerId" = $1;`, [loggedId, postId]);
}

const commentRepository = {
    GetComments,
    PostComment,
    CheckIfFollows,
    GetCommentsV2
}

export { commentRepository };