import { connection } from "../db/database.js";

async function InsertUrl({userId,url,description}){
    return connection.query('INSERT INTO posts ("userId",url,description) VALUES ($1,$2,$3)',[userId,url,description]);
}

export {InsertUrl}