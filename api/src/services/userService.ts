import { QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose'
import { NotFoundError } from '../helpers/apiError'
import User, { UserDocument } from '../models/User'

const createOne = async (user: UserDocument) => {
  return await user.save()
}

const findAll = async () => {
  return await User.find()
}

const findById = async (id: string) => {
  const foundOne = await User.findById(id)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async (
  id: string, 
  update?: UpdateWithAggregationPipeline | UpdateQuery<UserDocument> | undefined, 
  options?: QueryOptions | null | undefined
) => {
  const foundOne = await User.findByIdAndUpdate(id, update, options)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const foundUser = await User.findById(id)
  if (foundUser) {
    return await User.findByIdAndDelete(id)
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
