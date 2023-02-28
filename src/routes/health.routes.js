import express from 'express';

const router = express.Router();

router.get('/health', (_req,res)=>{
    return res.send('Connection is healthy!').status(200);
});

export default router;