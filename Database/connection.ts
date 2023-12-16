import mongoose from 'mongoose';
const mongoURI = `mongodb://127.0.0.1:27017/smsproject`;
// const connectionProperties:any = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }
mongoose.connect(mongoURI).then((response:any)=>{
    console.log('MongoDB Connection Succeeded.')
}).catch((error:any)=>{
    console.log('Error in DB connection: ' + error)
});
export default mongoose;
