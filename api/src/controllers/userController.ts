import { Request, Response } from "express";

const getAllUsers = (req: Request, res: Response) => {
  res.send('Get from userRoute')
}

export default {
  getAllUsers
}