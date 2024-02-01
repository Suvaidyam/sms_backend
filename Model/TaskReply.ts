import mongoose, { Schema} from "mongoose";
import mongoURL from "../Database/connection";


interface ITask extends Document{
    
    answer:string,
    grad:{
        type:number,
    }
    
    studentid:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    studentprofileid:{
        type:mongoose.Types.ObjectId,
        ref:"Student"
    },
    teacherid:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    taskid:{
        type:mongoose.Types.ObjectId,
        ref:"task"
    },
    date:{
        type: Date,
    }
}
const TaskReplySchema = new Schema<ITask>({

    answer:{
        type:String,
        required:true
    },
    grad:{
        type:Number
    },
    studentid:{
        type:mongoose.Types.ObjectId,
       
        ref:"User"
    },
    studentprofileid:{
        type:mongoose.Types.ObjectId,
       
        ref:"Student"
    },
    teacherid:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    taskid:{
        type:mongoose.Types.ObjectId,
        
        ref:"task"
    },
    date: {
        type: Date,
        default: Date.now
        }

});

const TaskReply = mongoURL.model<ITask>('taskreply',TaskReplySchema);

export default TaskReply;