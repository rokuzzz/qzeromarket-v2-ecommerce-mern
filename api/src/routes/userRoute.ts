import { Router, Request, Response } from "express";
import CryptoJS from 'crypto-js'

import { verifyUserOrAdmin, verifyAdmin } from "../middlewares/tokenVerificator";
import userController from "../controllers/userController";

const userRoute = Router()

userRoute.get('/', userController.getAllUsers)
userRoute.get('/find/:id',  verifyAdmin, userController.getUser)
userRoute.put('/:id', verifyUserOrAdmin, userController.updateUser)
userRoute.delete('/:id', verifyUserOrAdmin, userController.deleteUser)

export default userRoute