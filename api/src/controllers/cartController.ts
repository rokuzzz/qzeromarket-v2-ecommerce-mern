import { Request, Response } from "express"
import cartService from "../services/cartService"
import Cart from "../models/Cart"

const createCart = async (req: Request, res: Response) => {
  const newCart = new Cart(req.body)
  try{
    const savedCart = await cartService.createOne(newCart)
    res.status(200).send(savedCart)
  } catch (err) {
    res.status(500).json(err)
  }
}