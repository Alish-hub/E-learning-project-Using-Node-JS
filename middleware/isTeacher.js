import user from "../models/User.js";
export const isTeacher =  async(req,res,next)=>{

    const {id} = req.params;
    const user1 = await user.findOne({_id:id});
    if(user1.usertype === 'student'){
        return res.status(400).json({'meaasge':'You cannot create task from student account '});
    }else{

        req.user =user1;
        next();
    }
}