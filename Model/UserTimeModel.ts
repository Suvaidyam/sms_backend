import { Schema, Document, model ,Types } from 'mongoose';

interface IUSERTIME extends Document {
    userid: Types.ObjectId;
    logintime:Date,
    logouttime:Date,
};
const LoginLogoutSchema = new Schema({
    userid:{
        type: Types.ObjectId,
    },
    logintime:{
        type:Date,
    },
    logouttime:{
        type:Date,
    },
});
const UserTime = model<IUSERTIME>('UserTime',LoginLogoutSchema);

export default UserTime;