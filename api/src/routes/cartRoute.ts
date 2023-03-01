import { Router } from 'express';

import cartController from '../controllers/cartController';

const cartRoute = Router()
cartRoute.post('/', cartController.createCart)

export default cartRoute