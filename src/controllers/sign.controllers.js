import { connection } from "../db/database.js";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/sign.repositories.js";

async function SignUp(req, res) {
    try {
        const searchByEmail = (await userRepository.getUserByEmail(req.body.email)).rows;
        if (searchByEmail.length > 0) {
            res.status(409).send('This e-mail already exists');
            return;
        }

        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        //await connection.query(`INSERT INTO users (name, email, img, password) values($1, $2, $3, $4)`, [res.locals.body.name, res.locals.body.email, res.locals.body.img, hashPassword]);
        await userRepository.insertUser(res.locals.body.name, res.locals.body.email, res.locals.body.img, hashPassword);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function SignIn(req, res) {
    res.send('signin');
}

//INTERNAL CONTROLLER
async function GetUsers(req, res) {
    //const search = (await connection.query(`SELECT * FROM users;`)).rows;
    const search = (await await userRepository.getUsers()).rows;
    res.send(search);
}

export { SignUp, GetUsers, SignIn };