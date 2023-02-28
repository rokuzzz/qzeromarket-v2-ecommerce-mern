import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../util/secrets";
import { ForbiddenError, UnauthorizedError, NotFoundError } from "../helpers/apiError";
import cartService from "../services/cartService";
import productService from "../services/productService";

const createCart = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (typeof authHeader !== 'undefined') {
    const token = (<string>authHeader).split(" ")[1]
    jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
      if (err) throw new ForbiddenError()
      else {
        try {
          req.user = decoded
          const userId = decoded.id
          const {title, quantity} = req.body

          const product = await productService.findByName(title)

          if (product) {
            const productId = product._id
            const cartItem = {productId, quantity}
            const newItem = await cartService.createCart(cartItem, userId)
            res.sendStatus(200).json(newItem)
          } else {
            throw new NotFoundError()
          }
        } catch (err) {
          next(err)
        }
      }
    })
  } else {
    console.log('here')
    throw new UnauthorizedError('You are not authorized!')
  }
}

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  const { title, quantity } = req.body
  console.log(title)
  console.log(quantity)
  const authHeader = req.headers.authorization

  if (typeof authHeader == 'undefined') throw new UnauthorizedError('You are not authorized!')

  const token = authHeader.split(" ")[1]
  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) throw new ForbiddenError()
    else {
      const userId = decoded._id
      try {
        res.send(200).json(userId)
      } catch (err) {
        next(err)
      }
    }
  })
}

export default {
  createCart,
  addToCart
}