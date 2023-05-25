import { Router } from 'express'

import {
  verifyUserOrAdmin,
  verifyAdmin,
} from './../middlewares/tokenVerificator'

import cartController from '../controllers/cartController'

const cartRoute = Router()
cartRoute.post('/', cartController.modifyCart)
cartRoute.get('/', verifyAdmin, cartController.getAllCarts)
cartRoute.get('/:id', verifyUserOrAdmin, cartController.getUserCart)
cartRoute.delete('/:id', verifyUserOrAdmin, cartController.deleteCart)

export default cartRoute
