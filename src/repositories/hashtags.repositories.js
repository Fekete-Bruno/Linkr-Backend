import { connection } from '../db/database.js';

async function selectHashtags() {
    return connection.query(
        `SELECT hashtags.hashtag
        FROM hashtags 
        LEFT JOIN "postsHashtags" 
            ON hashtags.id = "postsHashtags"."hashtagId"
        GROUP BY hashtags.id
        ORDER BY COUNT("postsHashtags"."postId") DESC
        LIMIT 10;
        `
    );
}

async function selectPostsByHashtag(hashtag) {
    return connection.query(
        `SELECT
            posts.id AS "postId",
            posts.url,
            posts.description,
            posts."userId",
            u1.name,
            u1.img,
            likes."userId" AS "likeUserId",
            u2.name AS "likeUserName"
        FROM posts
            JOIN users u1
                ON posts."userId" = u1.id
            JOIN "postsHashtags"
                ON posts.id = "postsHashtags"."postId"
            JOIN hashtags
                ON "postsHashtags"."hashtagId" = hashtags.id
            LEFT JOIN likes
                ON posts.id = likes."postId"
            LEFT JOIN users u2
                ON likes."userId" = u2.id
        WHERE hashtags.hashtag = $1
        GROUP BY
            likes.id,
            posts.id,
            u1.name,
            u1.img,
            u2.name
        ORDER BY posts."createdAt" DESC
        LIMIT 20;`,
        [hashtag]
    );
}

export {
    selectHashtags,
    selectPostsByHashtag
};