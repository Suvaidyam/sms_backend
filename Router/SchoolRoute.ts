import express from 'express';
const router = express.Router();
import upload from '../multer/index'
import SchoolRegisterController from "../Controller/SchoolRegisterController";
const path = require('path');

router.post('/createschool',upload.single('image'), SchoolRegisterController.createSchool);
router.get('/getallschool',SchoolRegisterController.getSchools)
router.put('/updateschool/:id',SchoolRegisterController.updateSchool)
router.delete('/deleteschool/:id',SchoolRegisterController.deleteSchool)
export default router;