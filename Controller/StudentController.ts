import { Request, Response } from "express";
import StudentModel from '../Model/StudentModel'


// Create a new student
const createstudent = async (req: any, res: any) => {
  try {

    const { studetuserid, studentid, studentname, age, gender, dob, address, school, classname } = req.body;
    const image = req.file ? req.file.path : '';

    const student = {
      studetuserid,
      studentid,
      studentname,
      age,
      gender,
      dob,
      address,
      school,
      classname,
      image
    }
    const newStudent = new StudentModel(student)

    const savedStudent = await newStudent.save();
    return res.status(200).json({ message: "Student Created Successfully", newStudent: savedStudent })
  } catch (error) {
    return res.status(500).json({ error: 'Error Creating Student' });
  }
};

const getstudent = async (req: any, res: any) => {

  try {
        const studentuserid = req.query.studentuserid;
        
    if (studentuserid) {
      const students = await StudentModel.find({studetuserid:studentuserid})
      .populate("studetuserid",{
        username : 1 
      });
      res.status(200).json({ message: "Success", oneStudent: students });
      
    } else {
      const students = await StudentModel.find({});
      res.status(200).json({ message: "Success", students: students });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
  }
};


const updatestudent = async (req: any, res: any) => {
  try {
    const { studetuserid, studentid, studentname, age, gender, dob, address, school, classname } = req.body;
    const image = req.file ? req.file : null; 
    // console.log(image);
    
    const StudentUpdate = await StudentModel.findOneAndUpdate({studetuserid:studetuserid}, {
      studentid, studentname, age, gender, dob, address, school, classname, image
    });

    res.status(200).json({ message: "Update Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
  }
};


export default { createstudent, getstudent ,updatestudent }