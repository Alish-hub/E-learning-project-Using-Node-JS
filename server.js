import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dbconnect } from './mongo/dbconnect.js';
import router from './routes/user_routes.js';
import morgan from 'morgan';
import router1 from './routes/task_routes.js';
const app= express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 4000
dbconnect();
app.use(morgan('tiny'))

app.use('/api',router)
app.use('/api/task',router1)
app.listen(PORT,()=>{
    console.log(`server is running to port ${PORT}`)
})


// console.log('checking');


