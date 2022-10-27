import * as followsRepository from '../repositories/follows.repositories.js';
import * as usersRepository from '../repositories/users.repositories.js';

async function confirmFollowedUser(req, res) {

    const { followedId } = req.params;
    const followerId = res.locals.searchToken[0].userId;

    try {

        const isFollowed = await followsRepository.getFollow(followerId, followedId);

        if (isFollowed.rowCount === 0) {
            return res.send(false);
        } else {
            return res.send(true);
        }
        
        
    } catch (err) {
        console.log(err.message);
        res.sendStatus(500);
    }
};

async function followUser(req, res) {

    const { followedId } = req.params;
    const followerId = res.locals.searchToken[0].userId;

    try {

        if (followerId == followedId) {
            return res.sendStatus(400);
        }

        const isUser = await usersRepository.listUserbyId(followedId);

        if (isUser.rowCount === 0) {
            return res.sendStatus(404);
        }

        const isFollowed = await followsRepository.getFollow(followerId, followedId);

        if(isFollowed.rowCount > 0) {
            return res.sendStatus(401)
        }

        await followsRepository.insertFollow(followerId, followedId);

        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }

};

async function unfollowUser(req, res) {

    const { followedId } = req.params;
    const followerId = res.locals.searchToken[0].userId;

    try {

        if (followerId == followedId) {
            return res.sendStatus(400);
        }

        const isUser = await usersRepository.listUserbyId(followedId);

        if (isUser.rowCount === 0) {
            return res.sendStatus(404);
        }

        await followsRepository.deleteFollow(followerId, followedId);

        return res.sendStatus(200);
        
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }

};

async function getFollowers(req, res) {

    const userId = res.locals.searchToken[0].userId;

    try {

        const followers = await followsRepository.getUserFollowers(userId);
        res.status(200).send(followers.rows);
        
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
};

async function getFollows(req, res) {

    const userId = res.locals.searchToken[0].userId;

    try {

        const follows = await followsRepository.getUserFollows(userId);
        res.status(200).send(follows.rows);
        
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
};

export { 
    confirmFollowedUser, 
    followUser, 
    unfollowUser, 
    getFollowers, 
    getFollows 
};