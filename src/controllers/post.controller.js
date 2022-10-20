import { connection } from "../db/database.js";
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

async function updateDescription(req, res){

    const { id } = req.params;
    const { description } = req.body;
    const userId = (res.locals.searchToken[0].userId);

    try {
        
        await connection.query(
            `
                UPDATE posts
                SET description = $1
                WHERE id = $2
                AND "userId" = $3;
            `,
            [description, id, userId]
        );

        res.sendStatus(200);
        
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

export {postUrl,getTimeline,updateDescription}