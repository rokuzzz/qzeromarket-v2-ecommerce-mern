import { Router } from 'express'

import favoritesController from '../controllers/favoritesController'
import {
  verifyUserOrAdmin,
  verifyAdmin,
} from './../middlewares/tokenVerificator'

const favoritesRoute = Router()
favoritesRoute.post('/', favoritesController.modifyFavorites)

export default favoritesRoute
