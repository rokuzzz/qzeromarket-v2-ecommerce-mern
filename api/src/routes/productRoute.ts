import { verifyAdmin } from './../middlewares/tokenVerificator';
import { Router } from "express";
import productController from '../controllers/productController';

const productRoute = Router()

productRoute.post('/', verifyAdmin, productController.createProduct)
productRoute.put('/:id', verifyAdmin, productController.updateProduct)

export default productRoute