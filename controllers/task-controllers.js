import task from "../models/Task.js";
import user from "../models/User.js";
import mongoose from "mongoose";


export const createTask = async (req,res)=>{
    try{

        
        // const {id} = req.params;
        // const user1 = await user.findOne({_id:id});
        // if(user1.usertype== 'students'){
        //     return res.status(400).json('You cannot create task from student account ');
        // }
        const {title,description,assignedTo}=req.body;
        const newTask = new task({
            title:title,
            description:description,
            assignedTo:assignedTo,
            createdBY:req.user.name

        })
        // try{
        //     const session = await mongoose.startSession();
        //     session.startTransaction();           
        //     const success = await task_new.save({session});
        //     user1.tasks.push(task_new);
        //     await user1.save({session})
        //     await session.commitTransaction();

            const success = await newTask.save();
            console.log('task',req.user.tasks)

           const newUser = req.user.tasks.push(newTask);
        //    console.log(newUser);
            await req.user.save();
            const users = await user.find();
            users.map((user)=>{
                if(user.section===assignedTo&&user.usertype==='student') {user.tasksToBeDone.push(newTask)
                user.save();}
            })
            return res.status(201).json({success});
        // }
        // catch(err){
        //     return res.status(400).json(err)
        // }
            
            
        
    } catch(err){
        return  res.status(500).json(err)
    }
}
export const findTasksByTeacherId = async(req,res)=>{
    try{

        const {id}= req.params;
        // console.log(id)
        const userTasks = await user.findById({_id:id}).populate('tasks');
        if(!userTasks){
            return res.status(400).json('No usertasks found')
        }
        return res.status(200).json({userTasks});
        
        
    }catch(err){
        return res.status(500).json({'err':err});
    }
}
export const findTaskByStudentId = async(req,res)=>{
    try{

        const{id} = req.params;
        const studentTask = await user.findById(id).populate('tasksToBeDone')
        if(!studentTask){
            return res.status(400).json('No task found')
            
        }
        return res.status(200).json({studentTask})
    }catch(err) {return res.status(500).json(err)}
}