import './setup.js';
import express from 'express';
import cors from 'cors';
import Sign from './routes/sign.routes.js';
import User from './routes/users.routes.js';
import Posts from './routes/post.routes.js';
import Likes from './routes/likes.routes.js';
import Hashtags from './routes/hashtags.routes.js';
import Follows from './routes/follows.routes.js';
import Comments from './routes/comments.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(Sign);
app.use(User);
app.use(Posts);
app.use(Likes);
app.use(Hashtags);
app.use(Follows);
app.use(Comments);

export {
    app
};
