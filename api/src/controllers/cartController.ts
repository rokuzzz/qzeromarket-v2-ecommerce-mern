import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../util/secrets'
import {
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
} from '../helpers/apiError'
import cartService from '../services/cartService'
import productService from '../services/productService'
import { ObjectId } from 'mongoose'
import { UserRole } from './../models/User'

interface MyJwtPayload extends jwt.JwtPayload {
  id: ObjectId
  role: UserRole
}

const modifyCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader)
      throw new UnauthorizedError('Authorization header is missing')

    const token = authHeader.split(' ')[1]
    let decoded: MyJwtPayload
    try {
      decoded = jwt.verify(token, JWT_SECRET) as MyJwtPayload
    } catch (err) {
      throw new ForbiddenError('Invalid or expired token')
    }

    if (!decoded) throw new ForbiddenError('Invalid Token')

    const userId = decoded.id
    const { title, quantity } = req.body

    const product = await productService.findByName(title)
    const cartItem = { cartItemDetails: product._id, quantity }

    const newItem = await cartService.addToCart(cartItem, userId)

    res.status(200).json(newItem)
  } catch (err) {
    next(err)
  }
}

const getUserCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const cart = await cartService.findByCondition(id)

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
    const id = req.params.id
    await cartService.deleteOne(id)

    res.status(200).json('Cart has been deleted...')
  } catch (err) {
    next(err)
  }
}

export default {
  modifyCart,
  getAllCarts,
  getUserCart,
  deleteCart,
}
