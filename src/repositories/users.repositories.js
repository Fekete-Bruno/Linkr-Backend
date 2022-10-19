import { connection } from "../db/database.js";

async function searchUser (word) {
    const search = await connection.query(
        `SELECT name, img FROM users WHERE name ILIKE '%${word}%';`
    );
    
    return search;
};

export { searchUser };