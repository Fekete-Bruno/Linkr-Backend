import { connection } from "../db/database.js";

async function getFollow(followerId, followedId) {
    
    const follow = await connection.query(
        `SELECT * FROM follows WHERE "followerId"=$1 AND "followedId"=$2;`,
        [followerId, followedId]
       );
    
       return follow;
}

async function insertFollow(followerId, followedId) {

    const follow = await connection.query(
     `INSERT INTO follows ("followerId", "followedId") VALUES ($1, $2);`,
     [followerId, followedId]
    );
 
    return follow;
   
 };

 async function deleteFollow(followerId, followedId) {

    const unfollow = await connection.query(
        `
            DELETE FROM follows 
            WHERE "followerId"=$1 AND "followedId"=$2;
        `,
        [followerId, followedId]
    );

    return unfollow;

 };

 export { getFollow, insertFollow, deleteFollow };