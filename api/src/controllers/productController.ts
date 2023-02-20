import { NextFunction, Request, Response } from "express";

import productService from "../services/productService";
import categoryService from '../services/categoryService';
import Product from "../models/Product";

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {title, description, price, categories, image} = req.body
  const categoryIds = await categoryService.getIdsByNames(categories)

  if(categoryIds.length == 0) {
    next()
  } else {
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
}

export default {
  createProduct
}