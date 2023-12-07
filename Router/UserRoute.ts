import express from 'express'
const router = express.Router()
import UserController from '../Controller/UserController'


router.post('/createuser', UserController.register);
router.post('/loginuser',UserController.login)

export default router;