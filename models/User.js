import mongoose from 'mongoose';
const userModel = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type: String,
        required:true,
        minlength:6
    },
    section:{
        type: String,
        required: false
        
    },
    usertype:{
        type: String,
        enum : ['student','teacher']

    },
    tasks :[{
        type:mongoose.Types.ObjectId,
        ref:'Task',
        required:false
    }],
    tasksToBeDone:[{
        type:mongoose.Types.ObjectId,
        ref:'Task',
        
    }]
},
    {timestamps:true}
)


const user = mongoose.model('UserModel',userModel);
export default  user;