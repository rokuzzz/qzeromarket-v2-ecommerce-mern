import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../util/secrets";
import { ForbiddenError, UnauthorizedError, NotFoundError } from "../helpers/apiError";
import cartService from "../services/cartService";
import productService from "../services/productService";

const createOrUpdateCart = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const {title, quantity} = req.body

  if (typeof authHeader == 'undefined') throw new UnauthorizedError('You are not authorized!')
  const token = (<string>authHeader).split(" ")[1]
  jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
    if (err) throw new ForbiddenError()
    else {
      try {
        req.user = decoded
        const userId = decoded.id

        const product = await productService.findByName(title)
        const productId = product._id
        const cartItem = {productId, quantity}

        const newItem = await cartService.addToCart(cartItem, userId)
        res.status(200).json(newItem)

      } catch (err) {
        next(err)
      }
    }
  })
}

const getUserCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartService.findByCondition(req.params.id)
    console.log(cart)
    res.status(200).send(cart)
  } catch (err) {
    next(err)
  }
}

const getAllCarts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carts = await cartService.findAll()
    res.status(200).send(carts)
  } catch (err) {
    next(err)
  }
}

const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await cartService.deleteOne(req.params.id)
    res.status(200).json('Cart has been deleted...')
  } catch (err) {
    next(err)
  }
}

export default {
  createOrUpdateCart,
  getAllCarts,
  getUserCart,
  deleteCart
}