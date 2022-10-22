import { connection } from "../db/database.js";

async function InsertLike({userId,postId}){
    return connection.query(
        'INSERT INTO likes ("userId","postId") VALUES ($1,$2)',
        [userId,postId]
    );
}

async function FindLike({userId,postId}){
    return connection.query(
        'SELECT id from likes WHERE ( "userId"=$1 AND "postId"=$2 );',
        [userId,postId]
    );
}

async function DeleteLike({userId,postId}){
    return connection.query(
        'DELETE FROM likes WHERE ( "userId"=$1 AND "postId"=$2 );',
        [userId,postId]
    );
}

export { InsertLike, FindLike, DeleteLike };