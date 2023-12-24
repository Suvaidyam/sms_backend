import mongoose, { Schema, Document } from "mongoose";
import connection from '..//Database/connection'

enum UserRole {
    Teacher = 'teacher',
    Student = 'student',
    Principal = 'principal',
    Director = 'director',
}
                
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: UserRole;
    mobile: number;
    school:{
        type: mongoose.Types.ObjectId,
        ref:"SchoolRegister",
    }; 
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        
    },
    
    email: { type: String,
    required: true,
    unique: true 
    },

    password: { type: String,
    required: true 
    }, 

    role: { type: String,
    enum: Object.values(UserRole),
    required: true },

    mobile: {
        type:Number,
        required: true,
        unique: true 
    },
    school: {
        type: mongoose.Types.ObjectId,
        ref:"SchoolRegister",
        required: true,
    }
});

const UserModel = connection.model<IUser>('User', userSchema);

export default  UserModel ;
