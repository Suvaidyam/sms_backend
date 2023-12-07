import mongoose from 'mongoose';
const mongoURI = `mongodb+srv://ajamat786:ajamat123@crud.dgszded.mongodb.net/smsproject`;
const connectionProperties:any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(mongoURI, connectionProperties).then((response:any)=>{
    console.log('MongoDB Connection Succeeded.')
}).catch((error:any)=>{
    console.log('Error in DB connection: ' + error)
});
export default mongoose;
