import { Request, Response } from "express";
import CryptoJS from 'crypto-js'

import { CRYPTO_SECRET } from "../util/secrets";
import userService from "../services/userService";

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.findById(req.params.id)
    const {password, ...others} = user?._doc
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.findAll()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateUser = async (req: Request, res: Response) => {
  if(req.body.password){
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      CRYPTO_SECRET
    ).toString()
  }
  try{
    const updatedUser = await userService.updateOne(
      req.params.id,
      { $set: req.body }, 
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteOne(req.params.id)
    res.status(200).json('User has been deleted.')
  } catch (err) {
    res.status(500).json(err)
  }
}

export default {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
}