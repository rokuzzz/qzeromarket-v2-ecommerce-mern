import {
  verifyUserOrAdmin,
  verifyAdmin,
} from './../middlewares/tokenVerificator'
import { Router } from 'express'

const favoritesRoute = Router()

export default favoritesRoute
