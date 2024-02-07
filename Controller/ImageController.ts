import ImageSlider from '../Model/ModelImageSlider';


const createimage =async (req:any,res:any) =>{
    try {
        const {title,description} = req.body;
        const image = req.file ? req.file.path : ''; 
        const Data = {
            title,
            description,
            image
        }
        const imageSlider = new ImageSlider(Data);
        const savedImage = await imageSlider.save();

        res.status(200).json({message:'saved_200' ,savedImage:savedImage})
    } catch (error) {
        res.status(400).json({message:'ERROR_400' ,error:error})
    }
}
const getimage = async (req:any, res:any) => {
    try {
        const image = await ImageSlider.find({});
        res.status(201).json({message:"getSuss_200",image:image})
    } catch (error) {
        res.status(400).json({message:'ERROR_400' ,error:error})
    }
}
const updateimage = async (req:any,res:any) =>{
    try {
        const {title,description ,_id} = req.body;
        const image = req.file ? req.file.path : "";

        const imageUpdate = ImageSlider.findByIdAndUpdate(
            _id,
             {title:title ,description:description, _id:_id},
             {new:true}
        );
        res.status(200).json({message:"updateSuss_200",imageUpdate:imageUpdate})
    } catch (error) {
        res.status(400).json({message:'ERROR_400' ,error:error})
    }
}

export default {createimage , getimage ,updateimage}