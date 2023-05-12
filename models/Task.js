import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        minlength: 10
    },

    assignedTo:{
        type:String,
        required:true
    },
    createdBY:{
        type:String,
        required:true
    },
     
})
const task = mongoose.model('Task',taskSchema);
export default task;