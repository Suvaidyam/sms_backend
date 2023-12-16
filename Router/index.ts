import express from 'express'
const router = express.Router();
import SchoolRoute from './SchoolRoute'
import UserRoute from './UserRoute'
import StudentRoute from './StudentRoute'
import verifyToken from '../verify/verify';


router.use("/auth",UserRoute)
router.use(verifyToken)
router.use("/school",SchoolRoute)
router.use("/student",StudentRoute)



export default router; 