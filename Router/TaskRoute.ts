import express from "express";
const router = express.Router();
import TaskControll from "../Controller/TaskControll"

router.post('/createtask', TaskControll.createtask);
router.get('/gettask', TaskControll.gettask);
router.patch('/updatetask', TaskControll.updatetask);
router.delete('/deletetask', TaskControll.deletetask);


router.post('/createreplytask',TaskControll.createreplytask);
router.get('/getreplytask',TaskControll.getreplytask);
router.patch('/updatereplytask',TaskControll.updatereplytask);


export default router;
 