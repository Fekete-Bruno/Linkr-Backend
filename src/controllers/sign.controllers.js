import bcrypt from "bcrypt";
import { signRepository } from "../repositories/sign.repositories.js";
import { v4 as uuidv4 } from 'uuid';

async function SignUp(req, res) {
    try {
        console.log('aaa');
        const searchByEmail = (await signRepository.SelectUserByEmail(req.body.email)).rows;
        if (searchByEmail.length > 0) {
            res.status(409).send('This e-mail already exists');
            return;
        }

        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        await signRepository.InsertUser(res.locals.body.name, res.locals.body.email, res.locals.body.img, hashPassword);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function SignIn(req, res) {
    try {
        const searchByEmail = (await signRepository.SelectUserByEmail(req.body.email)).rows;
        if (searchByEmail.length === 0) {
            res.sendStatus(401);
            return;
        }

        const compare = bcrypt.compareSync(res.locals.body.password, searchByEmail[0].password);
        if (compare) {
            const token = uuidv4();
            await signRepository.InsertNewSession(searchByEmail[0].id, token);
            res.status(200).send({ token: token, img: searchByEmail[0].img, id:searchByEmail[0].id });
            return;
        } else {
            res.sendStatus(401);
            return;
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function SignOut(req, res) {
    try {
        await signRepository.DeleteSessionByToken(res.locals.searchToken[0].token);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function SignOutAll(req, res) {
    try {
        await signRepository.DeleteAllSessionsByUserId(res.locals.searchToken[0].userId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

//INTERNAL CONTROLLER
async function SelectUsers(req, res) {
    const search = (await signRepository.SelectUsers()).rows;
    res.send(search);
}

async function SelectSessions(req, res) {
    const search = (await signRepository.SelectSessions()).rows;
    res.send(search);
}

export { SignUp, SignIn, SignOut, SignOutAll, SelectUsers, SelectSessions };