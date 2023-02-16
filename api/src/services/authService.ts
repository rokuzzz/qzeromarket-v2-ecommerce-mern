import { CRYPTO_SECRET, JWT_SECRET } from "../util/secrets";
import { UnauthorizedError } from "../helpers/apiError";
import User, { UserDocument } from "../models/User";

import CryptoJS from 'crypto-js'
import jwt from "jsonwebtoken";

const createUser = async (user: UserDocument) => {
  return user.save()
}

interface userLoginData {
  username: string
  password: string
}

const authenticateUser = async (loginData: userLoginData) => {
  const {username, password} = loginData
  const foundUser = await User.findOne({username})

  if (!foundUser) throw new UnauthorizedError("User not found.")

  const hashedPassword = CryptoJS.AES.decrypt(
    foundUser?.password!, 
    CRYPTO_SECRET
  )
  const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
  if (originalPassword !== password) throw new UnauthorizedError('Incorrect username or password.')

  const accessToken = jwt.sign(
    {
      id: foundUser._id,
      role: foundUser.role
    }, 
    JWT_SECRET,
    {expiresIn: '3d'}
  )

  const userAuthData = {
    _id: foundUser.id,
    fistname: foundUser.firstname,
    lastname: foundUser.lastname,
    username: foundUser.username,
    email: foundUser.email,
    role: foundUser.role, 
    accessToken: accessToken
  }

  return userAuthData
}

export default {
  createUser,
  authenticateUser
}