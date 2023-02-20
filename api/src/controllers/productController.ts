import { NextFunction, Request, Response } from "express";

import productService from "../services/productService";
import categoryService from '../services/categoryService';
import Product from "../models/Product";
import { NotFoundError } from "../helpers/apiError";

const createProduct = async (req: Request, res: Response) => {
  const {title, description, price, categories, image} = req.body
  const categoryIds = await categoryService.getIdsByNames(categories)

  const newProduct = new Product({
    title: title,
    description: description,
    price: price,
    categories: categoryIds,
    image: image
  })
  
  try {
    const savedProduct = await productService.createOne(newProduct)
    res.status(200).json(savedProduct)
  } catch (err) {
    res.status(500).json(err)
  }
}


export default {
  createProduct
}