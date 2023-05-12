import express from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import user from '../models/User.js';
import  jwt from 'jsonwebtoken';
import { sendMail } from '../services/mail.js';



export const register = async (req,res)=>{
    try{

        const{name,email,password,section,usertype }=req.body;
        // const error = validationResult(req);
        // if(!error.isEmpty()){
        //     return res.status(400).send(error);
        // }
        
            const hashedpassword = bcrypt.hashSync(password,10);
            const existingUser = await user.findOne({email})
            if(existingUser){
                return res.status(400).json('email already exists')
            }
            else{
                 

                    const user1 = new user({
                        name:name,
                        email:email,
                        password:hashedpassword,
                        section:section,
                        usertype:usertype,
                        tasks:[]
                        
                    })
                    

    
                    
                
                

                    if(usertype === 'teacher') user1.tasks = []
                    user1.tasksToBeDone= []

                const success = await user1.save();
                return res.status(200).json({success})
            }
        
        
    }catch(err){
        return res.status(500).json(err)
    }
    
}
export const login = async(req,res)=>{
    try{
        const {email,password}= req.body;
        const userlog = await user.findOne({email:email});
        if(!userlog){
            return  res.status(400).json('User with this email doesnot exist');
        }
        else{
             const payload = {id:userlog._id, email:userlog.email,name:userlog.name}
             const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_TOKEN,{expiresIn:'1m'});
             const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_TOKEN,{expiresIn:'1d'});
             const compare =bcrypt.compareSync(password,userlog.password);
             if(!compare){
                return res.status(400).json('Incorrect password')

             }
             else{
                return res.cookie('refreshToken',refreshToken,{httpOnly:true,sameSite:'strict'})
                .header('authorization',accessToken)
                .status(200).json({mesage:'Logged in successfully',accessToken:accessToken,refreshToken:refreshToken})
                // return res .status(200).json({message:'Logged in successfullly',token:token,refreshToken:refreshToken})
            
             }

        }
    }catch(err){
        return res.status(500).json(err);

    }

}
export const getAll = async(req,res)=>{
    try{
        const{page=1,limit=10}= req.query;
        const userGet = await user.find()
        .limit(limit)
        .skip((page-1)*limit)
        .exec();
        // const count = await userGet.countDocuments();

        return res.status(200).json({
            userGet,
            // totalPages:Math.ceil(count/limit),
            currentPage:page

        });
    }catch(err){
        return res.status(500).json({error:err.message});

    }
}
export const getById = async(req,res)=>{
    try{
        const {id}= req.params;
        const userById = await user.findById(id);
        if(userById){
            return res.status(200).json(userById)

        }
        return res.status(400).json('user not found')

    }catch(err){
        return res.status(500).json(err);
    }

}
export const update = async(req,res)=>{
    try{

        const {id}= req.params;
        const{name,email,password}=req.body;
        const update = await user.findByIdAndUpdate(id,{
            name:name,
            email:email,
            password:password
            
        })
        return res.status(201).json('updated successfully.')
    }catch(err){
        return res.status(500).json(err);
    }
}



export const forgetPassword = async (req,res)=>{
    try{

        const{email}= req.body;
        const userFor = await user.findOne({email:email})
        console.log(userFor)
        if(!userFor){

            return res.status(400).json('User not found');

            }
        else{

            const payload = {id:userFor._id,email:userFor.email}


            const token = jwt.sign(payload,process.env.JWT_SECRET_TOKEN,{expiresIn:"1d"})
            console.log({token:token})
            
            await sendMail(email,token, req.headers.host).then((done)=>{
                console.log("done",done)


                    return res.status(200).json('check your email to reset your password')

                       
               
        }).catch((err)=>{
            console.log("inside catch error",err)
            return res.status(400).json(err)
        })
        
            }
        

    }catch(err){
        console.log("outside catch error",err)
        return res.status(500).json(err)

    }

}
export const resetPassword = async(req,res)=>{
    try{

        const{newPassword,confirmPassword} = req.body;
        const {token} = req.params;
        if(newPassword!== confirmPassword){
            return res.status(400).json('password doesnot match')
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET_TOKEN)
        console.log('verified',verified)
        if(!verified){
            return res.status(400).json('token not verified')
        }else{
            const userRes = await user.findOne({email: verified.email})
            console.log('user',userRes)
            const hassedPassword = bcrypt.hashSync(newPassword,10)
            userRes.password = hassedPassword;
            await userRes.save();
            return res.send(userRes)

        }

    }catch(err){
        console.log('err',err)
        return res.status(500).json(err);
    }
}