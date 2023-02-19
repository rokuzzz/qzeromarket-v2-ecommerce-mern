import { Request, Response } from "express";
import categoryService from "../services/categoryService";
import Category from "../models/Category";

const createCategory = async (req: Request, res: Response) => {
  const newCategory = new Category(req.body)
  try{
    const savedCategory = await categoryService.createOne(newCategory)
    res.status(200).send(savedCategory)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getCategories = async (req: Request, res: Response) => {
  
}

const getCategoryById = async (req: Request, res: Response) => {
  
}

const updateCategory = async (req: Request, res: Response) => {
  
}

const deleteCategory = async (req: Request, res: Response) => {
  
}

export default {
  createCategory
}