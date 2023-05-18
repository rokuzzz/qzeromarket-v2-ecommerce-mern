import {
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  ObjectId,
} from 'mongoose'
import { BadRequestError, NotFoundError } from '../helpers/apiError'
import Category, { CategoryDocument } from '../models/Category'

const createOne = async (category: CategoryDocument) => {
  return await category.save()
}

const findAll = async () => {
  return await Category.find()
}

const findById = async (id: string) => {
  const foundOne = await Category.findById(id)

  if (!foundOne) {
    throw new NotFoundError('Category does not exist.')
  } else {
    return foundOne
  }
}

const getIdsByNames = async (names: string[]) => {
  const categoryIds: ObjectId[] = []
  const categories = await Category.find({ name: { $in: names } }, '_id')
  categories.map((category) => categoryIds.push(category._id))

  return categoryIds
}

const updateOne = async (
  id: string,
  update?:
    | UpdateWithAggregationPipeline
    | UpdateQuery<CategoryDocument>
    | undefined,
  options?: QueryOptions | null | undefined
) => {
  const foundOne = await Category.findByIdAndUpdate(id, update, options)

  if (!foundOne) {
    throw new NotFoundError()
  } else {
    return foundOne
  }
}

const deleteOne = async (id: string) => {
  const foundCategory = await Category.findById(id)

  if (!foundCategory) {
    throw new NotFoundError()
  } else {
    return await Category.findByIdAndDelete(id)
  }
}

export default {
  createOne,
  findAll,
  findById,
  getIdsByNames,
  updateOne,
  deleteOne,
}
