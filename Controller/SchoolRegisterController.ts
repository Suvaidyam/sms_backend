import { Request, Response } from 'express';
import SchoolRegisterModel from '../Model/SchoolRegisterModel';

// Created School 
const createSchool = async (req: any, res: Response) => {
  try {
    console.log(req.body)
      const schools = new SchoolRegisterModel(req.body);
      const saveSchool = await schools.save();
      console.log(saveSchool)
      return res.status(200).json({ message: "School created successfully",schools:saveSchool});
     
    } catch (error) {
      res.status(400).json({ error: 'Error creating school' });
      console.log(error)
    }
  };

  // GetAllSchool
  const getSchools = async (req:any, res:Response) => {
    try {
      const schools = await SchoolRegisterModel.find();
      console.log(schools)
      return res.status(200).json({ schools });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching schools' });
    }
  };
  //Update School
 

  const updateSchool = async (req:any, res:Response) => {
    try {
      const { schoolname, schoolcode, logo, location,affliated,foundingyear} = req.body;
      const schoolId = req.params.id;
  
      const updatedSchool = await SchoolRegisterModel.findByIdAndUpdate(
        schoolId,
        { schoolname, schoolcode, logo, location,affliated,foundingyear},
        { new: true }
      );
  
      if (!updatedSchool) {
        return res.status(404).json({ error: 'School not found' });
      }
  
      return res.status(200).json({ message: 'School updated successfully', school: updatedSchool });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating school' });
    }
  };
  











  //Delete School 
  const deleteSchool = async (req:any, res:Response) => {
    try {
      const schoolId = req.params.id;
      const deletedSchool = await SchoolRegisterModel.findByIdAndDelete(schoolId);
  
      if (!deletedSchool) {
        return res.status(404).json({ error: 'School not found' });
      }
  
      return res.status(200).json({ message: 'School deleted successfully', school: deletedSchool });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting school' });
    }
  };
export default { createSchool, getSchools,deleteSchool,updateSchool };