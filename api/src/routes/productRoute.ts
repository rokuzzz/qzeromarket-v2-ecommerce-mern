import { verifyAdmin } from './../middlewares/tokenVerificator';
import { Router } from "express";

const productRoute = Router()

productRoute.post('/', verifyAdmin, )

export default productRoute