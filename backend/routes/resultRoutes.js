import express from 'express';
import authMiddleware from '../middleware/auth';
import { createResult } from '../controllers/resultController';

const resultRouter=express.Router();

resultRouter.post('/create',authMiddleware,createResult); 
resultRouter.get('/list',authMiddleware,createResult);      
export default resultRouter;