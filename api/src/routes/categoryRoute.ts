import { verifyAdmin } from './../middlewares/tokenVerificator';
import { Router } from "express";
import categoryController from '../controllers/categoryController';

const categoryRoute = Router()

categoryRoute.post('/', verifyAdmin, categoryController.createCategory)
categoryRoute.get('/', categoryController.getAllCategories)
categoryRoute.get('/find/:id', categoryController.getCategoryById)
categoryRoute.put('/:id', verifyAdmin, categoryController.updateCategory)
categoryRoute.delete('/:id', verifyAdmin, categoryController.deleteCategory)

export default categoryRoute