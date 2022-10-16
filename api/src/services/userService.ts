import { NotFoundError } from '../helpers/apiError'
import User, { UserDocument } from '../models/User'

const createOne = async (productReview: UserDocument) => {
  return await productReview.save()
}

const getAll = async () => {
  return await User.find()
}

const getById = async (id: string) => {
  const foundOne = await User.findById(id)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async (id: string, update: Partial<UserDocument>) => {
  const foundOne = await User.findByIdAndUpdate(id, update)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const foundOne = await User.findByIdAndDelete(id)
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
