import { NextFunction, Request, Response } from 'express'
import categoryService from '../services/categoryService'
import Category from '../models/Category'

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = new Category(req.body)
    const savedCategory = await categoryService.createOne(newCategory)

    res.status(200).send(savedCategory)
  } catch (err) {
    next(err)
  }
}

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.findAll()

    res.status(200).json(categories)
  } catch (err) {
    next(err)
  }
}

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    const category = await categoryService.findById(id)

    res.status(200).json(category)
  } catch (err) {
    next(err)
  }
}

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    const category = await categoryService.updateOne(
      id,
      { $set: req.body },
      { new: true }
    )

    res.status(201).json(category)
  } catch (err) {
    next(err)
  }
}

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    await categoryService.deleteOne(id)

    res.status(200).json('Category has been deleted.')
  } catch (err) {
    next(err)
  }
}

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
}
