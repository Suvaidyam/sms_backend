import mongoose, { Schema, Document } from 'mongoose';
// import connection from '../Database/connection';
import conection from '../Database/connection'
interface SchoolRegister {
    schoolname: string;
    schoolcode: string;
    logo: string;
    location: string;
    affliated: boolean;
    foundingyear: number;
}


interface SchoolRegisterModel extends SchoolRegister, Document { }

const SchoolRegisterSchema: Schema = new Schema({
    schoolname: {
        type: String,
        required: true,
        unique:true
    },
    schoolcode: {
        type: String,
        required: true,
        unique: true

    },
    logo: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    affliated: {
        type: Boolean,
        default: false
    },
    foundingyear: {
        type: Number,
        required: true
    },
});

const SchoolRegisterModel = conection.model<SchoolRegisterModel>('SchoolRegister', SchoolRegisterSchema);

export default SchoolRegisterModel;
