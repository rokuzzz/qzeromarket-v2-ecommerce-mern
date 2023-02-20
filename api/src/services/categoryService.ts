import { QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose'
import { NotFoundError } from '../helpers/apiError'
import Category, { CategoryDocument } from '../models/Category'

const createOne = async (category: CategoryDocument) => {
  return await category.save()
}

const findAll = async () => {
  return await Category.find()
}

const findById = async (id: string) => {
  const foundOne = await Category.findById(id)
  if (!foundOne) throw new NotFoundError('Category does not exist.')
  return foundOne
}

const updateOne = async ( 
  id: string, 
  update?: UpdateWithAggregationPipeline | UpdateQuery<CategoryDocument> | undefined, 
  options?: QueryOptions | null | undefined
) => {
  const foundOne = await Category.findByIdAndUpdate(id, update, options)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const foundCategory = await Category.findById(id)
  if (foundCategory) {
    return await Category.findByIdAndDelete(id)
  } else {
    throw new NotFoundError()
  }
}

export default {
  createOne,
  findAll,
  findById,
  updateOne,
  deleteOne,
}
