import { DeleteLike, FindLike, InsertLike } from "../repositories/likes.repository.js";

async function postLike(req,res){
    const{userId,postId} = res.locals;
    try {
        const findLike = await FindLike({userId,postId}); 
        if(findLike.rowCount===0){
            InsertLike({userId,postId});
        } else {
            DeleteLike({userId,postId});
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    return res.sendStatus(200);
}
export { postLike };