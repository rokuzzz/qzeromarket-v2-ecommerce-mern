import { forEach } from 'lodash';
import { NextFunction, Request, Response } from "express";

import productService from "../services/productService";
import categoryService from '../services/categoryService';
import Product from "../models/Product";
import { BadRequestError } from "../helpers/apiError";

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

const getFilteredProducts = async (req: Request, res: Response) => {
  const skipPages = parseInt(req.query.page as string) || 0
  const limitPages = parseInt(req.query.limit as string) || 10
  const sortBy = req.query.sort?.toString() || "random"
  const order = req.query.order?.toString() || 0
  let categories = req.query.categories

  const convertedCategories: string[] = []

  // check if categories value is an array
  if (Array.isArray(categories)) {
    // converts each category in the categories to a string (if it's not already)
    // push values to convertedCategories
    for (let category of categories) {
      if (typeof category !== 'string') {
        convertedCategories.push(category.toString())
      } else {
        convertedCategories.push(category)
      }
    }
    try {
      const categoryIds = await categoryService.getIdsByNames(convertedCategories)
      const products = await productService.findAllPipeline(skipPages, limitPages, sortBy, order, categoryIds)
      res.status(200).json(products)
    } catch (err) {
      res.status(500).json(err)
    }
    // if category value is string and it is not empty - convert it to string array type 
  } else if (typeof categories == "string" && categories !== "") {
    convertedCategories.push(categories)
    try {
      const categoryIds = await categoryService.getIdsByNames(convertedCategories)
      if (categoryIds.length == 0) {
        categories = ["All"]
        const categoryIds = await categoryService.getIdsByNames(categories);
        const products = await productService.findAllPipeline(skipPages, limitPages, sortBy, order, categoryIds)
        res.status(200).json(products) 
      } else {
        const products = await productService.findAllPipeline(skipPages, limitPages, sortBy, order, categoryIds)
        res.status(200).json(products)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    categories = ["All"]
    try {
      const categoryIds = await categoryService.getIdsByNames(categories);
      const products = await productService.findAllPipeline(skipPages, limitPages, sortBy, order, categoryIds)
      res.status(200).json(products)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.findById(req.params.id)
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json(err)
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
  getProductById,
  getFilteredProducts,
  updateProduct,
  deleteProduct
}