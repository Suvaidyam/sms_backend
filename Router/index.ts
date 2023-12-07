import express from 'express'
const router = express.Router();
import SchoolRoute from './SchoolRoute'
import UserRoute from './UserRoute'
import StudentRoute from './StudentRoute'


router.use("/school",SchoolRoute)
router.use("/auth",UserRoute)
router.use("/student",StudentRoute)



export default router;