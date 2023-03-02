import { verifyUserOrAdmin } from './../middlewares/tokenVerificator';
import { Router } from 'express';

import cartController from '../controllers/cartController';

const cartRoute = Router()
cartRoute.post('/', cartController.createOrUpdateCart)
cartRoute.get('/:id', verifyUserOrAdmin, cartController.getUserCart)
cartRoute.delete('/:id', verifyUserOrAdmin, cartController.deleteCart)

export default cartRoute