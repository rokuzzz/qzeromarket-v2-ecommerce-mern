import { verifyAdmin } from './../middlewares/tokenVerificator';
import { Router } from "express";
import productController from '../controllers/productController';

const productRoute = Router()

productRoute.post('/', verifyAdmin, productController.createProduct)
productRoute.get('/:id', productController.getProductById)
productRoute.get('/', productController.getFilteredProducts)
productRoute.put('/:id', verifyAdmin, productController.updateProduct)
productRoute.delete('/:id', verifyAdmin, productController.deleteProduct)

export default productRoute