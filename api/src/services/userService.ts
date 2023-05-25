import {
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose'
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

  if (!foundOne) {
    throw new NotFoundError()
  }

  return foundOne
}

const updateOne = async (
  id: string,
  update?:
    | UpdateWithAggregationPipeline
    | UpdateQuery<UserDocument>
    | undefined,
  options?: QueryOptions | null | undefined
) => {
  const updatedUser = await User.findByIdAndUpdate(id, update, options)

  if (updatedUser) {
    const updatedUserData = {
      _id: updatedUser._id,
      fistname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    }

    return updatedUserData
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id)

  if (!deletedUser) {
    throw new NotFoundError()
  }

  return deletedUser
}

export default {
  createOne,
  findAll,
  findById,
  updateOne,
  deleteOne,
}
