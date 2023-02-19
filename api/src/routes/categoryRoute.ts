import { verifyAdmin } from './../middlewares/tokenVerificator';
import { Router } from "express";
import categoryController from '../controllers/categoryController';

const categoryRoute = Router()

categoryRoute.post('/', verifyAdmin, categoryController.createCategory)

export default categoryRoute