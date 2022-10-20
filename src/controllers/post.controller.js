import { GetUrls, InsertUrl } from "../repositories/post.repository.js";

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
    return res.sendStatus(201);
}

async function getTimeline(req,res){
    try {
        const query = await GetUrls();
        return res.send(query.rows);

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export {postUrl,getTimeline}