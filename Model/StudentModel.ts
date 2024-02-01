import mongoose, { Schema } from "mongoose";
import connection from '..//Database/connection';

interface Student {
    usertype: string,
    studentid:Number,
    studentname:string,
    age:Number,
    gender:string,
    dob: string, 
    address:string,
    school:string,
    classname:string,
    image:string,
    studetuserid:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
}

interface StudentModel extends Student, Document { }

const StudentSchema: Schema = new Schema({
    usertype: {
        type: String,
        default: "student"
        
    },
    studentid: {
        type: String,
        required: true,
        unique: true

    },
    studentname: {
        type: String,
        required: true
    },

    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        require:true

    },
    dob:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    school:{
        type:String,
        require:true
    },
    classname:{
        type:String,
        require:true
    },
    image:{
        type:String
    },
    studetuserid:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:true,
        unique:true
    }
});

const StudentModel = connection.model<StudentModel>('Student', StudentSchema);

export default StudentModel;