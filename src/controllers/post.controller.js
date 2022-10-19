import { InsertUrl } from "../repositories/post.repository.js";

async function postUrl(req,res){
    const userId = (res.locals.searchToken[0].userId);
    const url = res.locals.url;
    const description = res.locals.description;
    try {
        await InsertUrl({userId,url,description})
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    res.sendStatus(201);
}

export {postUrl}