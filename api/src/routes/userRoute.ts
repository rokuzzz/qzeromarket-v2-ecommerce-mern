import { Router, Request, Response } from "express";
import userController from "../controllers/userController";

const userRoute = Router()

userRoute.get('/', userController.getAllUsers)

export default userRoute