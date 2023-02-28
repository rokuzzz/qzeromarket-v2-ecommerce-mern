import { verifyToken } from './../middlewares/tokenVerificator';
import { Router } from 'express';
import { verifyAdmin } from '../middlewares/tokenVerificator';

import cartController from '../controllers/cartController';

const cartRoute = Router()
cartRoute.post('/', cartController.createCart)


export default cartRoute