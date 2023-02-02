import { Router, Request, Response } from "express";
import CryptoJS from 'crypto-js'
import jwt from "jsonwebtoken";

import User, { UserRole } from "../models/User";
import { CRYPTO_SECRET, JWT_SECRET } from "../util/secrets";
import {  UnauthorizedError } from "../helpers/apiError";

const authRoute = Router()

// Register
authRoute.post('/register', async (req: Request, res: Response) => {
  
  const {firstname, lastname, username, email } = req.body
  const password = CryptoJS.AES.encrypt(req.body.password, CRYPTO_SECRET).toString()
  const role: UserRole = 'guest'
  const newUser = new User({ 
    firstname, 
    lastname, 
    username, 
    email, 
    password,
    role
  })

  try{
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

authRoute.post('/login', async (req:Request, res: Response) => {
  try{
    const user = await User.findOne({username: req.body.username})
    if (!user) throw new UnauthorizedError()
    
    const hashedPassword = CryptoJS.AES.decrypt(
      user?.password!, 
      CRYPTO_SECRET)
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
    if (originalPassword !== req.body.password) throw new UnauthorizedError()

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role
      }, 
      JWT_SECRET,
      {expiresIn: '3d'}
    )

    const { password, ...others} = user._doc;
    res.status(200).json({...others, accessToken})

  } catch (err) {
    res.status(500).json(err)
  }
})

export default authRoute