import { connection } from "../db/database.js";

async function getUserByEmail(email) {
    return connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

async function insertUser(name, email, img, password) {
    return connection.query(`INSERT INTO users (name, email, img, password) values($1, $2, $3, $4)`, [name, email, img, password]);
}

async function getUsers() {
    return connection.query(`SELECT * FROM users;`);
}

const userRepository = {
    getUserByEmail,
    getUsers,
    insertUser
}
export { userRepository };