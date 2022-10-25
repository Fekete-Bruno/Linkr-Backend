import { connection } from "../db/database.js";

async function GetComments(postId) {
    return connection.query(`SELECT comments.id, users.id AS "userId", users.name, users.img, comments.comment FROM comments JOIN users ON comments."userId" = users.id WHERE comments."postId" = $1;`, [postId]);
}

async function PostComment(userId, postId, comment) {
    return connection.query(`INSERT INTO comments ("userId", "postId", comment) values($1, $2, $3);`, [userId, postId, comment]);
}

const commentRepository = {
    GetComments,
    PostComment
}

export { commentRepository };