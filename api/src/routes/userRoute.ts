import { Router, Request, Response } from "express";
import CryptoJS from 'crypto-js'

import { verifyTokenAndAuthorization } from "../middlewares/tokenVerificator";
import userController from "../controllers/userController";
import { CRYPTO_SECRET } from "../util/secrets";
import User from "../models/User";

const userRoute = Router()

userRoute.get('/', userController.getAllUsers)
userRoute.put('/:id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
  if(req.body.password){
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      CRYPTO_SECRET
    ).toString()
  }

  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true})
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

export default userRoute