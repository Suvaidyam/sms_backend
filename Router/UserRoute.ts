import express from 'express'
const router = express.Router()
import UserController from '../Controller/UserController';


router.post('/loginuser',UserController.login);
router.post('/createuser', UserController.register);
router.post('/logoutuser',UserController.logout);
router.get('/seenuser',UserController.seenuser);
 
export default router;  