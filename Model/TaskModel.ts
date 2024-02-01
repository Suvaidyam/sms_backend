import mongoose, { Schema} from "mongoose";
import mongoURL from "../Database/connection";


interface ITask extends Document{
    title:string,
    description:string,
    startdate:Date,
    duedate:Date,
    className:string,
    schoolid:{
        type:mongoose.Types.ObjectId,
        ref:"SchoolRegister"
    },
    subject:string,
    answer:string,
    studentid:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    teacherid:{
        studentid:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    },
    commentanswer:{
        type:mongoose.Types.ObjectId,
        ref:"taskreply"
    },
    date:{
        type: Date,
       
    },
    completed:{
        type: boolean,
        default:false
    },
    replyid:{
        type:mongoose.Types.ObjectId,
        
        ref:"taskreply"
    },
}
const TaskSchema = new Schema<ITask>({
    title :{
        type:String,
        require:true
    },
    description:{
        type:String,
        // require:true
    },
    answer:{
        type:String,

    },
    startdate:{
        type:Date,
        require:true,
        default:new Date
    },
    duedate:{
        type:Date,
        require:true
    },
    className:{
        type:String,
        require:true
    },
    schoolid:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:"SchoolRegister"
    },
    studentid:{
        type:mongoose.Types.ObjectId,
       
        ref:"User"
    },
    teacherid:{
        type:mongoose.Types.ObjectId,
        
        ref:"User"
    },
    replyid:{
        type:mongoose.Types.ObjectId,
        
        ref:"taskreply"
    },
    subject:{
        type:String,
        require:true,
        
    },
    commentanswer:{
        type:mongoose.Types.ObjectId,
        ref:"taskreply"
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default:false

    }
    
});

const TaskAdd = mongoURL.model<ITask>('task',TaskSchema);

export default TaskAdd;