import { QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose'
import { NotFoundError } from '../helpers/apiError'
import Product, { ProductDocument } from '../models/Product'

const createOne = async (product: ProductDocument) => {
  return await product.save()
}

const findAll = async (page: number, limit: number, sort: string) => {
  return await Product
    .find()
    .sort({ [sort]: 1 })
    .skip(page * limit)
    .limit(limit)
}

const findAllPipeline = async (
  page: number,
  limit: number,
  sort: string,
  categoryId: string[]
) => {
  return await Product.aggregate()
    .sort({ [sort]: 1 })
    .skip(page * limit)
    .limit(limit)
    .lookup({
      from: 'productreviews',
      localField: '_id',
      foreignField: 'productId',
      as: 'reviews',
    })
    .addFields({
      rate: {
        $ifNull: [{ $avg: '$reviews.rate' }, 0],
      },
    })
    .match({
      categories: { $in: categoryId },
    })
}

const findProductReviews = async (id: string) => {
  const foundOne = await Product.findById(id).populate('reviews')
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const findById = async (id: string) => {
  const foundOne = await Product.findById(id)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async ( 
  id: string, 
  update?: UpdateWithAggregationPipeline | UpdateQuery<ProductDocument> | undefined, 
  options?: QueryOptions | null | undefined
) => {
  const foundOne = await Product.findByIdAndUpdate(id, update, options)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const foundOne = await Product.findByIdAndDelete(id)
  if (foundOne) {
    return foundOne
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
  findProductReviews,
  findAllPipeline,
}
