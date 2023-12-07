import express from 'express';
const router = express.Router();
import SchoolRegisterController from "../Controller/SchoolRegisterController";

router.post('/createschool', SchoolRegisterController.createSchool);
router.get('/getallschool',SchoolRegisterController.getSchools)
router.put('/updateschool/:id',SchoolRegisterController.updateSchool)
router.delete('/deleteschool/:id',SchoolRegisterController.deleteSchool)
export default router;