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

const getAllCategories = async (req: Request, res: Response) => {
  try{
    const categories = await categoryService.findAll()
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.findById(req.params.id)
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.updateOne(
      req.params.id, 
      { $set: req.body }, 
      { new: true }
    )
    return res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteCategory = async (req: Request, res: Response) => {
  try {
    await categoryService.deleteOne(req.params.id)
    res.status(200).json('Category has been deleted.')
  } catch (err) {
    res.status(500).json(err)
  }
}

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
}