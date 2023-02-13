import { Request, Response } from "express";
import CryptoJS from 'crypto-js'

import User from "../models/User";
import { CRYPTO_SECRET } from "../util/secrets";

const getAllUsers = (req: Request, res: Response) => {
  res.send('Get from userRoute')
}

const updateUser = async (req: Request, res: Response) => {
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
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('User has been deleted.')
  } catch (err) {
    res.status(500).json(err)
  }
}

export default {
  getAllUsers,
  updateUser,
  deleteUser
}