import { Router, Request, Response } from "express";
import CryptoJS from 'crypto-js'

import User from "../models/User";
import { CRYPTO_SECRET } from "../util/secrets";

const authRoute = Router()

// Register
authRoute.post('/register', async (req: Request, res: Response) => {
  
  const {firstname, lastname, username, email } = req.body
  const password = CryptoJS.AES.encrypt(req.body.password, CRYPTO_SECRET).toString()
  const newUser = new User({ 
    firstname, 
    lastname, 
    username, 
    email, 
    password
  })

  try{
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

export default authRoute