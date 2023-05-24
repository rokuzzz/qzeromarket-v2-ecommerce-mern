import { Router } from 'express'

import favoritesController from '../controllers/favoritesController'
import {
  verifyUserOrAdmin,
  verifyAdmin,
} from './../middlewares/tokenVerificator'

const favoritesRoute = Router()
favoritesRoute.post('/', favoritesController.modifyFavorites)
favoritesRoute.get('/', verifyAdmin, favoritesController.getAllFavorites)
favoritesRoute.get(
  '/:userId',
  verifyUserOrAdmin,
  favoritesController.getUserFavorites
)

export default favoritesRoute
