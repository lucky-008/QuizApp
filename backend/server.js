import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import resultRouter from './routes/resultRoutes.js';

import authRouter from "./middleware/auth.js";
import 'dotenv/config'
import {connectDB} from './config/db.js';

const app=express();



app.use("/auth", authRouter); // mount the auth routes at /auth





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