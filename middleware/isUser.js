import jwt from 'jsonwebtoken';
import user from '../models/User.js';
import { token } from 'morgan';


export const isUser = async(req,res,next)=>{
    // authenticate users using access token only
    // try{
    //     const authHeaders = req.headers.authorization;
    //     const token = authHeaders&& authHeaders.split(" ")[1]
    //     if(token == null){
    //         return res.status(400).json('Unauthorized user');
    //     }
    //     else{
    //         jwt.verify(token,process.env.JWT_ACCESS_TOKEN,(err,user)=>{
    //             if(err){
    //                 // console.log(err);
    //                 return res.status(403).json(err)
                    
                
    //             }
    //             // console.log(user);
    //             req.user = user

    //             next();

    //         })


    //     }
    // }catch(err){
    //     return res.status(500).json(err)
    // }


    // Authenticate users using refresh token
    const accessToken = req.headers['authorization'];
    // console.log({accessToken:accessToken});
    
    const refreshToken = req.cookies['refreshToken'];
    // console.log({refreshToken:refreshToken});
    if(!accessToken&&!refreshToken){
        return res.status(401).json({message:'Access Denied.Session Expired!'})
    }
    try{

        const token =  accessToken && accessToken.split(" ")[1]
        jwt.verify(token,process.env.JWT_ACCESS_TOKEN,(err,user)=>{
            if(err){
                const user1=jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN)
                if(user1){

                    const aToken = jwt.sign({payload:user1},process.env.JWT_ACCESS_TOKEN,{expiresIn:'1m'})
                    return res.status(200).json({message:'JWT expired your new access token is:',accessToken:aToken})
                }
                return res.status(400).json('Invalid token')
                



            } 
            req.user= user;
            next();
        }) 

        

    }catch(err){
         return res.status(500).json({message:err.message});


    }
}