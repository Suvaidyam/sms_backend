import mongoose, { Schema} from "mongoose";
import mongoURL from "../Database/connection";


interface ITask extends Document{
    title:string,
    description:string, 
    image:string
   
}
const SchemaImageSlider = new Schema<ITask>({
    title :{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:String,
        // require:true
    },
    image:{
        type:String,
        require:true
    },
    
});

const ImageSlider = mongoURL.model<ITask>('ImageSlider',SchemaImageSlider);

export default ImageSlider;