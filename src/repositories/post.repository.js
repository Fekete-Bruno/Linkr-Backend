import { connection } from "../db/database.js";

async function InsertUrl({userId,url,description}){
    return connection.query('INSERT INTO posts ("userId",url,description) VALUES ($1,$2,$3)',[userId,url,description]);
}

async function GetUrls(){
    return connection.query(`
        SELECT posts.id AS "postId", url,description,posts."userId",name,img
        FROM posts 
        JOIN users ON posts."userId"=users.id
        ORDER BY posts.id 
        DESC LIMIT 20;
    `);
}

export {InsertUrl,GetUrls}