import express from 'express'
const router = express.Router();
import StudentController from '../Controller/StudentController';


router.post('/createschool', StudentController.createstudent);

export default router;