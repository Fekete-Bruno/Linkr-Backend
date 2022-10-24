import {
    selectHashtags,
    selectPostsByHashtag
} from '../repositories/hashtags.repositories.js';

import { formatPostsByHashtag } from '../services/hashtags.services.js';

async function listHashtags (req, res) {
    try {
        const selection = (await selectHashtags()).rows;
        res.send(selection);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function listPostsByHashtag(req, res) {
    const { hashtag } = req.params;
    try {
        const selection = (await selectPostsByHashtag(hashtag)).rows;
        const response = formatPostsByHashtag(selection);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    listHashtags,
    listPostsByHashtag
};

