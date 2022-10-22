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
            userInfos.id,
            userInfos.name,
            userInfos.img,
            userInfos."postsCount",
            JSON_AGG (
                JSON_BUILD_OBJECT(
                    'id', postInfos.id,
                    'description', postInfos.description,
                    'url', postInfos.url,
                    'likes', postInfos."postLikes",
                    'createdAt', postInfos."createdAt"
                )
            )
            AS "userPosts"
            FROM (
                SELECT 
                    users.id, 
                    users.name, 
                    users.img,
                    COUNT (posts."userId") AS "postsCount"
                FROM users
                LEFT JOIN posts
                ON users.id = posts."userId"
                GROUP BY users.id
            )
            AS userInfos
            LEFT JOIN (
                SELECT 
                    posts.id, 
                    posts."userId", 
                    posts.description, 
                    posts.url,
                    posts."createdAt",
                    COUNT (likes."postId") AS "postLikes"
                FROM posts
                LEFT JOIN likes
                ON posts.id = likes."postId"
                GROUP BY posts.id
                ORDER BY posts."createdAt" DESC
            )
            AS postInfos
            ON (userInfos.id = postInfos."userId")
            WHERE userInfos."id"= $1
            GROUP BY userInfos.id, userInfos.name, userInfos.img, userInfos."postsCount";
        `,
        [id]
    );           
    
    return userInfos;
};

export { listUsers, listUsersbyName, listUserbyId, listUserPosts };