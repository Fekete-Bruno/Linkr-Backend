import { connection } from "../db/database.js";

async function SelectUserByEmail(email) {
    return connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

async function InsertUser(name, email, img, password) {
    return connection.query(`INSERT INTO users (name, email, img, password) values($1, $2, $3, $4);`, [name, email, img, password]);
}

async function InsertNewSession(userId, token) {
    return connection.query(`INSERT INTO sessions ("userId", token) VALUES($1, $2);`, [userId, token]);
}

async function SelectSessionsByToken(token) {
    return connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
}

async function DeleteSessionByToken(token) {
    return connection.query(`DELETE FROM sessions WHERE token = $1;`, [token]);
}

async function DeleteAllSessionsByUserId(userId) {
    return connection.query(`DELETE FROM sessions WHERE "userId" = $1;`, [userId]);
}


//Internal Control
async function SelectUsers() {
    return connection.query(`SELECT * FROM users;`);
}

async function SelectSessions() {
    return connection.query(`SELECT * FROM sessions;`);
}

const signRepository = {
    SelectUserByEmail,
    InsertUser,
    InsertNewSession,
    SelectSessionsByToken,
    DeleteSessionByToken,
    DeleteAllSessionsByUserId,

    //internal Control
    SelectUsers,
    SelectSessions
}
export { signRepository };