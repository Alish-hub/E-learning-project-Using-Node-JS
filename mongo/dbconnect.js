import mongoose from 'mongoose';
import dotenv from 'dotenv';
 export const dbconnect= ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('datbase connected successfully'))
    // ,()=>
    // console.log('Databse connected succesfully')
    // )

 }