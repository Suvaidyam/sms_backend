import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the directory where you want to store uploaded files
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        console.log(file)
      // Specify how you want to name the uploaded files
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  // Initialize Multer with the storage settings
export default multer({ storage: storage })