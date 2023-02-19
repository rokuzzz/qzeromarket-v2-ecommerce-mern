import { Request, Response } from "express";

import productService from "../services/productService";
import Product from "../models/Product";

const createProduct = async (req: Request, res: Response) => {
  const newProduct = new Product(req.body)
  try {
    const savedProduct = await productService.createOne(newProduct)
    res.status(200).json(savedProduct)
  } catch (err) {
    res.status(500).json(err)
  }
}