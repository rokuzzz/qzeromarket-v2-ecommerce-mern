import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
  destination: '../../public/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
  },
});

const fileUpload = multer({
  storage,
}).single("image");

export default fileUpload;