import { connection } from "../db/database.js";

async function listUsers() {
    const user = await connection.query(
        `SELECT id, name, img FROM users LIMIT 2;`
    );
    
    return user;
};

async function listUsersbyName(keyword) {
    const user = await connection.query(
        `SELECT id, name, img FROM users WHERE name ILIKE '%${keyword}%';`
    );
    
    return user;
};

async function listUserbyId(id) {
    const user = await connection.query(
        `SELECT name, img FROM users WHERE id = $1;`, [id]
    );
    
    return user;
};

async function listUserPosts(id) {
    const userInfos = connection.query(
        `
            SELECT 
            users.id,
            users.name,
            users.img,
            JSON_AGG (
                JSON_BUILD_OBJECT(
                    'id', postInfos.id,
                    'url', postInfos.url,
                    'description', postInfos.description,
                    'likes', postInfos."postLikes",
                    'createdAt', postInfos."createdAt"
                )
            )
            AS "userPosts"
            FROM users
            JOIN (
                SELECT 
                    posts.id,
                    posts.url,
                    posts.description,
                    posts."createdAt",
                    COUNT (likes."postId") AS "postLikes"
                FROM posts
                LEFT JOIN likes
                ON posts.id = likes."postId"
                GROUP BY posts.id
            )
            AS postInfos
            ON users.id = postInfos.id
            WHERE users.id= $1
            GROUP BY users.id, users.name,  users.img, postInfos."createdAt"
            ORDER BY postInfos."createdAt" DESC;
        `,
    [id]);
    
    return userInfos;
};

export { listUsers, listUsersbyName, listUserbyId, listUserPosts };