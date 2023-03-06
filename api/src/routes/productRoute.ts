import { Router } from "express";
import fileUploader from "../middlewares/multerMiddleware";

import productController from '../controllers/productController';
import { verifyAdmin } from './../middlewares/tokenVerificator';
import multerMiddleware from "../middlewares/multerMiddleware";

const productRoute = Router()

productRoute.post('/', verifyAdmin, fileUploader, productController.createProduct)
productRoute.get('/:id', productController.getProductById)
productRoute.get('/', productController.getFilteredProducts)
productRoute.put('/:id', verifyAdmin, productController.updateProduct)
productRoute.delete('/:id', verifyAdmin, productController.deleteProduct)

export default productRoute