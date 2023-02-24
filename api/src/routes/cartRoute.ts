import { verifyToken } from './../middlewares/tokenVerificator';
import { Router } from 'express';

const cartRoute = Router()

cartRoute.post('/', verifyToken)