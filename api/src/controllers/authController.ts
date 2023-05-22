import { Response, Request, NextFunction } from 'express'
import CryptoJS from 'crypto-js'

import { CRYPTO_SECRET } from '../util/secrets'
import User, { UserRole } from '../models/User'
import authService from '../services/authService'

const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, CRYPTO_SECRET).toString()
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { firstname, lastname, username, email, password } = req.body
  const role: UserRole = 'guest'

  const encryptedPassword = encryptPassword(password)

  const newUser = new User({
    firstname,
    lastname,
    username,
    email,
    password: encryptedPassword,
    role,
  })

  try {
    const savedUser = await authService.createUser(newUser)

    res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body
    const loginData = { username, password }

    const user = await authService.authenticateUser(loginData)

    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export default {
  register,
  login,
}
