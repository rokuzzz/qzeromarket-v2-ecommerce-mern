import { Router, Request, Response } from "express";
import User from "../models/User";

const authRoute = Router()

// Register
authRoute.post('/register', async (req: Request, res: Response) => {
  try{
    const {firstname, lastname, username, email, password} = req.body
    let newUser = new User({ firstname, lastname, username, email, password })
    await newUser.save()
  } catch {

  }
})