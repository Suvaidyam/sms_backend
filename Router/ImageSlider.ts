import express from 'express';
const router = express.Router();
import upload from '../multer/index'  
import ImageController from '../Controller/ImageController';

router.post('/createimage',upload.single('image'),ImageController.createimage)
router.get('/getimage',upload.single('image'),ImageController.getimage)
router.patch('/updateimage',upload.single('image'),ImageController.updateimage)



export default router;