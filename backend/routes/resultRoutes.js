import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { createResult } from '../controllers/resultController.js';

const resultRouter=express.Router();

resultRouter.post('/create',authMiddleware,createResult); 
resultRouter.get('/list',authMiddleware,createResult);

export default resultRouter;