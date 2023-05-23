import {
  ObjectId,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose'
import { NotFoundError } from '../helpers/apiError'
import Favorites, {
  FavoritesDocument,
  ItemInFavorites,
} from '../models/Favorites'

// Function to find an item in the cart by its details (ID)
const findItemIndex = (
  favoritesItems: ItemInFavorites[],
  itemId: ObjectId
): number => {
  for (let i = 0; i < favoritesItems.length; i++) {
    if (favoritesItems[i].toString() === itemId.toString()) {
      return i
    }
  }
  return -1
}

// The main function to modify the cart
const handleCartItem = async (
  itemInFavorites: ItemInFavorites,
  userId: ObjectId
) => {
  // Find an existing cart or create a new one
  const userFavorites =
    (await Favorites.findOne({ associatedUser: userId })) ||
    new Favorites({ associatedUser: userId, favoritesItems: [] })

  const itemIndex = findItemIndex(userFavorites.favoritesItems, itemInFavorites)

  // If the item exists in the cart, update its quantity or remove it
  // If it doesn't exist and quantity is positive, add it to the cart
  if (itemIndex >= 0) {
  } else {
  }

  await userFavorites.save()

  return Favorites.findById(userFavorites._id)
    .populate({ path: 'associatedUser', select: '_id username' })
    .populate({
      path: 'favoritesItems',
      select: '_id title description price',
    })
}

const createOne = async (Favorites: FavoritesDocument) => {
  return await Favorites.save()
}

const findAll = async () => {
  return await Favorites.find()
}

const findById = async (id: string) => {
  const foundOne = await Favorites.findById(id)

  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async (
  id: string,
  update?:
    | UpdateWithAggregationPipeline
    | UpdateQuery<FavoritesDocument>
    | undefined,
  options?: QueryOptions | null | undefined
) => {
  const foundOne = await Favorites.findByIdAndUpdate(id, update, options)

  if (!foundOne) {
    throw new NotFoundError()
  } else {
    return foundOne
  }
}

const deleteOne = async (id: string) => {
  const foundFavorites = await Favorites.findById(id)

  if (foundFavorites) {
    return await Favorites.findByIdAndDelete(id)
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
