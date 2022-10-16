import { NotFoundError } from '../helpers/apiError'
import Category, { CategoryDocument } from '../models/Category'

const createOne = async (productReview: CategoryDocument) => {
  return await productReview.save()
}

const getAll = async () => {
  return await Category.find()
}

const getById = async (id: string) => {
  const foundOne = await Category.findById(id)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async (id: string, update: Partial<CategoryDocument>) => {
  const foundOne = await Category.findByIdAndUpdate(id, update)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const foundOne = await Category.findByIdAndDelete(id)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

export default {
  createOne,
  getAll,
  getById,
  updateOne,
  deleteOne,
}
