import { Response } from 'express';
import SchoolRegisterModel from '../Model/SchoolRegisterModel';


// Created School 
const createSchool = async (req: any, res: Response) => {
  try {
    const { schoolname, schoolcode, location, affliated, foundingyear } = req.body;

    // Assuming req.file contains the uploaded file information
    const logo = req.file ? req.file.path : ''; // Use the appropriate property based on your file upload middleware

    const schoolData = {
      schoolname,
      schoolcode,
      logo,
      location,
      affliated,
      foundingyear,
    };

    const school = new SchoolRegisterModel(schoolData);

    const savedSchool = await school.save();

    return res.status(200).json({ message: 'School created successfully', school: savedSchool });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Error creating school' });
  }
};
 

// GetAllSchool
const getSchools = async (req: any, res: Response) => {
  try { 
    const school = req.query.school;
    const schools = await SchoolRegisterModel.find(school !== '' ? { schoolname: school } : {});
    return res.status(200).json({ schools });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching schools' });
  }
};

const getAllSchools = async (req: any, res: Response) => {
  try {
    const schools = await SchoolRegisterModel.find();
    return res.status(200).json({ schools });
  } catch (error) {
    // console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching schools' });
  }
};



// Update School
const updateSchool = async (req: any, res: Response) => {
  try {
    const { schoolname, schoolcode, location, affliated, foundingyear } = req.body;
    const schoolId = req.params.id;

    const updatedSchool = await SchoolRegisterModel.findByIdAndUpdate(
      schoolId,
      { schoolname, schoolcode, location, affliated, foundingyear },
      { new: true }
    );

    if (!updatedSchool) {
      return res.status(404).json({ error: 'School not found' });
    }

    return res.status(200).json({ message: 'School updated successfully', school: updatedSchool });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Error updating school' });
  }
};

// Delete School 
const deleteSchool = async (req: any, res: Response) => {
  try {
    const schoolId = req.params.id;
    const deletedSchool = await SchoolRegisterModel.findByIdAndDelete(schoolId);

    if (!deletedSchool) {
      return res.status(404).json({ error: 'School not found' });
    }

    return res.status(200).json({ message: 'School deleted successfully', school: deletedSchool });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Error deleting school' });
  }
};

export default { createSchool, getSchools, deleteSchool, updateSchool ,getAllSchools };
