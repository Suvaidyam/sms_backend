import express from 'express'
const router = express.Router();
import SchoolRoute from './SchoolRoute'
import UserRoute from './UserRoute'
import StudentRoute from './StudentRoute'
import verifyToken from '../verify/verify';
import TaskRoute from './TaskRoute';
import ImageSlider from './ImageSlider'

router.use("/auth",UserRoute) 
// router.use(verifyToken)
router.use("/school",SchoolRoute) 
router.use("/student",StudentRoute)
router.use("/image",ImageSlider)
router.use("/task",TaskRoute)


export default router; 