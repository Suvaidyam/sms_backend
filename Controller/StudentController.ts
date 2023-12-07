import { Request, Response } from "express";
import StudentModel from '..//Model/StudentModel'


// Create a new student
const createstudent =  async (req:any, res:any) => {
    try {
        const newStudent = new StudentModel(req.body);
        const savedStudent = await newStudent.save();
      return  res.status(200).json({message:"Student Created Successfully",newStudent:savedStudent})
    } catch (error) {
     return   res.status(500).json({ error: 'Error Creating Student' });
    }
};

export default {createstudent}