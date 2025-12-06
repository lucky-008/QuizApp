import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import resultRouter from './routes/resultRoutes.js';

import 'dotenv/config'
import {connectDB} from './config/db.js';

const app=express();
const port=4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



connectDB();
app.use('/api/auth',userRouter);
app.use('/api/results',resultRouter);


app.get('/',(req,res)=>{
    res.send("api working");
});
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})