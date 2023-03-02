import { verifyUserOrAdmin } from './../middlewares/tokenVerificator';
import { Router } from 'express';

import cartController from '../controllers/cartController';

const cartRoute = Router()
cartRoute.post('/', cartController.createOrUpdateCart)
cartRoute.delete('/:id', verifyUserOrAdmin, cartController.deleteCart)

export default cartRoute