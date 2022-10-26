import { connection } from "../db/database.js";

async function listUsers() {
    const user = await connection.query(
        `SELECT id, name, img FROM users LIMIT 2;`
    );
    
    return user;
};

async function listUsersbyName(keyword, followerId) {
    const user = await connection.query(
        `
            SELECT 
                users.id, 
                users.name, 
                users.img,
                CASE
                    WHEN (follows."followedId" IS NULL)
                    THEN false
                    ELSE true
                    END
                AS following
            FROM users
            LEFT JOIN (
                SELECT 
                    follows."followedId"
                    FROM follows
                    WHERE follows."followerId" = $1
            )
            AS follows
            ON users.id = follows."followedId"
            WHERE name ILIKE '%${keyword}%'
            ORDER BY following DESC;
        `, 
        [followerId]
    );
    
    return user;
};

async function listUserbyId(id) {
    const user = await connection.query(
        `SELECT id, name, img FROM users WHERE id = $1;`, [id]
    );
    
    return user;
};

async function listUserPosts(id) {
    const userPosts = connection.query(

        `
            SELECT 
                name,
                img,
                posts."userId",
                posts.id AS "postId", 
                url,
                description,
                COUNT ("likeData"."postId") AS "likes",
                JSON_AGG (
                    JSON_BUILD_OBJECT(
                        'userId', "likeData"."userId",
                        'name', "likeData".username
                    )
                )
            AS "likeArray"
            FROM posts
            JOIN users 
            ON posts."userId" = users.id
            LEFT JOIN (
                SELECT 
                    "userId", 
                    "postId", 
                    name AS "username"
                    FROM likes
                    LEFT JOIN users
                    ON likes."userId"=users.id
                    GROUP BY likes."postId",likes."userId",users.name
            ) 
            AS "likeData" 
            ON posts.id = "likeData"."postId"
            WHERE posts."userId"=$1
            GROUP BY posts.id,name,img
            ORDER BY posts.id DESC
        `
         ,
        [id]
    );
    
    return userPosts;
};

export { listUsers, listUsersbyName, listUserbyId, listUserPosts };