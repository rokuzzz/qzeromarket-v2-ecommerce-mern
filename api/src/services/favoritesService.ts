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
    if (favoritesItems[i].itemInFavorites.toString() === itemId.toString()) {
      return i
    }
  }
  return -1
}

// The main function to modify the cart
const handleFavoritesItem = async (
  itemInFavorites: ItemInFavorites,
  userId: ObjectId
) => {
  // Find an existing cart or create a new one
  const userFavorites =
    (await Favorites.findOne({ associatedUser: userId })) ||
    new Favorites({ associatedUser: userId, favoritesItems: [] })

  const itemIndex = findItemIndex(
    userFavorites.favoritesItems,
    itemInFavorites.itemInFavorites
  )

  // If the item exists in the favorites, remove it.
  // If it doesn't exist, add it to the favorites.
  if (itemIndex >= 0) {
    userFavorites.favoritesItems.splice(itemIndex, 1)
  } else {
    userFavorites.favoritesItems.push(itemInFavorites)
  }

  await userFavorites.save()

  return Favorites.findById(userFavorites._id)
    .populate({ path: 'associatedUser', select: '_id username' })
    .populate({
      path: 'favoritesItems.itemInFavorites',
      select: '_id title description price',
    })
}

const findAll = async () => {
  return await Favorites.find()
    .populate({
      path: 'associatedUser',
      select: '_id username',
    })
    .populate({
      path: 'favoritesItems.itemInFavorites',
      select: '_id title description price',
    })
}

const findFavoritesByUserId = async (userId: string) => {
  const foundOne = await Favorites.findOne({ associatedUser: userId })
    .populate({
      path: 'associatedUser',
      select: '_id username',
    })
    .populate({
      path: 'favoritesItems.itemInFavorites',
      select: '_id title description price',
    })

  if (!foundOne) {
    throw new NotFoundError()
  }

  return foundOne
}

const deleteOne = async (id: string) => {
  const deletedFavorites = await Favorites.findByIdAndDelete(id)

  if (!deletedFavorites) {
    throw new NotFoundError()
  }

  return deletedFavorites
}

export default {
  handleFavoritesItem,
  findAll,
  findFavoritesByUserId,
  deleteOne,
}
