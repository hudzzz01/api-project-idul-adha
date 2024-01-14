import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const fileName = "user-"+Date.now()+ path.extname(file.originalname);
      cb(null, fileName);
    }
  });
  
const upload = multer({ storage: storage });

export default upload;