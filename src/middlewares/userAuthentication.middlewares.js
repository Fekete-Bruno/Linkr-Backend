import { signRepository } from "../repositories/sign.repositories.js";

async function UserAuthentication(req, res, next) {
    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }

    //Validates if the sessions exists
    const token = req.headers.authorization?.replace('Bearer ', '');
    const searchToken = (await signRepository.SelectSessionsByToken(token)).rows;
    if (searchToken.length === 0) {
        res.sendStatus(401);
        return;
    }

    res.locals.searchToken = searchToken;

    next();
}

export default UserAuthentication;