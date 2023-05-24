import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

import { ForbiddenError, UnauthorizedError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'
import { UserRole } from '../models/User'
import productService from '../services/productService'
import favoritesService from '../services/favoritesService'

interface MyJwtPayload extends jwt.JwtPayload {
  id: ObjectId
  role: UserRole
}

const modifyFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw new UnauthorizedError('Authorization header is missing')
    }

    const token = authHeader.split(' ')[1]
    let decoded: MyJwtPayload
    try {
      decoded = jwt.verify(token, JWT_SECRET) as MyJwtPayload
    } catch (err) {
      throw new ForbiddenError('Invalid or expired token')
    }

    if (!decoded) throw new ForbiddenError('Invalid Token')

    const userId = decoded.id
    const title = req.body.title

    const product = await productService.findByName(title)
    const favoritesItem = { itemInFavorites: product._id }

    const modifiedFavorites = await favoritesService.handleFavoritesItem(
      favoritesItem,
      userId
    )

    res.status(200).json(modifiedFavorites)
  } catch (err) {
    next(err)
  }
}

const getAllFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const favorites = await favoritesService.findAll()

    res.status(200).send(favorites)
  } catch (err) {
    next(err)
  }
}

export default {
  modifyFavorites,
  getAllFavorites,
}
