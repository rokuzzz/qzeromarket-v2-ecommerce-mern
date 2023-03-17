import { Response, Request, NextFunction } from "express";
import CryptoJS from 'crypto-js'
import jwt from "jsonwebtoken";

import { CRYPTO_SECRET, JWT_SECRET } from "../util/secrets";
import User, { UserRole } from "../models/User";
import { UnauthorizedError } from "../helpers/apiError";
import authService from "../services/authService";

const register = async (req: Request, res: Response, next: NextFunction) => {
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
    const savedUser = await authService.createUser(newUser)
    res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {username, password} = req.body
    const loginData = {username, password}
    const user = await authService.authenticateUser(loginData)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export default {
  register,
  login
}