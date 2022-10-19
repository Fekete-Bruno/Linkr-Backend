import './setup.js';
import express from 'express';
import cors from 'cors';
import Sign from './routes/sign.routes.js';
import postRouter from './routes/post.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(Sign);
app.use(postRouter);

export {
    app
};
