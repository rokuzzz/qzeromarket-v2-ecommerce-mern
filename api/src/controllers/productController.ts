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

const updateProduct = async (req: Request, res: Response) => {
  const {categories, ...others} = req.body
  const categoryIds = await categoryService.getIdsByNames(categories)

  if(categoryIds.length == 0) {
    try {
      const updatedProduct = await productService.updateOne(
        req.params.id,
        { $set: others },
        { new: true }
      )
      res.status(200).json(updatedProduct)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {  
    try {
      const updatedProduct = await productService.updateOne(
        req.params.id,
        { $set: {categories: categoryIds, others} },
        { new: true }
      )
      res.status(200).json(updatedProduct)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteOne(req.params.id)
    res.status(200).json('Product has been deleted.')
  } catch (err) {
    res.status(500).json(err)
  }
}

export default {
  createProduct,
  updateProduct,
  deleteProduct
}