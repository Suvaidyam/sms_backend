import mongoose, { Schema } from "mongoose";
import connection from '..//Database/connection'
interface Student {
    usertype: string,
    studentid:Number,
    studentname:string,
    mobile:string,
    email:string,
    password:string,
    age:Number,
    gender:string,
    dob: string,
    address:string,
    class:string,
    image:string,
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
    mobile: {
        type: String,
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,

    },
    dob:{
        type:String,
    },
    address:{
        type:String,

    },
    class:{
        type:String,

    },
    image:{
        type:String
    }
});

const StudentModel = connection.model<StudentModel>('Student', StudentSchema);

export default StudentModel;