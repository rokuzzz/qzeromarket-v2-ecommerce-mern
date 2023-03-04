import multer from "multer";
import path from 'path'
import { BadRequestError } from "../helpers/apiError";

const storage = multer.memoryStorage();

// check file type
const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    throw new BadRequestError('You are only allowed to upload an image!')
  }
}

const fileUploader = multer({
  storage: storage,
  limits: {fileSize: 2000000},
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
}).single("productImage");

export default fileUploader;