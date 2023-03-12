import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import CryptoJS from 'crypto-js'

import { CRYPTO_SECRET, JWT_SECRET } from "../util/secrets";
import userService from "../services/userService";
import { UnauthorizedError } from "../helpers/apiError";

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

const getUserByJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (typeof authHeader == 'undefined') throw new UnauthorizedError('You are not authorized!')
  const token = (<string>authHeader).split(" ")[1]
  jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
    if (err) next(err)
    else {
      try{
        req.user = decoded
        const user = await userService.findById(decoded.id)
        const {password, ...others} = user?._doc
        res.status(200).send(others)
      } catch (err) {
        next(err)
      }
    }
  }) 
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
  getUserByJWT,
  updateUser,
  deleteUser
}