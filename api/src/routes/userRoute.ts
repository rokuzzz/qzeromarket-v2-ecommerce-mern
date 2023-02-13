import { Router, Request, Response } from "express";
import CryptoJS from 'crypto-js'

import { verifyUserOrAdmin } from "../middlewares/tokenVerificator";
import userController from "../controllers/userController";
import { CRYPTO_SECRET } from "../util/secrets";
import User from "../models/User";

const userRoute = Router()

userRoute.get('/', userController.getAllUsers)
userRoute.put('/:id', verifyUserOrAdmin, userController.updateUser)
userRoute.delete('/:id', verifyUserOrAdmin, userController.deleteUser)

export default userRoute