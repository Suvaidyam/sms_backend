import TaskAdd from '../Model/TaskModel';
import TaskReply from '../Model/TaskReply'


const createtask = async (req: any, res: any) => {
  try {
    const { title, description, startdate, duedate, className, schoolid, teacherid, subject, studentid } = req.body;

    const newTask = new TaskAdd({
      title,
      description,
      startdate,
      duedate,
      className,
      schoolid,
      subject,
      studentid,
      teacherid
    });

    await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const updatetask = async (req: any, res: any) => {
  try {
    const { title, description, ReplyAnswer: answer, startdate, duedate, className, schoolid, studentid, teacherid, subject, _id } = req.body;

    const newUpdateTask = await TaskAdd.findByIdAndUpdate(_id, {
      title,
      description,
      answer,
      startdate,
      duedate,
      className,
      schoolid,
      studentid,
      teacherid,
      subject,
    }, { new: true });

    if (!newUpdateTask) {
      return res.status(404).json({ message: 'Task not found' });
    }


    res.status(201).json({ message: 'Data Update', task: newUpdateTask });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const gettask = async (req: any, res: any) => {

  try {
    const _id = req.query.id;
    const userClass = req.query.userClass;
    const schoolid = req.query.schoolid;
    
    const teacherid = req.query.teacherid;
    const subject = req.query.subject;


    if (_id) {
      const userTask = await TaskAdd.find({ _id }).populate("teacherid", { username: 1 }).sort({ date: -1 });

      res.status(201).json({ message: 'data fatech successfully ', Task: userTask })
    }
    else if (userClass && schoolid && subject) {
      const userTask = await TaskAdd.find({ className: userClass, schoolid: schoolid ,subject:subject}).sort({ date: -1 })
      .populate('replyid',{grad:1});
      res.status(201).json({ message: 'data fatech successfully ', Task: userTask })
    }
    else if (teacherid && subject && userClass) {
      const userTask = await TaskAdd.find({ className: userClass, teacherid: teacherid ,subject:subject}).sort({ date: -1 });
      res.status(201).json({ message: 'data fatech successfully ', Task: userTask })
    }
    else {
      const userTask = await TaskAdd.find({}).sort({ date: -1 });
      res.status(201).json({ message: 'data fatech successfully ', Task: userTask })
    }

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }

}
const deletetask = async (req: any, res: any) => {

}
//////////// Task Reply /////////////////

const createreplytask = async (req: any, res: any) => {
  try {
    const { taskid,answer, studentid ,teacherid ,studentprofileid } = req.body;

      const newReply = await TaskReply.create({
        answer,
        studentid,
        taskid,
        teacherid,
        studentprofileid
      });
      res.status(201).json({ message: 'Task Reply successfully', newReply: newReply });
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getreplytask = async (req: any, res: any) => {

  try {
    const taskid = req.query.taskid ;
    // const taskidd = req.query.MytaskId;
    // const subject = req.query.subject;
    const studentid = req.query.studentid;
    // console.log( " vishal "  +  studentid , taskid); 

    const userTaskBYid = await TaskReply.find({ taskid: taskid }).populate("studentid" , {username:1 ,userClass:1});

    if (userTaskBYid.length > 0) {
      return res.status(201).json({ message: 'data fatech successfully ', TaskAll: userTaskBYid });
    }
    else if (taskid && studentid) {
         
    const userTask = await TaskReply.findOne({ taskid: taskid, studentid: studentid });
    // console.log( " VK"  +  userTask);
    
    if (userTask) {
      return res.status(200).json({ message: 'Data fetched successfully', Task: userTask });
    } else {
      const userTask = await TaskReply.find({});
      return res.status(404).json({ message: 'No data found for the provided taskid and studentid' , Task: userTask  });
    }
    }
    else {
      const userTask1 = await TaskReply.find({})
      .populate("studentid" ,{email:1,mobile:1})
      .populate("studentprofileid",{studentname:1,studentid:1,gender:1,classname:1,image:1 })
      .populate("taskid",{title:1,description:1,subject:1,startdate:1,duedate:1});
      return res.status(200).json({ message: 'Data fetched successfully', Task: userTask1 });
    }

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }

}
const updatereplytask = async (req:any,res:any)=>{
  try {
      const {_id,grad} = req.body;
      const UpdateData = await TaskReply.findByIdAndUpdate(_id,{grad},{new:true});
      res.status(201).json({message:"Grad Updated" ,UpdateData:UpdateData})
      
  } catch (error) {
    console.log(error);
    
  }
}

export default { createtask, gettask, updatetask, deletetask, createreplytask, getreplytask ,updatereplytask}   