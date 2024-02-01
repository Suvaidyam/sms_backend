import express from 'express'
const router = express.Router();
import StudentController from '../Controller/StudentController';
import upload from '../multer';


router.post('/createstudent',upload.single('image'), StudentController.createstudent);
router.get('/getstudent', StudentController.getstudent);
router.patch('/updatestudent',upload.single('image'), StudentController.updatestudent);


export default router;